-- ============================================
-- SMK LPPM RI 2 - Complete Database Schema
-- School Management System with E-Voting
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE (All user types)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent', 'treasurer')),
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. STUDENTS TABLE
-- ============================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nis VARCHAR(20) UNIQUE NOT NULL,
  nisn VARCHAR(20) UNIQUE,
  class_id UUID,
  gender VARCHAR(10) CHECK (gender IN ('Laki-laki', 'Perempuan')),
  date_of_birth DATE,
  address TEXT,
  parent_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3. TEACHERS TABLE
-- ============================================
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nip VARCHAR(20) UNIQUE NOT NULL,
  subject_specialization VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 4. CLASSES TABLE
-- ============================================
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  grade_level INTEGER CHECK (grade_level IN (10, 11, 12)),
  homeroom_teacher_id UUID REFERENCES teachers(id),
  academic_year VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add foreign key to students table
ALTER TABLE students ADD CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES classes(id);

-- ============================================
-- 5. SUBJECTS TABLE
-- ============================================
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  kkm INTEGER DEFAULT 75 CHECK (kkm >= 0 AND kkm <= 100),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 6. TEACHER_SUBJECTS (Many-to-Many)
-- ============================================
CREATE TABLE teacher_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  UNIQUE(teacher_id, subject_id, class_id)
);

-- ============================================
-- 7. SCHEDULES TABLE
-- ============================================
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  day_of_week VARCHAR(10) CHECK (day_of_week IN ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 8. ASSIGNMENTS TABLE
-- ============================================
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  deadline TIMESTAMP NOT NULL,
  max_score INTEGER DEFAULT 100,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 9. SUBMISSIONS TABLE
-- ============================================
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  content TEXT,
  file_url VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT NOW(),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  feedback TEXT,
  UNIQUE(assignment_id, student_id)
);

-- ============================================
-- 10. GRADES TABLE
-- ============================================
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  semester INTEGER CHECK (semester IN (1, 2)),
  academic_year VARCHAR(20),
  midterm_score DECIMAL(5,2),
  final_score DECIMAL(5,2),
  assignment_score DECIMAL(5,2),
  total_score DECIMAL(5,2),
  grade VARCHAR(2),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, subject_id, semester, academic_year)
);

-- ============================================
-- 11. ATTENDANCE TABLE
-- ============================================
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Hadir', 'Sakit', 'Izin', 'Alpha')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- ============================================
-- 12. ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  target_audience VARCHAR(50)[] DEFAULT '{"all"}',
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  published_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 13. MATERIALS TABLE
-- ============================================
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_type VARCHAR(20) CHECK (file_type IN ('pdf', 'video', 'link', 'document')),
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 14. PAYMENTS TABLE (SPP)
-- ============================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  month VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'partial', 'paid')),
  payment_date TIMESTAMP,
  method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, month, year)
);

-- ============================================
-- 15. MESSAGES TABLE
-- ============================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  reply_to UUID REFERENCES messages(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 16. VOTING (E-Voting Polls)
-- ============================================
CREATE TABLE voting (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  eligible_voters VARCHAR(20)[] DEFAULT '{"student"}',
  security_level VARCHAR(20) DEFAULT 'high' CHECK (security_level IN ('standard', 'high', 'maximum')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 17. VOTING_OPTIONS TABLE
-- ============================================
CREATE TABLE voting_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voting_id UUID REFERENCES voting(id) ON DELETE CASCADE,
  option_text VARCHAR(200) NOT NULL,
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 18. VOTES TABLE (Vote Records)
-- ============================================
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voting_id UUID REFERENCES voting(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  option_id UUID REFERENCES voting_options(id) ON DELETE CASCADE,
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(voting_id, user_id)
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_teachers_user ON teachers(user_id);
CREATE INDEX idx_schedules_class ON schedules(class_id);
CREATE INDEX idx_assignments_class ON assignments(class_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_grades_student ON grades(student_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_messages_from ON messages(from_user_id);
CREATE INDEX idx_messages_to ON messages(to_user_id);
CREATE INDEX idx_votes_voting ON votes(voting_id);
CREATE INDEX idx_voting_options_voting ON voting_options(voting_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Public read access for authenticated users
CREATE POLICY "Allow authenticated read" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON students FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON teachers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON classes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON subjects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON schedules FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON announcements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read" ON materials FOR SELECT USING (auth.role() = 'authenticated');

-- Admin full access
CREATE POLICY "Admin full access" ON users FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON students FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON teachers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON classes FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON voting FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Students can view their own data
CREATE POLICY "Students view own data" ON grades FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Students view own attendance" ON attendance FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Students view own payments" ON payments FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Voting access
CREATE POLICY "Users can vote" ON votes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users view own votes" ON votes FOR SELECT USING (user_id = auth.uid());

-- ============================================
-- SAMPLE DATA  for Testing
-- ============================================

-- Insert default admin user (password: admin123 - hash this in production!)
INSERT INTO users (username, email, password_hash, role, full_name, phone) VALUES
('admin', 'admin@smk.sch.id', '$2a$10$hashhere', 'admin', 'Administrator', '08123456789'),
('guru01', 'guru01@smk.sch.id', '$2a$10$hashhere', 'teacher', 'Budi Santoso, S.Pd', '08123456790'),
('siswa01', 'siswa01@smk.sch.id', '$2a$10$hashhere', 'student', 'Siti Aminah', '08123456791'),
('wali01', 'wali01@smk.sch.id', '$2a$10$hashhere', 'parent', 'Ahmad Supriyadi', '08123456792'),
('bendahara', 'bendahara@smk.sch.id', '$2a$10$hashhere', 'treasurer', 'Tri Handayani, S.E', '08123456793');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment vote count
CREATE OR REPLACE FUNCTION increment_vote_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE voting_options 
    SET vote_count = vote_count + 1 
    WHERE id = NEW.option_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to increment vote count
CREATE TRIGGER increment_vote_count_trigger
AFTER INSERT ON votes
FOR EACH ROW EXECUTE FUNCTION increment_vote_count();

-- ============================================
-- END OF SCHEMA
-- ============================================

COMMENT ON DATABASE postgres IS 'SMK LPPM RI 2 School Management System Database';
