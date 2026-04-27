import type { LocalSession } from "@/types/chat";

const SESSIONS_KEY = "sm.sessions";
const CURRENT_SESSION_KEY = "sm.currentSession";

function readSessions(): LocalSession[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SESSIONS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as LocalSession[];
  } catch {
    return [];
  }
}

function writeSessions(sessions: LocalSession[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function listSessions(): LocalSession[] {
  return readSessions().sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export function getCurrentSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT_SESSION_KEY);
}

export function setCurrentSessionId(id: string | null): void {
  if (typeof window === "undefined") return;
  if (id === null) {
    window.localStorage.removeItem(CURRENT_SESSION_KEY);
  } else {
    window.localStorage.setItem(CURRENT_SESSION_KEY, id);
  }
}

export function upsertSession(session: LocalSession): void {
  const rest = readSessions().filter(
    (s) => s.session_id !== session.session_id,
  );
  writeSessions([session, ...rest]);
}

export function removeSession(id: string): void {
  writeSessions(readSessions().filter((s) => s.session_id !== id));
  if (getCurrentSessionId() === id) {
    setCurrentSessionId(null);
  }
}

export function clearAllSessions(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSIONS_KEY);
  window.localStorage.removeItem(CURRENT_SESSION_KEY);
}

export function titleFromQuestion(q: string): string {
  const trimmed = q.trim();
  if (trimmed.length <= 60) return trimmed;
  return trimmed.slice(0, 60) + "…";
}
