"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useRedirectIfAuthed } from "@/lib/auth/guards";
import { extractMessage } from "@/lib/api/errors";

export function LoginForm() {
  useRedirectIfAuthed();
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(extractMessage(err));
      setErrorKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-sm w-full"
    >
      <motion.div
        key={errorKey}
        animate={errorKey > 0 ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-border bg-background p-8 shadow-soft"
      >
        <h1 className="text-xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to manage your knowledge base.
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error ? (
            <div className="rounded-lg bg-destructive/10 text-destructive text-sm px-3 py-2">
              {error}
            </div>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Visitors don&apos;t need an account —{" "}
          <Link
            href="/"
            className="text-accent hover:text-accent-hover underline underline-offset-2"
          >
            head back to chat
          </Link>
          .
        </p>
      </motion.div>
    </motion.div>
  );
}
