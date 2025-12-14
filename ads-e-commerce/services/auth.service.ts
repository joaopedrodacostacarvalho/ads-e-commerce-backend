import { decodeJwt } from "jose";
import api, { setAuthToken, removeAuthToken, getAuthToken } from "./api";
import { LoginReq, UserRequest, User, AuthResponse } from "./types";


interface JWTPayload {
  sub: number;
  email: string;
  role: "consumidor" | "vendedor";
  exp: number;
}

export async function login(credentials: LoginReq): Promise<User> {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  setAuthToken(data.token);
  return data.user;
}

export async function register(userData: UserRequest): Promise<User> {
  const { data } = await api.post<User>("/auth/register", userData);
  return data;
}

export function logout(): void {
  removeAuthToken();
}

export function decodeUserToken(token: string): JWTPayload | null {
  try {
    const payload = decodeJwt(token);

    // O payload de JOSE é 'unknown', precisamos de type assertion.
    const typedPayload = payload as unknown as JWTPayload;

    // Verifica a expiração do token (exp é em segundos, Date.now() em milissegundos)
    if (typedPayload.exp && typedPayload.exp * 1000 < Date.now()) {
      console.warn("Token expirado.");
      return null;
    }

    return typedPayload;
  } catch (error) {
    // Se a decodificação falhar (token malformado, etc.)
    console.error("Erro ao decodificar token com JOSE:", error);
    return null;
  }
}

// Funções utilitárias para verificação de status
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;

  const payload = decodeUserToken(token);
  return !!payload;
}
