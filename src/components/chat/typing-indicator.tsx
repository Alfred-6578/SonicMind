"use client";

import { motion } from "motion/react";
import { BrandMark } from "@/components/ui/brand-mark";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex gap-3">
        <BrandMark size="md" className="mt-1" />
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-muted-foreground mb-2"
          >
            Thinking…
          </motion.div>
          <div className="flex items-center gap-1.5">
            {[0, 0.15, 0.3].map((delay, i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
