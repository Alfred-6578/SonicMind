import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { container: "h-6 w-6 rounded-md", icon: "h-3 w-3" },
  md: { container: "h-7 w-7 rounded-lg", icon: "h-3.5 w-3.5" },
  lg: { container: "h-10 w-10 rounded-xl", icon: "h-5 w-5" },
} as const;

export function BrandMark({ className, size = "md" }: Props) {
  const cfg = sizes[size];
  return (
    <div
      className={cn(
        "bg-linear-to-br from-accent to-accent-hover flex items-center justify-center shadow-soft shrink-0",
        cfg.container,
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 32 32"
        className={cn("text-accent-foreground", cfg.icon)}
        fill="currentColor"
      >
        <rect x="9" y="13" width="2.5" height="6" rx="1.25" />
        <rect x="14.75" y="9" width="2.5" height="14" rx="1.25" />
        <rect x="20.5" y="11" width="2.5" height="10" rx="1.25" />
      </svg>
    </div>
  );
}
