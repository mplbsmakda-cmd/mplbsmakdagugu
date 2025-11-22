"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function TeacherSchedulePage() {
    const schedule = [
        {
            day: "Senin",
            classes: [
                { time: "07:00 - 08:30", subject: "Dasar-dasar Manajemen Perkantoran", class: "X MPLB 1", room: "Lab 1" },
                { time: "08:30 - 10:00", subject: "Teknologi Perkantoran", class: "X MPLB 2", room: "Lab 2" },
                { time: "10:15 - 11:45", subject: "Korespondensi", class: "XI MPLB 1", room: "Ruang 201" },
            ]
        },
        {
            day: "Selasa",
            classes: [
                { time: "07:00 - 08:30", subject: "Kearsipan", class: "XI MPLB 2", room: "Ruang 202" },
                { time: "08:30 - 10:00", subject: "Dasar-dasar Manajemen Perkantoran", class: "X MPLB 1", room: "Lab 1" },
            ]
        },
        {
            day: "Rabu",
            classes: [
                { time: "07:00 - 08:30", subject: "Teknologi Perkantoran", class: "XII MPLB 1", room: "Lab 2" },
                { time: "08:30 - 10:00", subject: "Simulasi Komunikasi Digital", class: "XII MPLB 2", room: "Lab 3" },
                { time: "10:15 - 11:45", subject: "Korespondensi", class: "XI MPLB 1", room: "Ruang 201" },
            ]
        },
        {
            day: "Kamis",
            classes: [
                { time: "07:00 - 08:30", subject: "Kearsipan", class: "XI MPLB 2", room: "Ruang 202" },
                { time: "08:30 - 10:00", subject: "Dasar-dasar Manajemen Perkantoran", class: "X MPLB 2", room: "Lab 1" },
            ]
        },
        {
            day: "Jumat",
            classes: [
                { time: "07:00 - 08:30", subject: "Teknologi Perkantoran", class: "X MPLB 1", room: "Lab 2" },
                { time: "08:30 - 09:30", subject: "Konsultasi Siswa", class: "Semua Kelas", room: "Ruang Guru" },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Jadwal Mengajar</h1>
                <p className="text-muted-foreground">Semester Ganjil 2023/2024</p>
            </div>

            <div className="grid gap-6">
                {schedule.map((day, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                {day.day}
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
                                                    <Users className="h-4 w-4" />
                                                    {classItem.class}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {classItem.room}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">Aktif</Badge>
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
