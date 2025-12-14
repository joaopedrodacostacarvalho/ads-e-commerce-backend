"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";
import FormInput from "@/components/FormInput";
import { UserRequest } from "@/services/types";

export default function RegisterPage() {
  const [formData, setFormData] = useState<UserRequest>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "consumidor",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await register(formData);

      setSuccessMessage(
        "🎉 Conta criada com sucesso! Redirecionando para login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (e: any) {
      console.error(e);
      const apiError =
        e.response?.data?.message || "Erro ao registrar. Verifique seus dados.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          label="Nome Completo"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormInput
          label="E-mail"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          label="Senha"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <FormInput
          label="Telefone (Opcional)"
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required={false}
          value={formData.phone || ""}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Qual seu papel?
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="consumidor">Consumidor (Comprar)</option>
            <option value="vendedor">Vendedor (Vender Produtos)</option>
          </select>
        </div>
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
          {loading ? "Registrando..." : "Criar Conta"}
        </button>
      </div>
    </form>
  );
}
