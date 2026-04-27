"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      theme="light"
      toastOptions={{ className: "rounded-lg border-border" }}
    />
  );
}
