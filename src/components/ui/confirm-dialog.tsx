"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => Promise<void> | void;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      // keep dialog open on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {description}
            </div>
          ) : null}
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "primary"}
            loading={isSubmitting}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
