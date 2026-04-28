"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils/cn";

const components: Components = {
  p: ({ className, ...props }) => (
    <p className={cn("my-2 leading-relaxed", className)} {...props} />
  ),
  h1: ({ className, ...props }) => (
    <h1
      className={cn("text-lg font-semibold mt-4 mb-2", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn("text-base font-semibold mt-3 mb-1.5", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("text-sm font-semibold mt-2 mb-1", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("list-disc list-outside ml-5 my-2 space-y-1", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("list-decimal list-outside ml-5 my-2 space-y-1", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-accent underline underline-offset-2 hover:text-accent-hover",
        className,
      )}
      target="_blank"
      rel="noopener"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock =
      typeof className === "string" && className.startsWith("language-");
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className={cn(
          "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "rounded-lg bg-foreground text-background dark:bg-surface-elevated dark:text-foreground p-4 overflow-x-auto text-sm font-mono my-3",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-2 border-border pl-3 my-2 text-muted-foreground italic",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-4 border-border", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <table
      className={cn("w-full text-sm border-collapse my-3", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border border-border px-2 py-1 text-left", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border border-border px-2 py-1 text-left", className)}
      {...props}
    />
  ),
};

export function MessageMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
