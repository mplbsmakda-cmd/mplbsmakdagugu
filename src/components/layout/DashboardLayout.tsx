"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: "admin" | "teacher" | "student" | "parent";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role={role} />
            <motion.div
                className="md:pl-64 flex flex-col min-h-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Navbar role={role} />
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </motion.div>
        </div>
    );
}
