"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search, BookOpen } from "lucide-react";
import { toast } from "sonner";

type ClassItem = {
    id: number;
    name: string;
    grade: "X" | "XI" | "XII";
    major: string;
    homeroomTeacher: string;
    totalStudents: number;
};

export default function ClassManagementPage() {
    const [classes, setClasses] = useState<ClassItem[]>([
        { id: 1, name: "X MPLB 1", grade: "X", major: "Manajemen Perkantoran", homeroomTeacher: "Budi Santoso", totalStudents: 32 },
        { id: 2, name: "X MPLB 2", grade: "X", major: "Manajemen Perkantoran", homeroomTeacher: "Siti Rahma", totalStudents: 30 },
        { id: 3, name: "XI MPLB 1", grade: "XI", major: "Manajemen Perkantoran", homeroomTeacher: "Dedi Mulyadi", totalStudents: 31 },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentClass, setCurrentClass] = useState<Partial<ClassItem>>({});
    const [isEditing, setIsEditing] = useState(false);

    const handleOpenDialog = (classItem?: ClassItem) => {
        if (classItem) {
            setCurrentClass(classItem);
            setIsEditing(true);
        } else {
            setCurrentClass({ grade: "X", major: "Manajemen Perkantoran" });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentClass.name || !currentClass.homeroomTeacher) {
            toast.error("Nama Kelas dan Wali Kelas wajib diisi");
            return;
        }

        if (isEditing) {
            setClasses(classes.map(c => c.id === currentClass.id ? currentClass as ClassItem : c));
            toast.success("Data kelas berhasil diperbarui");
        } else {
            const newClass = { ...currentClass, id: classes.length + 1, totalStudents: 0 } as ClassItem;
            setClasses([...classes, newClass]);
            toast.success("Kelas baru berhasil ditambahkan");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
            setClasses(classes.filter(c => c.id !== id));
            toast.success("Kelas berhasil dihapus");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Kelas</h1>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Kelas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Kelas</TableHead>
                                <TableHead>Tingkat</TableHead>
                                <TableHead>Jurusan</TableHead>
                                <TableHead>Wali Kelas</TableHead>
                                <TableHead className="text-center">Jumlah Siswa</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classes.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.grade}</TableCell>
                                    <TableCell>{item.major}</TableCell>
                                    <TableCell>{item.homeroomTeacher}</TableCell>
                                    <TableCell className="text-center">{item.totalStudents}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}>
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
                        <DialogTitle>{isEditing ? "Edit Kelas" : "Tambah Kelas Baru"}</DialogTitle>
                        <DialogDescription>
                            Kelola data kelas dan wali kelas.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Kelas</Label>
                            <Input
                                id="name"
                                value={currentClass.name || ""}
                                onChange={(e) => setCurrentClass({ ...currentClass, name: e.target.value })}
                                placeholder="Contoh: X MPLB 1"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="grade">Tingkat</Label>
                            <Select
                                value={currentClass.grade}
                                onValueChange={(value: any) => setCurrentClass({ ...currentClass, grade: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Tingkat" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="X">Kelas X</SelectItem>
                                    <SelectItem value="XI">Kelas XI</SelectItem>
                                    <SelectItem value="XII">Kelas XII</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="major">Jurusan</Label>
                            <Input
                                id="major"
                                value={currentClass.major || ""}
                                onChange={(e) => setCurrentClass({ ...currentClass, major: e.target.value })}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="homeroomTeacher">Wali Kelas</Label>
                            <Input
                                id="homeroomTeacher"
                                value={currentClass.homeroomTeacher || ""}
                                onChange={(e) => setCurrentClass({ ...currentClass, homeroomTeacher: e.target.value })}
                                placeholder="Nama Wali Kelas"
                            />
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
