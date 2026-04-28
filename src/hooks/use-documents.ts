"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { documentsApi } from "@/lib/api/documents";
import { extractMessage } from "@/lib/api/errors";
import type { DocumentItem, UploadPayload } from "@/types/api";

type UploadingItem = {
  tempId: string;
  name: string;
  status: "uploading" | "processing";
};

export function useDocuments() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingItems, setUploadingItems] = useState<UploadingItem[]>([]);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await documentsApi.list();
      setItems(data);
    } catch (e) {
      const msg = extractMessage(e);
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upload = async (payload: UploadPayload) => {
    const tempId = crypto.randomUUID();
    setUploadingItems((prev) => [
      ...prev,
      { tempId, name: payload.name, status: "uploading" },
    ]);

    const timeoutId = setTimeout(() => {
      setUploadingItems((prev) =>
        prev.map((u) =>
          u.tempId === tempId ? { ...u, status: "processing" } : u,
        ),
      );
    }, 5000);

    try {
      const doc = await documentsApi.upload(payload);
      clearTimeout(timeoutId);
      setItems((prev) => [doc, ...prev]);
      setUploadingItems((prev) => prev.filter((u) => u.tempId !== tempId));
      toast.success("Uploaded");
      return doc;
    } catch (e) {
      clearTimeout(timeoutId);
      setUploadingItems((prev) => prev.filter((u) => u.tempId !== tempId));
      toast.error(extractMessage(e));
      throw e;
    }
  };

  const remove = async (id: string) => {
    const snapshot = items;
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await documentsApi.remove(id);
      toast.success("Deleted");
    } catch (e) {
      setItems(snapshot);
      toast.error(extractMessage(e));
    }
  };

  return {
    items,
    isLoading,
    error,
    uploadingItems,
    upload,
    remove,
    refresh,
  };
}
