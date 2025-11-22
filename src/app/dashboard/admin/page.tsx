"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, School, Bell, TrendingUp, Loader2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAdminStats, getAttendanceTrend } from "@/lib/queries";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0, totalClasses: 0, totalAnnouncements: 0 });
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [statsData, attendanceDataRes] = await Promise.all([
                getAdminStats(),
                getAttendanceTrend(5)
            ]);
            setStats(statsData);
            setAttendanceData(attendanceDataRes);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const gradeDistribution = [
        { name: 'A', value: 45, color: '#10b981' },
        { name: 'B', value: 68, color: '#3b82f6' },
        { name: 'C', value: 52, color: '#f59e0b' },
        { name: 'D', value: 21, color: '#ef4444' },
    ];

    const classPerformance = [
        { class: 'X MPLB 1', avg: 85 },
        { class: 'X MPLB 2', avg: 82 },
        { class: 'XI MPLB 1', avg: 87 },
        { class: 'XI MPLB 2', avg: 84 },
        { class: 'XII MPLB 1', avg: 89 },
        { class: 'XII MPLB 2', avg: 86 },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
                    <p className="text-muted-foreground">Selamat datang! Berikut ringkasan sistem hari ini</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                    <p className="font-medium">Tahun Ajaran 2023/2024</p>
                    <p>Semester Ganjil</p>
                </div>
            </div>

            {/* Stats Cards - Real Data from Supabase */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">Dari database</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalTeachers}</div>
                        <p className="text-xs text-muted-foreground">Aktif mengajar</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
                        <School className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalClasses}</div>
                        <p className="text-xs text-muted-foreground">6 rombongan belajar</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pengumuman</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalAnnouncements}</div>
                        <p className="text-xs text-muted-foreground">Pengumuman aktif</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Attendance Trend - Real Data */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trend Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {attendanceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[80, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} name="%" />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                                Tidak ada data kehadiran
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Grade Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Distribusi Nilai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={gradeDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {gradeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Class Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Performa Kelas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={classPerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="class" tick={{ fontSize: 10 }} />
                                <YAxis domain={[75, 95]} />
                                <Tooltip />
                                <Bar dataKey="avg" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
