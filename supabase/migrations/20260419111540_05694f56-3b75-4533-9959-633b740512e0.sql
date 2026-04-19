-- Add daily-return tracking to echo_xp
ALTER TABLE public.echo_xp
ADD COLUMN IF NOT EXISTS last_daily_at TIMESTAMPTZ;

-- Event log to prevent double-grants
CREATE TABLE IF NOT EXISTS public.echo_xp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  event_id TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, event_type, event_id)
);

ALTER TABLE public.echo_xp_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own xp events"
  ON public.echo_xp_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own xp events"
  ON public.echo_xp_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_echo_xp_events_user_created
  ON public.echo_xp_events (user_id, created_at DESC);