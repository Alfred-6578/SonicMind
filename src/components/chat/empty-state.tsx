"use client";

import { motion } from "motion/react";
import {
  Clock,
  Mail,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const SUGGESTIONS: Array<{
  text: string;
  icon: typeof ShoppingBag;
}> = [
  { text: "What products do you offer?", icon: ShoppingBag },
  { text: "What's your return policy?", icon: RotateCcw },
  { text: "How do I get in touch?", icon: Mail },
  { text: "What are your business hours?", icon: Clock },
];

type Props = { onPick: (text: string) => void };

export function EmptyState({ onPick }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-full bg-linear-to-br from-accent/40 via-indigo-400/30 to-accent/40 blur-2xl"
          aria-hidden
        />
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-20 w-20 rounded-3xl bg-linear-to-br from-accent via-cyan-500 to-accent flex items-center justify-center shadow-pop"
        >
          <Sparkles className="h-9 w-9 text-accent-foreground" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]"
      >
        How can I help you{" "}
        <span className="italic text-muted-foreground">today</span>?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mt-4 text-base text-muted-foreground max-w-md"
      >
        Ask anything about our products, services, or support.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.28 }}
        className="mt-10 flex flex-wrap justify-center gap-2 max-w-2xl"
      >
        {SUGGESTIONS.map(({ text, icon: Icon }, i) => (
          <motion.button
            key={text}
            type="button"
            onClick={() => onPick(text)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 + 0.05 * i, duration: 0.3 }}
            className="group flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur-md px-4 py-2 text-sm hover:border-accent/40 hover:bg-accent/4 transition-all shadow-soft"
          >
            <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
            <span className="text-foreground">{text}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
