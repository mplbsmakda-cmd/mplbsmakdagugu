"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Calendar, TrendingUp, FileText, DollarSign, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ParentDashboard() {
    const childGrades = [
        { month: 'Jul', avg: 80 },
        { month: 'Aug', avg: 82 },
        { month: 'Sep', avg: 84 },
        { month: 'Okt', avg: 86 },
        { month: 'Nov', avg: 85 },
    ];

    const attendanceData = [
        { month: 'Jul', percentage: 95 },
        { month: 'Aug', percentage: 97 },
        { month: 'Sep', percentage: 94 },
        { month: 'Okt', percentage: 96 },
        { month: 'Nov', percentage: 98 },
    ];

    const recentAttendance = [
        { date: "2023-11-22", day: "Rabu", status: "Hadir" },
        { date: "2023-11-21", day: "Selasa", status: "Hadir" },
        { date: "2023-11-20", day: "Senin", status: "Hadir" },
        { date: "2023-11-17", day: "Jumat", status: "Hadir" },
        { date: "2023-11-16", day: "Kamis", status: "Hadir" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Orang Tua</h1>
                    <p className="text-muted-foreground">Monitoring perkembangan Siti Aminah (X MPLB 1)</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
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
                        <CardTitle className="text-sm font-medium">Pembayaran SPP</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Lunas</div>
                        <p className="text-xs text-muted-foreground">November 2023</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prestasi</CardTitle>
                        <Award className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Penghargaan</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Grade Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trend Nilai Anak</CardTitle>
                        <CardDescription>5 bulan terakhir</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={childGrades}>
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

                {/* Attendance Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trend Kehadiran</CardTitle>
                        <CardDescription>5 bulan terakhir</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[90, 100]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="percentage" fill="#3b82f6" name="Kehadiran (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Attendance and Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Kehadiran 5 Hari Terakhir</CardTitle>
                        <CardDescription>Status absensi terbaru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentAttendance.map((attendance, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">{attendance.day}, {new Date(attendance.date).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-700">
                                        {attendance.status}
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
                        <a href="/dashboard/parent/student-profile" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Profil Anak</p>
                                <p className="text-xs text-muted-foreground">Lihat profil lengkap</p>
                            </div>
                        </a>
                        <a href="/dashboard/parent/grades" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Nilai Anak</p>
                                <p className="text-xs text-muted-foreground">Lihat rapor digital</p>
                            </div>
                        </a>
                        <a href="/dashboard/parent/messages" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                                <FileText className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Pesan Guru</p>
                                <p className="text-xs text-muted-foreground">Komunikasi dengan guru</p>
                            </div>
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
