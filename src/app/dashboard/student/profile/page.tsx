"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Phone, Calendar, User, MapPin, Users, BookOpen, Award, TrendingUp, Edit } from "lucide-react";

export default function StudentProfilePage() {
    const studentData = {
        nis: "2023001",
        name: "Siti Aminah",
        email: "siti.aminah@student.smk.sch.id",
        phone: "081234567899",
        gender: "Perempuan",
        birthDate: "2007-05-15",
        birthPlace: "Kedungreja",
        address: "Jl. Merdeka No. 45, Kedungreja",
        class: "X MPLB 1",
        entryYear: "2023",
        parentName: "Ahmad Supriyadi",
        parentPhone: "081234567890",
        status: "Aktif"
    };

    const academicData = {
        average: 87.5,
        rank: 3,
        totalStudents: 32,
        attendance: 94.4
    };

    const grades = [
        { subject: "Dasar-dasar Manajemen Perkantoran", score: 89, grade: "A" },
        { subject: "Teknologi Perkantoran", score: 93, grade: "A" },
        { subject: "Bahasa Indonesia", score: 87, grade: "A-" },
        { subject: "Matematika", score: 82, grade: "B+" },
    ];

    const achievements = [
        "Juara 2 Lomba LKS Tingkat Kabupaten 2023",
        "Siswa Berprestasi Semester Ganjil 2023"
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
                    <p className="text-muted-foreground">Informasi pribadi dan akademik</p>
                </div>
                <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profil
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-4xl font-bold text-primary">SA</span>
                            </div>
                            <h2 className="text-2xl font-bold">{studentData.name}</h2>
                            <p className="text-muted-foreground mb-4">NIS: {studentData.nis}</p>
                            <Badge variant="default" className="mb-2">{studentData.class}</Badge>
                            <Badge variant="outline">{studentData.status}</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Informasi Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Tempat, Tanggal Lahir</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{studentData.birthPlace}, {studentData.birthDate}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{studentData.gender}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Email</p>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{studentData.email}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">No. HP</p>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{studentData.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Alamat</p>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">{studentData.address}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Tahun Masuk</p>
                            <p className="font-medium">{studentData.entryYear}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Orang Tua/Wali</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Nama Orang Tua/Wali</p>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">{studentData.parentName}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">No. HP Orang Tua</p>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">{studentData.parentPhone}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="academic" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="academic">Data Akademik</TabsTrigger>
                    <TabsTrigger value="achievements">Prestasi</TabsTrigger>
                </TabsList>

                <TabsContent value="academic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{academicData.average}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Peringkat</CardTitle>
                                <Award className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{academicData.rank}</div>
                                <p className="text-xs text-muted-foreground">dari {academicData.totalStudents} siswa</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{academicData.attendance}%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Status</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Badge variant="default">Aktif</Badge>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Nilai Mata Pelajaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mata Pelajaran</TableHead>
                                        <TableHead className="text-center">Nilai</TableHead>
                                        <TableHead className="text-center">Predikat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {grades.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.subject}</TableCell>
                                            <TableCell className="text-center font-bold text-lg">{item.score}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={
                                                    item.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                                                        item.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }>
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

                <TabsContent value="achievements" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Prestasi & Penghargaan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {achievements.length > 0 ? (
                                achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                                        <Award className="h-4 w-4 text-yellow-600" />
                                        <span>{achievement}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center py-4">Belum ada prestasi tercatat</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
