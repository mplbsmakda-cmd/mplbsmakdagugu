"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function TreasurerReportsPage() {
    const handleExport = (type: string) => {
        toast.success(`Laporan ${type} berhasil diexport`);
    };

    const monthlyData = [
        { month: "Juli 2023", income: 135000000, expenses: 45000000, balance: 90000000 },
        { month: "Agustus 2023", income: 132000000, expenses: 48000000, balance: 84000000 },
        { month: "September 2023", income: 140000000, expenses: 52000000, balance: 88000000 },
        { month: "Oktober 2023", income: 138000000, expenses: 46000000, balance: 92000000 },
        { month: "November 2023", income: 125500000, expenses: 42000000, balance: 83500000 },
    ];

    const classSummary = [
        { class: "X MPLB 1", total: 32, paid: 28, unpaid: 4, percentage: 87.5 },
        { class: "X MPLB 2", total: 30, paid: 25, unpaid: 5, percentage: 83.3 },
        { class: "XI MPLB 1", total: 31, paid: 27, unpaid: 4, percentage: 87.1 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h1>
                    <p className="text-muted-foreground">Analisis keuangan sekolah</p>
                </div>
                <Button onClick={() => handleExport("Keuangan")}>
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Rp 670.500.000</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                        <DollarSign className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">Rp 233.000.000</div>
                        <p className="text-xs text-muted-foreground">Semester ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saldo</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">Rp 437.500.000</div>
                        <p className="text-xs text-muted-foreground">Akumulasi</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="monthly" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="monthly">Laporan Bulanan</TabsTrigger>
                    <TabsTrigger value="class">Per Kelas</TabsTrigger>
                </TabsList>

                <TabsContent value="monthly" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Pemasukan & Pengeluaran Bulanan</CardTitle>
                                <Select defaultValue="semester1">
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semester1">Semester 1</SelectItem>
                                        <SelectItem value="semester2">Semester 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {monthlyData.map((data, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <h4 className="font-semibold text-lg mb-4">{data.month}</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Pemasukan</p>
                                                <p className="text-xl font-bold text-green-600">
                                                    Rp {data.income.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Pengeluaran</p>
                                                <p className="text-xl font-bold text-red-600">
                                                    Rp {data.expenses.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Saldo</p>
                                                <p className="text-xl font-bold text-blue-600">
                                                    Rp {data.balance.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="class" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pembayaran Per Kelas - November 2023</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {classSummary.map((item, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-lg">{item.class}</h4>
                                            <span className="text-2xl font-bold text-green-600">{item.percentage}%</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Siswa</p>
                                                <p className="text-xl font-bold">{item.total}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Lunas</p>
                                                <p className="text-xl font-bold text-green-600">{item.paid}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Belum Lunas</p>
                                                <p className="text-xl font-bold text-red-600">{item.unpaid}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
