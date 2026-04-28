"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function AdminHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const displayName = user?.name || user?.email || "Account";

  const onSignOut = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="text-base font-semibold tracking-tight">
            SonicMind
          </span>
          <span className="rounded-full bg-muted text-muted-foreground text-[11px] px-2 py-0.5 font-medium">
            Admin
          </span>
        </div>

        <div ref={wrapperRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="h-9 px-3 rounded-md hover:bg-muted inline-flex items-center gap-2 text-sm"
          >
            <span className="truncate max-w-[160px]">{displayName}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-border bg-background shadow-pop p-1 z-50"
              >
                {user?.email ? (
                  <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                ) : null}
                <div className="h-px bg-border my-1" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={onSignOut}
                  className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted"
                >
                  Sign out
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
