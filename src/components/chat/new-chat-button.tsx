"use client";

import { Plus } from "lucide-react";

type Props = {
  isOpen: boolean;
  isMobile: boolean;
  onClick: () => void;
};

export function NewChatButton({ isOpen, isMobile, onClick }: Props) {
  if (isOpen || !isMobile) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="New chat"
      className="fixed bottom-24 right-4 z-20 h-10 w-10 bg-surface border border-border rounded-full shadow-soft flex items-center justify-center"
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}
