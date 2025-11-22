"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, Calendar, Shield, Edit } from "lucide-react";

export default function AdminProfilePage() {
    const adminData = {
        username: "admin",
        name: "Administrator Sistem",
        email: "admin@smk.sch.id",
        phone: "081234567890",
        role: "Super Admin",
        joinDate: "2020-01-01",
        lastLogin: "2023-11-22 09:00:00",
        permissions: [
            "Kelola Siswa",
            "Kelola Guru",
            "Kelola Kelas",
            "Kelola Mata Pelajaran",
            "Kelola Jadwal",
            "Kelola User",
            "Kelola Pengumuman",
            "Pengaturan Sistem",
            "Lihat Laporan"
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Admin</h1>
                    <p className="text-muted-foreground">Informasi akun administrator sistem</p>
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
                                <Shield className="h-16 w-16 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">{adminData.name}</h2>
                            <p className="text-muted-foreground mb-4">@{adminData.username}</p>
                            <Badge variant="default" className="mb-2">{adminData.role}</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Informasi Akun</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Email</p>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{adminData.email}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">No. HP</p>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{adminData.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{adminData.joinDate}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Login Terakhir</p>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{adminData.lastLogin}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Hak Akses & Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {adminData.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-sm">{permission}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Keamanan Akun</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">Terakhir diubah 30 hari yang lalu</p>
                        </div>
                        <Button variant="outline">Ubah Password</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Keamanan tambahan untuk akun Anda</p>
                        </div>
                        <Button variant="outline">Aktifkan 2FA</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
