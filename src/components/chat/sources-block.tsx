"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, FileText } from "lucide-react";
import { formatScore } from "@/lib/utils/format";
import type { Source } from "@/types/chat";

type Props = { sources: Source[] };

export function SourcesBlock({ sources }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
        Sources ({sources.length})
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="grid gap-2 mt-2">
          {sources.map((s, i) => {
            const { document_info: doc, chunk_info: chunk } = s;
            return (
              <div
                key={`${doc.document_id}-${chunk.chunk_id}-${i}`}
                className="rounded-lg border border-border bg-surface p-3 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {doc.document_name}
                    </span>
                  </div>
                  <span className="rounded-full bg-accent/10 text-accent text-[11px] font-mono px-2 py-0.5 shrink-0">
                    {formatScore(chunk.score)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                  {chunk.content_preview}
                </p>
                {doc.author ? (
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    by {doc.author}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
