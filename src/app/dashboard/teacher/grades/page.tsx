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
import { Save, Download } from "lucide-react";
import { toast } from "sonner";

type StudentGrade = {
    id: number;
    nis: string;
    name: string;
    uts: number;
    uas: number;
    tugas: number;
    kehadiran: number;
    final: number;
    grade: string;
};

export default function TeacherGradesPage() {
    const [selectedClass, setSelectedClass] = useState("X MPLB 1");
    const [selectedSubject, setSelectedSubject] = useState("Dasar-dasar Manajemen Perkantoran");

    const classes = ["X MPLB 1", "X MPLB 2", "XI MPLB 1"];
    const subjects = ["Dasar-dasar Manajemen Perkantoran", "Teknologi Perkantoran"];

    const [grades, setGrades] = useState<StudentGrade[]>([
        { id: 1, nis: "2023001", name: "Siti Aminah", uts: 85, uas: 88, tugas: 90, kehadiran: 95, final: 87, grade: "A-" },
        { id: 2, nis: "2023002", name: "Budi Santoso", uts: 78, uas: 80, tugas: 85, kehadiran: 90, final: 80, grade: "B" },
        { id: 3, nis: "2023003", name: "Dewi Lestari", uts: 92, uas: 95, tugas: 93, kehadiran: 98, final: 94, grade: "A" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Partial<StudentGrade>>({});

    const handleOpenDialog = (student: StudentGrade) => {
        setCurrentStudent(student);
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentStudent.uts || !currentStudent.uas) {
            toast.error("Nilai UTS dan UAS wajib diisi");
            return;
        }

        // Calculate final grade
        const uts = Number(currentStudent.uts) || 0;
        const uas = Number(currentStudent.uas) || 0;
        const tugas = Number(currentStudent.tugas) || 0;
        const kehadiran = Number(currentStudent.kehadiran) || 0;

        const final = Math.round((uts * 0.3) + (uas * 0.4) + (tugas * 0.2) + (kehadiran * 0.1));

        let grade = "";
        if (final >= 90) grade = "A";
        else if (final >= 85) grade = "A-";
        else if (final >= 80) grade = "B+";
        else if (final >= 75) grade = "B";
        else if (final >= 70) grade = "B-";
        else if (final >= 65) grade = "C+";
        else if (final >= 60) grade = "C";
        else grade = "D";

        const updatedStudent = { ...currentStudent, final, grade } as StudentGrade;

        setGrades(grades.map(g => g.id === currentStudent.id ? updatedStudent : g));
        toast.success("Nilai berhasil disimpan");
        setIsDialogOpen(false);
    };

    const handleSaveAll = () => {
        toast.success("Semua nilai berhasil disimpan");
    };

    const handleExport = () => {
        toast.success("Data nilai berhasil diexport");
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Input Nilai</h1>
                    <p className="text-muted-foreground">Kelola nilai siswa per kelas dan mata pelajaran</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button onClick={handleSaveAll}>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Semua
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="grid gap-2">
                            <Label>Kelas</Label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger className="w-40">
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
                            <Label>Mata Pelajaran</Label>
                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                <SelectTrigger className="w-64">
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
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Nilai {selectedClass} - {selectedSubject}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIS</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="text-center">UTS</TableHead>
                                <TableHead className="text-center">UAS</TableHead>
                                <TableHead className="text-center">Tugas</TableHead>
                                <TableHead className="text-center">Kehadiran</TableHead>
                                <TableHead className="text-center">Nilai Akhir</TableHead>
                                <TableHead className="text-center">Predikat</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grades.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.nis}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell className="text-center font-semibold">{student.uts}</TableCell>
                                    <TableCell className="text-center font-semibold">{student.uas}</TableCell>
                                    <TableCell className="text-center font-semibold">{student.tugas}</TableCell>
                                    <TableCell className="text-center font-semibold">{student.kehadiran}</TableCell>
                                    <TableCell className="text-center font-bold text-lg">{student.final}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={getGradeColor(student.grade)}>
                                            {student.grade}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog(student)}>
                                            Edit
                                        </Button>
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
                        <DialogTitle>Input Nilai - {currentStudent.name}</DialogTitle>
                        <DialogDescription>
                            {currentStudent.nis} - {selectedClass}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="uts">Nilai UTS (30%) *</Label>
                                <Input
                                    id="uts"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={currentStudent.uts || ""}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, uts: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="uas">Nilai UAS (40%) *</Label>
                                <Input
                                    id="uas"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={currentStudent.uas || ""}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, uas: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="tugas">Nilai Tugas (20%)</Label>
                                <Input
                                    id="tugas"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={currentStudent.tugas || ""}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, tugas: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="kehadiran">Nilai Kehadiran (10%)</Label>
                                <Input
                                    id="kehadiran"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={currentStudent.kehadiran || ""}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, kehadiran: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <div className="rounded-lg border p-4 bg-muted/50">
                            <p className="text-sm text-muted-foreground mb-2">Formula Penilaian:</p>
                            <p className="text-sm font-medium">
                                Nilai Akhir = (UTS × 30%) + (UAS × 40%) + (Tugas × 20%) + (Kehadiran × 10%)
                            </p>
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
