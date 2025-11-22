"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen, GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Siswa</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">100%</div>
                        <p className="text-xs text-muted-foreground">Bulan ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tugas</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Belum dikumpulkan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85.5</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Jadwal Besok</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4 Mapel</div>
                        <p className="text-xs text-muted-foreground">Mulai 07:00</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Pelajaran Hari Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: "07:00 - 08:30", subject: "Dasar Manajemen", teacher: "Bpk. Budi" },
                                { time: "08:45 - 10:15", subject: "Bahasa Inggris", teacher: "Ibu Siti" },
                                { time: "10:30 - 12:00", subject: "Teknologi Perkantoran", teacher: "Bpk. Agus" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{item.subject}</p>
                                        <p className="text-sm text-muted-foreground">{item.teacher}</p>
                                    </div>
                                    <div className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                                        {item.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tugas Tertunda</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Makalah Kearsipan", due: "Besok, 23:59", subject: "Kearsipan" },
                                { title: "Presentasi Layanan Bisnis", due: "Lusa, 12:00", subject: "Layanan Bisnis" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.subject}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-destructive font-medium">Tenggat: {item.due}</span>
                                        <Button size="sm" variant="outline">Detail</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
