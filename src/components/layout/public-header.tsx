"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { useAuth } from "@/hooks/use-auth";

type PublicHeaderProps = {
  onToggleSidebar?: () => void;
};

export function PublicHeader({ onToggleSidebar }: PublicHeaderProps) {
  const { isAuthed, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="SonicMind home"
        >
          <BrandMark
            size="sm"
            className="transition-transform group-hover:scale-105"
          />
          <span className="text-base font-semibold tracking-tight">
            SonicMind
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          {!isLoading && (
            <>
              {isAuthed ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  className="hidden md:inline-flex h-9 items-center px-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
                >
                  Sign in
                </Link>
              )}
            </>
          )}
          <IconButton
            aria-label="Open menu"
            className="md:hidden max-md:ml-3"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
