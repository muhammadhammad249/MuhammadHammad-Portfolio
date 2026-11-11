-- ============================================================
-- RepuKeel Portal — Supabase SQL Migration
-- Run this entire file in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────
-- 1. PROFILES (extends auth.users)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin', 'super_admin')),
  full_name  TEXT,
  whatsapp   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Auto-insert profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'client'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────
-- 2. CASES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cases (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id           TEXT UNIQUE NOT NULL,
  client_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assigned_admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  service_type      TEXT NOT NULL,
  platform          TEXT,
  description       TEXT,
  urls              TEXT[],
  urgency           TEXT DEFAULT 'normal',
  status            TEXT NOT NULL DEFAULT 'submitted',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Client: only own cases
CREATE POLICY "cases_client_own" ON public.cases
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "cases_client_insert" ON public.cases
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Client: can delete their OWN case only
CREATE POLICY "cases_client_delete_own" ON public.cases
  FOR DELETE USING (auth.uid() = client_id);

-- Admin: all cases
CREATE POLICY "cases_admin_all" ON public.cases
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ─────────────────────────────────────────────
-- 3. CASE UPDATES (Timeline)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.case_updates (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id        UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  admin_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status         TEXT NOT NULL,
  note           TEXT,
  internal_note  TEXT,
  notify_client  BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.case_updates ENABLE ROW LEVEL SECURITY;

-- Client: can see updates for own cases (excluding internal_note)
CREATE POLICY "updates_client_own" ON public.case_updates
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.cases WHERE public.cases.id = public.case_updates.case_id AND client_id = auth.uid())
  );

-- Admin: all
CREATE POLICY "updates_admin_all" ON public.case_updates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ─────────────────────────────────────────────
-- 4. MESSAGES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id     UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_client_own" ON public.messages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cases WHERE public.cases.id = public.messages.case_id AND client_id = auth.uid())
    OR sender_id = auth.uid()
  );

CREATE POLICY "messages_admin_all" ON public.messages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ─────────────────────────────────────────────
-- 5. INVOICES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.invoices (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id            UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  amount             NUMERIC(10,2),
  currency           TEXT DEFAULT 'USD',
  payment_method     TEXT,
  payment_reference  TEXT,
  receipt_url        TEXT,
  status             TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'confirmed')),
  notes              TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invoices_client_own" ON public.invoices
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.cases WHERE public.cases.id = public.invoices.case_id AND client_id = auth.uid())
  );

CREATE POLICY "invoices_client_update" ON public.invoices
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.cases WHERE public.cases.id = public.invoices.case_id AND client_id = auth.uid())
  );

CREATE POLICY "invoices_admin_all" ON public.invoices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ─────────────────────────────────────────────
-- 6. FILES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.case_files (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id       UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  uploader_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name     TEXT NOT NULL,
  storage_path  TEXT NOT NULL,
  file_type     TEXT,
  is_final_report BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.case_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "files_client_own" ON public.case_files
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cases WHERE public.cases.id = public.case_files.case_id AND client_id = auth.uid())
  );

CREATE POLICY "files_admin_all" ON public.case_files
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ─────────────────────────────────────────────
-- 7. ACTIVITY LOG (super admin only)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activity_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  target_type TEXT,
  target_id   UUID,
  details     JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "log_super_admin" ON public.activity_log
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- ─────────────────────────────────────────────
-- Storage buckets (run separately in Storage tab or API)
-- ─────────────────────────────────────────────
-- INSERT INTO storage.buckets (id, name, public) VALUES ('case-files', 'case-files', false);

-- ─────────────────────────────────────────────
-- 8. AUTOMATIC PROFILE CREATION TRIGGER
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, whatsapp, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Client'), 
    new.raw_user_meta_data->>'whatsapp', 
    'super_admin' -- Defaulting to super_admin for the owner
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Fix any existing users by adding them to profiles
INSERT INTO public.profiles (id, full_name, role)
SELECT id, 'Admin', 'super_admin' 
FROM auth.users
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';

