// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import AuthStatusButton from "@/components/AuthStatusButton";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  // ...
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <h1 className="text-xl font-bold text-blue-600">
                <a href="/">ADS STORE</a>
              </h1>
              <nav className="flex items-center gap-6 text-sm">
                <a href="/" className="font-medium hover:text-blue-600">
                  Home
                </a>
                <a href="/products" className="font-medium hover:text-blue-600">
                  Produtos
                </a>
                <a href="/cart" className="font-medium hover:text-blue-600">
                  Carrinho
                </a>
                <AuthStatusButton />
              </nav>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
