"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        <Link href="/admin" className="flex items-center gap-2 group">
          <BrandMark
            size="sm"
            className="transition-transform group-hover:scale-105"
          />
          <span className="text-base font-semibold tracking-tight">
            SonicMind
          </span>
          <span className="rounded-full bg-muted text-muted-foreground text-[11px] px-2 py-0.5 font-medium">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            aria-label="Back to chat"
            className="h-9 inline-flex items-center gap-1.5 px-2.5 md:px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Back to chat</span>
          </Link>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
