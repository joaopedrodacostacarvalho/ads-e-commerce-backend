"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "jose";
import { authStorage } from "./authStorage";

type JwtPayload = {
  sub: number;
  email: string;
  role: string;
  exp: number;
};

type AuthContextType = {
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = authStorage.getToken();
    if (typeof token !== "string") return;

    try {
      setUser(decodeJwt(token) as JwtPayload);
    } catch {
      authStorage.clearToken();
      setUser(null);
    }
  }, []);

  const login = (token: string) => {
    authStorage.setToken(token);
    setUser(decodeJwt(token) as JwtPayload);
  };

  const logout = () => {
    authStorage.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
