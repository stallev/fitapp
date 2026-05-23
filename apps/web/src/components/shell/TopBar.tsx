import Link from "next/link";

import { auth } from "@/auth";
import { TopBarAuthActions } from "@/components/shell/TopBarAuthActions.client";
import { TopBarNotifications } from "@/components/shell/TopBarNotifications.client";
import { ThemeToggle } from "@/components/shell/ThemeToggle.client";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

export async function TopBar() {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container
        variant="shell"
        className="flex h-16 items-center gap-3"
      >
        <Link
          href="/"
          className="inline-flex min-h-11 min-w-11 items-center rounded-full px-2 font-heading text-xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {MESSAGES.site.logoLabel}
        </Link>
        <div className="ml-auto flex items-center gap-1">
          {isAuthenticated ? <TopBarNotifications /> : null}
          <ThemeToggle />
          <TopBarAuthActions
            isAuthenticated={isAuthenticated}
            userName={session?.user?.name}
          />
        </div>
      </Container>
    </header>
  );
}
