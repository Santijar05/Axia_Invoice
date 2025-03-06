"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";

import CustomButton from "../../components/atoms/CustomButton";
import SidebarAdmin from "./SidebarAdmin";

export default function HomeBoxAdmin({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-tertiary text-white flex items-center justify-between p-4">
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
        <SidebarAdmin isOpen={isSidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/*<HomeFooter style={standardFooterPlatform} />*/}
    </div>
  );
}
