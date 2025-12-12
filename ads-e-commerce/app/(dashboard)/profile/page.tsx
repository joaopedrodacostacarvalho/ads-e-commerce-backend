// Rota: /account/profile (Atualizar User/UpdateClientDto)
"use client";

import React, { useState, useEffect } from "react";
import { findOneUser, updateUser } from "@/services/user.service";
import { getAuthToken } from "@/services/api";
import { decodeToken } from "@/services/auth.service";
import { UpdateClientDto, User } from "@/services/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

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
            setError("Erro ao carregar dados do usuário.");
          }
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Usuário não carregado.");
      return;
    }

    if (password.length > 0 && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const updateData: UpdateClientDto = {};
      if (password.length > 0) {
        updateData.password = password;
      }

      if (Object.keys(updateData).length === 0) {
        setError("Nenhuma alteração a ser salva.");
        return;
      }

      await updateUser(user.id, updateData);
      setSuccess("Perfil atualizado com sucesso!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao atualizar perfil.");
    }
  };

  if (loading) return <div>Carregando perfil...</div>;
  if (!user) return <div>Acesso negado.</div>;

  return (
    <div>
      <h2>Meu Perfil</h2>
      <p>Você está editando o perfil de: **{user.email}**</p>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <h3>Alterar Senha</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nova Senha"
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Nova Senha"
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "purple",
            color: "white",
            border: "none",
          }}
        >
          Salvar Alterações
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        <a href="/account">Voltar à Visão Geral</a>
      </p>
    </div>
  );
}
