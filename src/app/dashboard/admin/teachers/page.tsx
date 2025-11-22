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
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { toast } from "sonner";

type Teacher = {
    id: number;
    nip: string;
    name: string;
    gender: "L" | "P";
    subjects: string[];
    phone: string;
    email: string;
    status: "Aktif" | "Nonaktif";
};

export default function TeacherManagementPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([
        { id: 1, nip: "198501012010011001", name: "Budi Santoso, S.Pd", gender: "L", subjects: ["Dasar-dasar Manajemen Perkantoran", "Teknologi Perkantoran"], phone: "081234567890", email: "budi@smk.sch.id", status: "Aktif" },
        { id: 2, nip: "198702152011012002", name: "Siti Rahma, M.Pd", gender: "P", subjects: ["Bahasa Indonesia"], phone: "081234567891", email: "siti@smk.sch.id", status: "Aktif" },
        { id: 3, nip: "198903202012011003", name: "Dedi Mulyadi, S.Si", gender: "L", subjects: ["Matematika"], phone: "081234567892", email: "dedi@smk.sch.id", status: "Aktif" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const availableSubjects = [
        "Dasar-dasar Manajemen Perkantoran",
        "Teknologi Perkantoran",
        "Korespondensi",
        "Kearsipan",
        "Simulasi dan Komunikasi Digital",
        "Bahasa Indonesia",
        "Bahasa Inggris",
        "Matematika",
        "Pendidikan Agama",
        "PKN",
        "Pendidikan Jasmani"
    ];

    const handleOpenDialog = (teacher?: Teacher) => {
        if (teacher) {
            setCurrentTeacher(teacher);
            setIsEditing(true);
        } else {
            setCurrentTeacher({ gender: "L", subjects: [], status: "Aktif" });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentTeacher.nip || !currentTeacher.name) {
            toast.error("NIP dan Nama wajib diisi");
            return;
        }

        if (isEditing) {
            setTeachers(teachers.map(t => t.id === currentTeacher.id ? currentTeacher as Teacher : t));
            toast.success("Data guru berhasil diperbarui");
        } else {
            const newTeacher = { ...currentTeacher, id: teachers.length + 1 } as Teacher;
            setTeachers([...teachers, newTeacher]);
            toast.success("Guru baru berhasil ditambahkan");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
            setTeachers(teachers.filter(t => t.id !== id));
            toast.success("Guru berhasil dihapus");
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.nip.includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Guru</h1>
                    <p className="text-muted-foreground">Kelola data guru dan penugasan mata pelajaran</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Guru
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Daftar Guru ({filteredTeachers.length})</CardTitle>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari NIP atau nama..."
                                className="pl-8 w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIP</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Mata Pelajaran</TableHead>
                                <TableHead>Kontak</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTeachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="font-medium">{teacher.nip}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {teacher.subjects.slice(0, 2).map((subject, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {subject.length > 20 ? subject.substring(0, 20) + "..." : subject}
                                                </Badge>
                                            ))}
                                            {teacher.subjects.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{teacher.subjects.length - 2} lagi
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        <div>{teacher.phone}</div>
                                        <div className="text-xs">{teacher.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={teacher.status === "Aktif" ? "default" : "secondary"}>
                                            {teacher.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(teacher)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(teacher.id)}>
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Data Guru" : "Tambah Guru Baru"}</DialogTitle>
                        <DialogDescription>
                            Lengkapi form di bawah untuk {isEditing ? "memperbarui" : "menambahkan"} data guru
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nip">NIP *</Label>
                                <Input
                                    id="nip"
                                    value={currentTeacher.nip || ""}
                                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, nip: e.target.value })}
                                    placeholder="198501012010011001"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    value={currentTeacher.name || ""}
                                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
                                    placeholder="Nama guru"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <Select
                                value={currentTeacher.gender}
                                onValueChange={(value: any) => setCurrentTeacher({ ...currentTeacher, gender: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Laki-laki</SelectItem>
                                    <SelectItem value="P">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="phone">No. HP</Label>
                                <Input
                                    id="phone"
                                    value={currentTeacher.phone || ""}
                                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, phone: e.target.value })}
                                    placeholder="08123456789"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={currentTeacher.email || ""}
                                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
                                    placeholder="guru@smk.sch.id"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Mata Pelajaran yang Diampu</Label>
                            <div className="border rounded-md p-4 space-y-2 max-h-48 overflow-y-auto">
                                {availableSubjects.map((subject) => (
                                    <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={currentTeacher.subjects?.includes(subject) || false}
                                            onChange={(e) => {
                                                const subjects = currentTeacher.subjects || [];
                                                if (e.target.checked) {
                                                    setCurrentTeacher({ ...currentTeacher, subjects: [...subjects, subject] });
                                                } else {
                                                    setCurrentTeacher({ ...currentTeacher, subjects: subjects.filter(s => s !== subject) });
                                                }
                                            }}
                                            className="rounded"
                                        />
                                        <span className="text-sm">{subject}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={currentTeacher.status}
                                onValueChange={(value: any) => setCurrentTeacher({ ...currentTeacher, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Aktif">Aktif</SelectItem>
                                    <SelectItem value="Nonaktif">Nonaktif</SelectItem>
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
