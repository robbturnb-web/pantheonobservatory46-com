
-- 1. Seed admin role for robbturnb@gmail.com (if user exists)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'robbturnb@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. source_health
CREATE TABLE IF NOT EXISTS public.source_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL,
  url text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'official',
  verification_status text NOT NULL DEFAULT 'pending',
  http_status integer,
  response_time_ms integer,
  last_checked_at timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.source_health TO anon, authenticated;
GRANT ALL ON public.source_health TO service_role;
ALTER TABLE public.source_health ENABLE ROW LEVEL SECURITY;
CREATE POLICY "source_health public read" ON public.source_health FOR SELECT USING (true);
CREATE POLICY "source_health admin write" ON public.source_health FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER source_health_updated_at BEFORE UPDATE ON public.source_health
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. disclosure_briefings
CREATE TABLE IF NOT EXISTS public.disclosure_briefings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  briefing_date date NOT NULL,
  headline text NOT NULL,
  summary text NOT NULL,
  evidence_grade text NOT NULL DEFAULT 'C',
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags text[] NOT NULL DEFAULT ARRAY[]::text[],
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.disclosure_briefings TO anon, authenticated;
GRANT ALL ON public.disclosure_briefings TO service_role;
ALTER TABLE public.disclosure_briefings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "briefings public read published" ON public.disclosure_briefings FOR SELECT USING (published = true);
CREATE POLICY "briefings admin all" ON public.disclosure_briefings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER disclosure_briefings_updated_at BEFORE UPDATE ON public.disclosure_briefings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS disclosure_briefings_date_idx ON public.disclosure_briefings(briefing_date DESC);

-- 4. system_status_events
CREATE TABLE IF NOT EXISTS public.system_status_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  component text NOT NULL,
  status text NOT NULL DEFAULT 'operational',
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.system_status_events TO anon, authenticated;
GRANT ALL ON public.system_status_events TO service_role;
ALTER TABLE public.system_status_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "status public read" ON public.system_status_events FOR SELECT USING (true);
CREATE POLICY "status admin write" ON public.system_status_events FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER system_status_events_updated_at BEFORE UPDATE ON public.system_status_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
