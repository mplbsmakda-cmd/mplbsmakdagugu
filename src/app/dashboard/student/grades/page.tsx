"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Trophy } from "lucide-react";

export default function GradesPage() {
    const grades = [
        { subject: "Dasar-dasar Manajemen Perkantoran", kkm: 75, score: 88, grade: "A", desc: "Sangat Kompeten" },
        { subject: "Teknologi Perkantoran", kkm: 75, score: 92, grade: "A", desc: "Sangat Kompeten" },
        { subject: "Korespondensi", kkm: 75, score: 85, grade: "B+", desc: "Kompeten" },
        { subject: "Kearsipan", kkm: 75, score: 90, grade: "A", desc: "Sangat Kompeten" },
        { subject: "Simulasi dan Komunikasi Digital", kkm: 70, score: 82, grade: "B+", desc: "Kompeten" },
        { subject: "Bahasa Inggris", kkm: 70, score: 78, grade: "B", desc: "Cukup Kompeten" },
        { subject: "Bahasa Indonesia", kkm: 70, score: 86, grade: "A-", desc: "Kompeten" },
        { subject: "Pendidikan Agama", kkm: 75, score: 95, grade: "A", desc: "Sangat Kompeten" },
    ];

    const average = grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Laporan Hasil Belajar</h1>
                    <p className="text-muted-foreground">Semester Ganjil Tahun Ajaran 2023/2024</p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Unduh Rapor (PDF)
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{average.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground">Sangat Baik</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Mata Pelajaran</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{grades.length}</div>
                        <p className="text-xs text-muted-foreground">Tuntas Semua</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Peringkat Kelas</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Dari 32 Siswa</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rincian Nilai Akademik</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mata Pelajaran</TableHead>
                                <TableHead className="text-center">KKM</TableHead>
                                <TableHead className="text-center">Nilai Akhir</TableHead>
                                <TableHead className="text-center">Predikat</TableHead>
                                <TableHead>Keterangan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grades.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.subject}</TableCell>
                                    <TableCell className="text-center">{item.kkm}</TableCell>
                                    <TableCell className="text-center font-bold">{item.score}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`inline-flex items-center justify-center rounded-full w-8 h-8 text-xs font-bold ${item.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                                                item.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.grade}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.desc}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
