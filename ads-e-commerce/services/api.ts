import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = "jwt-token";

// --- Gerenciamento de Token ---
export const getAuthToken = (): string | null =>
  Cookies.get(AUTH_TOKEN_KEY) || null;

export const setAuthToken = (token: string): void => {
  // Define cookie seguro (apenas HTTPS em prod) por 7 dias
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

export const removeAuthToken = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY);
};

// --- Configuração da URL Base ---
const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
let API_BASE_URL: string;

try {
  // Garante conformidade com WHATWG URL API para evitar warnings do Node
  API_BASE_URL = new URL(RAW_BASE_URL).toString();
  // Remove barra final se existir para consistência na concatenação
  if (API_BASE_URL.endsWith("/")) {
    API_BASE_URL = API_BASE_URL.slice(0, -1);
  }
} catch (e) {
  console.warn(
    "URL Base inválida fornecida, usando fallback inseguro:",
    RAW_BASE_URL
  );
  API_BASE_URL = RAW_BASE_URL;
}

// --- Instância Axios ---
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout de 10s para evitar pendências infinitas
});

// Interceptor: Injeta Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Tratamento Global de Erros (Opcional, mas recomendado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Lógica opcional: Redirecionar para login ou limpar token expirado
      // removeAuthToken();
    }
    return Promise.reject(error);
  }
);

export default api;
