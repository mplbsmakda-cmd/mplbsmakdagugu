# 📚 Panduan Setup Database Supabase

## Langkah 1: Akses Supabase Dashboard

1. Buka browser dan kunjungi: https://supabase.com
2. Login dengan akun Anda
3. Pilih project Anda atau buat project baru

## Langkah 2: Jalankan Schema SQL

1. Di Supabase Dashboard, klik menu **SQL Editor** di sidebar kiri
2. Klik tombol **+ New query**
3. Copy seluruh isi file `database/schema.sql`
4. Paste ke SQL Editor
5. Klik tombol **Run** atau tekan `Ctrl+Enter`
6. Tunggu hingga selesai (semua table, indexes, dan policies akan dibuat)

**✅ Hasil**: 18 tables berhasil dibuat:
- users
- students, teachers
- classes, subjects, schedules
- assignments, submissions, grades
- attendance
- announcements, materials
- payments (SPP)
- messages
- voting, voting_options, votes

## Langkah 3: Jalankan Seed Data (Opsional)

1. Masih di SQL Editor, klik **+ New query** lagi
2. Copy seluruh isi file `database/seed.sql`
3. Paste ke SQL Editor
4. Klik **Run**

**✅ Hasil**: Data sample akan diisi:
- 9 users (admin, 2 guru, 3 siswa, 2 orang tua, 1 bendahara)
- 6 classes (X, XI, XII MPLB 1 & 2)
- 6 subjects
- Sample data untuk testing

## Langkah 4: Verifikasi Data

Jalankan query berikut untuk check:

```sql
-- Check users
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Check students
SELECT * FROM students;

-- Check voting
SELECT title, status FROM voting;

-- Check all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

## Langkah 5: Test Connection dari Next.js

File `src/lib/supabase.ts` sudah dibuat dengan konfigurasi:
- URL: https://svhqmofvcofqgnzbypph.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Test connection:
```typescript
import { supabase } from '@/lib/supabase';

// Test query
const { data, error } = await supabase
  .from('users')
  .select('*')
  .limit(5);

console.log('Users:', data);
```

## Credentials untuk Login (Seed Data)

| Role | Username | Password | Akses |
|------|----------|----------|-------|
| Admin | `admin` | `password123` | Full access |
| Teacher | `guru01` | `password123` | Teaching tools |
| Student | `siswa01` | `password123` | Learning |
| Parent | `wali01` | `password123` | Monitoring |
| Treasurer | `bendahara` | `password123` | Finance |

**⚠️ PENTING**: Dalam production, ganti password dengan hash bcrypt yang benar!

## Database Structure Overview

```
📦 Database (18 Tables)
├─ 👥 User Management
│  ├─ users (all user types)
│  ├─ students
│  └─ teachers
├─ 🏫 Academic
│  ├─ classes
│  ├─ subjects
│  ├─ teacher_subjects
│  └─ schedules
├─ 📚 Learning
│  ├─ assignments
│  ├─ submissions
│  ├─ grades
│  ├─ attendance
│  └─ materials
├─ 📢 Communication
│  ├─ announcements
│  └─ messages
├─ 💰 Finance
│  └─ payments
└─ 🗳️ E-Voting
   ├─ voting
   ├─ voting_options
   └─ votes
```

## Troubleshooting

### Error: "relation already exists"
- Tables sudah ada. Hapus dulu atau skip create table

### Error: "permission denied"
- Check RLS policies
- Pastikan menggunakan service_role key untuk admin operations

### Tidak bisa insert data
- Disable RLS sementara untuk testing:
```sql
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

## Next Steps

1. ✅ Schema created
2. ✅ Seed data inserted
3. ⏳ Connect Next.js pages to database
4. ⏳ Implement authentication
5. ⏳ Test all features

---

**Status**: Database siap digunakan! 🎉
