import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log("Middleware ejecutado en:", pathname);
  console.log("Token presente:", authToken ? "Sí" : "No");

  const publicRoutes = ["/login", "/register"];
  const isAdminRoute = pathname.startsWith("/admin");
  const isEmployeeRoute = pathname.startsWith("/employee");
  const routesClients = ["/", "/aboutus", "/contactus"];

  let userRole = null;

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
      userRole = decoded.role;

      console.log("Token decodificado:", decoded);
      console.log("Rol del usuario:", userRole);

      const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
      if (decoded.iat && Date.now() > decoded.iat * 1000 + MILLISECONDS_IN_A_DAY) {
        console.log("Token expirado. Redirigiendo a /login.");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("authToken");
        return response;
      }

      if (userRole === "EMPLOYEE") {
        if (!isEmployeeRoute) {
          console.log("EMPLOYEE intentó acceder a una ruta no permitida:", pathname);
          return NextResponse.redirect(new URL("/employee", request.url));
        }
      } else if (userRole === "ADMIN" || userRole === "SUPERADMIN") {
        if (!isAdminRoute) {
          console.log("ADMIN intentó acceder a una ruta no permitida:", pathname);
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } else {
        console.log("Rol no reconocido:", userRole);
        return NextResponse.redirect(new URL("/", request.url));
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
    matcher: ["/admin/:path*", "/employee/:path*", "/login", "/register", "/", "/aboutus", "/contactus"],
};