import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

const protectedRoutes = ["/account", "/checkout", "/admin"];
const adminRoutes = ["/admin"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt-token")?.value;
  const { pathname } = request.nextUrl;

  let role: string | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      const payload = decodeJwt(token);
      role = payload.role as string;
      isAuthenticated = true;
    } catch {
      // Token inválido
    }
  }

  // 1. Redirecionar para login se tentar acessar rota protegida sem auth
  if (
    protectedRoutes.some((path) => pathname.startsWith(path)) &&
    !isAuthenticated
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname); // Guarda a origem para redirecionar depois
    return NextResponse.redirect(url);
  }

  // 2. Proteger rotas de Admin
  if (
    adminRoutes.some((path) => pathname.startsWith(path)) &&
    role !== "vendedor"
  ) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // 3. Redirecionar usuários logados para fora das páginas de login/registro
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
