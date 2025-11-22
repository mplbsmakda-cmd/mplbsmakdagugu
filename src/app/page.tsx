"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, Globe, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const features = [
        { icon: BookOpen, title: "Kurikulum Modern", description: "Pembelajaran berbasis kompetensi dengan teknologi terkini" },
        { icon: Users, title: "Tenaga Pengajar Profesional", description: "Guru-guru berpengalaman dan berkualitas" },
        { icon: Award, title: "Sertifikasi Internasional", description: "Program sertifikasi untuk meningkatkan daya saing" },
        { icon: Globe, title: "Jaringan Industri Luas", description: "Kerjasama dengan perusahaan terkemuka" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="container relative mx-auto px-4 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-medium">Portal Akademik Digital</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-secondary mb-6">
                            SMK LPPM RI 2 Kedungreja
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                            Jurusan Manajemen Perkantoran dan Layanan Bisnis
                        </p>

                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Mempersiapkan tenaga profesional di bidang administrasi perkantoran dengan teknologi dan keterampilan bisnis modern untuk menghadapi tantangan industri 4.0
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/login">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 group">
                                    Masuk ke Portal
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button size="lg" variant="outline">
                                    Pelajari Lebih Lanjut
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Keunggulan Program</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Program studi yang komprehensif dengan fasilitas modern dan dukungan penuh untuk kesuksesan karir Anda
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="h-full hover:shadow-xl transition-shadow border-primary/10">
                                    <CardHeader>
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                            <feature.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Siap Memulai Perjalanan Anda?
                            </h2>
                            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                                Bergabunglah dengan ribuan siswa yang telah memulai karir profesional mereka bersama kami
                            </p>
                            <Link href="/login">
                                <Button size="lg" variant="secondary" className="shadow-xl group">
                                    Akses Portal Sekarang
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
