"use client";

import { cn } from "@/lib/utils/cn";
import { Spinner } from "./spinner";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "bg-muted text-foreground hover:bg-border",
  ghost: "hover:bg-muted",
  destructive: "bg-destructive text-white hover:opacity-90",
  outline: "border border-border hover:bg-muted",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-9 w-9",
} as const;

const spinnerSizeFor: Record<keyof typeof sizes, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
  icon: "sm",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

export function Button({
  ref,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? <Spinner size={spinnerSizeFor[size]} /> : null}
      {children}
    </button>
  );
}
