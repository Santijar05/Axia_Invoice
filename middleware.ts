import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { routing } from './i18n/routing';
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Aplica el middleware de internacionalización primero
  const intlResponse = intlMiddleware(request);

  const locale = request.nextUrl.locale || 'es';
  const authToken = request.cookies.get("authToken")?.value;
  const url = new URL(request.url);
  const rawPathname = url.pathname;
  const pathname = removeLocalePrefix(rawPathname, locale);

  function removeLocalePrefix(pathname: string, locale: string): string {
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.replace(`/${locale}`, '') || '/';
    }
    return pathname;
  }

  console.log("Middleware ejecutado en:", pathname);
  console.log("Token presente:", authToken ? "Sí" : "No");

  const publicRoutes = ["/login", "/register"];
  const routesClients = ["/", "/aboutus", "/contactus"];

  if ((publicRoutes.includes(pathname) || routesClients.includes(pathname)) && !authToken) {
    return intlResponse;
  }

  if (!authToken) {
    console.log("Sin token. Redirigiendo a /login.");
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  try {
    const decoded: any = jwtDecode(authToken);
    const userRole = decoded.role;

    const allowedRoutes = {
      USER: ["/employee", "/store/products", "/sales/make-sales"],
      ADMIN: ["/admin", "/box/cash-history", "/box/manage-cash", "/store/products", "/sales/make-sales", "/sales/sales-invoices", "/shopping/make-purchase", "/shopping/suppliers", "/users/customers", "/users/employees"],
      SUPERADMIN: ["/admin", "/box/cash-history", "/box/manage-cash", "/store/products", "/sales/make-sales", "/sales/sales-invoices", "/shopping/suppliers", "/shopping/make-purchase", "/users/customers", "/users/employees", "/sales/view-sales"],
    };

    if (userRole in allowedRoutes) {
      const userRoutes = allowedRoutes[userRole as keyof typeof allowedRoutes];

      if (!userRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL(`/${locale}/${userRole === "ADMIN" || userRole === "SUPERADMIN" ? "admin" : "employee"}`, request.url));
      }
    } else {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const response = intlResponse;
    response.headers.set("Set-Cookie", `userRole=${userRole}; Path=/; SameSite=Strict`);
    return response;

  } catch (error) {
    console.error("Error al decodificar el token:", error);
    const response = NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    response.headers.set("Set-Cookie", "authToken=; Path=/; HttpOnly; Max-Age=0");
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
