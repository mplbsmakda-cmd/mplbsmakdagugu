"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Calendar, FileText, Award, BookOpen } from "lucide-react";
import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
    const gradeProgress = [
        { month: 'Jul', avg: 80 },
        { month: 'Aug', avg: 82 },
        { month: 'Sep', avg: 84 },
        { month: 'Okt', avg: 86 },
        { month: 'Nov', avg: 85 },
    ];

    const subjectGrades = [
        { subject: 'Matematika', nilai: 85 },
        { subject: 'B. Indonesia', nilai: 88 },
        { subject: 'B. Inggris', nilai: 82 },
        { subject: 'Otom. Perkantoran', nilai: 90 },
        { subject: 'Korespondensi', nilai: 87 },
    ];

    const attendanceData = [
        { month: 'Jul', percentage: 95 },
        { month: 'Aug', percentage: 97 },
        { month: 'Sep', percentage: 94 },
        { month: 'Okt', percentage: 96 },
        { month: 'Nov', percentage: 98 },
    ];

    const upcomingTasks = [
        { title: "Tugas Matematika Bab 5", deadline: "2023-11-24", subject: "Matematika", status: "Belum" },
        { title: "Essay Bahasa Indonesia", deadline: "2023-11-25", subject: "B. Indonesia", status: "Sudah" },
        { title: "Project Otomatisasi", deadline: "2023-11-28", subject: "Otom. Perkantoran", status: "Belum" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Siswa</h1>
                    <p className="text-muted-foreground">Selamat datang, Siti Aminah - X MPLB 1</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">85.5</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            Peringkat 5 dari 32
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">96.5%</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tugas Aktif</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">2 belum dikumpulkan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prestasi</CardTitle>
                        <Award className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Penghargaan diraih</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Grade Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Progress Nilai</CardTitle>
                        <CardDescription>Rata-rata per bulan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={gradeProgress}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[75, 90]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="avg"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Rata-rata Nilai"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Subject Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Nilai per Mata Pelajaran</CardTitle>
                        <CardDescription>Semester ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={subjectGrades} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="subject" type="category" width={100} />
                                <Tooltip />
                                <Bar dataKey="nilai" fill="#3b82f6" name="Nilai" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Tasks and Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Tugas Yang Akan Datang</CardTitle>
                        <CardDescription>Deadline terdekat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {upcomingTasks.map((task, i) => (
                                <div key={i} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{task.title}</p>
                                        <p className="text-xs text-muted-foreground">{task.subject}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Deadline: {new Date(task.deadline).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${task.status === "Sudah" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                        <CardDescription>Menu yang sering digunakan</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <a href="/dashboard/student/assignments" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Lihat Tugas</p>
                                <p className="text-xs text-muted-foreground">Kumpulkan tugas</p>
                            </div>
                        </a>
                        <a href="/dashboard/student/materials" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <BookOpen className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Materi Belajar</p>
                                <p className="text-xs text-muted-foreground">Download materi</p>
                            </div>
                        </a>
                        <a href="/dashboard/student/grades" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                                <GraduationCap className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Rapor Digital</p>
                                <p className="text-xs text-muted-foreground">Lihat nilai lengkap</p>
                            </div>
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
