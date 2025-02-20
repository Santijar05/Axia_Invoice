"use client"

import React, { useState } from "react";
import { Menu } from "lucide-react";
import SearchBar from "@/components/molecules/SearchBar";
import Sidebar from "@/components/organisms/Sidebar";

export default function HomeBox({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e3c8b] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6 cursor-pointer" />
          </button>
          <span className="font-bold text-lg">AXIA</span>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
        </div>
      </header>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
