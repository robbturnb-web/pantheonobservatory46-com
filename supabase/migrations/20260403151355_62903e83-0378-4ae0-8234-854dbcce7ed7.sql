
-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT 'Starseed',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Channels table
CREATE TABLE public.echoverse_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '💬',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.echoverse_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Channels viewable by everyone" ON public.echoverse_channels FOR SELECT USING (true);

-- Messages table
CREATE TABLE public.echoverse_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID NOT NULL REFERENCES public.echoverse_channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.echoverse_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages viewable by authenticated" ON public.echoverse_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own messages" ON public.echoverse_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'Starseed'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed channels
INSERT INTO public.echoverse_channels (name, slug, description, icon, sort_order) VALUES
  ('General', 'general', 'Open discussion for all seekers', '🌌', 0),
  ('UAP Sightings', 'uap-sightings', 'Share and discuss UAP encounters', '🛸', 1),
  ('Consciousness', 'consciousness', 'Meditation, remote viewing, and altered states', '🧠', 2),
  ('Starseeds', 'starseeds', 'Connect with your cosmic family', '✨', 3),
  ('Whistleblower Intel', 'whistleblower-intel', 'Disclosure updates and insider info', '🔐', 4);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.echoverse_messages;

-- Indexes
CREATE INDEX idx_messages_channel ON public.echoverse_messages(channel_id, created_at);
CREATE INDEX idx_messages_user ON public.echoverse_messages(user_id);
