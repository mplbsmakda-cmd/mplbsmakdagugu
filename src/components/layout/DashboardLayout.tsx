"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: "admin" | "teacher" | "student" | "parent";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role={role} />
            <div className="md:pl-64 flex flex-col min-h-screen">
                <Navbar role={role} />
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
