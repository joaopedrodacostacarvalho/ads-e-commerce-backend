"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  // Define o conteúdo e o link de alternância com base na rota
  const headerContent = isLoginPage
    ? {
        title: "Acesse sua conta",
        subtitle: "Novo(a) por aqui?",
        switchText: "Crie uma nova conta",
        switchHref: "/register",
        maxWidth: "max-w-md", // Formulário de Login é menor
      }
    : {
        title: "Crie sua conta",
        subtitle: "Já tem uma conta?",
        switchText: "Faça login",
        switchHref: "/login",
        maxWidth: "max-w-xl", // Formulário de Cadastro é maior
      };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div
        className={`${headerContent.maxWidth} w-full space-y-8 p-10 bg-white shadow-xl rounded-lg border border-gray-200`}
      >
        {/* HEADER do Layout (Define o título e o link de alternância) */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {headerContent.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {headerContent.subtitle}{" "}
            {/* LINK DE ALTERNÂNCIA (Login <-> Registro) */}
            <Link
              href={headerContent.switchHref}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
            >
              {headerContent.switchText}
            </Link>
          </p>
        </div>

        {/* CHILDREN (O Formulário) */}
        {children}
      </div>
    </div>
  );
}
