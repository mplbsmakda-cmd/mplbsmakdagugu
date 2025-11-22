"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type Assignment = {
    id: number;
    title: string;
    subject: string;
    dueDate: string;
    status: "pending" | "submitted" | "graded";
    description: string;
    grade?: number;
};

export default function StudentAssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignment[]>([
        {
            id: 1,
            title: "Membuat Sistem Pengarsipan Digital",
            subject: "Kearsipan",
            dueDate: "2023-11-25",
            status: "pending",
            description: "Buatlah sistem pengarsipan digital menggunakan aplikasi pilihan Anda"
        },
        {
            id: 2,
            title: "Analisis Surat Bisnis",
            subject: "Korespondensi",
            dueDate: "2023-11-22",
            status: "submitted",
            description: "Analisis 3 contoh surat bisnis dan identifikasi struktur serta bahasanya"
        },
        {
            id: 3,
            title: "Presentasi Teknologi Perkantoran",
            subject: "Teknologi Perkantoran",
            dueDate: "2023-11-30",
            status: "pending",
            description: "Presentasikan perkembangan teknologi perkantoran modern"
        },
        {
            id: 4,
            title: "Laporan Praktikum Administrasi",
            subject: "Dasar-dasar Manajemen Perkantoran",
            dueDate: "2023-11-18",
            status: "graded",
            grade: 88,
            description: "Buat laporan lengkap dari praktikum administrasi yang telah dilakukan"
        },
    ]);

    const handleUpload = (id: number) => {
        toast.success("File berhasil diupload");
        const updatedAssignments = assignments.map(a =>
            a.id === id ? { ...a, status: "submitted" as const } : a
        );
        setAssignments(updatedAssignments);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="mr-1 h-3 w-3" />Belum Dikerjakan</Badge>;
            case "submitted":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><CheckCircle className="mr-1 h-3 w-3" />Sudah Dikumpulkan</Badge>;
            case "graded":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="mr-1 h-3 w-3" />Dinilai</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getDaysUntilDue = (dueDate: string) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tugas & Pekerjaan</h1>
                <p className="text-muted-foreground">Kelola tugas dan pekerjaan sekolah Anda</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tugas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{assignments.length}</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Belum Dikerjakan</CardTitle>
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {assignments.filter(a => a.status === "pending").length}
                        </div>
                        <p className="text-xs text-muted-foreground">Perlu diselesaikan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sudah Dinilai</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {assignments.filter(a => a.status === "graded").length}
                        </div>
                        <p className="text-xs text-muted-foreground">Selesai</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                {assignments.map((assignment) => {
                    const daysLeft = getDaysUntilDue(assignment.dueDate);
                    const isOverdue = daysLeft < 0;
                    const isUrgent = daysLeft >= 0 && daysLeft <= 3;

                    return (
                        <Card key={assignment.id} className={isOverdue && assignment.status === "pending" ? "border-red-200" : ""}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl">{assignment.title}</CardTitle>
                                        <CardDescription>{assignment.subject}</CardDescription>
                                    </div>
                                    {getStatusBadge(assignment.status)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">{assignment.description}</p>

                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>Deadline: {assignment.dueDate}</span>
                                        {assignment.status === "pending" && (
                                            <Badge variant={isOverdue ? "destructive" : isUrgent ? "outline" : "secondary"} className="text-xs">
                                                {isOverdue ? "Terlambat!" : daysLeft === 0 ? "Hari ini" : `${daysLeft} hari lagi`}
                                            </Badge>
                                        )}
                                    </div>
                                    {assignment.status === "graded" && assignment.grade && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">Nilai:</span>
                                            <span className="text-xl font-bold text-green-600">{assignment.grade}</span>
                                        </div>
                                    )}
                                </div>

                                {assignment.status === "pending" && (
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleUpload(assignment.id)} className="flex-1">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Tugas
                                        </Button>
                                        <Button variant="outline">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Lihat Detail
                                        </Button>
                                    </div>
                                )}

                                {assignment.status === "submitted" && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" disabled className="flex-1">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Sudah Dikumpulkan
                                        </Button>
                                        <Button variant="outline">
                                            Lihat File
                                        </Button>
                                    </div>
                                )}

                                {assignment.status === "graded" && (
                                    <Button variant="outline" className="w-full">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Lihat Feedback Guru
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
