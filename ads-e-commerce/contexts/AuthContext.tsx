// src/contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, removeAuthToken } from "@/services/api";
import {
  login as apiLogin,
  register as apiRegister,
  decodeUserToken,
} from "@/services/auth.service";
import { LoginDto, RegisterDto, JWTPayload, User } from "@/services/types";
// Importe o tipo User e JWTPayload do seu arquivo de tipos

// Definição do contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginDto) => Promise<User>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função auxiliar para obter o estado inicial do usuário
const getInitialUser = (): User | null => {
  const token = getAuthToken();
  if (token) {
    const payload = decodeUserToken(token);
    if (payload) {
      // Constrói um objeto User parcial a partir do payload
      return {
        id: 0,
        email: payload.email,
        role: payload.role,
        name: payload.email.split("@")[0],
      } as User;
    }
  }
  return null;
};

// O Componente Provedor
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Verifica autenticação no primeiro carregamento (Client-Side)
  useEffect(() => {
    const initialUser = getInitialUser();
    setUser(initialUser);
    setLoading(false);
  }, []);

  // 2. Função de Login que atualiza o estado
  const login = async (credentials: LoginDto): Promise<User> => {
    const response = await apiLogin(credentials);

    const newUser = getInitialUser();
    if (newUser) {
      setUser(newUser);
      return newUser;
    } else {
      throw new Error("Falha ao processar token após o login.");
    }
  };

  // 3. Função de Registro (não altera o estado de login, apenas chama a API)
  const register = async (data: RegisterDto): Promise<void> => {
    await apiRegister(data);
  };

  // 4. Função de Logout que limpa o estado
  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Hook Customizado para consumo
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
