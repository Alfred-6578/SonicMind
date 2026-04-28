const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const that = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.floor(
    (today.getTime() - that.getTime()) / 86_400_000,
  );
  if (dayDiff === 1) return "yesterday";

  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  const formatted = value >= 100 ? Math.round(value).toString() : value.toFixed(1);
  return `${formatted} ${units[i]}`;
}

export function formatTokens(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k tokens`;
  return `${n} tokens`;
}

export function formatScore(score: number): string {
  const pct = score > 1 ? Math.min(100, score) : Math.max(0, score) * 100;
  return `${Math.round(pct)}%`;
}

export function formatFileType(fileType: string): string {
  return fileType.replace(/^\./, "").toUpperCase();
}

export function truncate(str: string, n: number): string {
  if (str.length <= n) return str;
  return str.slice(0, n) + "…";
}
