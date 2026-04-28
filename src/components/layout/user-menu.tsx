"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function UserMenu() {
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

  const displayName = user?.name || user?.email?.split("@")[0] || "Account";
  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  const onSignOut = async () => {
    setOpen(false);
    await logout();
    router.push("/login");
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="h-9 pl-1.5 pr-2.5 rounded-full hover:bg-muted inline-flex items-center gap-2 text-sm transition-colors"
      >
        <span className="h-6 w-6 rounded-full bg-accent text-accent-foreground inline-flex items-center justify-center text-[11px] font-semibold">
          {initial}
        </span>
        <span className="hidden sm:inline truncate max-w-[140px] font-medium">
          {displayName}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-border bg-background shadow-pop p-1 z-50 origin-top-right"
          >
            <div className="px-2.5 py-2 flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-full bg-accent text-accent-foreground inline-flex items-center justify-center text-sm font-semibold shrink-0">
                {initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">
                  {displayName}
                </div>
                {user?.email ? (
                  <div className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="h-px bg-border my-1" />
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.push("/admin");
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-md text-sm hover:bg-muted inline-flex items-center gap-2 transition-colors"
            >
              <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
              Admin
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={onSignOut}
              className="w-full text-left px-2.5 py-1.5 rounded-md text-sm hover:bg-muted inline-flex items-center gap-2 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
              Sign out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
