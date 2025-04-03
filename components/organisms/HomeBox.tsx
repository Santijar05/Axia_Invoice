"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Cookies from "js-cookie";

import CustomButton from "../atoms/CustomButton";
import Sidebar from "@/components/molecules/Sidebar";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN" | null;

export default function HomeBox({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    const role = Cookies.get("userRole");

    if (role === "USER" || role === "ADMIN" || role === "SUPERADMIN") {
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black dark:bg-gray-900 text-white flex items-center justify-between p-4">
        
        <div className="flex items-center gap-2">
          <CustomButton
            onClickButton={() => setIsSidebarOpen(!isSidebarOpen)}
            icon={() => <Menu />}
            text=""
            iconColor="h-6 w-6 cursor-pointer"
          />
          <span className="font-bold text-lg">AXIA</span>
        </div>

      </header>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen}/>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
