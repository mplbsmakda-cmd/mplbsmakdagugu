"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, Save, Database, Bell, Shield, Palette } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const [schoolSettings, setSchoolSettings] = useState({
        name: "SMK LPPM RI 2 Kedungreja",
        address: "Jl. Raya Kedungreja No. 123, Cilacap",
        phone: "(0282) 123456",
        email: "info@smklppmri2.sch.id",
        principal: "Drs. H. Ahmad Supriyadi, M.Pd",
    });

    const [systemSettings, setSystemSettings] = useState({
        academicYear: "2023/2024",
        semester: "Ganjil",
        maxStudentsPerClass: "32",
        attendanceTime: "07:00",
    });

    const handleSaveSchool = () => {
        toast.success("Pengaturan sekolah berhasil disimpan");
    };

    const handleSaveSystem = () => {
        toast.success("Pengaturan sistem berhasil disimpan");
    };

    const handleBackup = () => {
        toast.success("Backup database berhasil dibuat");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pengaturan Sistem</h1>
                <p className="text-muted-foreground">Kelola konfigurasi dan pengaturan aplikasi</p>
            </div>

            <Tabs defaultValue="school" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="school">
                        <School className="h-4 w-4 mr-2" />
                        Sekolah
                    </TabsTrigger>
                    <TabsTrigger value="system">
                        <Shield className="h-4 w-4 mr-2" />
                        Sistem
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifikasi
                    </TabsTrigger>
                    <TabsTrigger value="backup">
                        <Database className="h-4 w-4 mr-2" />
                        Backup
                    </TabsTrigger>
                </TabsList>

                {/* School Settings */}
                <TabsContent value="school" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Sekolah</CardTitle>
                            <CardDescription>
                                Data identitas dan informasi kontak sekolah
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="school-name">Nama Sekolah</Label>
                                <Input
                                    id="school-name"
                                    value={schoolSettings.name}
                                    onChange={(e) => setSchoolSettings({ ...schoolSettings, name: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input
                                    id="address"
                                    value={schoolSettings.address}
                                    onChange={(e) => setSchoolSettings({ ...schoolSettings, address: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Telepon</Label>
                                    <Input
                                        id="phone"
                                        value={schoolSettings.phone}
                                        onChange={(e) => setSchoolSettings({ ...schoolSettings, phone: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={schoolSettings.email}
                                        onChange={(e) => setSchoolSettings({ ...schoolSettings, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="principal">Kepala Sekolah</Label>
                                <Input
                                    id="principal"
                                    value={schoolSettings.principal}
                                    onChange={(e) => setSchoolSettings({ ...schoolSettings, principal: e.target.value })}
                                />
                            </div>
                            <Button onClick={handleSaveSchool}>
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Perubahan
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* System Settings */}
                <TabsContent value="system" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Akademik</CardTitle>
                            <CardDescription>
                                Konfigurasi tahun ajaran dan semester aktif
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="academic-year">Tahun Ajaran</Label>
                                    <Select value={systemSettings.academicYear} onValueChange={(value) => setSystemSettings({ ...systemSettings, academicYear: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                                            <SelectItem value="2025/2026">2025/2026</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="semester">Semester</Label>
                                    <Select value={systemSettings.semester} onValueChange={(value) => setSystemSettings({ ...systemSettings, semester: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ganjil">Ganjil</SelectItem>
                                            <SelectItem value="Genap">Genap</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="max-students">Maksimal Siswa per Kelas</Label>
                                    <Input
                                        id="max-students"
                                        type="number"
                                        value={systemSettings.maxStudentsPerClass}
                                        onChange={(e) => setSystemSettings({ ...systemSettings, maxStudentsPerClass: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="attendance-time">Jam Absensi</Label>
                                    <Input
                                        id="attendance-time"
                                        type="time"
                                        value={systemSettings.attendanceTime}
                                        onChange={(e) => setSystemSettings({ ...systemSettings, attendanceTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleSaveSystem}>
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Perubahan
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Notifikasi</CardTitle>
                            <CardDescription>
                                Kelola pengiriman notifikasi dan pengumuman
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifikasi</Label>
                                    <p className="text-sm text-muted-foreground">Kirim notifikasi via email</p>
                                </div>
                                <Button variant="outline">Aktifkan</Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>SMS Notifikasi</Label>
                                    <p className="text-sm text-muted-foreground">Kirim notifikasi via SMS</p>
                                </div>
                                <Button variant="outline">Aktifkan</Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Push Notifikasi</Label>
                                    <p className="text-sm text-muted-foreground">Kirim push notification</p>
                                </div>
                                <Button variant="outline">Aktifkan</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Backup Settings */}
                <TabsContent value="backup" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Backup & Restore</CardTitle>
                            <CardDescription>
                                Kelola backup database dan restore data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Backup Otomatis</h4>
                                        <p className="text-sm text-muted-foreground">Backup dilakukan setiap hari pukul 00:00</p>
                                    </div>
                                    <Button variant="outline">Konfigurasi</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Backup Manual</h4>
                                        <p className="text-sm text-muted-foreground">Buat backup database sekarang</p>
                                    </div>
                                    <Button onClick={handleBackup}>
                                        <Database className="mr-2 h-4 w-4" />
                                        Backup Sekarang
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h4 className="font-medium mb-2">Riwayat Backup</h4>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span>backup_2023_11_{20 + i}.sql</span>
                                            <div className="flex gap-2">
                                                <span className="text-muted-foreground">2.5 MB</span>
                                                <Button variant="ghost" size="sm">Download</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
