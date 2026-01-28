-- Phase 1: Decouple products from auth.users for Content Machine
-- This allows products to be inserted by the pipeline without a specific user_id

-- 1. Make user_id nullable and remove the foreign key constraint to auth.users
ALTER TABLE public.products ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.products DROP CONSTRAINT products_user_id_fkey;

-- 2. Simplify products table - remove user-specific metadata that should be in a separate profile or not tracked at all for AI-seeded content
-- We keep them as nullable for now to avoid breaking existing queries, but the machine won't use them.
ALTER TABLE public.products ALTER COLUMN full_name DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN email DROP NOT NULL;

-- 3. Update Policies to allow anonymous/public insertion for the "Suggest" feature
-- while keeping the admin role for approval.
DROP POLICY IF EXISTS "Can insert own products" ON public.products;
CREATE POLICY "Anyone can suggest a product" ON public.products FOR INSERT
  WITH CHECK (true);

-- 4. Create a simple profiles table for Admins only
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5. Flatten Bookmarks: Transition strategy from DB to LocalStorage will happen in UI, 
-- but we keep the table for now to avoid breaking types.
ALTER TABLE public.bookmarks ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.bookmarks DROP CONSTRAINT bookmarks_user_id_fkey;
