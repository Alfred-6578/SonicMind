"use client";

import { cn } from "@/lib/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
};

export function Input({ ref, className, type, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-ring",
        className,
      )}
      {...props}
    />
  );
}
