"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useTheme } from "@/components/providers/theme-provider";

const NEXT: Record<"light" | "dark" | "system", "light" | "dark" | "system"> =
  {
    light: "dark",
    dark: "system",
    system: "light",
  };

const LABEL: Record<"light" | "dark" | "system", string> = {
  light: "Light theme — click for dark",
  dark: "Dark theme — click for system",
  system: "System theme — click for light",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      aria-label={LABEL[theme]}
      title={LABEL[theme]}
      onClick={() => setTheme(NEXT[theme])}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
    </IconButton>
  );
}
