--=== =========================================
-- CREATE SUPABASE AUTH USERS
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================

-- IMPORTANT: This creates users in Supabase Auth system
-- These users can then login with email + password

-- Note: Supabase Auth uses its own auth.users table
-- We're linking them to our public.users table via email

-- ============================================
-- CREATE AUTH USERS
-- ============================================
-- Password: password123 for all users

-- 1. Admin
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  'a1111111-1111-1111-1111-111111111111',
  'admin@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Administrator SMK"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Teacher 1
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  'b2222222-2222-2222-2222-222222222222',
  'budi.santoso@smk.sch.id',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Budi Santoso, S.Pd"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Student 1
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  'c3333333-3333-3333-3333-333333333333',
  'siti.aminah@student.smk.sch.id',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Siti Aminah"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Parent 1
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  'd4444444-4444-4444-4444-444444444444',
  'ahmad.supriyadi@gmail.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Ahmad Supriyadi"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- 5. Treasurer
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  'e5555555-5555-5555-5555-555555555555',
  'bendahara@smk.sch.id',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Tri Handayani, S.E"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFY AUTH USERS CREATED
-- ============================================
SELECT 
  email,
  email_confirmed_at IS NOT NULL as confirmed,
  created_at
FROM auth.users
ORDER BY email;

-- ============================================
-- LINK CHECK: Ensure auth.users email matches public.users email
-- ============================================
SELECT 
  au.email as auth_email,
  pu.email as users_email,
  pu.role,
  pu.full_name
FROM auth.users au
LEFT JOIN public.users pu ON au.email = pu.email
ORDER BY au.email;
