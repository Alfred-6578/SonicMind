"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { Spinner } from "@/components/ui/spinner";
import { useRequireAuth } from "@/lib/auth/guards";
import { cn } from "@/lib/utils/cn";

const TABS = [
  {
    href: "/admin",
    label: "Documents",
    match: (p: string) => p === "/admin",
  },
  {
    href: "/admin/sessions",
    label: "Sessions",
    match: (p: string) => p.startsWith("/admin/sessions"),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useRequireAuth();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 flex items-center gap-1">
          {TABS.map((tab) => {
            const active = tab.match(pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "h-10 px-3 inline-flex items-center text-sm font-medium border-b-2 transition-colors -mb-px",
                  active
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
