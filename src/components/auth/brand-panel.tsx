"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

type Props = {
  heading: string;
  taglinePrefix: string;
  taglineHighlight: string;
  taglineSuffix?: string;
  pullquote?: string;
};

export function BrandPanel({
  heading,
  taglinePrefix,
  taglineHighlight,
  taglineSuffix,
  pullquote,
}: Props) {
  return (
    <aside className="hidden lg:flex relative overflow-hidden bg-surface flex-col justify-between p-12 xl:p-14 isolate">
      <div className="absolute inset-0 -z-10 bg-canvas" aria-hidden />

      <Link
        href="/"
        className="relative inline-flex items-center gap-2.5 group w-fit"
      >
        <BrandMark size="md" />
        <span className="text-base font-semibold tracking-tight">
          SonicMind
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-md"
      >
        <h2 className="font-serif text-4xl xl:text-5xl tracking-tight leading-[1.05]">
          {heading}
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {taglinePrefix}{" "}
          <span className="text-foreground">{taglineHighlight}</span>
          {taglineSuffix ?? ""}
        </p>
      </motion.div>

      {pullquote ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative max-w-md"
        >
          <div className="rounded-2xl border border-border bg-background/40 backdrop-blur-md p-5 shadow-soft">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
            <p className="mt-2.5 text-sm text-foreground/90 italic font-serif leading-relaxed">
              {pullquote}
            </p>
          </div>
        </motion.div>
      ) : (
        <div />
      )}
    </aside>
  );
}
