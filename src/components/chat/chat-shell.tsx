"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { useMobile } from "@/hooks/use-mobile";
import { listSessions } from "@/lib/chat/local-sessions";
import { PublicHeader } from "@/components/layout/public-header";
import { ChatSidebar } from "./chat-sidebar";
import { ChatThread } from "./chat-thread";
import { ChatInput } from "./chat-input";
import type { LocalSession } from "@/types/chat";

export function ChatShell() {
  const {
    sessionId,
    messages,
    isSending,
    isLoadingHistory,
    send,
    newChat,
    loadSession,
    deleteLocalSession,
  } = useChat();

  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<LocalSession[]>(() =>
    listSessions(),
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <PublicHeader
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />
      <div className="flex-1 flex">
        <ChatSidebar
          sessions={sessions}
          activeSessionId={sessionId}
          isMobile={isMobile}
          isOpen={isMobile ? sidebarOpen : true}
          onClose={() => setSidebarOpen(false)}
          onNewChat={() => {
            newChat();
            setSessions(listSessions());
            setSidebarOpen(false);
          }}
          onSelectSession={(id) => {
            loadSession(id);
            setSidebarOpen(false);
          }}
          onDeleteSession={(id) => {
            deleteLocalSession(id);
            setSessions(listSessions());
          }}
        />
        <main className="flex-1 flex flex-col md:ml-72">
          <ChatThread
            messages={messages}
            isSending={isSending}
            isLoadingHistory={isLoadingHistory}
            onPickSuggestion={async (t) => {
              await send(t);
              setSessions(listSessions());
            }}
          />
          <ChatInput
            onSend={async (q) => {
              await send(q);
              setSessions(listSessions());
            }}
            disabled={isSending}
          />
        </main>
      </div>
    </div>
  );
}
