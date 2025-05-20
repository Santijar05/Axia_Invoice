import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useTranslations, useLocale } from "next-intl";
import React, { useState, useEffect } from "react";
import { 
  User, 
  Home, 
  Truck, 
  ShoppingCart,
  ChevronDown, 
  ChevronUp, 
  HandCoins, 
  ArchiveRestore, 
  LogOut,
  BarChart2
} from "lucide-react";

import { useUserStore } from "@/store/UserStore";
import LanguageSelector from "@/components/atoms/LanguageSelector";

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
  const t = useTranslations("sidebar");
  const locale = useLocale();

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
        <div className="animate-pulse text-gray-500">{t("loading")}</div>
      </aside>
    );
  }

  const basePath = role === "EMPLOYEE" ? `/${locale}/employee` : `/${locale}/admin`;

  const menuItems: MenuItem[] = [
    { 
      icon: Home, 
      label: t("home"), 
      href: basePath,
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
    },
    ...(role === "ADMIN" || role === "SUPERADMIN" ? [
      { 
        icon: HandCoins, 
        label: t("box"),
        allowedRoles: ["ADMIN", "SUPERADMIN"],
        subOptions: [
          { 
            label: t("historyCash"),
            href: `${basePath}/box/cash-history`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
          { 
            label: t("manageCash"),
            href: `${basePath}/box/manage-cash`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
        ],
      },
    ] : []),
    { 
      icon: ArchiveRestore, 
      label: t("store"),
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"],
      subOptions: [
        { 
          label: t("products"), 
          href: `/${locale}/store/products`,
          allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
        },
      ],
    },
    { 
      icon: Truck, 
      label: t("sales"),
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"],
      subOptions: [
        { 
          label: t("makeSales"),
          href: `/${locale}/sales/make-sales`,
          allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"]
        },
        { 
          label: t("viewSales"),
          href: `/${locale}/sales/sales-invoices`,
          allowedRoles: ["ADMIN", "SUPERADMIN"]
        },
      ],
    },
    { 
      icon: ShoppingCart, 
      label: t("shopping"),
      allowedRoles: ["EMPLOYEE", "ADMIN", "SUPERADMIN"],
      subOptions: [
        ...(role === "ADMIN" || role === "SUPERADMIN" ? [
          { 
            label: t("makePurchase"),
            href: `/${locale}/shopping/make-purchase`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          }
        ] : []),
        ...(role === "ADMIN" || role === "SUPERADMIN" ? [
          { 
            label: t("viewPurchase"),
            href: `/${locale}/shopping/view-purchases`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          }
        ] : []),
        ...(role === "ADMIN" || role === "SUPERADMIN" ? [
          { 
            label: t("supplier"),
            href: `/${locale}/shopping/suppliers`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          }
        ] : []),
      ],
    },
    ...(role === "ADMIN" || role === "SUPERADMIN" ? [
      { 
        icon: User, 
        label: t("users"),
        allowedRoles: ["ADMIN", "SUPERADMIN"],
        subOptions: [
          { 
            label: t("customers"), 
            href: `/${locale}/users/customers`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
          { 
            label: t("employees"),
            href: `/${locale}/users/employees`,
            allowedRoles: ["ADMIN", "SUPERADMIN"]
          },
        ],
      },
      { 
        icon: BarChart2, 
        label: t("dashboard"),
        href: `/${locale}/admin/dashboard`,
        allowedRoles: ["ADMIN", "SUPERADMIN"]
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
      <div className="w-full">
        <div className={`flex items-center justify-between rounded-lg hover:bg-gray-700 transition-all cursor-pointer`}>
          <LanguageSelector variant="sidebar" isCollapsed={!isOpen} />
        </div>
      </div>

      <div className="mt-auto p-2">
        <Link 
          href={`/${locale}/login`}
          onClick={(e) => {
            e.preventDefault(); 

            Cookies.remove("authToken");

            useUserStore.getState().setRole(null);

            window.location.href = `/${locale}/login`;
          }}
          className={`flex items-center gap-3 p-2 rounded-lg text-white transition-colors ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 text-gray-500" />
          {isOpen && <span className="text-gray-500">{t("logout")}</span>}
        </Link>
      </div>
    </aside>
  );
}