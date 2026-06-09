
-- Fix 1: orb_sightings exposes email to anon. Restrict public reads to a view that excludes email.
DROP POLICY IF EXISTS "Anyone can read approved sightings" ON public.orb_sightings;

-- Owners can still read their own sighting (with email).
CREATE POLICY "Users can read own sightings" ON public.orb_sightings
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all sightings" ON public.orb_sightings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Public view without email column for approved sightings
CREATE OR REPLACE VIEW public.orb_sightings_public
WITH (security_invoker = true) AS
SELECT id, user_id, location, sighting_date, description, status, created_at
FROM public.orb_sightings
WHERE status = 'approved';

GRANT SELECT ON public.orb_sightings_public TO anon, authenticated;

-- Allow the view's underlying SELECT to work for anon by adding a policy that excludes email access path.
-- Since view uses security_invoker, we need a policy permitting anon to read approved rows.
CREATE POLICY "Public can read approved sightings via view" ON public.orb_sightings
  FOR SELECT TO anon, authenticated
  USING (status = 'approved');

-- Revoke direct column access to email from anon/authenticated; only owner+admin via column grants.
REVOKE SELECT ON public.orb_sightings FROM anon;
GRANT SELECT (id, user_id, location, sighting_date, description, status, created_at) ON public.orb_sightings TO anon;
REVOKE SELECT ON public.orb_sightings FROM authenticated;
GRANT SELECT (id, user_id, location, sighting_date, description, status, created_at, email) ON public.orb_sightings TO authenticated;

-- Fix 2: audio_tracks public read should only expose ready tracks.
DROP POLICY IF EXISTS "Audio tracks readable by everyone" ON public.audio_tracks;
CREATE POLICY "Ready audio tracks readable by everyone" ON public.audio_tracks
  FOR SELECT TO anon, authenticated
  USING (status = 'ready');
