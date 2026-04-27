import { request } from "./client";
import type { ChatResponse, Message, SendChatPayload } from "@/types/api";

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
};
