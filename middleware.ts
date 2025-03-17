import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log("🔹 Middleware ejecutado en:", pathname);
  console.log("🔹 Token presente:", authToken ? "Sí" : "No");

  // Definición de rutas públicas
  const publicRoutes = ["/login", "/register"];

  let userRole = null;

  // Si no hay token, redirigir a login salvo que sea una ruta pública
  if (!authToken && !publicRoutes.includes(pathname)) {
    console.log("❌ Sin token. Redirigiendo a /login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Manejo del token
  if (authToken) {
    try {
      const decoded: any = jwtDecode(authToken);
      userRole = decoded.role;

      console.log("🔹 Token decodificado:", decoded);
      console.log("🔹 Rol del usuario:", userRole);

      // Verificar si el token ha expirado (24 horas desde iat)
      const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
      if (decoded.iat && Date.now() > decoded.iat * 1000 + MILLISECONDS_IN_A_DAY) {
        console.log("❌ Token expirado. Redirigiendo a /login.");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("authToken");
        return response;
      }

      // Evitar que usuarios autenticados entren a rutas públicas
      if (publicRoutes.includes(pathname)) {
        console.log("❌ Usuario autenticado intentó acceder a ruta pública:", pathname);
        if (userRole === "ADMIN" || userRole === "SUPERADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        } else {
          return NextResponse.redirect(new URL("/employee", request.url));
        }
      }

      // Validar acceso según el rol
      const isAdminRoute = pathname.startsWith("/admin");
      const isEmployeeRoute = pathname.startsWith("/employee");

      if (userRole === "EMPLOYEE") {

        if (!isEmployeeRoute) {
          console.log("❌ EMPLOYEE intentó acceder a una ruta no permitida:", pathname);
          return NextResponse.redirect(new URL("/employee", request.url));
        }
      } else if (userRole === "ADMIN" || userRole === "SUPERADMIN") {
        if (!isAdminRoute) {
          console.log("❌ ADMIN/SUPERADMIN intentó acceder a una ruta no permitida:", pathname);
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } else {
        console.log("❌ Rol no reconocido:", userRole);
        return NextResponse.redirect(new URL("/", request.url));
      }

    } catch (error) {
      console.error("❌ Error al decodificar el token:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  // Si todo está bien, permitir la solicitud
  return NextResponse.next();
}

// Aplicar middleware en todas las rutas excepto API y archivos estáticos
export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|ico|css|js)).*)"
    ],
};