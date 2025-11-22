"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Eye, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";

type Assignment = {
    id: number;
    title: string;
    class: string;
    subject: string;
    dueDate: string;
    description: string;
    status: "Draft" | "Published";
    submissions: number;
    totalStudents: number;
};

export default function TeacherAssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignment[]>([
        {
            id: 1,
            title: "Membuat Sistem Pengarsipan Digital",
            class: "X MPLB 1",
            subject: "Kearsipan",
            dueDate: "2023-11-25",
            description: "Buatlah sistem pengarsipan digital menggunakan aplikasi pilihan Anda",
            status: "Published",
            submissions: 28,
            totalStudents: 32
        },
        {
            id: 2,
            title: "Analisis Surat Bisnis",
            class: "X MPLB 1",
            subject: "Korespondensi",
            dueDate: "2023-11-22",
            description: "Analisis 3 contoh surat bisnis",
            status: "Published",
            submissions: 30,
            totalStudents: 32
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState<Partial<Assignment>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    const classes = ["X MPLB 1", "X MPLB 2", "XI MPLB 1"];
    const subjects = ["Dasar-dasar Manajemen Perkantoran", "Teknologi Perkantoran", "Kearsipan", "Korespondensi"];

    const handleOpenDialog = (assignment?: Assignment) => {
        if (assignment) {
            setCurrentAssignment(assignment);
            setIsEditing(true);
        } else {
            setCurrentAssignment({
                class: "X MPLB 1",
                subject: subjects[0],
                status: "Draft",
                dueDate: new Date().toISOString().split('T')[0]
            });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentAssignment.title || !currentAssignment.description) {
            toast.error("Judul dan Deskripsi wajib diisi");
            return;
        }

        if (isEditing) {
            setAssignments(assignments.map(a => a.id === currentAssignment.id ? currentAssignment as Assignment : a));
            toast.success("Tugas berhasil diperbarui");
        } else {
            const newAssignment = {
                ...currentAssignment,
                id: assignments.length + 1,
                submissions: 0,
                totalStudents: 32
            } as Assignment;
            setAssignments([...assignments, newAssignment]);
            toast.success("Tugas baru berhasil dibuat");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            setAssignments(assignments.filter(a => a.id !== id));
            toast.success("Tugas berhasil dihapus");
        }
    };

    const handlePublish = (id: number) => {
        setAssignments(assignments.map(a =>
            a.id === id ? { ...a, status: "Published" as const } : a
        ));
        toast.success("Tugas berhasil dipublikasikan");
    };

    const filteredAssignments = assignments.filter(a => {
        if (activeTab === "all") return true;
        if (activeTab === "published") return a.status === "Published";
        if (activeTab === "draft") return a.status === "Draft";
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Tugas</h1>
                    <p className="text-muted-foreground">Buat dan kelola tugas untuk siswa</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Tugas Baru
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tugas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{assignments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published</CardTitle>
                        <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {assignments.filter(a => a.status === "Published").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Draft</CardTitle>
                        <FileText className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {assignments.filter(a => a.status === "Draft").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4 mt-6">
                    {filteredAssignments.map((assignment) => (
                        <Card key={assignment.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl">{assignment.title}</CardTitle>
                                        <CardDescription>
                                            {assignment.class} - {assignment.subject}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={assignment.status === "Published" ? "default" : "secondary"}>
                                        {assignment.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">{assignment.description}</p>

                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>Deadline: {assignment.dueDate}</span>
                                    </div>
                                    {assignment.status === "Published" && (
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span>
                                                Dikumpulkan: {assignment.submissions}/{assignment.totalStudents}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        Lihat Submissions
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(assignment)}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    {assignment.status === "Draft" && (
                                        <Button size="sm" onClick={() => handlePublish(assignment.id)}>
                                            Publish
                                        </Button>
                                    )}
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(assignment.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Hapus
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Tugas" : "Buat Tugas Baru"}</DialogTitle>
                        <DialogDescription>
                            Lengkapi form di bawah untuk {isEditing ? "memperbarui" : "membuat"} tugas
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Judul Tugas *</Label>
                            <Input
                                id="title"
                                value={currentAssignment.title || ""}
                                onChange={(e) => setCurrentAssignment({ ...currentAssignment, title: e.target.value })}
                                placeholder="Contoh: Membuat Laporan Keuangan"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="class">Kelas</Label>
                                <Select
                                    value={currentAssignment.class}
                                    onValueChange={(value) => setCurrentAssignment({ ...currentAssignment, class: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map(cls => (
                                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Mata Pelajaran</Label>
                                <Select
                                    value={currentAssignment.subject}
                                    onValueChange={(value) => setCurrentAssignment({ ...currentAssignment, subject: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map(subject => (
                                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dueDate">Deadline</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={currentAssignment.dueDate || ""}
                                onChange={(e) => setCurrentAssignment({ ...currentAssignment, dueDate: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi Tugas *</Label>
                            <Input
                                id="description"
                                value={currentAssignment.description || ""}
                                onChange={(e) => setCurrentAssignment({ ...currentAssignment, description: e.target.value })}
                                placeholder="Jelaskan detail tugas yang harus dikerjakan siswa..."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={currentAssignment.status}
                                onValueChange={(value: any) => setCurrentAssignment({ ...currentAssignment, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft (belum terlihat siswa)</SelectItem>
                                    <SelectItem value="Published">Published (terlihat siswa)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                        <Button onClick={handleSave}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
