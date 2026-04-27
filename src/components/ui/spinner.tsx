import { cn } from "@/lib/utils/cn";

const sizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

export type SpinnerProps = React.SVGAttributes<SVGSVGElement> & {
  size?: keyof typeof sizes;
  ref?: React.Ref<SVGSVGElement>;
};

export function Spinner({
  ref,
  size = "md",
  className,
  ...props
}: SpinnerProps) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("animate-spin stroke-current", sizes[size], className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
