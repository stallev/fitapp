"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MESSAGES } from "@/lib/messages";
import { useLandingScrolled } from "@/lib/ui/use-landing-scrolled";

const NAV_LINKS = [
  { href: "#how", label: MESSAGES.landing.nav.links.how },
  { href: "#trainers", label: MESSAGES.landing.nav.links.trainers },
  { href: "#reviews", label: MESSAGES.landing.nav.links.reviews },
  { href: "#faq", label: MESSAGES.landing.nav.links.faq },
] as const;

export function LandingNav() {
  const scrolled = useLandingScrolled();

  return (
    <nav
      aria-label="Главная навигация"
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-6 transition-all duration-300 md:px-14",
        scrolled &&
          "border-b border-border/60 bg-background/95 shadow-[0_1px_0_rgba(26,48,40,0.09)] backdrop-blur-xl",
      )}
    >
      <Link
        href="/"
        className="font-heading text-[22px] tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {MESSAGES.site.logoLabel}
      </Link>

      <ul className="hidden list-none gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link href="/auth/login">{MESSAGES.landing.nav.signIn}</Link>
        </Button>
        <Button asChild size="sm" className="rounded-full px-[22px]">
          <Link href="/auth/register">{MESSAGES.landing.nav.getStarted}</Link>
        </Button>
      </div>
    </nav>
  );
}
