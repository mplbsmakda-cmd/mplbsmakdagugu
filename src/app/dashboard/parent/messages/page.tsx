"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, MessageSquare, User, Clock } from "lucide-react";
import { toast } from "sonner";

type Message = {
    id: number;
    to: string;
    toRole: string;
    subject: string;
    message: string;
    date: string;
    status: "sent" | "replied";
    reply?: string;
    replyDate?: string;
};

export default function ParentMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            to: "Budi Santoso, S.Pd",
            toRole: "Wali Kelas X MPLB 1",
            subject: "Konsultasi nilai anak",
            message: "Selamat pagi Pak, saya ingin berkonsultasi tentang nilai anak saya di mata pelajaran yang Bapak ampu.",
            date: "2023-11-20 10:00",
            status: "replied",
            reply: "Selamat pagi juga, silakan datang ke sekolah besok pagi untuk konsultasi lebih lanjut.",
            replyDate: "2023-11-20 14:30"
        },
        {
            id: 2,
            to: "Siti Rahma, M.Pd",
            toRole: "Guru Bahasa Indonesia",
            subject: "Pertanyaan tugas",
            message: "Bu, saya ingin menanyakan tentang tugas yang diberikan minggu lalu.",
            date: "2023-11-21 09:15",
            status: "sent"
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<Partial<Message>>({});

    const teachers = [
        { name: "Budi Santoso, S.Pd", role: "Wali Kelas X MPLB 1" },
        { name: "Siti Rahma, M.Pd", role: "Guru Bahasa Indonesia" },
        { name: "Dedi Mulyadi, S.Si", role: "Guru Matematika" },
    ];

    const handleSendMessage = () => {
        if (!currentMessage.to || !currentMessage.subject || !currentMessage.message) {
            toast.error("Mohon lengkapi semua field");
            return;
        }

        const teacher = teachers.find(t => t.name === currentMessage.to);
        const newMessage: Message = {
            id: messages.length + 1,
            to: currentMessage.to!,
            toRole: teacher?.role || "",
            subject: currentMessage.subject!,
            message: currentMessage.message!,
            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
            status: "sent"
        };

        setMessages([newMessage, ...messages]);
        toast.success("Pesan berhasil dikirim");
        setIsDialogOpen(false);
        setCurrentMessage({});
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pesan</h1>
                    <p className="text-muted-foreground">Komunikasi dengan guru tentang anak Anda</p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Pesan Baru
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pesan</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{messages.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Terkirim</CardTitle>
                        <Send className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {messages.filter(m => m.status === "sent").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Dibalas</CardTitle>
                        <MessageSquare className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {messages.filter(m => m.status === "replied").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">Semua Pesan</TabsTrigger>
                    <TabsTrigger value="sent">Terkirim</TabsTrigger>
                    <TabsTrigger value="replied">Dibalas</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {messages.map((message) => (
                        <Card key={message.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Kepada: {message.to}</span>
                                            <Badge variant="outline" className="text-xs">{message.toRole}</Badge>
                                        </div>
                                    </div>
                                    <Badge variant={message.status === "replied" ? "default" : "secondary"}>
                                        {message.status === "replied" ? "Dibalas" : "Terkirim"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-lg bg-muted p-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Clock className="h-4 w-4" />
                                        <span>{message.date}</span>
                                    </div>
                                    <p className="text-sm">{message.message}</p>
                                </div>

                                {message.reply && (
                                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <MessageSquare className="h-4 w-4 text-primary" />
                                            <span className="font-medium text-primary">Balasan dari {message.to}</span>
                                            <span>• {message.replyDate}</span>
                                        </div>
                                        <p className="text-sm">{message.reply}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="sent" className="space-y-4">
                    {messages.filter(m => m.status === "sent").map((message) => (
                        <Card key={message.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Kepada: {message.to}</span>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">Terkirim</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-lg bg-muted p-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Clock className="h-4 w-4" />
                                        <span>{message.date}</span>
                                    </div>
                                    <p className="text-sm">{message.message}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="replied" className="space-y-4">
                    {messages.filter(m => m.status === "replied").map((message) => (
                        <Card key={message.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Kepada: {message.to}</span>
                                        </div>
                                    </div>
                                    <Badge variant="default">Dibalas</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-lg bg-muted p-4">
                                    <p className="text-sm">{message.message}</p>
                                </div>
                                {message.reply && (
                                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <MessageSquare className="h-4 w-4 text-primary" />
                                            <span className="font-medium text-primary">Balasan</span>
                                        </div>
                                        <p className="text-sm">{message.reply}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Kirim Pesan Baru</DialogTitle>
                        <DialogDescription>
                            Kirim pesan ke guru tentang anak Anda
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="to">Kepada Guru</Label>
                            <Select
                                value={currentMessage.to}
                                onValueChange={(value) => setCurrentMessage({ ...currentMessage, to: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih guru" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map((teacher) => (
                                        <SelectItem key={teacher.name} value={teacher.name}>
                                            {teacher.name} - {teacher.role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subjek</Label>
                            <Input
                                id="subject"
                                value={currentMessage.subject || ""}
                                onChange={(e) => setCurrentMessage({ ...currentMessage, subject: e.target.value })}
                                placeholder="Judul pesan"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Pesan</Label>
                            <Input
                                id="message"
                                value={currentMessage.message || ""}
                                onChange={(e) => setCurrentMessage({ ...currentMessage, message: e.target.value })}
                                placeholder="Tulis pesan Anda..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                        <Button onClick={handleSendMessage}>
                            <Send className="mr-2 h-4 w-4" />
                            Kirim Pesan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
