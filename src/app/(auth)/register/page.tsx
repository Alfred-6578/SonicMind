import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account — SonicMind",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[100dvh] grid place-items-center bg-surface px-4 relative isolate">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(13,148,136,0.05), transparent)",
        }}
      />
      <Link
        href="/"
        className="absolute top-6 left-6 hidden md:flex items-center gap-2"
      >
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        <span className="text-base font-semibold tracking-tight">
          SonicMind
        </span>
      </Link>
      <RegisterForm />
    </div>
  );
}
