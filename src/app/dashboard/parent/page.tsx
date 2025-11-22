"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ClipboardList, GraduationCap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ParentDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Orang Tua</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Kehadiran Anak</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Hadir</div>
                        <p className="text-xs text-muted-foreground">Hari ini: 07:00</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nilai Terbaru</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">90</div>
                        <p className="text-xs text-muted-foreground">Matematika</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">SPP Bulan Ini</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Lunas</div>
                        <p className="text-xs text-muted-foreground">Terima kasih</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pengumuman</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2 Baru</div>
                        <p className="text-xs text-muted-foreground">Cek sekarang</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Kehadiran Minggu Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { day: "Senin", date: "20 Nov", status: "Hadir", time: "06:55" },
                                { day: "Selasa", date: "21 Nov", status: "Hadir", time: "06:58" },
                                { day: "Rabu", date: "22 Nov", status: "Hadir", time: "07:00" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{item.day}, {item.date}</p>
                                        <p className="text-sm text-muted-foreground">Masuk: {item.time}</p>
                                    </div>
                                    <div className="text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pengumuman Sekolah</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Rapat Wali Murid", date: "25 Nov 2023", desc: "Pembagian hasil belajar tengah semester." },
                                { title: "Libur Semester", date: "15 Des 2023", desc: "Jadwal libur semester ganjil." },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col space-y-2 p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium">{item.title}</p>
                                        <span className="text-xs text-muted-foreground">{item.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
