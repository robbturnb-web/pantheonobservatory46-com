DROP POLICY IF EXISTS "Anyone can submit a sighting" ON public.orb_sightings;
REVOKE INSERT ON public.orb_sightings FROM anon;
CREATE POLICY "Authenticated users can submit sightings"
ON public.orb_sightings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);