"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, BookOpen, Users, Trophy, Building2 } from "lucide-react";

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar for Landing Page */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold text-primary">SMK LPPM RI 2</span>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link href="#" className="text-sm font-medium hover:text-primary">Beranda</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary">Profil</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary">Galeri</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary">Kontak</Link>
                    </nav>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <div className="container relative z-10">
                        <motion.div
                            className="max-w-3xl mx-auto text-center space-y-6"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants}>
                                <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
                                    Manajemen Perkantoran & Layanan Bisnis
                                </span>
                            </motion.div>
                            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                                Mencetak Generasi Profesional dan Kompeten
                            </motion.h1>
                            <motion.p variants={itemVariants} className="text-lg text-muted-foreground md:text-xl">
                                Siap menghadapi dunia kerja dengan keahlian administrasi modern dan teknologi digital.
                            </motion.p>
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" className="gap-2">
                                    Daftar Sekarang <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline">
                                    Pelajari Lebih Lanjut
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-background">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-primary mb-4">Keunggulan Jurusan</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Fasilitas dan kurikulum terbaik untuk menunjang pembelajaran siswa.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-900">
                                <CardHeader>
                                    <BookOpen className="h-10 w-10 text-secondary mb-2" />
                                    <CardTitle>Kurikulum Merdeka</CardTitle>
                                    <CardDescription>
                                        Pembelajaran berbasis proyek yang relevan dengan kebutuhan industri saat ini.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-900">
                                <CardHeader>
                                    <Users className="h-10 w-10 text-secondary mb-2" />
                                    <CardTitle>Digitalisasi Sekolah</CardTitle>
                                    <CardDescription>
                                        Sistem informasi terintegrasi untuk siswa, guru, dan orang tua.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-900">
                                <CardHeader>
                                    <Trophy className="h-10 w-10 text-secondary mb-2" />
                                    <CardTitle>Prestasi & Ekstrakurikuler</CardTitle>
                                    <CardDescription>
                                        Wadah pengembangan bakat dan minat siswa di berbagai bidang.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Role Access Section */}
                <section className="py-20 bg-slate-50 dark:bg-slate-950">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-primary mb-4">Akses Portal</h2>
                            <p className="text-muted-foreground">
                                Silakan login sesuai dengan peran Anda.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { role: "Admin", desc: "Pengelolaan Sistem", href: "/dashboard/admin" },
                                { role: "Guru", desc: "Manajemen Kelas", href: "/dashboard/teacher" },
                                { role: "Siswa", desc: "Pembelajaran", href: "/dashboard/student" },
                                { role: "Orang Tua", desc: "Monitoring", href: "/dashboard/parent" },
                            ].map((item) => (
                                <Link key={item.role} href={item.href}>
                                    <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-primary/10 hover:border-primary/30">
                                        <CardHeader>
                                            <CardTitle className="text-center text-primary">{item.role}</CardTitle>
                                            <CardDescription className="text-center">{item.desc}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex justify-center">
                                            <ArrowRight className="h-6 w-6 text-muted-foreground" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
