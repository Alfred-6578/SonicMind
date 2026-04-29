"use client";

import { motion } from "motion/react";
import {
  Download,
  Eye,
  File,
  FileCode,
  FileText,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Spinner } from "@/components/ui/spinner";
import {
  formatFileType,
  formatRelativeTime,
  formatTokens,
} from "@/lib/utils/format";
import { documentDownloadUrl } from "@/lib/api/client";
import { cn } from "@/lib/utils/cn";
import type { DocumentItem } from "@/types/document";

type Props = {
  item: DocumentItem;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  isUploading?: boolean;
  uploadStatus?: "uploading" | "processing";
};

function iconFor(fileType: string) {
  const t = fileType.toLowerCase();
  if (t === ".pdf" || t === ".docx" || t === ".txt" || t === ".md") {
    return FileText;
  }
  if (t === ".html" || t === ".json") return FileCode;
  return File;
}

export function DocumentRow({
  item,
  onDelete,
  onPreview,
  isUploading,
  uploadStatus,
}: Props) {
  const Icon = iconFor(item.file_type);
  const displayName =
    item.name && item.name !== "string" ? item.name : "Untitled";
  const hasAuthor = item.author && item.author !== "string";
  const realTags = item.tags?.filter((t) => t && t !== "string") ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-xl border border-border bg-surface hover:border-accent/30 hover:shadow-soft hover:bg-accent/4 transition-all",
        isUploading && "opacity-70 pointer-events-none",
      )}
    >
      <div className="h-10 w-10 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{displayName}</div>
        <div className="mt-0.5 flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
          <Badge variant="neutral">{formatFileType(item.file_type)}</Badge>
          {realTags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
          {hasAuthor ? <span>by {item.author}</span> : null}
          <span>
            {item.chunks} chunks · {formatTokens(item.tokens)}
          </span>
          <span>{formatRelativeTime(item.created_at)}</span>
        </div>
      </div>

      {isUploading ? (
        <div className="rounded-full bg-muted px-2.5 py-1 text-xs flex items-center gap-1.5 shrink-0">
          <Spinner size="sm" />
          <span>
            {uploadStatus === "processing" ? "Processing…" : "Uploading…"}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-0.5 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            aria-label="Preview document"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(item.id);
            }}
            className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <a
            href={documentDownloadUrl(item.id)}
            download={`${item.name}${item.file_type}`}
            aria-label="Download document"
            onClick={(e) => e.stopPropagation()}
            className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="h-4 w-4" />
          </a>
          <IconButton
            aria-label="Delete document"
            className="text-muted-foreground hover:text-destructive transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>
      )}
    </motion.div>
  );
}
