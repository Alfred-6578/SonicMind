"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "./empty-state";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import type { MessageView } from "@/types/chat";

type Props = {
  messages: MessageView[];
  isSending: boolean;
  isLoadingHistory: boolean;
  onPickSuggestion: (text: string) => void;
};

export function ChatThread({
  messages,
  isSending,
  isLoadingHistory,
  onPickSuggestion,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firstScrollRef = useRef(true);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const behavior: ScrollBehavior = firstScrollRef.current ? "auto" : "smooth";
    sentinel.scrollIntoView({ behavior });
    firstScrollRef.current = false;
  }, [messages.length, isSending]);

  return (
    <div className="flex-1 overflow-y-auto scroll-thin">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        {isLoadingHistory ? (
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : messages.length === 0 ? (
          <EmptyState onPick={onPickSuggestion} />
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                role={m.role}
                content={m.content}
                sources={m.sources}
                retrievedChunkCount={m.retrieved_chunk_count}
                documentIdsUsed={m.document_ids_used}
              />
            ))}
            {isSending ? <TypingIndicator /> : null}
          </>
        )}
        <div ref={sentinelRef} />
      </div>
    </div>
  );
}
