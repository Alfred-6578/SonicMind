"use client";

import { useEffect, useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { useMobile } from "@/hooks/use-mobile";
import { listSessions } from "@/lib/chat/local-sessions";
import { PublicHeader } from "@/components/layout/public-header";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
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
  const [sessions, setSessions] = useState<LocalSession[]>([]);
  const [pendingDelete, setPendingDelete] = useState<LocalSession | null>(
    null,
  );

  useEffect(() => {
    setSessions(listSessions());
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-background">
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
            const session = sessions.find((s) => s.session_id === id);
            if (session) setPendingDelete(session);
          }}
        />
        <main className="flex-1 flex flex-col md:ml-72 bg-canvas">
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

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(o) => !o && setPendingDelete(null)}
        title="Delete chat?"
        description={
          pendingDelete ? (
            <>
              <span className="block font-medium text-foreground mb-2">
                {pendingDelete.title}
              </span>
              <span className="block">
                This conversation will be removed from your local list. The
                server-side history is unaffected.
              </span>
            </>
          ) : null
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (pendingDelete) {
            deleteLocalSession(pendingDelete.session_id);
            setSessions(listSessions());
          }
        }}
      />
    </div>
  );
}
