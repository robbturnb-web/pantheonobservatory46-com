
-- ============================================================
-- BATCH 1: Backend security lockdown
-- Addresses all 5 findings from the security scanner.
-- ============================================================

-- ------------------------------------------------------------
-- 1. echo_xp: remove client INSERT, replace UPDATE with a
--    metadata-only policy. The guard_echo_xp_columns trigger
--    already blocks xp/rank changes, but removing the broad
--    policies makes intent explicit and stops accidental abuse.
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Users can insert own xp" ON public.echo_xp;
DROP POLICY IF EXISTS "Users can update own metadata" ON public.echo_xp;

-- Re-create UPDATE: still scoped to own row, still backed by the
-- guard_echo_xp_columns trigger (which raises if xp/rank change).
CREATE POLICY "Users can update own xp metadata"
ON public.echo_xp
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- No INSERT policy. Rows are created exclusively by the
-- handle_new_user() trigger (SECURITY DEFINER) on signup.

-- ------------------------------------------------------------
-- 2. echo_xp_events: ensure no client INSERT exists.
--    award_xp() is SECURITY DEFINER and bypasses RLS for inserts.
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Users can insert own xp events" ON public.echo_xp_events;
-- (SELECT-own policy stays intact for the XP history UI.)

-- ------------------------------------------------------------
-- 3. profiles: restrict SELECT to authenticated users so
--    anonymous visitors can't enumerate user UUIDs.
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;

CREATE POLICY "Profiles viewable by authenticated users"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- ------------------------------------------------------------
-- 4. realtime.messages: scope subscriptions to public chat
--    topics (echoverse:*). Drop the blanket policy.
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Authenticated can receive realtime" ON realtime.messages;

CREATE POLICY "Authenticated can subscribe to echoverse channels"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  realtime.topic() LIKE 'echoverse:%'
  OR realtime.topic() LIKE 'public:%'
);

-- ------------------------------------------------------------
-- 5. storage: replace the broad "any authenticated user can
--    read everything" policy with ownership-scoped reads, plus
--    moderator/admin override and approval-based public reads
--    via the application tables.
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Authenticated can read glyph and testimony media" ON storage.objects;

-- Owners can read their own files (folder name = their uuid).
CREATE POLICY "Owners can read their own glyph and testimony media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id IN ('glyphs', 'testimony-media')
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Mods/admins can read all glyphs and testimony media.
CREATE POLICY "Mods can read all glyph and testimony media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id IN ('glyphs', 'testimony-media')
  AND (
    public.has_role(auth.uid(), 'moderator'::public.app_role)
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
  )
);

-- Approved testimonies' media is readable by everyone (joins
-- the bucket to the approval status of the parent record).
CREATE POLICY "Approved testimony media readable by all"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'testimony-media'
  AND EXISTS (
    SELECT 1
    FROM public.community_testimonies t
    WHERE t.status = 'approved'
      AND t.media_url IS NOT NULL
      AND position(storage.objects.name in t.media_url) > 0
  )
);

-- Approved glyphs' image is readable by everyone (same pattern).
CREATE POLICY "Approved glyph media readable by all"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'glyphs'
  AND EXISTS (
    SELECT 1
    FROM public.glyph_submissions g
    WHERE g.status = 'approved'
      AND g.image_url IS NOT NULL
      AND position(storage.objects.name in g.image_url) > 0
  )
);
