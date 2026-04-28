"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils/cn";

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
    <div className="sticky bottom-0 bg-linear-to-t from-background via-background/85 to-transparent pt-12 pb-4 px-4 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="relative rounded-2xl border border-border bg-background/70 backdrop-blur-xl shadow-pop transition-all focus-within:border-accent/40 focus-within:shadow-glow">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              rows={1}
              style={{ maxHeight: MAX_HEIGHT }}
              className="w-full bg-transparent rounded-2xl px-4 py-3.5 pr-14 text-[0.9375rem] resize-none focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={isDisabled}
              aria-label="Send message"
              className={cn(
                "absolute right-2 bottom-2 h-9 w-9 rounded-xl bg-accent text-accent-foreground flex items-center justify-center transition-all shadow-soft",
                "hover:bg-accent-hover hover:shadow-glow active:scale-95",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:hover:shadow-soft disabled:active:scale-100",
              )}
            >
              {disabled ? (
                <Spinner size="sm" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
        <p className="text-[11px] text-muted-foreground text-center mt-3">
          SonicMind can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}
