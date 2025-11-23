import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { PageTransition } from "@/components/layout/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMK LPPM RI 2 Kedungreja",
  description: "Portal Akademik Jurusan Manajemen Perkantoran dan Layanan Bisnis",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <PageTransition>{children}</PageTransition>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
