import { request } from "./client";
import type { DocumentItem, UploadPayload } from "@/types/api";

export const documentsApi = {
  list(): Promise<DocumentItem[]> {
    return request("/documents/", { method: "GET", auth: true });
  },
  upload(payload: UploadPayload): Promise<DocumentItem> {
    const fd = new FormData();
    fd.append("file", payload.file);
    fd.append("name", payload.name);
    if (payload.description) fd.append("description", payload.description);
    if (payload.author) fd.append("author", payload.author);
    if (payload.tags) fd.append("tags", payload.tags);
    return request("/documents/", {
      method: "POST",
      formData: fd,
      auth: true,
    });
  },
  remove(id: string): Promise<unknown> {
    return request(`/documents/${id}`, { method: "DELETE", auth: true });
  },
};
