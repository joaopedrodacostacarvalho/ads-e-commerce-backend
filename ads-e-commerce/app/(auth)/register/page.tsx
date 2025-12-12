"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";
import { UserRequest } from "@/services/types";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"consumidor" | "vendedor">("consumidor");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register({ name, email, password, role } as UserRequest);
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Erro ao realizar cadastro. Tente novamente."
      );
    }
  };

  return (
    <div>
      <h3>Cadastre-se</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome Completo"
          required
        />
        <br />
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
          placeholder="Senha (Mín. 8 caracteres)"
          required
        />
        <br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "consumidor" | "vendedor")}
          required
        >
          <option value="consumidor">Consumidor</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem conta? <a href="/login">Fazer Login</a>
      </p>
    </div>
  );
}
