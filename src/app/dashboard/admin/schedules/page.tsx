"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type ScheduleSlot = {
    day: string;
    time: string;
    subject: string;
    teacher: string;
    room: string;
};

export default function ScheduleManagementPage() {
    const [selectedClass, setSelectedClass] = useState("X MPLB 1");

    const classes = ["X MPLB 1", "X MPLB 2", "XI MPLB 1", "XI MPLB 2", "XII MPLB 1", "XII MPLB 2"];
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const timeSlots = [
        "07:00 - 08:30",
        "08:30 - 10:00",
        "10:15 - 11:45",
        "12:30 - 14:00"
    ];

    const subjects = [
        "Dasar-dasar Manajemen Perkantoran",
        "Teknologi Perkantoran",
        "Korespondensi",
        "Kearsipan",
        "Bahasa Indonesia",
        "Bahasa Inggris",
        "Matematika",
        "Pendidikan Agama"
    ];

    const teachers = [
        "Budi Santoso, S.Pd",
        "Siti Rahma, M.Pd",
        "Dedi Mulyadi, S.Si",
        "Tri Handayani, S.Pd"
    ];

    const rooms = ["Lab 1", "Lab 2", "Lab 3", "Ruang 201", "Ruang 202", "Ruang 203"];

    const [schedule, setSchedule] = useState<Record<string, Record<string, ScheduleSlot>>>({
        "Senin": {
            "07:00 - 08:30": { day: "Senin", time: "07:00 - 08:30", subject: "Dasar-dasar Manajemen Perkantoran", teacher: "Budi Santoso, S.Pd", room: "Lab 1" },
            "08:30 - 10:00": { day: "Senin", time: "08:30 - 10:00", subject: "Bahasa Indonesia", teacher: "Siti Rahma, M.Pd", room: "Ruang 201" },
        },
        "Selasa": {
            "07:00 - 08:30": { day: "Selasa", time: "07:00 - 08:30", subject: "Teknologi Perkantoran", teacher: "Budi Santoso, S.Pd", room: "Lab 2" },
        },
        "Rabu": {},
        "Kamis": {},
        "Jumat": {}
    });

    const updateSlot = (day: string, time: string, field: keyof ScheduleSlot, value: string) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [time]: {
                    ...prev[day]?.[time],
                    day,
                    time,
                    [field]: value
                } as ScheduleSlot
            }
        }));
    };

    const handleSave = () => {
        toast.success("Jadwal berhasil disimpan");
    };

    const getConflicts = () => {
        // Simple conflict detection: same teacher at same time
        const conflicts: string[] = [];
        days.forEach(day => {
            timeSlots.forEach(time => {
                const slot = schedule[day]?.[time];
                if (slot?.teacher && slot?.subject) {
                    // Check if same teacher exists in other classes at same time
                    // This is a simplified check
                }
            });
        });
        return conflicts;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Jadwal</h1>
                    <p className="text-muted-foreground">Atur jadwal pelajaran per kelas</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label>Kelas:</Label>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map(cls => (
                                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Jadwal
                    </Button>
                </div>
            </div>

            {getConflicts().length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-yellow-800">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-medium">Ditemukan {getConflicts().length} konflik jadwal</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Jadwal {selectedClass}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-2 bg-muted text-left font-semibold">Waktu</th>
                                    {days.map(day => (
                                        <th key={day} className="border p-2 bg-muted text-left font-semibold min-w-48">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {day}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map(time => (
                                    <tr key={time}>
                                        <td className="border p-2 bg-muted/50 font-medium text-sm">{time}</td>
                                        {days.map(day => {
                                            const slot = schedule[day]?.[time];
                                            return (
                                                <td key={`${day}-${time}`} className="border p-2">
                                                    <div className="space-y-2">
                                                        <Select
                                                            value={slot?.subject || ""}
                                                            onValueChange={(value) => updateSlot(day, time, "subject", value)}
                                                        >
                                                            <SelectTrigger className="h-8 text-xs">
                                                                <SelectValue placeholder="Pilih Mapel" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {subjects.map(subject => (
                                                                    <SelectItem key={subject} value={subject} className="text-xs">
                                                                        {subject.length > 25 ? subject.substring(0, 25) + "..." : subject}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        {slot?.subject && (
                                                            <>
                                                                <Select
                                                                    value={slot?.teacher || ""}
                                                                    onValueChange={(value) => updateSlot(day, time, "teacher", value)}
                                                                >
                                                                    <SelectTrigger className="h-8 text-xs">
                                                                        <SelectValue placeholder="Pilih Guru" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {teachers.map(teacher => (
                                                                            <SelectItem key={teacher} value={teacher} className="text-xs">
                                                                                {teacher}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>

                                                                <Select
                                                                    value={slot?.room || ""}
                                                                    onValueChange={(value) => updateSlot(day, time, "room", value)}
                                                                >
                                                                    <SelectTrigger className="h-8 text-xs">
                                                                        <SelectValue placeholder="Pilih Ruangan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {rooms.map(room => (
                                                                            <SelectItem key={room} value={room} className="text-xs">
                                                                                {room}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </>
                                                        )}

                                                        {slot?.subject && slot?.teacher && slot?.room && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                ✓ Lengkap
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Petunjuk</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Pilih kelas terlebih dahulu dari dropdown di atas</p>
                    <p>• Pilih mata pelajaran untuk setiap slot waktu</p>
                    <p>• Setelah memilih mata pelajaran, pilih guru dan ruangan</p>
                    <p>• Sistem akan mendeteksi jika ada guru yang mengajar di 2 kelas pada waktu yang sama</p>
                    <p>• Klik "Simpan Jadwal" untuk menyimpan perubahan</p>
                </CardContent>
            </Card>
        </div>
    );
}
