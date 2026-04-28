import type { User } from "./user";

export type AuthResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};

// /auth/refresh returns just a string (the new access token), per OpenAPI
// Client handles both shapes defensively
export type RefreshResponse =
  | string
  | { access_token: string; refresh_token?: string };

export type ApiErrorBody = {
  detail?:
    | string
    | Array<{ loc: (string | number)[]; msg: string; type: string }>;
  message?: string;
  error_detail?: unknown;
};

export type { User } from "./user";
export type {
  Message,
  Source,
  ChatResponse,
  SendChatPayload,
  LocalSession,
  MessageView,
} from "./chat";
export type { DocumentItem, UploadPayload } from "./document";
