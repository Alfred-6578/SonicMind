import { cn } from "@/lib/utils/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  ref?: React.Ref<HTMLLabelElement>;
};

export function Label({ ref, className, ...props }: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}
