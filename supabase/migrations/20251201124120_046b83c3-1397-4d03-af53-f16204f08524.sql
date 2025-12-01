-- Create skills table for dynamic skill management
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create projects table for portfolio showcase
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_messages table for form submissions
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profile table for portfolio owner info
CREATE TABLE public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  email TEXT,
  whatsapp_number TEXT,
  cv_url TEXT,
  profile_image_url TEXT,
  hero_tagline TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Public read access for skills, projects, and profile (portfolio is public-facing)
CREATE POLICY "Anyone can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view profile"
  ON public.profile FOR SELECT
  USING (true);

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- Insert sample profile data
INSERT INTO public.profile (full_name, role, bio, hero_tagline)
VALUES (
  'Your Name',
  'Full Stack Developer',
  'Passionate developer with expertise in building modern web applications. I love creating elegant solutions to complex problems.',
  'Building the future, one line of code at a time'
);

-- Insert sample skills
INSERT INTO public.skills (name, category, percentage, display_order) VALUES
  ('React', 'Frontend', 90, 1),
  ('TypeScript', 'Frontend', 85, 2),
  ('Node.js', 'Backend', 80, 3),
  ('Python', 'Backend', 75, 4),
  ('PostgreSQL', 'Database', 80, 5),
  ('TailwindCSS', 'Frontend', 90, 6);

-- Insert sample projects
INSERT INTO public.projects (title, description, tech_stack, featured, display_order) VALUES
  (
    'E-Commerce Platform',
    'A full-featured online store with real-time inventory management and payment integration.',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    true,
    1
  ),
  (
    'Task Management App',
    'Collaborative task manager with real-time updates and team features.',
    ARRAY['React', 'Firebase', 'TailwindCSS'],
    true,
    2
  ),
  (
    'Portfolio Generator',
    'SaaS platform for creating professional portfolio websites.',
    ARRAY['Next.js', 'TypeScript', 'Supabase'],
    false,
    3
  );