export class ApiError extends Error {
  status: number;
  detail?: unknown;

  constructor(message: string, status: number, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}

export function extractMessage(body: unknown): string {
  if (!body || typeof body !== "object") return "Something went wrong";
  const b = body as Record<string, unknown>;
  if (typeof b.message === "string") return b.message;
  if (typeof b.detail === "string") return b.detail;
  if (
    Array.isArray(b.detail) &&
    b.detail[0] &&
    typeof b.detail[0] === "object"
  ) {
    const first = b.detail[0] as { msg?: string };
    if (typeof first.msg === "string") return first.msg;
  }
  return "Something went wrong";
}
