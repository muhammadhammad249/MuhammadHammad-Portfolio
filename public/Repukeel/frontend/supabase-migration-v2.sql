-- ============================================================
-- RepuKeel Portal — Additional Migration
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Add contact_preference column to cases table
ALTER TABLE public.cases
  ADD COLUMN IF NOT EXISTS contact_preference TEXT DEFAULT NULL;

-- 2. Add email column to profiles table (for client directory visibility)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email TEXT DEFAULT NULL;

-- 3. Ensure password reset redirect URL is allowed in Supabase Auth settings
-- NOTE: In Supabase Dashboard > Authentication > URL Configuration,
-- add your site URL (e.g. https://repukeel.com) to Redirect URLs and
-- ensure https://repukeel.com/reset-password is listed.
