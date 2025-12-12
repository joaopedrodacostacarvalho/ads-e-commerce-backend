"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Componente da página de Login.
 * Este componente lida com o estado do formulário e a chamada da função de login
 * fornecida pelo AuthContext.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtém a função de login do Contexto
  const { login: contextLogin } = useAuth();

  // Define para onde redirecionar:
  // 1. Para a rota especificada pelo parâmetro 'redirect' na URL (ex: /login?redirect=/cart)
  // 2. Ou para a página de conta padrão (/account)
  const redirectTo = searchParams.get("redirect") || "/account";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {

      await contextLogin({ email, password });

      setSuccessMessage("Login realizado com sucesso! Redirecionando...");

      // Pequeno atraso para o usuário ver a mensagem de sucesso
      setTimeout(() => {
        router.push(redirectTo);
      }, 500);
    } catch (e: any) {
      console.error(e);
      // Extrai a mensagem de erro da resposta da API ou usa uma mensagem genérica
      const apiError =
        e.message ||
        e.response?.data?.message ||
        "Credenciais inválidas. Verifique seu e-mail e senha.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  // O layout visual (card, título, links de alternância) é fornecido por (auth)/layout.tsx.
  // Este componente só renderiza o conteúdo principal do formulário.
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {/* Exibição de Mensagens de Erro/Sucesso */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm text-center">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm text-center">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <FormInput
          label="E-mail"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          label="Senha"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading || !!successMessage}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out 
            ${
              loading || !!successMessage
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}
