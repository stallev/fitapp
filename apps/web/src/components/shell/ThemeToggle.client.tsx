"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useMessages } from "@/components/i18n/LocaleProvider.client";
import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  showLabel?: boolean;
  size?: "default" | "sm" | "icon";
};

export function ThemeToggle({
  showLabel = false,
  size = "icon",
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const messages = useMessages();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      suppressHydrationWarning
      aria-label={
        isDark ? messages.shell.themeToggleLight : messages.shell.themeToggleDark
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <SunIcon aria-hidden className="size-4" />
      ) : (
        <MoonIcon aria-hidden className="size-4" />
      )}
      {showLabel ? (isDark ? "Light" : "Dark") : null}
    </Button>
  );
}
