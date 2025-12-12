// api.ts

import axios, { AxiosInstance, AxiosError } from "axios";

// Variável de ambiente (ajuste no seu .env.local)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para injetar o Token JWT (JOSE) em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtém o token do localStorage (ou cookies, que seria mais seguro em Next.js)
    // Usando localStorage aqui para simplicidade.
    const token = localStorage.getItem("jwt_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta para lidar com 401 (Não Autorizado)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error(
        "Sessão expirada ou não autorizada. Redirecionando para login..."
      );
      // Implemente a lógica de logout e redirecionamento aqui:
      localStorage.removeItem("jwt_token");
      // Ex: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
