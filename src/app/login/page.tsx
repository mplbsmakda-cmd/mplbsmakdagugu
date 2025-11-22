"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Lock, User } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (role: string) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push(`/dashboard/${role}`);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="w-full max-w-md space-y-4">
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <Building2 className="h-12 w-12 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-primary">SMK LPPM RI 2</h1>
                    <p className="text-muted-foreground">Portal Akademik Terpadu</p>
                </div>

                <Tabs defaultValue="student" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                        <TabsTrigger value="teacher">Guru</TabsTrigger>
                        <TabsTrigger value="student">Siswa</TabsTrigger>
                        <TabsTrigger value="parent">Wali</TabsTrigger>
                    </TabsList>

                    {["admin", "teacher", "student", "parent"].map((role) => (
                        <TabsContent key={role} value={role}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Login {role.charAt(0).toUpperCase() + role.slice(1)}</CardTitle>
                                    <CardDescription>
                                        Masukan kredensial Anda untuk mengakses dashboard.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`${role}-username`}>Username / NIS / NIP</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input id={`${role}-username`} placeholder="Masukan username" className="pl-9" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`${role}-password`}>Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input id={`${role}-password`} type="password" placeholder="Masukan password" className="pl-9" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        onClick={() => handleLogin(role)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Memproses..." : "Masuk"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
