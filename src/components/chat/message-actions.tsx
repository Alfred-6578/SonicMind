"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = { content: string };

export function MessageActions({ content }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore clipboard failures (HTTP, permissions)
    }
  };

  return (
    <div className="mt-2 -ml-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy message"}
        className="h-7 px-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1.5 transition-colors"
      >
        {copied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
