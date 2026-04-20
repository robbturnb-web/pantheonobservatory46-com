-- Enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- community_testimonies table
CREATE TABLE public.community_testimonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'sighting',
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  pinned BOOLEAN NOT NULL DEFAULT false,
  flow_drive_url TEXT,
  media_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.community_testimonies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved testimonies viewable by everyone"
ON public.community_testimonies FOR SELECT
USING (status = 'approved');

CREATE POLICY "Users can view their own testimonies"
ON public.community_testimonies FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Mods can view all testimonies"
ON public.community_testimonies FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can submit testimonies"
ON public.community_testimonies FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can edit their own pending testimonies"
ON public.community_testimonies FOR UPDATE TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Mods can update any testimony"
ON public.community_testimonies FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete their own pending testimonies"
ON public.community_testimonies FOR DELETE TO authenticated
USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins can delete any testimony"
ON public.community_testimonies FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_community_testimonies_updated_at
BEFORE UPDATE ON public.community_testimonies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_testimonies_status_pinned ON public.community_testimonies (status, pinned DESC, created_at DESC);
CREATE INDEX idx_testimonies_tags ON public.community_testimonies USING GIN (tags);

-- glyph_submissions table
CREATE TABLE public.glyph_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT,
  drawn_svg TEXT,
  ai_interpretation TEXT,
  culture_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.glyph_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved glyphs viewable by everyone"
ON public.glyph_submissions FOR SELECT
USING (status = 'approved');

CREATE POLICY "Users can view their own glyphs"
ON public.glyph_submissions FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Mods can view all glyphs"
ON public.glyph_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can submit glyphs"
ON public.glyph_submissions FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending glyphs"
ON public.glyph_submissions FOR UPDATE TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Mods can update any glyph"
ON public.glyph_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_glyph_submissions_updated_at
BEFORE UPDATE ON public.glyph_submissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- daily_cosmos_pulse table
CREATE TABLE public.daily_cosmos_pulse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  summary_date DATE NOT NULL UNIQUE,
  source_url TEXT,
  source_title TEXT,
  summary_md TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.daily_cosmos_pulse ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily cosmos pulse viewable by everyone"
ON public.daily_cosmos_pulse FOR SELECT
USING (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('glyphs', 'glyphs', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('testimony-media', 'testimony-media', true);

-- Storage policies
CREATE POLICY "Glyphs publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'glyphs');

CREATE POLICY "Authenticated can upload glyphs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'glyphs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own glyphs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'glyphs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Testimony media publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimony-media');

CREATE POLICY "Authenticated can upload testimony media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'testimony-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own testimony media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'testimony-media' AND auth.uid()::text = (storage.foldername(name))[1]);