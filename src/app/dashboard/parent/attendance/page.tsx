"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

export default function ParentAttendancePage() {
    const attendanceData = {
        studentName: "Siti Aminah",
        class: "X MPLB 1",
        totalDays: 90,
        present: 85,
        absent: 3,
        late: 2,
        percentage: 94.4
    };

    const recentAttendance = [
        { date: "2023-11-20", status: "Hadir", time: "06:55", note: "-" },
        { date: "2023-11-21", status: "Hadir", time: "07:02", note: "-" },
        { date: "2023-11-22", status: "Hadir", time: "06:58", note: "-" },
        { date: "2023-11-23", status: "Terlambat", time: "07:15", note: "Macet" },
        { date: "2023-11-24", status: "Hadir", time: "06:52", note: "-" },
    ];

    const monthlyStats = [
        { month: "September", present: 20, absent: 0, late: 0, percentage: 100 },
        { month: "Oktober", present: 18, absent: 2, late: 1, percentage: 85.7 },
        { month: "November", present: 17, absent: 1, late: 1, percentage: 89.5 },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Hadir":
                return <Badge className="bg-green-100 text-green-800">Hadir</Badge>;
            case "Terlambat":
                return <Badge className="bg-yellow-100 text-yellow-800">Terlambat</Badge>;
            case "Sakit":
                return <Badge className="bg-blue-100 text-blue-800">Sakit</Badge>;
            case "Izin":
                return <Badge className="bg-purple-100 text-purple-800">Izin</Badge>;
            case "Alpha":
                return <Badge className="bg-red-100 text-red-800">Alpha</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Monitoring Absensi</h1>
                <p className="text-muted-foreground">{attendanceData.studentName} - {attendanceData.class}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Hari</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{attendanceData.totalDays}</div>
                        <p className="text-xs text-muted-foreground">Hari efektif</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hadir</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{attendanceData.present}</div>
                        <p className="text-xs text-muted-foreground">Hari</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tidak Hadir</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{attendanceData.absent}</div>
                        <p className="text-xs text-muted-foreground">Hari</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Persentase</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{attendanceData.percentage}%</div>
                        <p className="text-xs text-muted-foreground">Kehadiran</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Absensi 5 Hari Terakhir</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentAttendance.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                                <div className="flex items-center gap-4">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{item.date}</p>
                                        <p className="text-sm text-muted-foreground">Jam Masuk: {item.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {item.note !== "-" && (
                                        <span className="text-sm text-muted-foreground italic">{item.note}</span>
                                    )}
                                    {getStatusBadge(item.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Statistik Bulanan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {monthlyStats.map((stat, index) => (
                            <div key={index} className="p-4 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">{stat.month} 2023</h4>
                                    <Badge variant={stat.percentage >= 90 ? "default" : "outline"}>
                                        {stat.percentage}% Kehadiran
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Hadir: </span>
                                        <span className="font-medium text-green-600">{stat.present}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Tidak Hadir: </span>
                                        <span className="font-medium text-red-600">{stat.absent}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Terlambat: </span>
                                        <span className="font-medium text-yellow-600">{stat.late}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
