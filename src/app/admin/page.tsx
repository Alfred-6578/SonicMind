"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { DocumentTable } from "@/components/admin/document-table";
import { UploadDialog } from "@/components/admin/upload-dialog";
import { useDocuments } from "@/hooks/use-documents";
import type { DocumentItem } from "@/types/document";

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-border bg-surface animate-pulse">
      <div className="h-10 w-10 rounded-lg bg-muted shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="h-2.5 w-2/3 rounded bg-muted" />
      </div>
      <div className="h-9 w-9 rounded-md bg-muted shrink-0" />
    </div>
  );
}

export default function AdminPage() {
  const { items, isLoading, uploadingItems, upload, remove } = useDocuments();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DocumentItem | null>(null);
  const [search, setSearch] = useState("");

  const filtered = items.filter((i) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      i.name?.toLowerCase().includes(q) ||
      i.author?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Files powering the chat.
          </p>
        </div>
        <Button variant="primary" onClick={() => setUploadOpen(true)}>
          <Upload className="h-4 w-4" />
          Upload document
        </Button>
      </div>

      <div className="mt-6">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or author…"
          className="w-full md:max-w-sm"
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : items.length === 0 && uploadingItems.length === 0 ? (
          <AdminEmptyState onUpload={() => setUploadOpen(true)} />
        ) : (
          <DocumentTable
            items={filtered}
            uploadingItems={uploadingItems}
            onDelete={(id) =>
              setDeleteTarget(items.find((i) => i.id === id) ?? null)
            }
          />
        )}
      </div>

      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={async (p) => {
          await upload(p);
        }}
      />

      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        documentName={deleteTarget?.name ?? ""}
        onConfirm={async () => {
          if (deleteTarget) {
            await remove(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
