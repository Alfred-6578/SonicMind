"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/hooks/use-auth";
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

type Group = {
  label: string;
  items: LocalSession[];
};

function groupByTime(sessions: LocalSession[]): Group[] {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const yesterdayStart = todayStart - 86_400_000;
  const weekAgo = todayStart - 7 * 86_400_000;
  const monthAgo = todayStart - 30 * 86_400_000;

  const today: LocalSession[] = [];
  const yesterday: LocalSession[] = [];
  const week: LocalSession[] = [];
  const month: LocalSession[] = [];
  const older: LocalSession[] = [];

  for (const s of sessions) {
    const ts = new Date(s.created_at).getTime();
    if (ts >= todayStart) today.push(s);
    else if (ts >= yesterdayStart) yesterday.push(s);
    else if (ts >= weekAgo) week.push(s);
    else if (ts >= monthAgo) month.push(s);
    else older.push(s);
  }

  return [
    { label: "Today", items: today },
    { label: "Yesterday", items: yesterday },
    { label: "Previous 7 days", items: week },
    { label: "Previous 30 days", items: month },
    { label: "Older", items: older },
  ].filter((g) => g.items.length > 0);
}

function SessionRow({
  session,
  active,
  onSelect,
  onDelete,
}: {
  session: LocalSession;
  active: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="group relative">
      <button
        type="button"
        onClick={() => onSelect(session.session_id)}
        aria-current={active ? "true" : undefined}
        className={cn(
          "block w-full px-3 pr-9 h-9 rounded-lg text-sm text-left truncate transition-all",
          active
            ? "bg-accent/10 text-foreground font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {session.title}
      </button>
      <div
        aria-label="Delete chat"
        className="absolute flex items-center cursor-pointer right-1 top-1 h-7 w-7 opacity-100 md:opacity-0 md:group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(session.session_id);
        }}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </div>
    </li>
  );
}

function SidebarContent({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}: ContentProps) {
  const groups = useMemo(() => groupByTime(sessions), [sessions]);
  const { isAuthed, isLoading: isAuthLoading } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <Button
          variant="primary"
          className="w-full shadow-soft"
          onClick={onNewChat}
        >
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin px-2 py-2">
        {sessions.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="h-10 w-10 rounded-2xl bg-muted mx-auto flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-muted-foreground/60" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              No chats yet
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Your conversations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.label}>
                <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide px-2 mb-1.5">
                  {group.label}
                </div>
                <ul className="space-y-0.5">
                  {group.items.map((s) => (
                    <SessionRow
                      key={s.session_id}
                      session={s}
                      active={s.session_id === activeSessionId}
                      onSelect={onSelectSession}
                      onDelete={onDeleteSession}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border space-y-2">
        {!isAuthLoading && !isAuthed ? (
          <Link
            href="/login"
            className="md:hidden flex items-center justify-between w-full rounded-lg border border-border hover:border-accent/40 hover:bg-accent/4 px-3 h-9 text-sm font-medium transition-all"
          >
            <span>Sign in</span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
        ) : null}
        <p className="text-[11px] text-muted-foreground">
          Powered by SonicMind
        </p>
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
            className="absolute left-0 top-0 bottom-0 w-72 bg-surface border-r border-border shadow-pop"
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
