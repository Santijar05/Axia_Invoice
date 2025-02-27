import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, Truck, ShoppingCart, ChevronDown, ChevronUp, ArchiveRestore
} from "lucide-react";

export default function SidebarEmployee({ isOpen }: { isOpen: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) setOpenMenu(null);
  }, [isOpen]);

  const toggleMenu = (label: string) => {
    if (isOpen) {
      setOpenMenu(openMenu === label ? null : label);
    }
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/employee" },
    { 
      icon: ArchiveRestore, 
      label: "Store",
      subOptions: [
        { label: "Brands", href: "/employee/store/brands" },
        { label: "Categories", href: "/employee/store/categories" },
        { label: "Products", href: "/employee/store/products" },
      ],
    },
    { 
      icon: Truck, 
      label: "Sales",
      subOptions: [{ label: "Make Sales", href: "/employee/sales/make-sales" }],
    },
    { 
      icon: ShoppingCart, 
      label: "Shopping",
      subOptions: [
        { label: "Make Purchase", href: "/employee/shopping/make-purchase" },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white border-r min-h-[calc(100vh-64px)] flex flex-col py-4 gap-2 transition-all duration-300 ${
        isOpen ? "w-56 px-4" : "w-14 items-center pl-2"
      }`}
    >
      {menuItems.map(({ icon: Icon, label, href, subOptions }, index) => (
        <div key={index} className="w-full">

          <div 
            className={`flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-all cursor-pointer ${
              openMenu === label ? "bg-blue-100" : ""
            }`}
            onClick={() => subOptions ? toggleMenu(label) : null}
          >
            <Link href={href || "#"} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-gray-600" />
              {isOpen && <span className="text-gray-600">{label}</span>}
            </Link>

            {subOptions && isOpen && (
              <div className="ml-auto">

                {openMenu === label ? (
                  <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                )}

              </div>
            )}
          </div>
          
          {subOptions && isOpen && openMenu === label && (
            <div className="pl-8">

              {subOptions.map((sub, i) => (
                <Link key={i} href={sub.href} className="block py-2 text-gray-500 hover:text-gray-700">
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
