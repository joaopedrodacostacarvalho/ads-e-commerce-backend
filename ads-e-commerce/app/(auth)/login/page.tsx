"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { LoginReq } from "@/services/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login({ email, password } as LoginReq);
      alert(`Login bem-sucedido! Bem-vindo(a), ${user.name}`);

      // Redirecionamento baseado no papel (role) do usuário
      if (user.role === "vendedor") {
        router.push("/admin/products/manage");
      } else {
        router.push("/account");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Erro ao realizar login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div>
      <h3>Fazer Login</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
}
