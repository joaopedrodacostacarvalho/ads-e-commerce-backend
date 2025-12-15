"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { decodeJwt } from "jose";
import { authStorage, TOKEN_KEY } from "./authStorage";
import { isTokenExpired } from "./jwt";
import { Pause } from "@mui/icons-material";

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

const TOKEN_CHECK_INTERVAL = 30_000; // 30 segundos

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // Inicinalização cim rehydrate do localStorage
  useEffect(() => {
    const token = authStorage.getToken();
    if (typeof token !== "string") return;

    try {
      const payload = decodeJwt(token) as JwtPayload;

      if (payload.exp * 1000 <= Date.now()) {
        authStorage.clearToken();
        return;
      }

      setUser(payload);
    } catch {
      authStorage.clearToken();
      setUser(null);
    }
  }, []);

  // Logout aumtomático por expiração
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("Checando");
      const token = authStorage.getToken();
      if (typeof token !== "string") return;

      try {
        if (isTokenExpired(token)) {
          authStorage.clearToken();
          setUser(null);
        }
      } catch {
        authStorage.clearToken();
        setUser(null);
      }
    }, TOKEN_CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Sincronizando entre abas com o storage event 
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== TOKEN_KEY) return;

      if (!event.newValue) {
        setUser(null);
        return;
      }

      try {
        setUser(decodeJwt(event.newValue) as JwtPayload);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [])

  const login = (token: string) => {
    if (typeof token !== "string") throw new Error("JWT inválido");

    const payload = decodeJwt(token) as JwtPayload;
    authStorage.setToken(token);
    setUser(payload);
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
