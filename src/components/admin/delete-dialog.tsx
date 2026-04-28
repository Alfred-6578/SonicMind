"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  documentName: string;
  onConfirm: () => Promise<void>;
};

export function DeleteDialog({
  open,
  onOpenChange,
  documentName,
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
      // keep dialog open for retry
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete document?</DialogTitle>
          <div className="mt-2 font-medium text-foreground">
            {documentName}
          </div>
          <DialogDescription>
            This permanently removes the document and all its chunks. The chat
            will no longer answer using this content.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            loading={isSubmitting}
            onClick={handleConfirm}
          >
            Delete document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
