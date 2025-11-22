"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Calendar, Plus } from "lucide-react";

export default function TeacherClassesPage() {
    const classes = [
        {
            name: "X MPLB 1",
            subject: "Dasar-dasar Manajemen Perkantoran",
            students: 32,
            schedule: "Senin & Selasa, 07:00 - 08:30",
            attendance: "95%",
            lastMeeting: "2023-11-20"
        },
        {
            name: "X MPLB 2",
            subject: "Dasar-dasar Manajemen Perkantoran",
            students: 30,
            schedule: "Selasa & Kamis, 08:30 - 10:00",
            attendance: "92%",
            lastMeeting: "2023-11-21"
        },
        {
            name: "XI MPLB 1",
            subject: "Korespondensi",
            students: 31,
            schedule: "Senin & Rabu, 10:15 - 11:45",
            attendance: "88%",
            lastMeeting: "2023-11-20"
        },
        {
            name: "XI MPLB 2",
            subject: "Kearsipan",
            students: 29,
            schedule: "Selasa & Kamis, 07:00 - 08:30",
            attendance: "90%",
            lastMeeting: "2023-11-21"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kelas Saya</h1>
                    <p className="text-muted-foreground">Kelola kelas yang Anda ampu</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Materi
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {classes.map((classItem, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{classItem.name}</CardTitle>
                                    <CardDescription className="mt-1">{classItem.subject}</CardDescription>
                                </div>
                                <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="mr-2 h-4 w-4" />
                                        Jumlah Siswa
                                    </div>
                                    <p className="text-2xl font-bold">{classItem.students}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Kehadiran
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">{classItem.attendance}</p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t">
                                <div className="flex items-center text-sm">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Jadwal:</span>
                                    <span className="ml-2 font-medium">{classItem.schedule}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="text-muted-foreground">Pertemuan Terakhir:</span>
                                    <span className="ml-2 font-medium">{classItem.lastMeeting}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-4">
                                <Button variant="outline" size="sm" asChild>
                                    <a href="/dashboard/teacher/attendance">Absensi</a>
                                </Button>
                                <Button variant="outline" size="sm">
                                    Input Nilai
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
