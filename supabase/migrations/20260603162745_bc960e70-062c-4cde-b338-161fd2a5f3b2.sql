DROP POLICY IF EXISTS "Audio tracks publicly readable" ON storage.objects;

CREATE POLICY "Published audio tracks readable by all"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'audio-tracks'
  AND EXISTS (
    SELECT 1 FROM public.audio_tracks t
    WHERE t.status = 'ready'
      AND t.public_url IS NOT NULL
      AND (t.public_url = objects.name OR t.public_url LIKE '%/' || objects.name)
  )
);