export type Role = "user" | "assistant";

export type Message = {
  id: string;
  session_id: string;
  role: Role;
  content: string;
  document_id: string | null;
  document_ids_used: string[];
  retrieved_chunk_count: number | null;
  relevance_scores: Record<string, number>;
  input_tokens: number;
  output_tokens: number;
  estimated_cost: number;
  user_rating: number | null;
  feedback: string | null;
  created_at: string;
};

export type DocumentInfo = {
  document_id: string;
  document_name: string;
  description?: string;
  author?: string;
  tag?: string[];
};

export type ChunkInfo = {
  chunk_id: string;
  score: number;
  content_preview: string;
};

export type Source = {
  document_info: DocumentInfo;
  chunk_info: ChunkInfo;
};

export type ChatResponse = {
  message: Message;
  sources: Source[];
};

export type SendChatPayload = {
  session_id: string | null;
  question: string;
};

// Local-only — saved in localStorage to scope sessions to this visitor
export type LocalSession = {
  session_id: string;
  title: string;
  created_at: string;
};

// What the UI renders — Message plus optional sources (live messages only)
export type MessageView = Message & { sources?: Source[] };
