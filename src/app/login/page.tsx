"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { loginUser, isAuthenticated } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Check if already logged in
    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            if (authenticated) {
                router.push('/dashboard/admin');
            }
            setIsCheckingAuth(false);
        };
        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Username dan password harus diisi");
            return;
        }

        setIsLoading(true);

        try {
            const { user, session, error } = await loginUser(username, password);

            if (error || !user || !session) {
                toast.error(error || "Login gagal");
                setIsLoading(false);
                return;
            }

            toast.success(`Selamat datang, ${user.full_name}`);
            router.push(`/dashboard/${user.role}`);
        } catch (error) {
            console.error('Login error:', error);
            toast.error("Terjadi kesalahan saat login");
            setIsLoading(false);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
                <CardHeader className="space-y-4 pb-8 pt-8">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                        <Lock className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold">SMK LPPM RI 2</CardTitle>
                        <p className="text-sm text-muted-foreground">Sistem Informasi Manajemen Sekolah</p>
                    </div>
                </CardHeader>
                <CardContent className="pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium">
                                Username
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                autoComplete="username"
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                autoComplete="current-password"
                                className="h-11"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Lock className="mr-2 h-5 w-5" />
                                    Login
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t">
                        <p className="text-xs text-center text-muted-foreground mb-3 font-medium">
                            Demo Login
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-muted/50 p-2.5 rounded">
                                <p className="font-medium text-foreground">Admin</p>
                                <p className="text-muted-foreground">admin</p>
                            </div>
                            <div className="bg-muted/50 p-2.5 rounded">
                                <p className="font-medium text-foreground">Guru</p>
                                <p className="text-muted-foreground">guru01</p>
                            </div>
                            <div className="bg-muted/50 p-2.5 rounded">
                                <p className="font-medium text-foreground">Siswa</p>
                                <p className="text-muted-foreground">siswa01</p>
                            </div>
                            <div className="bg-muted/50 p-2.5 rounded">
                                <p className="font-medium text-foreground">Wali</p>
                                <p className="text-muted-foreground">wali01</p>
                            </div>
                        </div>
                        <p className="text-center text-xs text-muted-foreground mt-3">
                            Password: <span className="font-mono font-medium">password123</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
