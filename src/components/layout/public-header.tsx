"use client";

import { Menu } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

type PublicHeaderProps = {
  onToggleSidebar?: () => void;
};

export function PublicHeader({ onToggleSidebar }: PublicHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="text-base font-semibold tracking-tight">
            SonicMind
          </span>
        </div>
        <IconButton
          aria-label="Open menu"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </IconButton>
      </div>
    </header>
  );
}
