const ACCESS_TOKEN_KEY = "sm.access";
const REFRESH_TOKEN_KEY = "sm.refresh";

let accessToken: string | null = null;

if (typeof window !== "undefined") {
  accessToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window === "undefined") return null;
  accessToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  return accessToken;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(access: string, refresh?: string): void {
  accessToken = access;
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
  if (refresh !== undefined) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
}

export function setAccessToken(access: string): void {
  setTokens(access);
}

export function clearTokens(): void {
  accessToken = null;
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function hasRefreshToken(): boolean {
  return getRefreshToken() !== null;
}
