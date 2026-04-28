"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <div className="min-h-dvh grid place-items-center bg-background px-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl font-bold tracking-tight text-muted-foreground">
          500
        </div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
