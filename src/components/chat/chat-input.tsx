"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useMobile } from "@/hooks/use-mobile";

type Props = {
  onSend: (q: string) => void;
  disabled?: boolean;
};

const MAX_HEIGHT = 144;

export function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, MAX_HEIGHT) + "px";
  }, [value]);

  useEffect(() => {
    if (!isMobile) textareaRef.current?.focus();
  }, [isMobile]);

  const trimmed = value.trim();
  const isDisabled = !trimmed || disabled;

  const submit = () => {
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4 px-4">
      <div className="max-w-3xl mx-auto">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            rows={1}
            style={{ maxHeight: MAX_HEIGHT }}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 pr-14 text-sm resize-none focus-ring placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={isDisabled}
            aria-label="Send message"
            className="absolute right-2 bottom-2 h-9 w-9 rounded-xl bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40"
          >
            {disabled ? <Spinner size="sm" /> : <ArrowUp className="h-4 w-4" />}
          </button>
        </form>
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          SonicMind can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}
