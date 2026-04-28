"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  File as FileIcon,
  Upload,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/cn";
import { formatFileSize } from "@/lib/utils/format";
import type { UploadPayload } from "@/types/document";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onUpload: (payload: UploadPayload) => Promise<void>;
};

export function UploadDialog({ open, onOpenChange, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (!prevOpenRef.current && open) {
      setFile(null);
      setName("");
      setAuthor("");
      setDescription("");
      setTags("");
      setIsDragOver(false);
      setProgress(0);
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!isSubmitting) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isSubmitting]);

  const applyFile = (next: File | null) => {
    setFile(next);
    if (next && !name.trim()) {
      const dotIdx = next.name.lastIndexOf(".");
      const base = dotIdx > 0 ? next.name.slice(0, dotIdx) : next.name;
      setName(base);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!file || !name.trim()) return;
    setIsSubmitting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => p + (90 - p) * 0.005);
    }, 100);

    try {
      await onUpload({
        file,
        name: name.trim(),
        description: description.trim() || undefined,
        author: author.trim() || undefined,
        tags: tags.trim() || undefined,
      });
      clearInterval(interval);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 350));
      onOpenChange(false);
    } catch {
      clearInterval(interval);
      setProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressLabel =
    progress < 30 ? "Uploading…" : progress < 100 ? "Processing…" : "Done";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (isSubmitting && !o) return;
        onOpenChange(o);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload document</DialogTitle>
          <DialogDescription>
            Add a file to your knowledge base. Processing takes 30–60 seconds.
          </DialogDescription>
        </DialogHeader>

        {isSubmitting ? (
          <div className="mt-4 flex flex-col gap-4">
            {file ? (
              <div className="rounded-lg border border-border bg-surface p-3 flex items-center gap-3">
                <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-accent transition-[width] duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{progressLabel}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="rounded-lg bg-amber-500/10 text-amber-700 text-xs px-3 py-2 flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>
                Don&apos;t close this tab while we process your document. This
                usually takes 30–60 seconds.
              </span>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" disabled>
                Cancel
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
            <div
              onClick={(e) => {
                if (e.target instanceof HTMLInputElement) return;
                inputRef.current?.click();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const dropped = e.dataTransfer.files?.[0] ?? null;
                if (dropped) applyFile(dropped);
              }}
              className={cn(
                "rounded-xl border-2 border-dashed border-border p-8 text-center cursor-pointer hover:border-accent/40 hover:bg-surface transition-colors",
                isDragOver && "border-accent bg-accent/5",
              )}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm mt-2">Click or drag a file here</p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOCX, TXT, MD, HTML, JSON
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.txt,.md,.html,.json"
                className="hidden"
                onChange={(e) => {
                  const picked = e.target.files?.[0] ?? null;
                  if (picked) applyFile(picked);
                  e.target.value = "";
                }}
              />
            </div>

            {file ? (
              <div className="rounded-lg border border-border bg-surface p-3 flex items-center gap-3">
                <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </div>
                </div>
                <IconButton
                  type="button"
                  aria-label="Remove file"
                  onClick={() => setFile(null)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </IconButton>
              </div>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="upload-name">Name</Label>
              <Input
                id="upload-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="upload-author">Author</Label>
              <Input
                id="upload-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="upload-description">Description</Label>
              <Textarea
                id="upload-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-16"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="upload-tags">Tags</Label>
              <Input
                id="upload-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="finance, quarterly"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!file || !name.trim()}
              >
                Upload
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
