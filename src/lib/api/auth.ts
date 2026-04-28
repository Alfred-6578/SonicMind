import { request } from "./client";
import type { AuthResponse } from "@/types/api";

export const authApi = {
  register(payload: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return request("/auth/register", { method: "POST", body: payload });
  },
  login(payload: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return request("/auth/login", { method: "POST", body: payload });
  },
  revoke(refresh_token: string): Promise<unknown> {
    return request("/auth/revoke", {
      method: "POST",
      body: { refresh_token },
    });
  },
};
