import Link from "next/link";

import { auth } from "@/auth";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher.client";
import { TopBarAuthActions } from "@/components/shell/TopBarAuthActions.client";
import { TopBarNotifications } from "@/components/shell/TopBarNotifications.client";
import { ThemeToggle } from "@/components/shell/ThemeToggle.client";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/messages/server";


export async function TopBar() {
  const messages = await getMessages();
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
          {messages.site.logoLabel}
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden md:block">
            <LocaleSwitcher variant="compact" />
          </div>
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
