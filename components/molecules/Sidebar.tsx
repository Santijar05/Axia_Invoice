import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, Home, Truck, ShoppingCart, ChevronDown, ChevronUp, HandCoins, ArchiveRestore, LogOut} from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { useUserStore } from "@/store/UserStore";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  subOptions?: {
    label: string;
    href: string;
    allowedRoles?: string[];
  }[];
  allowedRoles?: string[];
};

type UserRole = "EMPLOYEE" | "ADMIN" | "SUPERADMIN" | null;

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { role, setRole } = useUserStore();

  // Verificar el token al montar el componente
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      try {
        const decoded: { role?: UserRole } = jwtDecode(authToken);
        if (decoded.role) {
          setRole(decoded.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        Cookies.remove("authToken");
      }
    }
    setLoading(false);
  }, [setRole]);

  // Cerrar menús cuando el sidebar se colapsa
  useEffect(() => {
    if (!isOpen) setOpenMenu(null);
  }, [isOpen]);

  const toggleMenu = (label: string) => {
    if (isOpen) {
      setOpenMenu(openMenu === label ? null : label);
    }
  };

  if (loading || !role) {
    return (
      <aside className={`bg-black min-h-[calc(100vh-64px)] flex flex-col items-center justify-center ${
        isOpen ? "w-56" : "w-14"
      }`}>
        <div className="animate-pulse text-gray-500">Loading...</div>
      </aside>
    );
  }

  const basePath = role === "EMPLOYEE" ? "/employee" : "/admin";

  const menuItems: MenuItem[] = [
    { 
      icon: Home, 
      label: "Home", 
      href: basePath,
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
    },
    ...(role === "ADMIN" || role === "SUPERADMIN" ? [
      { 
        icon: HandCoins, 
        label: "Box",
        allowedRoles: ["ADMIN", "SUPERADMIN"],
        subOptions: [
          { 
            label: "History Cash", 
            href: `${basePath}/box/cash-history`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
          { 
            label: "Manage Cash", 
            href: `${basePath}/box/manage-cash`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
        ],
      },
    ] : []),
    { 
      icon: ArchiveRestore, 
      label: "Store",
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"],
      subOptions: [
        { 
          label: "Productos", 
          href: "/store/products",
          allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
        },
      ],
    },
    { 
      icon: Truck, 
      label: "Ventas",
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"],
      subOptions: [
        { 
          label: "Hacer ventas", 
          href: "/sales/make-sales",
          allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
        }, { 
          label: "Ver ventas", 
          href: "/sales/view-sales",
          allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
        },
      ],
    },
    { 
      icon: ShoppingCart, 
      label: "Shopping",
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"],
      subOptions: [
        ...(role === "EMPLOYEE" ? [
          { 
            label: "Make Purchase", 
            href: "/shopping/make-purchase",
            allowedRoles: ["EMPLOYEE"]
          }
        ] : []),
        ...(role === "ADMIN" || role === "SUPERADMIN" ? [
          { 
            label: "Supplier", 
            href: "/shopping/suppliers",
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          }
        ] : []),
      ],
    },
    ...(role === "ADMIN" || role === "SUPERADMIN" ? [
      { 
        icon: User, 
        label: "Users",
        allowedRoles: ["ADMIN", "SUPERADMIN"],
        subOptions: [
          { 
            label: "Customers", 
            href: "/users/customers",
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
          { 
            label: "Employees", 
            href: "/users/employees",
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
        ],
      },
    ] : []),
  ];

  // Filtrar items y subopciones basado en el rol
  const filteredItems = menuItems
    .filter(item => !item.allowedRoles || item.allowedRoles.includes(role))
    .map(item => ({
      ...item,
      subOptions: item.subOptions?.filter(
        sub => !sub.allowedRoles || sub.allowedRoles.includes(role)
      )
    }))
    .filter(item => !item.subOptions || item.subOptions.length > 0);

  return (
    <aside
      className={`bg-black min-h-[calc(100vh-64px)] flex flex-col py-4 gap-2 transition-all duration-300 ${
        isOpen ? "w-56 px-4" : "w-14 items-center pl-2"
      }`}
    >
      {filteredItems.map(({ icon: Icon, label, href, subOptions }, index) => (
        <div key={`${label}-${index}`} className="w-full">
          <div 
            className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer ${
              openMenu === label ? "bg-gray-900" : ""
            }`}
            onClick={() => subOptions ? toggleMenu(label) : undefined}
          >
            <Link 
              href={href || "#"} 
              className="flex items-center gap-3"
              onClick={(e) => {
                if (subOptions) {
                  e.preventDefault();
                  toggleMenu(label);
                }
              }}
            >
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
                <Link 
                  key={`${sub.label}-${i}`} 
                  href={sub.href} 
                  className="block py-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="mt-auto p-2">
        <Link 
          href="/login"
          onClick={(e) => {
            e.preventDefault(); 

            Cookies.remove("authToken");

            useUserStore.getState().setRole(null);

            window.location.href = "/login";
          }}
          className={`flex items-center gap-3 p-2 rounded-lg text-white transition-colors ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 text-" />
          {isOpen && <span className="text-gray-500">Cerrar sesión</span>}
        </Link>
      </div>
    </aside>
  );
}