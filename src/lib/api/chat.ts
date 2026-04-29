import { request } from "./client";
import type { ChatResponse, Message, SendChatPayload } from "@/types/api";
import type { AdminSession } from "@/types/chat";

export const chatApi = {
  send(payload: SendChatPayload): Promise<ChatResponse> {
    return request("/chat/", { method: "POST", body: payload });
  },
  history(sessionId: string, limit = 100): Promise<Message[]> {
    return request(`/chat/${sessionId}/history`, {
      method: "GET",
      query: { limit },
    });
  },
  adminListSessions(limit = 100): Promise<AdminSession[]> {
    return request("/chat/sessions", {
      method: "GET",
      query: { limit },
      auth: true,
    });
  },
};
