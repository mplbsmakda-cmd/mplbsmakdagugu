-- SQL to insert users into the 'users' table
-- Note: Passwords are managed separately in Supabase Auth system
-- Use Supabase Auth API or Dashboard to create users with passwords

-- Insert user data for each panel role
INSERT INTO users (id, username, email, role, full_name) VALUES
  ('1', 'admin', 'admin@example.com', 'admin', 'Administrator'),
  ('2', 'guru01', 'guru01@example.com', 'teacher', 'Guru Satu'),
  ('3', 'siswa01', 'siswa01@example.com', 'student', 'Siswa Satu'),
  ('4', 'wali01', 'wali01@example.com', 'parent', 'Orang Tua Siswa Satu'),
  ('5', 'treasurer01', 'treasurer01@example.com', 'treasurer', 'Bendahara Satu');

-- Instructions:
-- 1. Use the Supabase Dashboard or Supabase Auth API to create each user with the corresponding email and password:
--    Example password for all users: 'password123'
-- 2. Creating users via SQL only adds them to the 'users' table and does NOT create credentials in Supabase Auth
-- 3. To create users with passwords in Supabase Auth, use the Supabase Dashboard "Authentication" > "Users" panel or
--    use the Supabase JavaScript client or REST API with `auth.signUp()` method.
-- 4. Make sure the email in the 'users' table matches exactly the email used for Supabase Auth user creation for login to function correctly.
