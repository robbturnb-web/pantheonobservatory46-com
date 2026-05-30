-- Public bucket for AI-generated ambient soundscapes
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-tracks', 'audio-tracks', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Audio tracks publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'audio-tracks');

CREATE POLICY "Service role manages audio tracks"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'audio-tracks')
WITH CHECK (bucket_id = 'audio-tracks');

-- Registry table mapping playlist key → generated public URL
CREATE TABLE public.audio_tracks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  track_key text NOT NULL UNIQUE,
  playlist text NOT NULL,
  label text NOT NULL,
  prompt text NOT NULL,
  duration_seconds integer NOT NULL DEFAULT 90,
  public_url text,
  status text NOT NULL DEFAULT 'pending',
  error_message text,
  generated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.audio_tracks TO anon;
GRANT SELECT ON public.audio_tracks TO authenticated;
GRANT ALL ON public.audio_tracks TO service_role;

ALTER TABLE public.audio_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audio tracks readable by everyone"
ON public.audio_tracks FOR SELECT
USING (true);

CREATE POLICY "Admins can manage audio tracks"
ON public.audio_tracks FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_audio_tracks_updated_at
BEFORE UPDATE ON public.audio_tracks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();