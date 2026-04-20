-- Fix search_path on existing email functions
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;

-- Tighten storage SELECT policies: drop the broad "publicly accessible" ones
-- and replace with policies that allow individual file reads but restrict listing to owners
DROP POLICY IF EXISTS "Glyphs publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Testimony media publicly accessible" ON storage.objects;

-- Owners can list/select their own files in their folder
CREATE POLICY "Glyph owners can list their files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'glyphs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Testimony owners can list their files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'testimony-media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Note: the buckets remain `public = true` so individual files are still served
-- via direct CDN URLs without auth. We just block enumeration via the API.