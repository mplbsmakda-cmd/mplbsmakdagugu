"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar } from "lucide-react";

export default function AnnouncementPage() {
    const announcements = [
        {
            id: 1,
            title: "Rapat Wali Murid Semester Ganjil",
            date: "25 November 2023",
            content: "Diberitahukan kepada seluruh wali murid kelas X, XI, dan XII untuk dapat hadir dalam acara pembagian hasil belajar tengah semester ganjil yang akan dilaksanakan pada hari Sabtu, 25 November 2023 pukul 08.00 WIB di Aula Sekolah.",
            category: "Akademik"
        },
        {
            id: 2,
            title: "Libur Semester Ganjil",
            date: "15 Desember 2023",
            content: "Kegiatan belajar mengajar semester ganjil akan berakhir pada tanggal 14 Desember 2023. Libur semester akan dimulai dari tanggal 18 Desember 2023 sampai dengan 1 Januari 2024. Masuk kembali pada tanggal 2 Januari 2024.",
            category: "Umum"
        },
        {
            id: 3,
            title: "Pembayaran SPP Bulan Desember",
            date: "01 Desember 2023",
            content: "Mengingatkan kepada seluruh wali murid agar dapat menyelesaikan pembayaran SPP bulan Desember sebelum tanggal 10 Desember 2023 untuk kelancaran administrasi ujian akhir semester.",
            category: "Keuangan"
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Pengumuman Sekolah</h1>

            <div className="grid gap-6">
                {announcements.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl">{item.title}</CardTitle>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {item.date}
                                        <span className="mx-2">•</span>
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <Bell className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {item.content}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
