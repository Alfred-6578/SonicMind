"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatApi } from "@/lib/api/chat";
import { extractMessage } from "@/lib/api/errors";
import { formatRelativeTime } from "@/lib/utils/format";
import type { AdminSession } from "@/types/chat";

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-border bg-surface animate-pulse">
      <div className="h-10 w-10 rounded-lg bg-muted shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="h-2.5 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}

function SessionRow({
  session,
  index,
}: {
  session: AdminSession;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
    >
      <Link
        href={`/admin/sessions/${session.id}`}
        className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-border bg-surface hover:border-accent/30 hover:shadow-soft hover:bg-accent/4 transition-all"
      >
        <div className="h-10 w-10 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {session.name || "Untitled session"}
          </div>
          {session.description ? (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {session.description}
            </p>
          ) : null}
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span>
              {session.total_messages}{" "}
              {session.total_messages === 1 ? "message" : "messages"}
            </span>
            <span>·</span>
            <span className="font-mono tabular-nums">
              ${session.total_cost.toFixed(4)}
            </span>
            <span>·</span>
            <span>{formatRelativeTime(session.created_at)}</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
      </Link>
    </motion.div>
  );
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await chatApi.adminListSessions(100);
      setSessions(data);
    } catch (e) {
      setError(extractMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = sessions.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      s.name?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-3xl tracking-tight">Sessions</h1>
            {!isLoading && sessions.length > 0 ? (
              <span className="rounded-full bg-muted text-muted-foreground text-xs px-2 py-0.5 font-mono tabular-nums">
                {sessions.length}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Visitor conversations with the chat.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by topic, summary, or session ID…"
          className="w-full md:max-w-sm"
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : error && sessions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">
              Couldn&apos;t load sessions.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{error}</p>
            <Button
              variant="secondary"
              onClick={() => refresh()}
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-12 w-12 rounded-2xl bg-muted mx-auto flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-muted-foreground/60" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No sessions yet.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Visitor conversations will appear here once the chat is used.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">
              No sessions match &ldquo;{search}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((s, i) => (
              <SessionRow key={s.id} session={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
