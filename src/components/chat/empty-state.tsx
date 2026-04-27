"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "What products do you offer?",
  "What's your return policy?",
  "How do I get in touch?",
  "What are your business hours?",
];

type Props = { onPick: (text: string) => void };

export function EmptyState({ onPick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto px-4">
      <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-accent" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        How can I help you today?
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ask anything about our products, services, or support.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        {SUGGESTIONS.map((text, i) => (
          <motion.button
            key={text}
            type="button"
            onClick={() => onPick(text)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            className="rounded-xl border border-border bg-surface p-3 text-left text-sm hover:border-accent/40 transition-colors"
          >
            {text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
