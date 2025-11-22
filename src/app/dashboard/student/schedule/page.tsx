"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react";

export default function StudentSchedulePage() {
    const schedule = [
        {
            day: "Senin",
            classes: [
                { time: "07:00 - 08:30", subject: "Dasar-dasar Manajemen Perkantoran", teacher: "Budi Santoso, S.Pd", room: "Lab 1" },
                { time: "08:30 - 10:00", subject: "Bahasa Indonesia", teacher: "Siti Rahma, M.Pd", room: "Ruang 201" },
                { time: "10:15 - 11:45", subject: "Matematika", teacher: "Dedi Mulyadi, S.Si", room: "Ruang 202" },
                { time: "12:30 - 14:00", subject: "Pendidikan Agama", teacher: "H. Ahmad Fauzi, M.Ag", room: "Ruang 203" },
            ]
        },
        {
            day: "Selasa",
            classes: [
                { time: "07:00 - 08:30", subject: "Teknologi Perkantoran", teacher: "Budi Santoso, S.Pd", room: "Lab 2" },
                { time: "08:30 - 10:00", subject: "Bahasa Inggris", teacher: "Linda Sari, M.Pd", room: "Ruang 204" },
                { time: "10:15 - 11:45", subject: "Korespondensi", teacher: "Tri Handayani, S.Pd", room: "Ruang 201" },
            ]
        },
        {
            day: "Rabu",
            classes: [
                { time: "07:00 - 08:30", subject: "Kearsipan", teacher: "Dian Permata, S.Sos", room: "Ruang 202" },
                { time: "08:30 - 10:00", subject: "Simulasi dan Komunikasi Digital", teacher: "Eko Prasetyo, S.Kom", room: "Lab 3" },
                { time: "10:15 - 11:45", subject: "Pendidikan Jasmani", teacher: "Agus Setiawan, S.Pd", room: "Lapangan" },
            ]
        },
        {
            day: "Kamis",
            classes: [
                { time: "07:00 - 08:30", subject: "Dasar-dasar Manajemen Perkantoran", teacher: "Budi Santoso, S.Pd", room: "Lab 1" },
                { time: "08:30 - 10:00", subject: "Bahasa Indonesia", teacher: "Siti Rahma, M.Pd", room: "Ruang 201" },
                { time: "10:15 - 11:45", subject: "PKN", teacher: "Wahyu Utomo, M.Pd", room: "Ruang 203" },
            ]
        },
        {
            day: "Jumat",
            classes: [
                { time: "07:00 - 08:30", subject: "Teknologi Perkantoran", teacher: "Budi Santoso, S.Pd", room: "Lab 2" },
                { time: "08:30 - 09:30", subject: "Bimbingan Konseling", teacher: "Dewi Lestari, M.Psi", room: "Ruang BK" },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Jadwal Pelajaran</h1>
                <p className="text-muted-foreground">Kelas X MPLB 1 - Semester Ganjil 2023/2024</p>
            </div>

            <div className="grid gap-6">
                {schedule.map((day, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                {day.day}
                                <Badge variant="outline" className="ml-auto">{day.classes.length} Pelajaran</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {day.classes.map((classItem, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-lg">{classItem.subject}</h4>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {classItem.time}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    {classItem.teacher}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {classItem.room}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
