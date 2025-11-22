"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, Download, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type Student = {
    id: string;
    nis: string;
    nisn?: string;
    full_name: string;
    gender: string;
    class_name?: string;
    class_id?: string;
    phone?: string;
    date_of_birth?: string;
    address?: string;
};

type Class = {
    id: string;
    name: string;
};

export default function StudentManagementPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterClass, setFilterClass] = useState("all");

    // Fetch students dari Supabase
    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, []);

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('students')
                .select(`
                    id,
                    nis,
                    nisn,
                    gender,
                    date_of_birth,
                    address,
                    class_id,
                    users (
                        id,
                        full_name,
                        phone
                    ),
                    classes (
                        id,
                        name
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedStudents = (data || []).map((s: any) => ({
                id: s.id,
                nis: s.nis,
                nisn: s.nisn || '',
                full_name: s.users?.full_name || 'N/A',
                gender: s.gender || '',
                class_name: s.classes?.name || 'Belum ada kelas',
                class_id: s.class_id || '',
                phone: s.users?.phone || '',
                date_of_birth: s.date_of_birth || '',
                address: s.address || '',
            }));

            setStudents(formattedStudents);
        } catch (error: any) {
            toast.error("Gagal memuat data siswa: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClasses = async () => {
        try {
            const { data, error } = await supabase
                .from('classes')
                .select('id, name')
                .order('name');

            if (error) throw error;
            setClasses(data || []);
        } catch (error: any) {
            toast.error("Gagal memuat data kelas: " + error.message);
        }
    };

    const handleOpenDialog = (student?: Student) => {
        if (student) {
            setCurrentStudent(student);
            setIsEditing(true);
        } else {
            setCurrentStudent({
                gender: "Laki-laki",
                class_id: classes[0]?.id || ''
            });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!currentStudent.nis || !currentStudent.full_name) {
            toast.error("NIS dan Nama wajib diisi");
            return;
        }

        setIsSaving(true);
        try {
            if (isEditing && currentStudent.id) {
                // Update existing student
                const { error: updateError } = await supabase
                    .from('students')
                    .update({
                        nisn: currentStudent.nisn,
                        gender: currentStudent.gender,
                        class_id: currentStudent.class_id,
                        date_of_birth: currentStudent.date_of_birth,
                        address: currentStudent.address,
                    })
                    .eq('id', currentStudent.id);

                if (updateError) throw updateError;
                toast.success("Data siswa berhasil diperbarui");
            } else {
                // Create new student
                // Note: Anda perlu membuat user terlebih dahulu, lalu student
                // Untuk demo, kita skip create user
                toast.info("Fitur tambah siswa baru memerlukan pembuatan user dulu");
                setIsDialogOpen(false);
                setIsSaving(false);
                return;
            }

            await fetchStudents();
            setIsDialogOpen(false);
        } catch (error: any) {
            toast.error("Gagal menyimpan data: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('students')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast.success("Siswa berhasil dihapus");
            await fetchStudents();
        } catch (error: any) {
            toast.error("Gagal menghapus siswa: " + error.message);
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.nis.includes(searchQuery);
        const matchesClass = filterClass === "all" || student.class_id === filterClass;
        return matchesSearch && matchesClass;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Siswa</h1>
                    <p className="text-muted-foreground">Kelola data siswa dan penempatan kelas</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" disabled>
                        <Upload className="mr-2 h-4 w-4" />
                        Import
                    </Button>
                    <Button variant="outline" disabled>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button onClick={() => handleOpenDialog()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Siswa
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Daftar Siswa ({filteredStudents.length})</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari NIS atau nama..."
                                    className="pl-8 w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={filterClass} onValueChange={setFilterClass}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Filter Kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kelas</SelectItem>
                                    {classes.map(cls => (
                                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>NIS</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>JK</TableHead>
                                    <TableHead>Kelas</TableHead>
                                    <TableHead>No. HP</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                            Tidak ada data siswa
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.nis}</TableCell>
                                            <TableCell>{student.full_name}</TableCell>
                                            <TableCell>{student.gender === 'Laki-laki' ? 'L' : 'P'}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{student.class_name}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{student.phone || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(student)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(student.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Data Siswa" : "Tambah Siswa Baru"}</DialogTitle>
                        <DialogDescription>
                            Lengkapi form di bawah untuk {isEditing ? "memperbarui" : "menambahkan"} data siswa
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nis">NIS *</Label>
                                <Input
                                    id="nis"
                                    value={currentStudent.nis || ""}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, nis: e.target.value })}
                                    placeholder="2023001"
                                    disabled={isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nisn">NISN</Label>
                                <Input
                                    id="nisn"
                                    value={currentStudent.nisn || ""}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, nisn: e.target.value })}
                                    placeholder="0012345678"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Lengkap *</Label>
                            <Input
                                id="name"
                                value={currentStudent.full_name || ""}
                                onChange={(e) => setCurrentStudent({ ...currentStudent, full_name: e.target.value })}
                                placeholder="Nama siswa"
                                disabled={isEditing}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <Select
                                    value={currentStudent.gender}
                                    onValueChange={(value) => setCurrentStudent({ ...currentStudent, gender: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="class">Kelas</Label>
                                <Select
                                    value={currentStudent.class_id}
                                    onValueChange={(value) => setCurrentStudent({ ...currentStudent, class_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map(cls => (
                                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                value={currentStudent.address || ""}
                                onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })}
                                placeholder="Alamat lengkap"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
                            Batal
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
