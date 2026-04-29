"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MessageBubble } from "@/components/chat/message-bubble";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { chatApi } from "@/lib/api/chat";
import { extractMessage } from "@/lib/api/errors";
import type { Message } from "@/types/chat";

type PageProps = { params: Promise<{ id: string }> };

export default function SessionDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    chatApi
      .history(id, 200)
      .then(setMessages)
      .catch((e) => setError(extractMessage(e)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const firstAt = messages[0]?.created_at;
  const lastAt = messages[messages.length - 1]?.created_at;

  return (
    <div>
      <Link
        href="/admin/sessions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sessions
      </Link>

      <h1 className="font-serif text-3xl tracking-tight">Conversation</h1>
      <p className="mt-1 text-xs text-muted-foreground font-mono break-all">
        {id}
      </p>

      {!isLoading && !error && messages.length > 0 ? (
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          <span>
            {messages.length}{" "}
            {messages.length === 1 ? "message" : "messages"}
          </span>
          {firstAt ? (
            <>
              <span>·</span>
              <span>
                Started {new Date(firstAt).toLocaleString()}
              </span>
            </>
          ) : null}
          {lastAt && lastAt !== firstAt ? (
            <>
              <span>·</span>
              <span>Ended {new Date(lastAt).toLocaleString()}</span>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 max-w-3xl">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">
              Couldn&apos;t load this session.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{error}</p>
            <Button variant="secondary" onClick={load} className="mt-4">
              Try again
            </Button>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            No messages in this session.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                role={m.role}
                content={m.content}
                retrievedChunkCount={m.retrieved_chunk_count}
                documentIdsUsed={m.document_ids_used}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
