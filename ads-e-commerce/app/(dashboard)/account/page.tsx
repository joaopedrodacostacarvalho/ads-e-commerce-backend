"use client";

import React, { useEffect, useState } from "react";
import { findOneUser } from "@/services/user.service";
import { User } from "@/services/types";
import { getAuthToken, decodeToken, logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAuthToken();
      if (token) {
        const payload = await decodeToken(token);
        if (payload?.sub) {
          try {
            const userData = await findOneUser(payload.sub);
            setUser(userData);
          } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
            // Poderia forçar logout aqui
          }
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) return <div>Carregando informações da conta...</div>;
  if (!user)
    return <div>Erro ao carregar conta. Por favor, faça login novamente.</div>;

  return (
    <div>
      <h2>👤 Minha Conta</h2>
      <p>Bem-vindo(a), **{user.name}**!</p>
      <p>E-mail: {user.email}</p>
      <p>
        Membro desde: {new Date(user.registrationDate).toLocaleDateString()}
      </p>

      <h3 style={{ marginTop: "20px" }}>Opções</h3>
      <ul>
        <li>
          <a href="/account/profile">Atualizar Perfil (Senha)</a>
        </li>
        <li>
          <a href="/account/orders">Meus Pedidos</a>
        </li>
        <li>
          <a href="/account/addresses">Gerenciar Endereços</a>
        </li>
        {/* Exemplo de link condicional para Vendedor */}
        {/* {user.role === 'vendedor' && <li><a href="/admin/products/manage">Gerenciar Produtos</a></li>} */}
      </ul>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
        }}
      >
        Sair
      </button>
    </div>
  );
}
