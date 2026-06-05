CREATE TABLE public.orb_sightings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  location TEXT NOT NULL,
  sighting_date TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orb_sightings TO anon, authenticated;
GRANT ALL ON public.orb_sightings TO service_role;
ALTER TABLE public.orb_sightings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a sighting" ON public.orb_sightings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read approved sightings" ON public.orb_sightings FOR SELECT TO anon, authenticated USING (status = 'approved');