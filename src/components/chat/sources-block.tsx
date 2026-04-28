"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, FileText } from "lucide-react";
import { formatScore } from "@/lib/utils/format";
import type { Source } from "@/types/chat";

type Props = { sources: Source[] };

function scorePct(score: number): number {
  if (score > 1) return Math.min(100, score);
  return Math.max(0, score) * 100;
}

export function SourcesBlock({ sources }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors group"
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
        <span>Sources</span>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
          {sources.length}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="grid sm:grid-cols-2 gap-2 mt-3">
          {sources.map((s, i) => {
            const { document_info: doc, chunk_info: chunk } = s;
            const pct = scorePct(chunk.score);
            return (
              <div
                key={`${doc.document_id}-${chunk.chunk_id}-${i}`}
                className="rounded-xl border border-border bg-surface hover:border-accent/30 hover:bg-accent/4 transition-all p-3.5 group"
              >
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {doc.document_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="h-1 w-10 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono tabular-nums text-muted-foreground">
                      {formatScore(chunk.score)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                  {chunk.content_preview}
                </p>
                {doc.author ? (
                  <p className="text-[11px] text-muted-foreground/70 mt-2">
                    {doc.author}
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
