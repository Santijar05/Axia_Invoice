import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, Home, Truck, ShoppingCart, ChevronDown, ChevronUp, HandCoins, ArchiveRestore
} from "lucide-react";

import { useUserStore } from "@/store/UserStore";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { role } = useUserStore();

  useEffect(() => {
    if (!isOpen) setOpenMenu(null);
  }, [isOpen]);

  const toggleMenu = (label: string) => {
    if (isOpen) {
      setOpenMenu(openMenu === label ? null : label);
    }
  };

  const basePath = role === "EMPLOYEE" ? "/employee" : "/admin";

  const menuItems = [
    { icon: Home, label: "Home", href: basePath },
    ...(role === "ADMIN" || role === "SUPERADMIN" ? [
      { 
        icon: HandCoins, 
        label: "Box",
        subOptions: [
          { label: "History Cash", href: `${basePath}/box/cash-history` },
          { label: "Manage Cash", href: `${basePath}/box/manage-cash` },
        ],
      },
    ] : []),
    { 
      icon: ArchiveRestore, 
      label: "Store",
      subOptions: [
        { label: "Products", href: "/store/products" },
      ],
    },
    { 
      icon: Truck, 
      label: "Sales",
      subOptions: [{ label: "Make Sales", href: "/sales/make-sales" }],
    },
    { 
      icon: ShoppingCart, 
      label: "Shopping",
      subOptions: [
        ...(role === "EMPLOYEE" ? [{ label: "Make Purchase", href: "/shopping/make-purchase" }] : []),
        ...(role === "ADMIN" || role === "SUPERADMIN" ? [{ label: "Supplier", href: "/shopping/suppliers" }] : []),
      ],
    },
    ...(role === "ADMIN" || role === "SUPERADMIN" ? [
      { 
        icon: User, 
        label: "Users",
        subOptions: [
          { label: "Customers", href: "/users/customers" },
          { label: "Employees", href: "/users/employees" },
        ],
      },
    ] : []),
  ];

  return (
    <aside
      className={`bg-black border-r min-h-[calc(100vh-64px)] flex flex-col py-4 gap-2 transition-all duration-300 ${
        isOpen ? "w-56 px-4" : "w-14 items-center pl-2"
      }`}
    >
      {menuItems.map(({ icon: Icon, label, href, subOptions }, index) => (
        <div key={index} className="w-full">

          <div 
            className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer ${
              openMenu === label ? "bg-gray-900" : ""
            }`}
            onClick={() => subOptions ? toggleMenu(label) : null}
          >
            <Link href={href || "#"} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-gray-500" />
              {isOpen && <span className="text-gray-500">{label}</span>}
            </Link>

            {subOptions && isOpen && (
              <div className="ml-auto">

                {openMenu === label ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}

              </div>
            )}
          </div>
          
          {subOptions && isOpen && openMenu === label && (
            <div className="pl-8">

              {subOptions.map((sub, i) => (
                <Link key={i} href={sub.href} className="block py-2 text-gray-400 hover:text-gray-600">
                  {sub.label}
                </Link>
              ))}

            </div>
          )}

        </div>
      ))}

    </aside>
  );
}
