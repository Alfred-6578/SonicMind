import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  hasRefreshToken,
  setTokens,
} from "@/lib/auth/tokens";
import { ApiError, extractMessage } from "./errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

if (!BASE_URL && process.env.NODE_ENV === "development") {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set — define it in .env.local",
  );
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  formData?: FormData;
  auth?: boolean;
  signal?: AbortSignal;
  query?: Record<string, string | number | undefined>;
};

function buildUrl(
  path: string,
  query: RequestOptions["query"],
): string {
  let url = BASE_URL + path;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined) params.set(k, String(v));
  }
  const qs = params.toString();
  if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  return url;
}

async function refreshAccessToken(): Promise<boolean> {
  if (!hasRefreshToken()) return false;
  try {
    const res = await fetch(BASE_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: getRefreshToken() }),
    });
    if (!res.ok) return false;
    const data: unknown = await res.json();
    const newAccess =
      typeof data === "string"
        ? data
        : typeof data === "object" && data !== null
          ? (data as { access_token?: string }).access_token
          : undefined;
    const newRefresh =
      typeof data === "object" && data !== null
        ? (data as { refresh_token?: string }).refresh_token
        : undefined;
    if (!newAccess) return false;
    setTokens(newAccess, newRefresh);
    return true;
  } catch {
    return false;
  }
}

export async function request<T>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, formData, auth = false, signal, query } = opts;
  const url = buildUrl(path, query);

  const sendOnce = async (): Promise<Response> => {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (!formData) headers["Content-Type"] = "application/json";
    if (auth) {
      const token = getAccessToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, {
      method,
      headers,
      signal,
      body:
        body !== undefined
          ? JSON.stringify(body)
          : formData !== undefined
            ? formData
            : undefined,
    });
  };

  let res: Response;
  try {
    res = await sendOnce();
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new ApiError("Network error", 0);
  }

  if (res.status === 401 && auth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      try {
        res = await sendOnce();
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") throw e;
        throw new ApiError("Network error", 0);
      }
    } else {
      let body: unknown = {};
      try {
        body = await res.json();
      } catch {
        // ignore
      }
      clearTokens();
      throw new ApiError(extractMessage(body), res.status, body);
    }
  }

  if (!res.ok) {
    let errBody: unknown = {};
    try {
      errBody = await res.json();
    } catch {
      // ignore
    }
    throw new ApiError(extractMessage(errBody), res.status, errBody);
  }

  if (res.status === 204) return null as T;
  return (await res.json()) as T;
}
