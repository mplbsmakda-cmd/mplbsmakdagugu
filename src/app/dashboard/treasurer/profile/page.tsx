"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, DollarSign, Edit } from "lucide-react";

export default function TreasurerProfilePage() {
    const treasurerData = {
        username: "bendahara",
        name: "Tri Handayani, S.E",
        email: "bendahara@smk.sch.id",
        phone: "081234567890",
        role: "Bendahara Sekolah",
        joinDate: "2018-08-01",
        permissions: [
            "Input Pembayaran SPP",
            "Lihat Laporan Keuangan",
            "Export Data Keuangan",
            "Kelola Tunggakan",
            "Balas Pesan Orang Tua"
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Bendahara</h1>
                    <p className="text-muted-foreground">Informasi akun bendahara</p>
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
                                <DollarSign className="h-16 w-16 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">{treasurerData.name}</h2>
                            <p className="text-muted-foreground mb-4">@{treasurerData.username}</p>
                            <Badge variant="default">{treasurerData.role}</Badge>
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
                                    <p className="font-medium">{treasurerData.email}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">No. HP</p>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{treasurerData.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{treasurerData.joinDate}</p>
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
                    <div className="grid grid-cols-2 gap-3">
                        {treasurerData.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                                <DollarSign className="h-4 w-4 text-primary" />
                                <span className="text-sm">{permission}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
