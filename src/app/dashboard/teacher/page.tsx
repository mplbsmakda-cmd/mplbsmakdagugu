"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ClipboardList, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Guru</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Jadwal Hari Ini</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3 Kelas</div>
                        <p className="text-xs text-muted-foreground">07:00 - 14:00</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tugas Masuk</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">Perlu diperiksa</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98%</div>
                        <p className="text-xs text-muted-foreground">Rata-rata minggu ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Jam Mengajar</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24 Jam</div>
                        <p className="text-xs text-muted-foreground">Total minggu ini</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Mengajar Hari Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: "07:00 - 08:30", class: "X MPLB 1", subject: "Dasar Manajemen" },
                                { time: "08:45 - 10:15", class: "XI MPLB 2", subject: "Kearsipan" },
                                { time: "10:30 - 12:00", class: "XII MPLB 1", subject: "Layanan Bisnis" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{item.subject}</p>
                                        <p className="text-sm text-muted-foreground">{item.class}</p>
                                    </div>
                                    <div className="text-sm font-medium bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                                        {item.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button className="w-full justify-start" variant="outline">
                            <ClipboardList className="mr-2 h-4 w-4" /> Input Absensi Hari Ini
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <FileText className="mr-2 h-4 w-4" /> Input Nilai Tugas
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" /> Lihat Kalender Akademik
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
