"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, Users, FileText, TrendingUp, BookOpen, Award } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TeacherDashboard() {
    const scheduleToday = [
        { time: "07:00 - 08:30", class: "X MPLB 1", subject: "Otomatisasi Perkantoran", room: "Lab Komputer" },
        { time: "08:30 - 10:00", class: "XI MPLB 1", subject: "Korespondensi", room: "Ruang 201" },
        { time: "10:30 - 12:00", class: "X MPLB 2", subject: "Otomatisasi Perkantoran", room: "Lab Komputer" },
    ];

    const assignmentStats = [
        { class: 'X MPLB 1', submitted: 28, total: 32 },
        { class: 'X MPLB 2', submitted: 25, total: 30 },
        { class: 'XI MPLB 1', submitted: 29, total: 31 },
    ];

    const gradeProgress = [
        { week: 'W1', avg: 78 },
        { week: 'W2', avg: 80 },
        { week: 'W3', avg: 82 },
        { week: 'W4', avg: 85 },
        { week: 'W5', avg: 84 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Guru</h1>
                    <p className="text-muted-foreground">Selamat datang kembali, Budi Santoso, S.Pd</p>
                </div>
                <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Hari ini: Rabu, 22 Nov 2023</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kelas Diampu</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">93 total siswa</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tugas Aktif</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">2 deadline hari ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Kelas</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">84.5</div>
                        <p className="text-xs text-muted-foreground">+3.2 dari bulan lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pesan Baru</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <p className="text-xs text-muted-foreground">Dari orang tua siswa</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Assignment Submission Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status Pengumpulan Tugas</CardTitle>
                        <CardDescription>Per kelas yang diampu</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={assignmentStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="class" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="submitted" fill="#10b981" name="Sudah Mengumpulkan" />
                                <Bar dataKey="total" fill="#e5e7eb" name="Total Siswa" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Grade Progress Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trend Nilai 5 Minggu Terakhir</CardTitle>
                        <CardDescription>Rata-rata semua kelas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={gradeProgress}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis domain={[70, 90]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="avg"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Rata-rata"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Today's Schedule and Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Hari Ini</CardTitle>
                        <CardDescription>Rabu, 22 November 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {scheduleToday.map((schedule, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{schedule.time}</p>
                                        <p className="text-sm text-muted-foreground">{schedule.class} - {schedule.subject}</p>
                                        <p className="text-xs text-muted-foreground">{schedule.room}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                        <CardDescription>Fitur yang sering digunakan</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <a href="/dashboard/teacher/attendance" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Input Absensi</p>
                                <p className="text-xs text-muted-foreground">Catat kehadiran siswa</p>
                            </div>
                        </a>
                        <a href="/dashboard/teacher/assignments" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Kelola Tugas</p>
                                <p className="text-xs text-muted-foreground">Buat & cek tugas</p>
                            </div>
                        </a>
                        <a href="/dashboard/teacher/grades" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                                <BookOpen className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Input Nilai</p>
                                <p className="text-xs text-muted-foreground">Update nilai siswa</p>
                            </div>
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
