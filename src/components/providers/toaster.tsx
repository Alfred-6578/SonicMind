"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/components/providers/theme-provider";

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      position="top-center"
      richColors
      theme={resolvedTheme}
      toastOptions={{ className: "rounded-lg border-border" }}
    />
  );
}
