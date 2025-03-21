"use client"

import React, { useState } from "react";
import { Menu } from "lucide-react";

import CustomButton from "../../components/atoms/CustomButton";
import SidebarEmployee from "./SidebarEmployee";

export default function HomeBoxEmployee({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-tertiary text-white flex items-center justify-between">
      
        <div className="flex items-center gap-2">
          <CustomButton
            onClickButton={() => setIsSidebarOpen(!isSidebarOpen)}
            icon={() => <Menu/>}
            text=""
            iconColor="h-6 w-6 cursor-pointer"
          />
          <span className="font-bold text-lg">AXIA</span>
        </div>

        <div className="flex items-center gap-4">
          {/*<SearchBar />*/}
        </div>
      </header>

      <div className="flex">
        <SidebarEmployee isOpen={isSidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
