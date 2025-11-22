"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

type User = {
    id: number;
    name: string;
    username: string;
    role: "admin" | "teacher" | "student" | "parent";
    status: "active" | "inactive";
};

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: "Admin Utama", username: "admin", role: "admin", status: "active" },
        { id: 2, name: "Budi Santoso", username: "guru01", role: "teacher", status: "active" },
        { id: 3, name: "Siti Aminah", username: "siswa01", role: "student", status: "active" },
        { id: 4, name: "Pak Ahmad", username: "wali01", role: "parent", status: "active" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<User>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpenDialog = (user?: User) => {
        if (user) {
            setCurrentUser(user);
            setIsEditing(true);
        } else {
            setCurrentUser({ role: "student", status: "active" });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!currentUser.name || !currentUser.username) {
            toast.error("Nama dan Username wajib diisi");
            return;
        }

        if (isEditing) {
            setUsers(users.map(u => u.id === currentUser.id ? currentUser as User : u));
            toast.success("Data user berhasil diperbarui");
        } else {
            const newUser = { ...currentUser, id: users.length + 1 } as User;
            setUsers([...users, newUser]);
            toast.success("User baru berhasil ditambahkan");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
            setUsers(users.filter(u => u.id !== id));
            toast.success("User berhasil dihapus");
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manajemen User</h1>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Daftar Pengguna</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari user..."
                                className="pl-8"
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
                                <TableHead>Nama Lengkap</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                                user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                                                    user.role === 'student' ? 'bg-green-100 text-green-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(user)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(user.id)}>
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
                        <DialogTitle>{isEditing ? "Edit User" : "Tambah User Baru"}</DialogTitle>
                        <DialogDescription>
                            Isi form berikut untuk {isEditing ? "mengubah data" : "menambahkan"} user.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={currentUser.name || ""}
                                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={currentUser.username || ""}
                                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={currentUser.role}
                                onValueChange={(value: any) => setCurrentUser({ ...currentUser, role: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="teacher">Guru</SelectItem>
                                    <SelectItem value="student">Siswa</SelectItem>
                                    <SelectItem value="parent">Wali Murid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={currentUser.status}
                                onValueChange={(value: any) => setCurrentUser({ ...currentUser, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Nonaktif</SelectItem>
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
