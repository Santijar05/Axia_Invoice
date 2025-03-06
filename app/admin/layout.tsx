// app/platform/dashboard/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import HomeBoxAdmin from "@/modules/admin/HomeBoxAdmin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Dashboard for managing the platform - Axia",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <HomeBoxAdmin>
        {children}
      </HomeBoxAdmin>
    </main>
  );
}
