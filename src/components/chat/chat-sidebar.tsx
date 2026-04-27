"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils/cn";
import type { LocalSession } from "@/types/chat";

type Props = {
  sessions: LocalSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
};

type ContentProps = Pick<
  Props,
  | "sessions"
  | "activeSessionId"
  | "onNewChat"
  | "onSelectSession"
  | "onDeleteSession"
>;

function SidebarContent({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}: ContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <Button variant="primary" className="w-full" onClick={onNewChat}>
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <div className="h-px bg-border mx-3" />

      <div className="flex-1 overflow-y-auto scroll-thin px-2 py-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-2 mb-2">
          Recent
        </div>

        {sessions.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-6">
            No chats yet
          </div>
        ) : (
          <ul className="space-y-0.5">
            {sessions.map((s) => {
              const active = s.session_id === activeSessionId;
              return (
                <li key={s.session_id} className="group relative">
                  <button
                    type="button"
                    onClick={() => onSelectSession(s.session_id)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "block w-full h-9 px-2 pr-9 rounded-md text-sm text-left truncate hover:bg-muted",
                      active && "bg-muted text-foreground",
                    )}
                  >
                    {s.title}
                  </button>
                  <IconButton
                    aria-label="Delete chat"
                    className="absolute right-1 top-1 h-7 w-7 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(s.session_id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-border text-xs text-muted-foreground">
        Powered by SonicMind
      </div>
    </div>
  );
}

export function ChatSidebar(props: Props) {
  const { isMobile, isOpen, onClose } = props;

  if (!isMobile) {
    return (
      <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 border-r border-border bg-surface flex flex-col">
        <SidebarContent {...props} />
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 top-14 z-40">
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
          <motion.aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-surface border-r border-border"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <SidebarContent {...props} />
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
