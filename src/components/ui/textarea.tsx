"use client";

import { cn } from "@/lib/utils/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.Ref<HTMLTextAreaElement>;
};

export function Textarea({ ref, className, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-ring resize-none",
        className,
      )}
      {...props}
    />
  );
}
