
-- Remove anon access to the orb_sightings table to prevent email column exposure.
-- Anonymous users can still read approved sightings via the orb_sightings_public view
-- (which excludes the email column).

DROP POLICY IF EXISTS "Public can read approved sightings via view" ON public.orb_sightings;

CREATE POLICY "Authenticated users can read approved sightings"
ON public.orb_sightings
FOR SELECT
TO authenticated
USING (status = 'approved');

REVOKE SELECT ON public.orb_sightings FROM anon;

GRANT SELECT ON public.orb_sightings_public TO anon;
GRANT SELECT ON public.orb_sightings_public TO authenticated;
