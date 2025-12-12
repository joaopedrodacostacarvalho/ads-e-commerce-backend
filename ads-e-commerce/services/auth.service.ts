import api, { setAuthToken, removeAuthToken } from "./api";
import { LoginReq, UserRequest, User, AuthResponse } from "./types";
import * as jose from "jose";

type JWTPayload = {
  sub: number; // ID do usuário
  email: string;
  role: "consumidor" | "vendedor";
  iat: number;
  exp: number;
};

/**
 * Decodifica o token JWT para obter o payload.
 * @param token O token JWT.
 * @returns O payload decodificado.
 */
export async function decodeToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = jose.decodeJwt(token);
    return payload as JWTPayload;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

/**
 * Endpoint: POST /auth/login
 * Sumário: Realiza o login e armazena o token.
 */
export async function login(credentials: LoginReq): Promise<User> {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  const { token, user } = response.data;
  setAuthToken(token);
  return user;
}

/**
 * Endpoint: POST /auth/register
 * Sumário: Cria um novo usuário (cadastro).
 */
export async function register(userData: UserRequest): Promise<User> {
  const response = await api.post<User>("/auth/register", userData);
  return response.data;
}

/**
 * Realiza o logout, removendo o token.
 */
export function logout(): void {
  removeAuthToken();
}

/**
 * Checa se o usuário está autenticado e qual é o seu papel.
 */
export async function checkAuth(): Promise<{
  isAuthenticated: boolean;
  role: "consumidor" | "vendedor" | null;
}> {
  const token = api.defaults.headers.common["Authorization"]
    ?.toString()
    .replace("Bearer ", "");
  if (token) {
    const payload = await decodeToken(token);
    if (payload) {
      return { isAuthenticated: true, role: payload.role };
    }
  }
  return { isAuthenticated: false, role: null };
}
