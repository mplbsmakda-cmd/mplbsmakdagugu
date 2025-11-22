"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, User, Clock, Reply } from "lucide-react";
import { toast } from "sonner";

type Message = {
    id: number;
    from: string;
    fromRole: string;
    subject: string;
    message: string;
    date: string;
    status: "unread" | "read" | "replied";
    reply?: string;
    replyDate?: string;
};

export default function TeacherMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            from: "Ahmad Supriyadi (Wali Siti Aminah)",
            fromRole: "Orang Tua",
            subject: "Konsultasi nilai anak",
            message: "Selamat pagi Pak/Bu, saya ingin berkonsultasi tentang nilai anak saya.",
            date: "2023-11-20 10:00",
            status: "replied",
            reply: "Selamat pagi, silakan datang ke sekolah besok pagi untuk konsultasi lebih lanjut.",
            replyDate: "2023-11-20 14:30"
        },
        {
            id: 2,
            from: "Dewi Kartika (Wali Budi Santoso)",
            fromRole: "Orang Tua",
            subject: "Pertanyaan tugas",
            message: "Bu, saya ingin menanyakan tentang tugas yang diberikan minggu lalu untuk anak saya.",
            date: "2023-11-21 09:15",
            status: "unread"
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState("");

    const handleOpenReply = (message: Message) => {
        setCurrentMessage(message);
        setReplyText("");
        setIsDialogOpen(true);
    };

    const handleSendReply = () => {
        if (!replyText) {
            toast.error("Pesan balasan tidak boleh kosong");
            return;
        }

        if (currentMessage) {
            setMessages(messages.map(m =>
                m.id === currentMessage.id ? {
                    ...m,
                    status: "replied" as const,
                    reply: replyText,
                    replyDate: new Date().toISOString().slice(0, 16).replace('T', ' ')
                } : m
            ));
            toast.success("Balasan berhasil dikirim");
            setIsDialogOpen(false);
        }
    };

    const handleMarkAsRead = (id: number) => {
        setMessages(messages.map(m =>
            m.id === id && m.status === "unread" ? { ...m, status: "read" as const } : m
        ));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pesan dari Orang Tua</h1>
                <p className="text-muted-foreground">Komunikasi dengan orang tua siswa</p>
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
                        <CardTitle className="text-sm font-medium">Belum Dibaca</CardTitle>
                        <MessageSquare className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {messages.filter(m => m.status === "unread").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sudah Dibalas</CardTitle>
                        <Reply className="h-4 w-4 text-green-600" />
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
                    <TabsTrigger value="unread">Belum Dibaca</TabsTrigger>
                    <TabsTrigger value="replied">Sudah Dibalas</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {messages.map((message) => (
                        <Card key={message.id} className={message.status === "unread" ? "border-primary" : ""}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Dari: {message.from}</span>
                                            <Badge variant="outline" className="text-xs">{message.fromRole}</Badge>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        message.status === "unread" ? "destructive" :
                                            message.status === "replied" ? "default" : "secondary"
                                    }>
                                        {message.status === "unread" ? "Belum Dibaca" :
                                            message.status === "replied" ? "Dibalas" : "Dibaca"}
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

                                {message.reply ? (
                                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Reply className="h-4 w-4 text-primary" />
                                            <span className="font-medium text-primary">Balasan Anda</span>
                                            <span>• {message.replyDate}</span>
                                        </div>
                                        <p className="text-sm">{message.reply}</p>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        {message.status === "unread" && (
                                            <Button variant="outline" onClick={() => handleMarkAsRead(message.id)}>
                                                Tandai Dibaca
                                            </Button>
                                        )}
                                        <Button onClick={() => handleOpenReply(message)}>
                                            <Reply className="mr-2 h-4 w-4" />
                                            Balas Pesan
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="unread" className="space-y-4">
                    {messages.filter(m => m.status === "unread").map((message) => (
                        <Card key={message.id} className="border-primary">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Dari: {message.from}</span>
                                        </div>
                                    </div>
                                    <Badge variant="destructive">Belum Dibaca</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-lg bg-muted p-4">
                                    <p className="text-sm">{message.message}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => handleMarkAsRead(message.id)}>
                                        Tandai Dibaca
                                    </Button>
                                    <Button onClick={() => handleOpenReply(message)}>
                                        <Reply className="mr-2 h-4 w-4" />
                                        Balas Pesan
                                    </Button>
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
                                            <span>Dari: {message.from}</span>
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
                                            <Reply className="h-4 w-4 text-primary" />
                                            <span className="font-medium text-primary">Balasan Anda</span>
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
                        <DialogTitle>Balas Pesan</DialogTitle>
                        <DialogDescription>
                            {currentMessage && `Balas ke: ${currentMessage.from}`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {currentMessage && (
                            <div className="rounded-lg bg-muted p-3">
                                <p className="text-sm font-medium mb-1">Pesan Orang Tua:</p>
                                <p className="text-sm text-muted-foreground">{currentMessage.message}</p>
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="reply">Balasan Anda</Label>
                            <Input
                                id="reply"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Tulis balasan Anda..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                        <Button onClick={handleSendReply}>
                            <Reply className="mr-2 h-4 w-4" />
                            Kirim Balasan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
