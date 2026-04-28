"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { Spinner } from "@/components/ui/spinner";
import { useRequireAuth } from "@/lib/auth/guards";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useRequireAuth();

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
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
