import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

// Define a chave para o token no cookie
const AUTH_TOKEN_KEY = "jwt-token";

/**
 * Retorna o token JWT armazenado nos cookies.
 * @returns O token JWT ou null.
 */
export function getAuthToken(): string | null {
  return Cookies.get(AUTH_TOKEN_KEY) || null;
}

/**
 * Armazena o token JWT nos cookies.
 * @param token O token JWT a ser armazenado.
 */
export function setAuthToken(token: string): void {
  // Ajuste o `expires` conforme a validade do seu token, ou use `undefined` para session cookie
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Remove o token JWT dos cookies.
 */
export function removeAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_KEY);
}

// Configuração da instância base do Axios
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api", // Substitua pela URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição para injetar o token JWT
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      // O esquema de segurança no Swagger é 'bearer'
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
