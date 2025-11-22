"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Search, Download, Plus } from "lucide-react";
import { toast } from "sonner";

type Payment = {
    id: number;
    nis: string;
    name: string;
    class: string;
    month: string;
    amount: number;
    status: "Lunas" | "Belum Lunas" | "Sebagian";
    paidDate?: string;
    remaining?: number;
};

export default function TreasurerPaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([
        { id: 1, nis: "2023001", name: "Siti Aminah", class: "X MPLB 1", month: "November 2023", amount: 750000, status: "Lunas", paidDate: "2023-11-05" },
        { id: 2, nis: "2023002", name: "Budi Santoso", class: "X MPLB 2", month: "November 2023", amount: 750000, status: "Lunas", paidDate: "2023-11-08" },
        { id: 3, nis: "2023003", name: "Dewi Lestari", class: "XI MPLB 1", month: "November 2023", amount: 750000, status: "Sebagian", paidDate: "2023-11-10", remaining: 250000 },
        { id: 4, nis: "2023004", name: "Ahmad Fauzi", class: "X MPLB 1", month: "November 2023", amount: 750000, status: "Belum Lunas" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPayment, setCurrentPayment] = useState<Partial<Payment>>({});
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpenDialog = (payment?: Payment) => {
        if (payment) {
            setCurrentPayment(payment);
        } else {
            setCurrentPayment({ month: "November 2023", amount: 750000 });
        }
        setIsDialogOpen(true);
    };

    const handleSavePayment = () => {
        if (!currentPayment.nis || !currentPayment.amount) {
            toast.error("NIS dan Jumlah wajib diisi");
            return;
        }

        if (currentPayment.id) {
            setPayments(payments.map(p => p.id === currentPayment.id ? currentPayment as Payment : p));
            toast.success("Pembayaran berhasil diperbarui");
        } else {
            const newPayment = {
                ...currentPayment,
                id: payments.length + 1,
                status: "Lunas" as const,
                paidDate: new Date().toISOString().split('T')[0]
            } as Payment;
            setPayments([...payments, newPayment]);
            toast.success("Pembayaran berhasil dicatat");
        }
        setIsDialogOpen(false);
    };

    const filteredPayments = payments.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nis.includes(searchQuery) ||
        p.class.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExport = () => {
        toast.success("Data pembayaran berhasil diexport");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pembayaran SPP</h1>
                    <p className="text-muted-foreground">Kelola pembayaran siswa</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button onClick={() => handleOpenDialog()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Input Pembayaran
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{payments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lunas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {payments.filter(p => p.status === "Lunas").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sebagian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {payments.filter(p => p.status === "Sebagian").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Belum Lunas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {payments.filter(p => p.status === "Belum Lunas").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="all">Semua</TabsTrigger>
                        <TabsTrigger value="lunas">Lunas</TabsTrigger>
                        <TabsTrigger value="belum">Belum Lunas</TabsTrigger>
                    </TabsList>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari NIS, nama, atau kelas..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="all">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Pembayaran - November 2023</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NIS</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Kelas</TableHead>
                                        <TableHead className="text-right">Jumlah</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead>Tanggal Bayar</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPayments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">{payment.nis}</TableCell>
                                            <TableCell>{payment.name}</TableCell>
                                            <TableCell>{payment.class}</TableCell>
                                            <TableCell className="text-right font-semibold">
                                                Rp {payment.amount.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={
                                                    payment.status === "Lunas" ? "default" :
                                                        payment.status === "Sebagian" ? "secondary" : "destructive"
                                                }>
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {payment.paidDate || "-"}
                                                {payment.remaining && (
                                                    <p className="text-xs text-red-600">Sisa: Rp {payment.remaining.toLocaleString('id-ID')}</p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => handleOpenDialog(payment)}>
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="lunas">
                    <Card>
                        <CardContent className="pt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NIS</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Kelas</TableHead>
                                        <TableHead className="text-right">Jumlah</TableHead>
                                        <TableHead>Tanggal Bayar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.filter(p => p.status === "Lunas").map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">{payment.nis}</TableCell>
                                            <TableCell>{payment.name}</TableCell>
                                            <TableCell>{payment.class}</TableCell>
                                            <TableCell className="text-right font-semibold">
                                                Rp {payment.amount.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell>{payment.paidDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="belum">
                    <Card>
                        <CardContent className="pt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NIS</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Kelas</TableHead>
                                        <TableHead className="text-right">Jumlah</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.filter(p => p.status === "Belum Lunas").map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">{payment.nis}</TableCell>
                                            <TableCell>{payment.name}</TableCell>
                                            <TableCell>{payment.class}</TableCell>
                                            <TableCell className="text-right font-semibold text-red-600">
                                                Rp {payment.amount.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" onClick={() => handleOpenDialog(payment)}>
                                                    <DollarSign className="mr-2 h-4 w-4" />
                                                    Input Bayar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Input Pembayaran SPP</DialogTitle>
                        <DialogDescription>
                            Catat pembayaran SPP siswa
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nis">NIS Siswa</Label>
                            <Input
                                id="nis"
                                value={currentPayment.nis || ""}
                                onChange={(e) => setCurrentPayment({ ...currentPayment, nis: e.target.value })}
                                placeholder="2023001"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Siswa</Label>
                            <Input
                                id="name"
                                value={currentPayment.name || ""}
                                onChange={(e) => setCurrentPayment({ ...currentPayment, name: e.target.value })}
                                placeholder="Nama lengkap"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="class">Kelas</Label>
                            <Select
                                value={currentPayment.class}
                                onValueChange={(value) => setCurrentPayment({ ...currentPayment, class: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="X MPLB 1">X MPLB 1</SelectItem>
                                    <SelectItem value="X MPLB 2">X MPLB 2</SelectItem>
                                    <SelectItem value="XI MPLB 1">XI MPLB 1</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Jumlah Bayar (Rp)</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={currentPayment.amount || ""}
                                onChange={(e) => setCurrentPayment({ ...currentPayment, amount: parseInt(e.target.value) })}
                                placeholder="750000"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="month">Bulan</Label>
                            <Input
                                id="month"
                                value={currentPayment.month || ""}
                                onChange={(e) => setCurrentPayment({ ...currentPayment, month: e.target.value })}
                                placeholder="November 2023"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                        <Button onClick={handleSavePayment}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
