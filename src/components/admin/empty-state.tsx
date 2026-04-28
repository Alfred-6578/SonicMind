"use client";

import { motion } from "motion/react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { onUpload: () => void };

export function AdminEmptyState({ onUpload }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div
          className="absolute -inset-3 rounded-full bg-accent/30 blur-2xl"
          aria-hidden
        />
        <div className="relative h-16 w-16 rounded-2xl bg-linear-to-br from-accent via-cyan-500 to-accent flex items-center justify-center shadow-pop">
          <FileText className="h-7 w-7 text-accent-foreground" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 font-serif text-3xl tracking-tight"
      >
        No documents yet
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18 }}
        className="mt-2 text-sm text-muted-foreground max-w-xs"
      >
        Upload your first document to start training the chat.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.26 }}
        className="mt-6"
      >
        <Button variant="primary" onClick={onUpload}>
          <Upload className="h-4 w-4" />
          Upload document
        </Button>
      </motion.div>
    </div>
  );
}
