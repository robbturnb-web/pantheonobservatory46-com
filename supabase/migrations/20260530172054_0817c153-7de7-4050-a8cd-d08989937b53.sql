
-- Fix self-approval on glyph_submissions
DROP POLICY IF EXISTS "Users can update their own pending glyphs" ON public.glyph_submissions;
CREATE POLICY "Users can update their own pending glyphs"
ON public.glyph_submissions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Fix self-approval on community_testimonies
DROP POLICY IF EXISTS "Users can edit their own pending testimonies" ON public.community_testimonies;
CREATE POLICY "Users can edit their own pending testimonies"
ON public.community_testimonies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Revoke public EXECUTE on has_role; keep authenticated + service_role
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
