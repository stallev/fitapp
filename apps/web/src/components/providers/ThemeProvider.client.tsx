"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

import { useIsClient } from "@/lib/ui/use-is-client";

/**
 * Defer next-themes until after hydration so Cache Components / Instant Navigations
 * shell prerender does not hit sync `crypto.getRandomValues()` (blocking-prerender-crypto).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return children;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
