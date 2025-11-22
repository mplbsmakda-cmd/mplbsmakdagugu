"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Calendar, BookOpen, Users, Award, Edit } from "lucide-react";

export default function TeacherProfilePage() {
    const teacherData = {
        nip: "198501012010011001",
        name: "Budi Santoso, S.Pd",
        email: "budi.santoso@smk.sch.id",
        phone: "081234567890",
        gender: "Laki-laki",
        address: "Jl. Pendidikan No. 123, Kedungreja",
        joinDate: "2010-01-15",
        education: "S1 Pendidikan Administrasi Perkantoran",
        certifications: ["Sertifikat Pendidik", "Diklat Kurikulum Merdeka"],
        subjects: [
            { name: "Dasar-dasar Manajemen Perkantoran", classes: ["X MPLB 1", "X MPLB 2"] },
            { name: "Teknologi Perkantoran", classes: ["X MPLB 1", "XI MPLB 1"] },
        ],
        homeroom: "X MPLB 1",
        achievements: [
            "Guru Teladan 2022",
            "Peserta Pelatihan Nasional Kurikulum Merdeka",
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
                    <p className="text-muted-foreground">Informasi profil dan data mengajar</p>
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
                                <span className="text-4xl font-bold text-primary">BS</span>
                            </div>
                            <h2 className="text-2xl font-bold">{teacherData.name}</h2>
                            <p className="text-muted-foreground mb-4">NIP: {teacherData.nip}</p>
                            <Badge variant="default" className="mb-2">Guru Aktif</Badge>
                            <Badge variant="outline">Wali Kelas {teacherData.homeroom}</Badge>
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
                                <p className="text-sm text-muted-foreground">Email</p>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{teacherData.email}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">No. HP</p>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{teacherData.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                <p className="font-medium">{teacherData.gender}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{teacherData.joinDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Alamat</p>
                            <p className="font-medium">{teacherData.address}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Pendidikan Terakhir</p>
                            <p className="font-medium">{teacherData.education}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="subjects" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="subjects">Mata Pelajaran</TabsTrigger>
                    <TabsTrigger value="achievements">Prestasi & Sertifikat</TabsTrigger>
                </TabsList>

                <TabsContent value="subjects" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Mata Pelajaran yang Diampu
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {teacherData.subjects.map((subject, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-lg mb-2">{subject.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Mengajar di:</span>
                                        {subject.classes.map((cls, idx) => (
                                            <Badge key={idx} variant="outline">{cls}</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Wali Kelas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-lg">{teacherData.homeroom}</h4>
                                    <p className="text-sm text-muted-foreground">32 Siswa</p>
                                </div>
                                <Button variant="outline" size="sm">Lihat Kelas</Button>
                            </div>
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
                            {teacherData.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                                    <Award className="h-4 w-4 text-yellow-600" />
                                    <span>{achievement}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sertifikasi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {teacherData.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                                    <Badge variant="secondary">{cert}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
