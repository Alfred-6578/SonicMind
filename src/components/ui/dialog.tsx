"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils/cn";

type DialogContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog subcomponents must be used within <Dialog>");
  }
  return ctx;
}

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

type DialogContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function DialogContent({ className, children }: DialogContentProps) {
  const { open, onOpenChange } = useDialogContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const id = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const focusable = card.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? card).focus();
    });

    return () => {
      cancelAnimationFrame(id);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div key="dialog" className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "max-w-md w-full rounded-2xl bg-background p-6 shadow-pop relative pointer-events-auto",
                className,
              )}
            >
              <IconButton
                aria-label="Close dialog"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </IconButton>
              {children}
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-base font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6",
        className,
      )}
      {...props}
    />
  );
}
