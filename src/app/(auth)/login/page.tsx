import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { BrandPanel } from "@/components/auth/brand-panel";
import { BrandMark } from "@/components/ui/brand-mark";

export const metadata: Metadata = {
  title: "Sign in — SonicMind",
};

export default function LoginPage() {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-background">
      <BrandPanel
        heading="Welcome back."
        taglinePrefix="Sign in to manage"
        taglineHighlight="the knowledge base"
        taglineSuffix=" — uploads, retrievals, and the chat surface visitors see."
        pullquote="Built for teams who want answers grounded in their own documents."
      />
      <main className="flex flex-col px-6 py-12 lg:p-12">
        <Link
          href="/"
          className="lg:hidden inline-flex items-center gap-2 w-fit mb-12"
        >
          <BrandMark size="md" />
          <span className="text-base font-semibold tracking-tight">
            SonicMind
          </span>
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
