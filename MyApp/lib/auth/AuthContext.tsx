import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../api";
import { Platform } from "react-native";

type AuthCtx = {
  token: string | null;
  status: "idle" | "loading";
  hydrated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({
  token: null,
  status: "idle",
  hydrated: false,
  login: async () => false,
  logout: () => {}
});

const TOKEN_KEY = "auth_token";

async function loadToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return SecureStore.getItemAsync(TOKEN_KEY);
}

async function saveToken(token: string | null) {
  if (Platform.OS === "web") {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    return;
  }
  if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
  else await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<AuthCtx["status"]>("idle");

  useEffect(() => {
    loadToken().then((t) => {
      setToken(t);
      setHydrated(true);
    });
  }, []);

  const value = useMemo<AuthCtx>(() => ({
    token,
    hydrated,
    status,
    login: async (email: string, password: string) => {
      setStatus("loading");
      try {
        const { access_token } = await api.post("/auth/login", { email, password });
        setToken(access_token);
        await saveToken(access_token);
        return true;
      } catch {
        return false;
      } finally {
        setStatus("idle");
      }
    },
    logout: () => {
      setToken(null);
      saveToken(null);
    }
  }), [token, hydrated, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);