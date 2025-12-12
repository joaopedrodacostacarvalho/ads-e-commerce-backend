// src/components/AuthStatusButton.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; // 💡 Usando o hook do contexto
import { RiUserLine, RiLogoutBoxLine } from "react-icons/ri";

export default function AuthStatusButton() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return <div className="text-gray-500">Carregando...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href={user.role === "vendedor" ? "/seller/dashboard" : "/account"}
          className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800 transition"
        >
          <RiUserLine />
          Minha Conta ({user.role})
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 transition"
        >
          <RiLogoutBoxLine />
          Sair
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="font-medium text-blue-600 hover:text-blue-800 transition py-1 px-3 border border-blue-600 rounded-md"
    >
      Entrar
    </Link>
  );
}
