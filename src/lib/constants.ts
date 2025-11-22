import { LayoutDashboard, Users, BookOpen, Calendar, FileText, Settings, GraduationCap, ClipboardList, Bell, UserCircle } from 'lucide-react';

export const NAV_ITEMS = {
  admin: [
    { title: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { title: 'Manajemen User', href: '/dashboard/admin/users', icon: Users },
    { title: 'Pengaturan Sistem', href: '/dashboard/admin/settings', icon: Settings },
  ],
  teacher: [
    { title: 'Dashboard', href: '/dashboard/teacher', icon: LayoutDashboard },
    { title: 'Jadwal Mengajar', href: '/dashboard/teacher/schedule', icon: Calendar },
    { title: 'Input Nilai', href: '/dashboard/teacher/grades', icon: FileText },
    { title: 'Absensi Siswa', href: '/dashboard/teacher/attendance', icon: ClipboardList },
  ],
  student: [
    { title: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
    { title: 'Jadwal Pelajaran', href: '/dashboard/student/schedule', icon: Calendar },
    { title: 'Nilai & Rapor', href: '/dashboard/student/grades', icon: GraduationCap },
    { title: 'Materi Pelajaran', href: '/dashboard/student/materials', icon: BookOpen },
  ],
  parent: [
    { title: 'Dashboard', href: '/dashboard/parent', icon: LayoutDashboard },
    { title: 'Monitoring Absensi', href: '/dashboard/parent/attendance', icon: ClipboardList },
    { title: 'Lihat Nilai', href: '/dashboard/parent/grades', icon: GraduationCap },
    { title: 'Pengumuman', href: '/dashboard/parent/announcements', icon: Bell },
  ],
};
