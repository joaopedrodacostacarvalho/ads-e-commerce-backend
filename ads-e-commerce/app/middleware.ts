import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

// Define as rotas que precisam de autenticação
const protectedRoutes = ["/account", "/admin"];
// Define as rotas que só podem ser acessadas por vendedores
const adminRoutes = ["/admin"];
// Define as rotas que não devem ser acessadas por usuários logados
const authRoutes = ["/login", "/register"];

// A chave do cookie onde o token JWT está armazenado
const AUTH_TOKEN_KEY = "jwt-token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  let decodedToken;
  let userRole: "consumidor" | "vendedor" | null = null;

  if (token) {
    try {
      decodedToken = decodeJwt(token);
      userRole = decodedToken.role as "consumidor" | "vendedor";
    } catch (error) {
      // Token inválido, forçar logout
      console.error("Token inválido no middleware.");
      request.cookies.delete(AUTH_TOKEN_KEY);
      if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  const isAuthenticated = !!token && !!decodedToken;

  // 1. Proteger Rotas (Redirecionar para /login se não autenticado)
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Proteger Rotas de Vendedor (Redirecionar se não for 'vendedor')
  if (
    adminRoutes.some((route) => pathname.startsWith(route)) &&
    isAuthenticated &&
    userRole !== "vendedor"
  ) {
    return NextResponse.redirect(new URL("/account", request.url)); // Redireciona para uma área comum
  }

  // 3. Impedir Acesso a Rotas de Auth para Logados (Redirecionar para /account ou /admin)
  if (authRoutes.includes(pathname) && isAuthenticated) {
    const redirectUrl =
      userRole === "vendedor" ? "/admin/products/manage" : "/account";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Configurações do matcher para as rotas
  matcher: ["/login", "/register", "/account/:path*", "/admin/:path*"],
};
