"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, TrendingDown, Users, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function AdminReportsPage() {
    const handleExport = (type: string) => {
        toast.success(`Laporan ${type} berhasil diexport`);
    };

    const studentReports = [
        { class: "X MPLB 1", total: 32, avgAttendance: 94.5, avgGrade: 85.2, rank1: "Siti Aminah" },
        { class: "X MPLB 2", total: 30, avgAttendance: 92.1, avgGrade: 83.5, rank1: "Budi Santoso" },
        { class: "XI MPLB 1", total: 31, avgAttendance: 89.3, avgGrade: 86.8, rank1: "Dewi Lestari" },
    ];

    const teacherReports = [
        { name: "Budi Santoso, S.Pd", subjects: 2, classes: 3, students: 93, avgGrade: 85.5 },
        { name: "Siti Rahma, M.Pd", subjects: 1, classes: 4, students: 123, avgGrade: 87.2 },
        { name: "Dedi Mulyadi, S.Si", subjects: 1, classes: 4, students: 123, avgGrade: 82.1 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Laporan & Analitik</h1>
                    <p className="text-muted-foreground">Dashboard analisis dan pelaporan sistem</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">186</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            +12 dari tahun lalu
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Kehadiran</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">92.3%</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85.2</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            +2.1 poin
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">Guru aktif</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="students" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="students">Laporan Siswa</TabsTrigger>
                    <TabsTrigger value="teachers">Laporan Guru</TabsTrigger>
                    <TabsTrigger value="classes">Performa Kelas</TabsTrigger>
                </TabsList>

                <TabsContent value="students" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Laporan Siswa per Kelas</CardTitle>
                                <Button onClick={() => handleExport("Siswa")}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Kelas</TableHead>
                                        <TableHead className="text-center">Jumlah Siswa</TableHead>
                                        <TableHead className="text-center">Kehadiran Rata-rata</TableHead>
                                        <TableHead className="text-center">Nilai Rata-rata</TableHead>
                                        <TableHead>Peringkat 1</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentReports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{report.class}</TableCell>
                                            <TableCell className="text-center">{report.total}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={report.avgAttendance >= 90 ? "default" : "secondary"}>
                                                    {report.avgAttendance}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {report.avgGrade}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {report.rank1}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="teachers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Laporan Beban Kerja Guru</CardTitle>
                                <Button onClick={() => handleExport("Guru")}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Guru</TableHead>
                                        <TableHead className="text-center">Mata Pelajaran</TableHead>
                                        <TableHead className="text-center">Kelas Diampu</TableHead>
                                        <TableHead className="text-center">Total Siswa</TableHead>
                                        <TableHead className="text-center">Nilai Rata-rata</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teacherReports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{report.name}</TableCell>
                                            <TableCell className="text-center">{report.subjects}</TableCell>
                                            <TableCell className="text-center">{report.classes}</TableCell>
                                            <TableCell className="text-center">{report.students}</TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {report.avgGrade}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="classes" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Performa Akademik per Kelas</CardTitle>
                                <div className="flex gap-2">
                                    <Select defaultValue="semester1">
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="semester1">Semester 1</SelectItem>
                                            <SelectItem value="semester2">Semester 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={() => handleExport("Performa")}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {studentReports.map((report, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold text-lg">{report.class}</h4>
                                            <Badge variant="outline">{report.total} Siswa</Badge>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Kehadiran</p>
                                                <p className="text-2xl font-bold text-green-600">{report.avgAttendance}%</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Rata-rata Nilai</p>
                                                <p className="text-2xl font-bold">{report.avgGrade}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Siswa Terbaik</p>
                                                <p className="font-medium">{report.rank1}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
