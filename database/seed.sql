-- ============================================
-- SEED DATA for SMK LPPM RI 2
-- Sample data untuk testing sistem
-- ============================================

-- Clear existing data (optional, for fresh start)
TRUNCATE TABLE votes, voting_options, voting, messages, payments, materials, announcements, attendance, grades, submissions, assignments, schedules, teacher_subjects, subjects, classes, teachers, students, users CASCADE;

-- ============================================
-- 1. INSERT USERS
-- ============================================
-- Password untuk semua user: "password123" (hash ini hanya contoh, gunakan bcrypt yang benar di production)
INSERT INTO users (id, username, email, password_hash, role, full_name, phone) VALUES
('a1111111-1111-1111-1111-111111111111', 'admin', 'admin@smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'admin', 'Administrator SMK', '081234567890'),
('b2222222-2222-2222-2222-222222222222', 'guru01', 'budi.santoso@smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'teacher', 'Budi Santoso, S.Pd', '081234567891'),
('b2222222-2222-2222-2222-222222222223', 'guru02', 'dewi.lestari@smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'teacher', 'Dewi Lestari, S.Pd', '081234567892'),
('c3333333-3333-3333-3333-333333333333', 'siswa01', 'siti.aminah@student.smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'student', 'Siti Aminah', '081234567893'),
('c3333333-3333-3333-3333-333333333334', 'siswa02', 'ahmad.fauzi@student.smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'student', 'Ahmad Fauzi', '081234567894'),
('c3333333-3333-3333-3333-333333333335', 'siswa03', 'rina.kusuma@student.smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'student', 'Rina Kusuma Dewi', '081234567895'),
('d4444444-4444-4444-4444-444444444444', 'wali01', 'ahmad.supriyadi@gmail.com', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'parent', 'Ahmad Supriyadi', '081234567896'),
('d4444444-4444-4444-4444-444444444445', 'wali02', 'slamet.riyadi@gmail.com', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'parent', 'Slamet Riyadi', '081234567897'),
('e5555555-5555-5555-5555-555555555555', 'bendahara', 'bendahara@smk.sch.id', '$2a$10$XQz8ZqvJKqvYmZ1YKqvYmZ', 'treasurer', 'Tri Handayani, S.E', '081234567898');

-- ============================================
-- 2. INSERT CLASSES
-- ============================================
INSERT INTO classes (id, name, grade_level, academic_year) VALUES
('f1111111-1111-1111-1111-111111111111', 'X MPLB 1', 10, '2023/2024'),
('f1111111-1111-1111-1111-111111111112', 'X MPLB 2', 10, '2023/2024'),
('f1111111-1111-1111-1111-111111111113', 'XI MPLB 1', 11, '2023/2024'),
('f1111111-1111-1111-1111-111111111114', 'XI MPLB 2', 11, '2023/2024'),
('f1111111-1111-1111-1111-111111111115', 'XII MPLB 1', 12, '2023/2024'),
('f1111111-1111-1111-1111-111111111116', 'XII MPLB 2', 12, '2023/2024');

-- ============================================
-- 3. INSERT TEACHERS
-- ============================================
INSERT INTO teachers (id, user_id, nip, subject_specialization) VALUES
('a1a1a1a1-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222', '198501012010011001', 'Otomatisasi Perkantoran'),
('a1a1a1a1-1111-1111-1111-111111111112', 'b2222222-2222-2222-2222-222222222223', '198702022012012001', 'Bahasa Indonesia');

-- Update classes with homeroom teachers
UPDATE classes SET homeroom_teacher_id = 'a1a1a1a1-1111-1111-1111-111111111111' WHERE id = 'f1111111-1111-1111-1111-111111111111';
UPDATE classes SET homeroom_teacher_id = 'a1a1a1a1-1111-1111-1111-111111111112' WHERE id = 'f1111111-1111-1111-1111-111111111113';

-- ============================================
-- 4. INSERT STUDENTS
-- ============================================
INSERT INTO students (id, user_id, nis, nisn, class_id, gender, date_of_birth, address, parent_id) VALUES
('b1b1b1b1-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', '2023001', '0012345678', 'f1111111-1111-1111-1111-111111111111', 'Perempuan', '2008-05-15', 'Jl. Merdeka No. 10, Kedungreja', 'd4444444-4444-4444-4444-444444444444'),
('b1b1b1b1-1111-1111-1111-111111111112', 'c3333333-3333-3333-3333-333333333334', '2023002', '0012345679', 'f1111111-1111-1111-1111-111111111111', 'Laki-laki', '2008-03-20', 'Jl. Sudirman No. 25, Kedungreja', 'd4444444-4444-4444-4444-444444444445'),
('b1b1b1b1-1111-1111-1111-111111111113', 'c3333333-3333-3333-3333-333333333335', '2023003', '0012345680', 'f1111111-1111-1111-1111-111111111112', 'Perempuan', '2008-07-10', 'Jl. Gatot Subroto No. 5, Kedungreja', 'd4444444-4444-4444-4444-444444444445');

-- ============================================
-- 5. INSERT SUBJECTS
-- ============================================
INSERT INTO subjects (id, name, code, kkm, description) VALUES
('c1c1c1c1-1111-1111-1111-111111111111', 'Matematika', 'MAT', 75, 'Matematika Wajib'),
('c1c1c1c1-1111-1111-1111-111111111112', 'Bahasa Indonesia', 'BIND', 75, 'Bahasa Indonesia Wajib'),
('c1c1c1c1-1111-1111-1111-111111111113', 'Bahasa Inggris', 'BING', 75, 'Bahasa Inggris Wajib'),
('c1c1c1c1-1111-1111-1111-111111111114', 'Otomatisasi Perkantoran', 'OTP', 78, 'Produktif Kejuruan MPLB'),
('c1c1c1c1-1111-1111-1111-111111111115', 'Korespondensi', 'KOR', 78, 'Produktif Kejuruan MPLB'),
('c1c1c1c1-1111-1111-1111-111111111116', 'Administrasi Umum', 'ADM', 75, 'Produktif Kejuruan MPLB');

-- ============================================
-- 6. INSERT TEACHER-SUBJECT RELATIONSHIPS
-- ============================================
INSERT INTO teacher_subjects (teacher_id, subject_id, class_id) VALUES
('a1a1a1a1-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111114', 'f1111111-1111-1111-1111-111111111111'),
('a1a1a1a1-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111114', 'f1111111-1111-1111-1111-111111111112'),
('a1a1a1a1-1111-1111-1111-111111111112', 'c1c1c1c1-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111111'),
('a1a1a1a1-1111-1111-1111-111111111112', 'c1c1c1c1-1111-1111-1111-111111111115', 'f1111111-1111-1111-1111-111111111113');

-- ============================================
-- 7. INSERT SCHEDULES
-- ============================================
INSERT INTO schedules (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room) VALUES
('f1111111-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111114', 'a1a1a1a1-1111-1111-1111-111111111111', 'Senin', '07:00', '08:30', 'Lab Komputer 1'),
('f1111111-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111112', 'a1a1a1a1-1111-1111-1111-111111111112', 'Senin', '08:30', '10:00', 'Ruang 201'),
('f1111111-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111111', 'a1a1a1a1-1111-1111-1111-111111111111', 'Selasa', '07:00', '08:30', 'Ruang 201'),
('f1111111-1111-1111-1111-111111111112', 'c1c1c1c1-1111-1111-1111-111111111114', 'a1a1a1a1-1111-1111-1111-111111111111', 'Rabu', '07:00', '08:30', 'Lab Komputer 1');

-- ============================================
-- 8. INSERT ANNOUNCEMENTS
-- ============================================
INSERT INTO announcements (title, content, author_id, target_audience, priority) VALUES
('Libur Semester Ganjil', 'Libur semester ganjil akan dimulai tanggal 20 Desember 2023 sampai 5 Januari 2024.', 'a1111111-1111-1111-1111-111111111111', ARRAY['all'], 'high'),
('Pembayaran SPP November', 'Diingatkan kepada siswa untuk segera melunasi SPP bulan November paling lambat tanggal 10 November 2023.', 'e5555555-5555-5555-5555-555555555555', ARRAY['student', 'parent'], 'normal'),
('Rapat Guru', 'Rapat koordinasi guru akan dilaksanakan pada hari Jumat, 25 November 2023 pukul 13.00 WIB.', 'a1111111-1111-1111-1111-111111111111', ARRAY['teacher'], 'normal');

-- ============================================
-- 9. INSERT ASSIGNMENTS
-- ============================================
INSERT INTO assignments (id, teacher_id, class_id, subject_id, title, description, deadline, max_score, status) VALUES
('d1d1d1d1-1111-1111-1111-111111111111', 'a1a1a1a1-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111114', 'Tugas Membuat Surat Resmi', 'Buatlah surat resmi dengan format yang benar menggunakan Microsoft Word', '2023-11-30 23:59:00', 100, 'published'),
('d1d1d1d1-1111-1111-1111-111111111112', 'a1a1a1a1-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111112', 'Essay Bahasa Indonesia', 'Tulislah essay dengan tema Pendidikan minimal 500 kata', '2023-12-05 23:59:00', 100, 'published');

-- ============================================
-- 10. INSERT ATTENDANCE
-- ============================================
INSERT INTO attendance (student_id, class_id, date, status) VALUES
('b1b1b1b1-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', '2023-11-20', 'Hadir'),
('b1b1b1b1-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111111', '2023-11-20', 'Hadir'),
('b1b1b1b1-1111-1111-1111-111111111113', 'f1111111-1111-1111-1111-111111111112', '2023-11-20', 'Hadir'),
('b1b1b1b1-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', '2023-11-21', 'Hadir'),
('b1b1b1b1-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111111', '2023-11-21', 'Sakit'),
('b1b1b1b1-1111-1111-1111-111111111113', 'f1111111-1111-1111-1111-111111111112', '2023-11-21', 'Hadir');

-- ============================================
-- 11. INSERT GRADES
-- ============================================
INSERT INTO grades (student_id, subject_id, semester, academic_year, midterm_score, final_score, assignment_score, total_score, grade) VALUES
('b1b1b1b1-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111114', 1, '2023/2024', 85, 88, 90, 87.67, 'A'),
('b1b1b1b1-1111-1111-1111-111111111111', 'c1c1c1c1-1111-1111-1111-111111111112', 1, '2023/2024', 80, 82, 85, 82.33, 'B'),
('b1b1b1b1-1111-1111-1111-111111111112', 'c1c1c1c1-1111-1111-1111-111111111114', 1, '2023/2024', 78, 80, 85, 81.00, 'B'),
('b1b1b1b1-1111-1111-1111-111111111112', 'c1c1c1c1-1111-1111-1111-111111111112', 1, '2023/2024', 88, 90, 92, 90.00, 'A');

-- ============================================
-- 12. INSERT PAYMENTS (SPP)
-- ============================================
INSERT INTO payments (student_id, amount, month, year, status, payment_date, method) VALUES
('b1b1b1b1-1111-1111-1111-111111111111', 750000, 'Oktober', 2023, 'paid', '2023-10-05 10:30:00', 'Transfer Bank'),
('b1b1b1b1-1111-1111-1111-111111111111', 750000, 'November', 2023, 'paid', '2023-11-03 09:15:00', 'Tunai'),
('b1b1b1b1-1111-1111-1111-111111111112', 750000, 'Oktober', 2023, 'paid', '2023-10-10 14:20:00', 'Transfer Bank'),
('b1b1b1b1-1111-1111-1111-111111111112', 750000, 'November', 2023, 'unpaid', NULL, NULL),
('b1b1b1b1-1111-1111-1111-111111111113', 750000, 'Oktober', 2023, 'partial', '2023-10-15 11:00:00', 'Tunai'),
('b1b1b1b1-1111-1111-1111-111111111113', 750000, 'November', 2023, 'unpaid', NULL, NULL);

-- ============================================
-- 13. INSERT MATERIALS
-- ============================================
INSERT INTO materials (subject_id, teacher_id, title, description, file_type, file_url) VALUES
('c1c1c1c1-1111-1111-1111-111111111114', 'a1a1a1a1-1111-1111-1111-111111111111', 'Modul Microsoft Word Dasar', 'Modul pembelajaran Microsoft Word untuk pemula', 'pdf', 'https://example.com/modul-word.pdf'),
('c1c1c1c1-1111-1111-1111-111111111114', 'a1a1a1a1-1111-1111-1111-111111111111', 'Video Tutorial Excel', 'Video tutorial Microsoft Excel lengkap', 'video', 'https://youtube.com/watch?v=example'),
('c1c1c1c1-1111-1111-1111-111111111112', 'a1a1a1a1-1111-1111-1111-111111111112', 'Materi Teks Prosedur', 'Materi lengkap tentang teks prosedur', 'pdf', 'https://example.com/teks-prosedur.pdf');

-- ============================================
-- 14. INSERT MESSAGES
-- ============================================
INSERT INTO messages (from_user_id, to_user_id, subject, message, status) VALUES
('d4444444-4444-4444-4444-444444444444', 'b2222222-2222-2222-2222-222222222222', 'Konsultasi Nilai', 'Selamat pagi Pak, saya ingin konsultasi tentang nilai anak saya.', 'replied'),
('d4444444-4444-4444-4444-444444444445', 'e5555555-5555-5555-5555-555555555555', 'Pertanyaan SPP', 'Bu, bagaimana cara pembayaran SPP secara online?', 'read');

-- ============================================
-- 15. INSERT VOTING (E-Voting)
-- ============================================
INSERT INTO voting (id, title, description, start_date, end_date, status, eligible_voters, security_level, created_by) VALUES
('e1e1e1e1-1111-1111-1111-111111111111', 'Pemilihan Ketua OSIS 2024', 'Pemilihan ketua OSIS periode 2024-2025', '2023-12-01 00:00:00', '2023-12-15 23:59:00', 'active', ARRAY['student'], 'maximum', 'a1111111-1111-1111-1111-111111111111'),
('e1e1e1e1-1111-1111-1111-111111111112', 'Voting Destinasi Study Tour', 'Pilih destinasi study tour tahun ini', '2023-11-20 00:00:00', '2023-11-30 23:59:00', 'closed', ARRAY['student', 'teacher'], 'high', 'a1111111-1111-1111-1111-111111111111');

-- ============================================
-- 16. INSERT VOTING OPTIONS
-- ============================================
INSERT INTO voting_options (voting_id, option_text, vote_count) VALUES
('e1e1e1e1-1111-1111-1111-111111111111', 'Calon 1 - Ahmad Fauzi (XI MPLB 1)', 0),
('e1e1e1e1-1111-1111-1111-111111111111', 'Calon 2 - Siti Aminah (XI MPLB 2)', 0),
('e1e1e1e1-1111-1111-1111-111111111111', 'Calon 3 - Budi Santoso (XII MPLB 1)', 0),
('e1e1e1e1-1111-1111-1111-111111111112', 'Bali', 89),
('e1e1e1e1-1111-1111-1111-111111111112', 'Yogyakarta', 56),
('e1e1e1e1-1111-1111-1111-111111111112', 'Bandung', 34);

-- ============================================
-- VERIFY DATA
-- ============================================
SELECT 'Users inserted:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Students inserted:', COUNT(*) FROM students
UNION ALL
SELECT 'Teachers inserted:', COUNT(*) FROM teachers
UNION ALL
SELECT 'Classes inserted:', COUNT(*) FROM classes
UNION ALL
SELECT 'Subjects inserted:', COUNT(*) FROM subjects
UNION ALL
SELECT 'Schedules inserted:', COUNT(*) FROM schedules
UNION ALL
SELECT 'Announcements inserted:', COUNT(*) FROM announcements
UNION ALL
SELECT 'Assignments inserted:', COUNT(*) FROM assignments
UNION ALL
SELECT 'Attendance records:', COUNT(*) FROM attendance
UNION ALL
SELECT 'Grades inserted:', COUNT(*) FROM grades
UNION ALL
SELECT 'Payments inserted:', COUNT(*) FROM payments
UNION ALL
SELECT 'Materials inserted:', COUNT(*) FROM materials
UNION ALL
SELECT 'Messages inserted:', COUNT(*) FROM messages
UNION ALL
SELECT 'Voting polls:', COUNT(*) FROM voting
UNION ALL
SELECT 'Voting options:', COUNT(*) FROM voting_options;
