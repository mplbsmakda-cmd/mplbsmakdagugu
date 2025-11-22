"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TreasurerDashboard() {
    const monthlyRevenue = [
        { month: 'Jul', income: 135000000 },
        { month: 'Aug', income: 132000000 },
        { month: 'Sep', income: 140000000 },
        { month: 'Okt', income: 138000000 },
        { month: 'Nov', income: 125500000 },
    ];

    const paymentStatus = [
        { name: 'Lunas', value: 152, color: '#10b981' },
        { name: 'Sebagian', value: 12, color: '#f59e0b' },
        { name: 'Belum Lunas', value: 34, color: '#ef4444' },
    ];

    const classPayments = [
        { class: 'X MPLB 1', paid: 28, unpaid: 4 },
        { class: 'X MPLB 2', paid: 25, unpaid: 5 },
        { class: 'XI MPLB 1', paid: 27, unpaid: 4 },
        { class: 'XI MPLB 2', paid: 24, unpaid: 7 },
        { class: 'XII MPLB 1', paid: 26, unpaid: 5 },
        { class: 'XII MPLB 2', paid: 22, unpaid: 9 },
    ];

    const recentPayments = [
        { name: "Siti Aminah", class: "X MPLB 1", amount: "Rp 750.000", time: "2 jam lalu" },
        { name: "Budi Santoso", class: "X MPLB 2", amount: "Rp 750.000", time: "3 jam lalu" },
        { name: "Dewi Lestari", class: "XI MPLB 1", amount: "Rp 750.000", time: "5 jam lalu" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Bendahara</h1>
                    <p className="text-muted-foreground">Ringkasan keuangan sekolah</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                    <p className="font-medium">Periode: November 2023</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Rp 125.5jt</div>
                        <p className="text-xs text-muted-foreground">Bulan ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Siswa Lunas</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">152</div>
                        <p className="text-xs text-muted-foreground">dari 186 siswa</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tunggakan</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">34</div>
                        <p className="text-xs text-muted-foreground">Siswa belum lunas</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Persentase</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">81.7%</div>
                        <p className="text-xs text-muted-foreground">Tingkat pembayaran</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Monthly Revenue */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trend Pemasukan SPP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Pemasukan"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Payment Status Pie */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={paymentStatus}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {paymentStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Class Payments Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Pembayaran per Kelas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={classPayments}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="class" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="paid" fill="#10b981" name="Lunas" stackId="a" />
                            <Bar dataKey="unpaid" fill="#ef4444" name="Belum Lunas" stackId="a" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Recent Payments and Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Pembayaran Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentPayments.map((payment, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{payment.name}</p>
                                        <p className="text-sm text-muted-foreground">{payment.class}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600">{payment.amount}</p>
                                        <p className="text-xs text-muted-foreground">{payment.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <a href="/dashboard/treasurer/payments" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Input Pembayaran</p>
                                <p className="text-xs text-muted-foreground">Catat pembayaran siswa</p>
                            </div>
                        </a>
                        <a href="/dashboard/treasurer/reports" className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Laporan Keuangan</p>
                                <p className="text-xs text-muted-foreground">Lihat laporan lengkap</p>
                            </div>
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
