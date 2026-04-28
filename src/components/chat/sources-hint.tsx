"use client";

import { FileText } from "lucide-react";

type Props = {
  chunkCount: number;
  documentIdsCount: number;
};

export function SourcesHint({ chunkCount, documentIdsCount }: Props) {
  if (chunkCount <= 0 && documentIdsCount <= 0) return null;
  const docWord = documentIdsCount === 1 ? "document" : "documents";
  return (
    <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <FileText className="h-3 w-3" />
      <span>
        Used {documentIdsCount} {docWord} · {chunkCount} chunks
      </span>
    </div>
  );
}
