"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Clock } from "lucide-react";

export default function AttendancePage() {
    const [students, setStudents] = useState([
        { id: 1, name: "Ahmad Rizki", status: "present" },
        { id: 2, name: "Budi Santoso", status: "present" },
        { id: 3, name: "Citra Dewi", status: "absent" },
        { id: 4, name: "Dewi Lestari", status: "present" },
        { id: 5, name: "Eko Prasetyo", status: "late" },
    ]);

    const updateStatus = (id: number, status: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, status } : s));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Input Absensi</h1>
                <Button>Simpan Absensi</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Select defaultValue="X MPLB 1">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih Kelas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="X MPLB 1">X MPLB 1</SelectItem>
                                <SelectItem value="XI MPLB 1">XI MPLB 1</SelectItem>
                                <SelectItem value="XII MPLB 1">XII MPLB 1</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="today">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tanggal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Hari Ini (22 Nov)</SelectItem>
                                <SelectItem value="yesterday">Kemarin (21 Nov)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Siswa</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant={student.status === "present" ? "default" : "outline"}
                                                className={student.status === "present" ? "bg-green-600 hover:bg-green-700" : ""}
                                                onClick={() => updateStatus(student.id, "present")}
                                            >
                                                <Check className="h-4 w-4 mr-1" /> Hadir
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={student.status === "absent" ? "destructive" : "outline"}
                                                onClick={() => updateStatus(student.id, "absent")}
                                            >
                                                <X className="h-4 w-4 mr-1" /> Alpha
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={student.status === "late" ? "secondary" : "outline"}
                                                onClick={() => updateStatus(student.id, "late")}
                                            >
                                                <Clock className="h-4 w-4 mr-1" /> Terlambat
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-sm text-muted-foreground">
                                            {student.status === "present" ? "Tepat Waktu" : student.status === "absent" ? "Tanpa Keterangan" : "Telat 15 menit"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
