"use client";

import { createContext, useEffect, useState } from "react";
import { authApi } from "@/lib/api/auth";
import {
  clearTokens,
  getRefreshToken,
  hasRefreshToken,
  setTokens,
} from "@/lib/auth/tokens";
import type { User } from "@/types/user";

const USER_KEY = "sm.user";

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (hasRefreshToken()) {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) {
        try {
          setUser(JSON.parse(raw) as User);
        } catch {
          // ignore corrupt cache
        }
      }
      setIsAuthed(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    setTokens(res.access_token, res.refresh_token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setUser(res.user);
    setIsAuthed(true);
  };

  const logout = async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      try {
        await authApi.revoke(refresh);
      } catch {
        // token may already be invalid; clear locally regardless
      }
    }
    clearTokens();
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthed, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
