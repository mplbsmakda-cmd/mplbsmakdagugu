"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Award, BookOpen } from "lucide-react";

export default function ParentGradesPage() {
    const studentInfo = {
        name: "Siti Aminah",
        nis: "2023001",
        class: "X MPLB 1",
        rank: 3,
        totalStudents: 32
    };

    const currentGrades = [
        { subject: "Dasar-dasar Manajemen Perkantoran", kkm: 75, uts: 88, uas: 90, avg: 89, grade: "A" },
        { subject: "Teknologi Perkantoran", kkm: 75, uts: 92, uas: 95, avg: 93.5, grade: "A" },
        { subject: "Korespondensi", kkm: 75, uts: 85, uas: 87, avg: 86, grade: "B+" },
        { subject: "Kearsipan", kkm: 75, uts: 90, uas: 88, avg: 89, grade: "A" },
        { subject: "Simulasi dan Komunikasi Digital", kkm: 70, uts: 82, uas: 85, avg: 83.5, grade: "B+" },
        { subject: "Bahasa Inggris", kkm: 70, uts: 78, uas: 80, avg: 79, grade: "B" },
        { subject: "Bahasa Indonesia", kkm: 70, uts: 86, uas: 88, avg: 87, grade: "A-" },
        { subject: "Pendidikan Agama", kkm: 75, uts: 95, uas: 96, avg: 95.5, grade: "A" },
    ];

    const previousSemester = [
        { subject: "Dasar-dasar Manajemen Perkantoran", grade: "B+", score: 85 },
        { subject: "Teknologi Perkantoran", grade: "A-", score: 88 },
        { subject: "Korespondensi", grade: "B", score: 82 },
        { subject: "Kearsipan", grade: "A-", score: 87 },
    ];

    const overallAverage = currentGrades.reduce((acc, curr) => acc + curr.avg, 0) / currentGrades.length;

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Nilai Akademik</h1>
                <p className="text-muted-foreground">{studentInfo.name} ({studentInfo.nis}) - {studentInfo.class}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overallAverage.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Peringkat Kelas</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{studentInfo.rank}</div>
                        <p className="text-xs text-muted-foreground">Dari {studentInfo.totalStudents} siswa</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mata Pelajaran</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentGrades.length}</div>
                        <p className="text-xs text-muted-foreground">Tuntas semua</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="current" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="current">Semester Ini</TabsTrigger>
                    <TabsTrigger value="previous">Semester Lalu</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rincian Nilai - Semester Ganjil 2023/2024</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mata Pelajaran</TableHead>
                                        <TableHead className="text-center">KKM</TableHead>
                                        <TableHead className="text-center">UTS</TableHead>
                                        <TableHead className="text-center">UAS</TableHead>
                                        <TableHead className="text-center">Rata-rata</TableHead>
                                        <TableHead className="text-center">Predikat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentGrades.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.subject}</TableCell>
                                            <TableCell className="text-center">{item.kkm}</TableCell>
                                            <TableCell className="text-center font-semibold">{item.uts}</TableCell>
                                            <TableCell className="text-center font-semibold">{item.uas}</TableCell>
                                            <TableCell className="text-center font-bold text-lg">{item.avg}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={getGradeColor(item.grade)}>
                                                    {item.grade}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="previous" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nilai Semester Genap 2022/2023</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mata Pelajaran</TableHead>
                                        <TableHead className="text-center">Nilai Akhir</TableHead>
                                        <TableHead className="text-center">Predikat</TableHead>
                                        <TableHead>Keterangan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {previousSemester.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.subject}</TableCell>
                                            <TableCell className="text-center font-bold text-lg">{item.score}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={getGradeColor(item.grade)}>
                                                    {item.grade}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">Tuntas</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
