"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search, Calendar } from "lucide-react";
import { toast } from "sonner";

type Announcement = {
    id: number;
    title: string;
    content: string;
    date: string;
    category: "Akademik" | "Umum" | "Keuangan";
};

export default function AnnouncementManagementPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([
        {
            id: 1,
            title: "Rapat Wali Murid Semester Ganjil",
            content: "Diberitahukan kepada seluruh wali murid...",
            date: "2023-11-25",
            category: "Akademik"
        },
        {
            id: 2,
            title: "Libur Semester Ganjil",
            content: "Kegiatan belajar mengajar semester ganjil akan berakhir...",
            date: "2023-12-15",
            category: "Umum"
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState<Partial<Announcement>>({});
    const [isEditing, setIsEditing] = useState(false);

    const handleOpenDialog = (announcement?: Announcement) => {
        if (announcement) {
            setCurrentAnnouncement(announcement);
            setIsEditing(true);
        } else {
            setCurrentAnnouncement({ date: new Date().toISOString().split('T')[0], category: "Umum" });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentAnnouncement.title || !currentAnnouncement.content) {
            toast.error("Judul dan Isi Pengumuman wajib diisi");
            return;
        }

        if (isEditing) {
            setAnnouncements(announcements.map(a => a.id === currentAnnouncement.id ? currentAnnouncement as Announcement : a));
            toast.success("Pengumuman berhasil diperbarui");
        } else {
            const newAnnouncement = { ...currentAnnouncement, id: announcements.length + 1 } as Announcement;
            setAnnouncements([...announcements, newAnnouncement]);
            toast.success("Pengumuman baru berhasil ditambahkan");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            setAnnouncements(announcements.filter(a => a.id !== id));
            toast.success("Pengumuman berhasil dihapus");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengumuman</h1>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Pengumuman
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Pengumuman</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {announcements.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {item.category}
                                        </span>
                                    </TableCell>
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
                        <DialogTitle>{isEditing ? "Edit Pengumuman" : "Buat Pengumuman Baru"}</DialogTitle>
                        <DialogDescription>
                            Sampaikan informasi penting kepada warga sekolah.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Judul Pengumuman</Label>
                            <Input
                                id="title"
                                value={currentAnnouncement.title || ""}
                                onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select
                                value={currentAnnouncement.category}
                                onValueChange={(value: any) => setCurrentAnnouncement({ ...currentAnnouncement, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Akademik">Akademik</SelectItem>
                                    <SelectItem value="Umum">Umum</SelectItem>
                                    <SelectItem value="Keuangan">Keuangan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">Tanggal</Label>
                            <Input
                                id="date"
                                type="date"
                                value={currentAnnouncement.date || ""}
                                onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, date: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Isi Pengumuman</Label>
                            <Input
                                id="content"
                                value={currentAnnouncement.content || ""}
                                onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, content: e.target.value })}
                                placeholder="Tulis isi pengumuman di sini..."
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
