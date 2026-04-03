
-- Create echo_xp table
CREATE TABLE public.echo_xp (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  xp INTEGER NOT NULL DEFAULT 0,
  rank TEXT NOT NULL DEFAULT 'Initiate',
  pages_visited JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.echo_xp ENABLE ROW LEVEL SECURITY;

-- Users can read their own XP
CREATE POLICY "Users can view own xp"
ON public.echo_xp FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can update their own XP
CREATE POLICY "Users can update own xp"
ON public.echo_xp FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own XP
CREATE POLICY "Users can insert own xp"
ON public.echo_xp FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Timestamp trigger
CREATE TRIGGER update_echo_xp_updated_at
BEFORE UPDATE ON public.echo_xp
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update handle_new_user to also create XP row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'Starseed'));
  INSERT INTO public.echo_xp (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;
