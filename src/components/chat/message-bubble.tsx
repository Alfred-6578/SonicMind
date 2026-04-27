"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { MessageMarkdown } from "./message-markdown";
import { SourcesBlock } from "./sources-block";
import { SourcesHint } from "./sources-hint";
import type { Source } from "@/types/chat";

type Props = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  retrievedChunkCount?: number | null;
  documentIdsUsed?: string[];
};

export function MessageBubble({
  role,
  content,
  sources,
  retrievedChunkCount,
  documentIdsUsed,
}: Props) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {isUser ? (
        <div className="max-w-[78%] rounded-2xl bg-accent text-accent-foreground px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      ) : (
        <div className="max-w-full w-full text-foreground text-[0.9375rem] leading-relaxed">
          <MessageMarkdown content={content} />
          {sources && sources.length > 0 ? (
            <SourcesBlock sources={sources} />
          ) : retrievedChunkCount && retrievedChunkCount > 0 ? (
            <SourcesHint
              chunkCount={retrievedChunkCount}
              documentIdsCount={documentIdsUsed?.length ?? 0}
            />
          ) : null}
        </div>
      )}
    </motion.div>
  );
}
