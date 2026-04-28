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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  useRedirectIfAuthed();
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const valid =
      trimmedName.length > 0 &&
      trimmedEmail.length > 0 &&
      password.length > 0 &&
      EMAIL_RE.test(trimmedEmail) &&
      password.length >= 8;

    if (!valid) {
      setError("Please check your details");
      setErrorKey((k) => k + 1);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await register(trimmedName, trimmedEmail, password);
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
      className="max-w-lg w-full"
    >
      <motion.div
        key={errorKey}
        animate={errorKey > 0 ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-border bg-background p-8 shadow-soft"
      >
        <h1 className="text-xl font-semibold tracking-tight">
          Create admin account
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Set up the admin who manages this knowledge base.
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-name">Name</Label>
            <Input
              id="reg-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-email">Email</Label>
            <Input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-password">Password</Label>
            <Input
              id="reg-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              At least 8 characters.
            </p>
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
            Create account
          </Button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground hover:text-accent underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
