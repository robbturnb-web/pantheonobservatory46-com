
CREATE TABLE public.link_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL UNIQUE,
  link_type text NOT NULL DEFAULT 'external', -- 'internal' | 'external' | 'youtube' | 'pdf'
  source_page text,
  http_status integer,
  ok boolean NOT NULL DEFAULT false,
  response_time_ms integer,
  last_checked_at timestamptz NOT NULL DEFAULT now(),
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.link_health TO authenticated;
GRANT ALL ON public.link_health TO service_role;

ALTER TABLE public.link_health ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all link_health"
  ON public.link_health FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages link_health"
  ON public.link_health FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE TRIGGER update_link_health_updated_at
  BEFORE UPDATE ON public.link_health
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_link_health_ok ON public.link_health(ok);
CREATE INDEX idx_link_health_last_checked ON public.link_health(last_checked_at DESC);
