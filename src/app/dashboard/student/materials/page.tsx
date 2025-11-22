"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Video, Link as LinkIcon, BookOpen } from "lucide-react";
import { toast } from "sonner";

type Material = {
    id: number;
    title: string;
    subject: string;
    type: "pdf" | "video" | "link";
    size?: string;
    uploadDate: string;
    teacher: string;
};

export default function StudentMaterialsPage() {
    const materials: Material[] = [
        {
            id: 1,
            title: "Modul Dasar-dasar Manajemen Perkantoran",
            subject: "Dasar-dasar Manajemen Perkantoran",
            type: "pdf",
            size: "2.5 MB",
            uploadDate: "2023-11-15",
            teacher: "Budi Santoso, S.Pd"
        },
        {
            id: 2,
            title: "Video Tutorial Microsoft Office",
            subject: "Teknologi Perkantoran",
            type: "video",
            size: "125 MB",
            uploadDate: "2023-11-18",
            teacher: "Budi Santoso, S.Pd"
        },
        {
            id: 3,
            title: "Link Referensi Korespondensi Bisnis",
            subject: "Korespondensi",
            type: "link",
            uploadDate: "2023-11-20",
            teacher: "Tri Handayani, S.Pd"
        },
        {
            id: 4,
            title: "Panduan Sistem Kearsipan Digital",
            subject: "Kearsipan",
            type: "pdf",
            size: "1.8 MB",
            uploadDate: "2023-11-10",
            teacher: "Dian Permata, S.Sos"
        },
    ];

    const handleDownload = (title: string) => {
        toast.success(`Mengunduh: ${title}`);
    };

    const handleOpenLink = (title: string) => {
        toast.success(`Membuka: ${title}`);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "pdf":
                return <FileText className="h-8 w-8 text-red-600" />;
            case "video":
                return <Video className="h-8 w-8 text-blue-600" />;
            case "link":
                return <LinkIcon className="h-8 w-8 text-green-600" />;
            default:
                return <FileText className="h-8 w-8" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "pdf":
                return "PDF Document";
            case "video":
                return "Video";
            case "link":
                return "Link Eksternal";
            default:
                return type;
        }
    };

    const subjects = [...new Set(materials.map(m => m.subject))];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Materi Pembelajaran</h1>
                <p className="text-muted-foreground">Akses materi dan sumber belajar dari guru</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Materi</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{materials.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">PDF</CardTitle>
                        <FileText className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{materials.filter(m => m.type === "pdf").length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Video</CardTitle>
                        <Video className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{materials.filter(m => m.type === "video").length}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">Semua Materi</TabsTrigger>
                    {subjects.map(subject => (
                        <TabsTrigger key={subject} value={subject}>{subject}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {materials.map((material) => (
                        <Card key={material.id}>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">{getIcon(material.type)}</div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{material.title}</CardTitle>
                                        <CardDescription className="mt-2">
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <Badge variant="outline">{material.subject}</Badge>
                                                <Badge variant="secondary">{getTypeLabel(material.type)}</Badge>
                                                <span className="text-xs">Oleh: {material.teacher}</span>
                                                <span className="text-xs">Upload: {material.uploadDate}</span>
                                                {material.size && <span className="text-xs">Size: {material.size}</span>}
                                            </div>
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {material.type === "link" ? (
                                    <Button onClick={() => handleOpenLink(material.title)} className="w-full">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        Buka Link
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleDownload(material.title)} className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download {material.type === "pdf" ? "PDF" : "Video"}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {subjects.map(subject => (
                    <TabsContent key={subject} value={subject} className="space-y-4">
                        {materials.filter(m => m.subject === subject).map((material) => (
                            <Card key={material.id}>
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1">{getIcon(material.type)}</div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{material.title}</CardTitle>
                                            <CardDescription className="mt-2">
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    <Badge variant="secondary">{getTypeLabel(material.type)}</Badge>
                                                    <span className="text-xs">Oleh: {material.teacher}</span>
                                                    <span className="text-xs">Upload: {material.uploadDate}</span>
                                                    {material.size && <span className="text-xs">Size: {material.size}</span>}
                                                </div>
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {material.type === "link" ? (
                                        <Button onClick={() => handleOpenLink(material.title)} className="w-full">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            Buka Link
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleDownload(material.title)} className="w-full">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download {material.type === "pdf" ? "PDF" : "Video"}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
