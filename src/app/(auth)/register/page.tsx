import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { BrandPanel } from "@/components/auth/brand-panel";
import { BrandMark } from "@/components/ui/brand-mark";

export const metadata: Metadata = {
  title: "Create account — SonicMind",
};

export default function RegisterPage() {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-background">
      <BrandPanel
        heading="Create your space."
        taglinePrefix="Set up the admin who owns the"
        taglineHighlight="knowledge base"
        taglineSuffix=" — uploads, retrievals, and the chat surface visitors see."
        pullquote="First-time setup takes under a minute."
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
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
