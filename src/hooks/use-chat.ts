"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { chatApi } from "@/lib/api/chat";
import { extractMessage } from "@/lib/api/errors";
import {
  getCurrentSessionId,
  removeSession,
  setCurrentSessionId,
  titleFromQuestion,
  upsertSession,
} from "@/lib/chat/local-sessions";
import type { MessageView } from "@/types/chat";

export function useChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageView[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  useEffect(() => {
    const id = getCurrentSessionId();
    if (!id) return;
    setSessionId(id);
    setIsLoadingHistory(true);

    const localId = ++requestIdRef.current;
    chatApi
      .history(id)
      .then((history) => {
        if (requestIdRef.current !== localId) return;
        setMessages(history);
      })
      .catch(() => {
        if (requestIdRef.current !== localId) return;
        setSessionId(null);
        setMessages([]);
        setCurrentSessionId(null);
      })
      .finally(() => {
        if (requestIdRef.current !== localId) return;
        setIsLoadingHistory(false);
      });
  }, []);

  const send = async (question: string) => {
    if (!question.trim()) return;

    const tempUser: MessageView = {
      id: "temp-" + crypto.randomUUID(),
      session_id: sessionId ?? "",
      role: "user",
      content: question,
      document_id: null,
      document_ids_used: [],
      retrieved_chunk_count: 0,
      relevance_scores: {},
      input_tokens: 0,
      output_tokens: 0,
      estimated_cost: 0,
      user_rating: null,
      feedback: null,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUser]);
    setIsSending(true);
    setError(null);

    const localId = ++requestIdRef.current;
    const wasNullSession = sessionId === null;

    try {
      const response = await chatApi.send({
        session_id: sessionId,
        question,
      });
      if (requestIdRef.current !== localId) return;

      if (wasNullSession) {
        const newSessionId = response.message.session_id;
        setSessionId(newSessionId);
        upsertSession({
          session_id: newSessionId,
          title: titleFromQuestion(question),
          created_at: new Date().toISOString(),
        });
        setCurrentSessionId(newSessionId);
      }

      const assistant: MessageView = {
        ...response.message,
        sources: response.sources,
      };
      setMessages((prev) => [...prev, assistant]);
    } catch (e) {
      if (requestIdRef.current !== localId) return;
      const msg = extractMessage(e);
      setMessages((prev) => prev.filter((m) => m.id !== tempUser.id));
      setError(msg);
      toast.error(msg);
    } finally {
      if (requestIdRef.current === localId) {
        setIsSending(false);
      }
    }
  };

  const newChat = () => {
    requestIdRef.current++;
    setMessages([]);
    setSessionId(null);
    setError(null);
    setCurrentSessionId(null);
    setIsSending(false);
    setIsLoadingHistory(false);
  };

  const loadSession = async (id: string) => {
    if (id === sessionId) return;
    setSessionId(id);
    setMessages([]);
    setError(null);
    setIsSending(false);
    setIsLoadingHistory(true);

    const localId = ++requestIdRef.current;
    try {
      const history = await chatApi.history(id);
      if (requestIdRef.current !== localId) return;
      setMessages(history);
      setCurrentSessionId(id);
    } catch (e) {
      if (requestIdRef.current !== localId) return;
      toast.error(extractMessage(e));
    } finally {
      if (requestIdRef.current === localId) {
        setIsLoadingHistory(false);
      }
    }
  };

  const deleteLocalSession = (id: string) => {
    removeSession(id);
    if (id === sessionId) {
      newChat();
    }
  };

  return {
    sessionId,
    messages,
    isSending,
    isLoadingHistory,
    error,
    send,
    newChat,
    loadSession,
    deleteLocalSession,
  };
}
