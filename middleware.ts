import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { useUserStore } from "./store/UserStore";

export async function middleware(request: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log("Middleware ejecutado en:", pathname);
  console.log("Token presente:", authToken ? "Sí" : "No");

  const { setRole } = useUserStore.getState();

  const publicRoutes = ["/login", "/register"];
  const routesClients = ["/", "/aboutus", "/contactus"];

  // Permitir acceso a rutas públicas y rutas de clientes sin token
  if ((publicRoutes.includes(pathname) || routesClients.includes(pathname)) && !authToken) {
    return NextResponse.next();
  }

  // Si no hay token y la ruta no es pública ni de clientes, redirigir a /login
  if (!authToken) {
    console.log("Sin token. Redirigiendo a /login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authToken) {
    try {
      const decoded: any = jwtDecode(authToken);
      const userRole = decoded.role;

      console.log("Token decodificado:", decoded);
      console.log("Rol del usuario:", userRole);

      setRole(userRole); // Guardar el rol en Zustand

      const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
      if (decoded.iat && Date.now() > decoded.iat * 1000 + MILLISECONDS_IN_A_DAY) {
        console.log("Token expirado. Redirigiendo a /login.");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("authToken");
        return response;
      }

      // Evitar que usuarios autenticados entren a rutas públicas
      if (publicRoutes.includes(pathname)) {
        console.log("Usuario autenticado intentó acceder a ruta pública:", pathname);
        if (userRole === "ADMIN" || userRole === "SUPERADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        } else {
          return NextResponse.redirect(new URL("/employee", request.url));
        }
      }

      // Definir rutas permitidas según el rol
      const allowedRoutes = {
        USER: [
          "/employee",
          "/store/products",
          "/sales/make-sales",
          "/shopping/make-purchase",
        ],
        ADMIN: [
          "/admin",
          "/box/cash-history",
          "/box/manage-cash",
          "/store/products",
          "/sales/make-sales",
          "/shopping/suppliers",
          "/users/customers",
          "/users/employees",
        ],
        SUPERADMIN: [
          "/admin",
          "/box/cash-history",
          "/box/manage-cash",
          "/store/products",
          "/sales/make-sales",
          "/shopping/suppliers",
          "/users/customers",
          "/users/employees",
        ],
      };

      if (userRole in allowedRoutes) {
        const userRoutes = allowedRoutes[userRole as keyof typeof allowedRoutes];
      
        if (!userRoutes.some(route => pathname.startsWith(route))) {
          console.log(`${userRole} intentó acceder a una ruta no permitida:`, pathname);
          return NextResponse.redirect(new URL(userRole === "ADMIN" || userRole === "SUPERADMIN" ? "/admin" : "/employee", request.url));
        }
      } else {
        console.log("Rol desconocido. Redirigiendo a /login.");
        return NextResponse.redirect(new URL("/login", request.url));
      }

    } catch (error) {
      console.error("Error al decodificar el token:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login", 
    "/register", 
    "/employee",
    "/store/:path*",
    "/sales/:path*",
    "/admin",
    "/box/:path*",
    "/shopping/:path*",
    "/users/:path*",
    "/", 
    "/aboutus", 
    "/contactus"
  ],
};