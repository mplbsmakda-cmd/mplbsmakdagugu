-- 4. Make sure the email in the 'users' table matches exactly the email used for Supabase Auth user creation for login to function correctly.
-- SQL to insert users into the 'users' table
-- Note: Passwords are managed separately in Supabase Auth system
-- Use Supabase Auth API or Dashboard to create users with passwords

-- Insert user data for each panel role
INSERT INTO users (id, username, email, password_hash, role, full_name) VALUES
  (gen_random_uuid(), 'admin', 'admin@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa8bIZFiVAI5R7CWQ1Fg1G4RN7AnY3eW', 'admin', 'Administrator'),
  (gen_random_uuid(), 'guru01', 'guru01@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa8bIZFiVAI5R7CWQ1Fg1G4RN7AnY3eW', 'teacher', 'Guru Satu'),
  (gen_random_uuid(), 'siswa01', 'siswa01@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa8bIZFiVAI5R7CWQ1Fg1G4RN7AnY3eW', 'student', 'Siswa Satu'),
  (gen_random_uuid(), 'wali01', 'wali01@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa8bIZFiVAI5R7CWQ1Fg1G4RN7AnY3eW', 'parent', 'Orang Tua Siswa Satu'),
  (gen_random_uuid(), 'treasurer01', 'treasurer01@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa8bIZFiVAI5R7CWQ1Fg1G4RN7AnY3eW', 'treasurer', 'Bendahara Satu')
ON CONFLICT (username) DO NOTHING;

-- Instructions:
-- 1. Gunakan Dashboard Supabase atau API Auth untuk membuat setiap pengguna dengan email dan password yang sama:
--    Contoh password untuk semua pengguna: 'password123'
-- 2. Menjalankan query SQL ini hanya menambahkan data pengguna ke tabel 'users' dan TIDAK membuat kredensial di Supabase Auth
-- 3. Untuk membuat pengguna dengan password di Supabase Auth, gunakan panel "Authentication" > "Users" di Dashboard Supabase atau
--    gunakan Supabase JavaScript client atau REST API dengan metode `auth.signUp()`.
