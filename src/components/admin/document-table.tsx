import { DocumentRow } from "./document-row";
import type { DocumentItem } from "@/types/document";

type UploadingItem = {
  tempId: string;
  name: string;
  status: "uploading" | "processing";
};

type Props = {
  items: DocumentItem[];
  uploadingItems: UploadingItem[];
  onDelete: (id: string) => void;
};

function placeholderItem(u: UploadingItem): DocumentItem {
  return {
    id: u.tempId,
    name: u.name,
    description: "",
    author: "",
    file_type: ".pdf",
    size_bytes: 0,
    source: "",
    tags: [],
    chunks: 0,
    tokens: 0,
    total_tables: 0,
    total_images: 0,
    chunk_ids: [],
    is_processed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function DocumentTable({ items, uploadingItems, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {uploadingItems.map((u) => (
        <DocumentRow
          key={u.tempId}
          item={placeholderItem(u)}
          onDelete={onDelete}
          isUploading
          uploadStatus={u.status}
        />
      ))}
      {items.map((item) => (
        <DocumentRow key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
