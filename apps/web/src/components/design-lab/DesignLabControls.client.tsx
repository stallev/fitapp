"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { LAB_SECTIONS, VIEWPORT_WIDTHS } from "@/lib/design-lab/matrices";

type DesignLabShellProps = {
  children: React.ReactNode;
};

export function DesignLabShell({ children }: DesignLabShellProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [viewport, setViewport] =
    useState<(typeof VIEWPORT_WIDTHS)[number]>(390);

  const isDark = resolvedTheme === "dark";

  return (
    <div className="min-h-full bg-background">
      <nav
        aria-label="Design lab controls"
        className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <Container
          variant="shell"
          className="flex flex-wrap items-center gap-3 py-3"
        >
          <div className="flex flex-wrap gap-1">
            {LAB_SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                prefetch={false}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {section.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Viewport width"
              className="flex rounded-full border border-border p-0.5"
            >
              {VIEWPORT_WIDTHS.map((width) => (
                <button
                  key={width}
                  type="button"
                  aria-pressed={viewport === width}
                  onClick={() => setViewport(width)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    viewport === width
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {width}px
                </button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              suppressHydrationWarning
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? (
                <SunIcon aria-hidden className="size-4" />
              ) : (
                <MoonIcon aria-hidden className="size-4" />
              )}
              {isDark ? "Light" : "Dark"}
            </Button>
          </div>
        </Container>
      </nav>
      <div
        className="@container/design-lab mx-auto w-full transition-[max-width] duration-200"
        style={{ maxWidth: viewport }}
      >
        {children}
      </div>
    </div>
  );
}
