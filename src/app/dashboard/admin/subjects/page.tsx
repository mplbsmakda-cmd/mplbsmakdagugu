"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Subject = {
    id: number;
    code: string;
    name: string;
    kkm: number;
    grade: "X" | "XI" | "XII" | "All";
    category: "Produktif" | "Normatif" | "Adaptif";
};

export default function SubjectManagementPage() {
    const [subjects, setSubjects] = useState<Subject[]>([
        { id: 1, code: "MPLB-101", name: "Dasar-dasar Manajemen Perkantoran", kkm: 75, grade: "X", category: "Produktif" },
        { id: 2, code: "MPLB-102", name: "Teknologi Perkantoran", kkm: 75, grade: "X", category: "Produktif" },
        { id: 3, code: "MPLB-201", name: "Korespondensi", kkm: 75, grade: "XI", category: "Produktif" },
        { id: 4, code: "MPLB-202", name: "Kearsipan", kkm: 75, grade: "XI", category: "Produktif" },
        { id: 5, code: "MPLB-301", name: "Simulasi dan Komunikasi Digital", kkm: 70, grade: "XII", category: "Produktif" },
        { id: 6, code: "NORM-001", name: "Pendidikan Agama", kkm: 75, grade: "All", category: "Normatif" },
        { id: 7, code: "NORM-002", name: "PKN", kkm: 70, grade: "All", category: "Normatif" },
        { id: 8, code: "ADPT-001", name: "Bahasa Indonesia", kkm: 70, grade: "All", category: "Adaptif" },
        { id: 9, code: "ADPT-002", name: "Bahasa Inggris", kkm: 70, grade: "All", category: "Adaptif" },
        { id: 10, code: "ADPT-003", name: "Matematika", kkm: 70, grade: "All", category: "Adaptif" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState<Partial<Subject>>({});
    const [isEditing, setIsEditing] = useState(false);

    const handleOpenDialog = (subject?: Subject) => {
        if (subject) {
            setCurrentSubject(subject);
            setIsEditing(true);
        } else {
            setCurrentSubject({ grade: "X", category: "Produktif", kkm: 75 });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentSubject.code || !currentSubject.name) {
            toast.error("Kode dan Nama Mata Pelajaran wajib diisi");
            return;
        }

        if (isEditing) {
            setSubjects(subjects.map(s => s.id === currentSubject.id ? currentSubject as Subject : s));
            toast.success("Mata pelajaran berhasil diperbarui");
        } else {
            const newSubject = { ...currentSubject, id: subjects.length + 1 } as Subject;
            setSubjects([...subjects, newSubject]);
            toast.success("Mata pelajaran baru berhasil ditambahkan");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus mata pelajaran ini?")) {
            setSubjects(subjects.filter(s => s.id !== id));
            toast.success("Mata pelajaran berhasil dihapus");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Mata Pelajaran</h1>
                    <p className="text-muted-foreground">Kelola kurikulum dan mata pelajaran</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Mata Pelajaran
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Mata Pelajaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{subjects.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Produktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">
                            {subjects.filter(s => s.category === "Produktif").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Normatif & Adaptif</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-secondary">
                            {subjects.filter(s => s.category !== "Produktif").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Mata Pelajaran</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kode</TableHead>
                                <TableHead>Nama Mata Pelajaran</TableHead>
                                <TableHead className="text-center">KKM</TableHead>
                                <TableHead>Tingkat</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map((subject) => (
                                <TableRow key={subject.id}>
                                    <TableCell className="font-medium">{subject.code}</TableCell>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell className="text-center font-semibold">{subject.kkm}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{subject.grade}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            subject.category === "Produktif" ? "default" :
                                                subject.category === "Normatif" ? "secondary" : "outline"
                                        }>
                                            {subject.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(subject)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(subject.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran Baru"}</DialogTitle>
                        <DialogDescription>
                            Lengkapi form di bawah untuk {isEditing ? "memperbarui" : "menambahkan"} mata pelajaran
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="code">Kode Mapel *</Label>
                                <Input
                                    id="code"
                                    value={currentSubject.code || ""}
                                    onChange={(e) => setCurrentSubject({ ...currentSubject, code: e.target.value })}
                                    placeholder="MPLB-101"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="kkm">KKM *</Label>
                                <Input
                                    id="kkm"
                                    type="number"
                                    value={currentSubject.kkm || ""}
                                    onChange={(e) => setCurrentSubject({ ...currentSubject, kkm: parseInt(e.target.value) })}
                                    placeholder="75"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Mata Pelajaran *</Label>
                            <Input
                                id="name"
                                value={currentSubject.name || ""}
                                onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
                                placeholder="Nama mata pelajaran"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="grade">Tingkat</Label>
                                <Select
                                    value={currentSubject.grade}
                                    onValueChange={(value: any) => setCurrentSubject({ ...currentSubject, grade: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="X">Kelas X</SelectItem>
                                        <SelectItem value="XI">Kelas XI</SelectItem>
                                        <SelectItem value="XII">Kelas XII</SelectItem>
                                        <SelectItem value="All">Semua Tingkat</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Select
                                    value={currentSubject.category}
                                    onValueChange={(value: any) => setCurrentSubject({ ...currentSubject, category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Produktif">Produktif</SelectItem>
                                        <SelectItem value="Normatif">Normatif</SelectItem>
                                        <SelectItem value="Adaptif">Adaptif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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
