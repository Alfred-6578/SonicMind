"use client";

import { useEffect, useState } from "react";
import { Download, FileQuestion } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { getAccessToken } from "@/lib/auth/tokens";
import { documentDownloadUrl } from "@/lib/api/client";
import { formatFileSize } from "@/lib/utils/format";
import type { DocumentItem } from "@/types/document";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  item: DocumentItem | null;
};

const PREVIEWABLE_TYPES = new Set([
  ".pdf",
  ".html",
  ".txt",
  ".md",
  ".json",
]);

export function PreviewDialog({ open, onOpenChange, item }: Props) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !item) return;

    const fileType = item.file_type.toLowerCase();
    if (!PREVIEWABLE_TYPES.has(fileType)) {
      setError("unsupported");
      return;
    }

    let cancelled = false;
    let createdUrl: string | null = null;

    setLoading(true);
    setError(null);
    setBlobUrl(null);

    (async () => {
      try {
        const token = getAccessToken();
        const res = await fetch(documentDownloadUrl(item.id), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        if (cancelled) return;
        createdUrl = URL.createObjectURL(blob);
        setBlobUrl(createdUrl);
      } catch {
        if (!cancelled) setError("load_failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
      setBlobUrl(null);
    };
  }, [open, item]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3 pr-8">
            <div className="min-w-0">
              <DialogTitle className="truncate">
                {item?.name ?? "Document"}
              </DialogTitle>
              {item ? (
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {item.file_type.replace(/^\./, "").toUpperCase()} ·{" "}
                  {formatFileSize(item.size_bytes)}
                </p>
              ) : null}
            </div>
            {item ? (
              <a
                href={documentDownloadUrl(item.id)}
                download={`${item.name}${item.file_type}`}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-muted hover:bg-border text-sm font-medium transition-colors shrink-0 mr-2"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            ) : null}
          </div>
        </DialogHeader>

        <div className="mt-4 h-[70vh] rounded-lg border border-border bg-muted overflow-hidden">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : error === "unsupported" ? (
            <PreviewMessage
              title="Preview not available"
              body={`${item?.file_type.replace(/^\./, "").toUpperCase()} files can't be previewed in the browser. Use the Download button to save it.`}
            />
          ) : error === "load_failed" ? (
            <PreviewMessage
              title="Couldn't load preview"
              body="The file couldn't be fetched. Try the Download button instead."
            />
          ) : blobUrl && item ? (
            <iframe
              src={blobUrl}
              title={item.name}
              className="w-full h-full border-0 bg-background"
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreviewMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6">
      <FileQuestion
        className="h-10 w-10 text-muted-foreground/60"
        aria-hidden
      />
      <p className="mt-4 text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground max-w-sm">{body}</p>
    </div>
  );
}
