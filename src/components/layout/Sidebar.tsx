"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NAV_ITEMS } from "@/lib/constants";
import { LogOut } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    role: "admin" | "teacher" | "student" | "parent";
}

export function Sidebar({ className, role }: SidebarProps) {
    const pathname = usePathname();
    const items = NAV_ITEMS[role];

    return (
        <div className={cn("pb-12 w-64 border-r bg-background h-screen fixed left-0 top-0 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
                        SMK LPPM RI 2
                    </h2>
                    <p className="px-4 text-xs text-muted-foreground mb-4">
                        Manajemen Perkantoran & Layanan Bisnis
                    </p>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    pathname === item.href && "bg-secondary/20 text-secondary-foreground font-medium"
                                )}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 w-full px-3">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => window.location.href = '/login'}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
