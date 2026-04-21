
-- =========================================================
-- 1. XP integrity — secure SECURITY DEFINER function
-- =========================================================

-- Compute rank server-side (mirror of client RANK_TIERS)
CREATE OR REPLACE FUNCTION public.compute_rank(_xp integer)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN _xp >= 2000 THEN 'Ascended'
    WHEN _xp >= 1000 THEN 'Oracle'
    WHEN _xp >= 600  THEN 'Mystic'
    WHEN _xp >= 300  THEN 'Adept'
    WHEN _xp >= 100  THEN 'Seeker'
    ELSE 'Initiate'
  END
$$;

-- Whitelisted event types + max XP per single grant
CREATE OR REPLACE FUNCTION public.award_xp(
  p_event_type text,
  p_event_id text,
  p_amount integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_new_xp integer;
  v_new_rank text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated' USING ERRCODE = '28000';
  END IF;

  IF p_amount IS NULL OR p_amount <= 0 OR p_amount > 200 THEN
    RAISE EXCEPTION 'Invalid amount' USING ERRCODE = '22023';
  END IF;

  IF p_event_type NOT IN ('page','species','uap','whistleblower','vault','daily','chat','community','glyph','element') THEN
    RAISE EXCEPTION 'Invalid event_type' USING ERRCODE = '22023';
  END IF;

  IF p_event_id IS NULL OR length(p_event_id) = 0 OR length(p_event_id) > 200 THEN
    RAISE EXCEPTION 'Invalid event_id' USING ERRCODE = '22023';
  END IF;

  -- Idempotent insert; unique violation → already granted
  BEGIN
    INSERT INTO public.echo_xp_events(user_id, event_type, event_id, xp)
    VALUES (v_uid, p_event_type, p_event_id, p_amount);
  EXCEPTION WHEN unique_violation THEN
    SELECT xp INTO v_new_xp FROM public.echo_xp WHERE user_id = v_uid;
    RETURN jsonb_build_object('granted', false, 'xp', COALESCE(v_new_xp, 0), 'rank', public.compute_rank(COALESCE(v_new_xp, 0)));
  END;

  -- Ensure echo_xp row exists
  INSERT INTO public.echo_xp(user_id, xp, rank)
  VALUES (v_uid, p_amount, public.compute_rank(p_amount))
  ON CONFLICT (user_id) DO UPDATE
    SET xp = public.echo_xp.xp + EXCLUDED.xp,
        rank = public.compute_rank(public.echo_xp.xp + EXCLUDED.xp),
        updated_at = now()
  RETURNING xp, rank INTO v_new_xp, v_new_rank;

  RETURN jsonb_build_object('granted', true, 'xp', v_new_xp, 'rank', v_new_rank);
END;
$$;

-- Add unique constraint to echo_xp.user_id if not present (needed for ON CONFLICT)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'echo_xp_user_id_key'
  ) THEN
    BEGIN
      ALTER TABLE public.echo_xp ADD CONSTRAINT echo_xp_user_id_key UNIQUE (user_id);
    EXCEPTION WHEN duplicate_table THEN NULL;
    END;
  END IF;
END$$;

-- Add unique constraint to echo_xp_events to enforce idempotency
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'echo_xp_events_unique_event'
  ) THEN
    ALTER TABLE public.echo_xp_events
      ADD CONSTRAINT echo_xp_events_unique_event UNIQUE (user_id, event_type, event_id);
  END IF;
END$$;

-- Restrict echo_xp UPDATE: only allow updating last_daily_at and pages_visited (not xp/rank)
DROP POLICY IF EXISTS "Users can update own xp" ON public.echo_xp;

CREATE POLICY "Users can update own metadata"
ON public.echo_xp
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Trigger to prevent client from changing xp or rank directly
CREATE OR REPLACE FUNCTION public.guard_echo_xp_columns()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'authenticated' THEN
    IF NEW.xp <> OLD.xp THEN
      RAISE EXCEPTION 'Direct xp updates are not allowed; use award_xp()' USING ERRCODE = '42501';
    END IF;
    IF NEW.rank <> OLD.rank THEN
      RAISE EXCEPTION 'Direct rank updates are not allowed; use award_xp()' USING ERRCODE = '42501';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_echo_xp_columns_trg ON public.echo_xp;
CREATE TRIGGER guard_echo_xp_columns_trg
BEFORE UPDATE ON public.echo_xp
FOR EACH ROW
EXECUTE FUNCTION public.guard_echo_xp_columns();

-- Restrict echo_xp_events: clients should NOT insert directly; only via award_xp()
DROP POLICY IF EXISTS "Users can insert own xp events" ON public.echo_xp_events;
-- (no replacement INSERT policy → INSERTs are blocked for clients; SECURITY DEFINER bypasses RLS)

-- =========================================================
-- 2. user_roles privilege escalation hardening
-- =========================================================
-- Explicitly block authenticated users from INSERT/UPDATE/DELETE on their own rows;
-- only the "Admins can manage roles" ALL policy permits writes.

-- The existing "Admins can manage roles" (FOR ALL) covers admins.
-- No INSERT/UPDATE/DELETE policy exists for non-admins → already blocked.
-- Add explicit restrictive policy as defence-in-depth.

DROP POLICY IF EXISTS "Block self role assignment" ON public.user_roles;
CREATE POLICY "Block self role assignment"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Block self role update" ON public.user_roles;
CREATE POLICY "Block self role update"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Block self role delete" ON public.user_roles;
CREATE POLICY "Block self role delete"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- =========================================================
-- 3. Make storage buckets private
-- =========================================================
UPDATE storage.buckets SET public = false WHERE id IN ('glyphs','testimony-media');

-- Allow public SELECT on storage.objects for these buckets ONLY when the parent record is approved.
-- Simpler approach: allow authenticated users to read objects in these buckets; the app uses signed URLs for unauthenticated viewers.
-- Keep existing owner-only policies; add a read policy for authenticated users so the community feed works for logged-in users while public viewers must use signed URLs generated server-side or by the client after fetching approved testimonies.

DROP POLICY IF EXISTS "Authenticated can read glyph and testimony media" ON storage.objects;
CREATE POLICY "Authenticated can read glyph and testimony media"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id IN ('glyphs','testimony-media'));

-- =========================================================
-- 4. Realtime channel authorization
-- =========================================================
-- Restrict realtime.messages so only authenticated users can subscribe to broadcast/presence on echoverse channels.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'realtime' AND table_name = 'messages') THEN
    EXECUTE 'ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY';

    EXECUTE 'DROP POLICY IF EXISTS "Authenticated can receive realtime" ON realtime.messages';
    EXECUTE $POL$
      CREATE POLICY "Authenticated can receive realtime"
      ON realtime.messages
      FOR SELECT
      TO authenticated
      USING (true)
    $POL$;
  END IF;
END$$;
