import { cn } from "@/lib/utils/cn";

const variants = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-amber-500/10 text-amber-700",
  destructive: "bg-destructive/10 text-destructive",
} as const;

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-medium inline-flex items-center",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
