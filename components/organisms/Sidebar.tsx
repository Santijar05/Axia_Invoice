import React from "react";
import { User, FileText, Lock, Home, Bell, BarChart } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`bg-white border-r min-h-[calc(100vh-64px)] flex flex-col py-4 gap-6 transition-all duration-300 ${
        isOpen ? "w-56 px-4" : "w-16 items-center"
      }`}
    >
      {[
        { icon: User, label: "Profile" },
        { icon: FileText, label: "Documents" },
        { icon: Home, label: "Home" },
        { icon: Lock, label: "Security" },
        { icon: Bell, label: "Notifications" },
        { icon: BarChart, label: "Analytics" },
      ].map(({ icon: Icon, label }, index) => (
        <Link
          key={index}
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-all"
        >
          <Icon className="h-5 w-5 text-gray-600" />
          {isOpen && <span className="text-gray-600">{label}</span>}
        </Link>
      ))}
    </aside>
  );
}
