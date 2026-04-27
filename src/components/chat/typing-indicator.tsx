"use client";

import { motion } from "motion/react";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div>
        <div className="text-xs text-muted-foreground mb-1">Thinking…</div>
        <div className="flex items-center gap-1">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
