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

  try {
    const decoded: any = jwtDecode(authToken);
    const userRole = decoded.role;

    console.log("Token decodificado:", decoded);
    console.log("Rol del usuario:", userRole)

    // Evitar que usuarios autenticados entren a rutas públicas
    if (publicRoutes.includes(pathname)) {
      console.log("Usuario autenticado intentó acceder a ruta pública:", pathname);
      if (userRole === "ADMIN" || userRole === "SUPERADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/employee", request.url));
      }
    }

    const allowedRoutes = {
      USER: [
        "/employee",
        "/store/products",
        "/sales/make-sales",
      ],
      ADMIN: [
        "/admin",
        "/box/cash-history",
        "/box/manage-cash",
        "/store/products",
        "/sales/make-sales",
        "/sales/sales-invoices",
        "/shopping/make-purchase",
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
        "/sales/sales-invoices",
        "/shopping/suppliers",
        "/shopping/make-purchase",
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

    // Crear una respuesta con la cookie del rol
    const response = NextResponse.next();
    response.headers.set("Set-Cookie", `userRole=${userRole}; Path=/; SameSite=Strict`);
    console.log("Cookie userRole en el middleware:", cookieStore.get("userRole")?.value);

    return response;

  } catch (error) {
    console.error("Error al decodificar el token:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set("Set-Cookie", "authToken=; Path=/; HttpOnly; Max-Age=0"); // Eliminar cookie
    return response;
  }
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
