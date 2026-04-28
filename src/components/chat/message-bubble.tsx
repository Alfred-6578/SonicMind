"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { MessageMarkdown } from "./message-markdown";
import { MessageActions } from "./message-actions";
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
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isUser ? (
        <div className="group flex items-end gap-2 max-w-[82%] flex-row-reverse">
          <div className="h-7 w-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mb-0.5">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="rounded-2xl bg-accent text-accent-foreground px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-soft">
            {content}
          </div>
        </div>
      ) : (
        <div className="group flex gap-3 w-full">
          <BrandMark size="md" className="mt-1" />
          <div className="flex-1 min-w-0">
            <div className="text-foreground text-[0.9375rem] leading-relaxed">
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
            <MessageActions content={content} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
