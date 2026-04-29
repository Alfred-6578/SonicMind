export type DocumentItem = {
  id: string;
  name: string;
  description: string;
  author: string;
  file_type: string;
  size_bytes: number;
  source: string;
  tags: string[];
  chunks: number;
  tokens: number;
  total_tables: number;
  total_images: number;
  chunk_ids: string[];
  is_processed: boolean;
  created_at: string;
  updated_at: string;
  download_url?: string;
};

export type UploadPayload = {
  file: File;
  name: string;
  description?: string;
  author?: string;
  tags?: string;
};
