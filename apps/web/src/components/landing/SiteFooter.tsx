import { CustomLink } from "@/components/ui/CustomLink";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <Container
        variant="page"
        className="flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
      >
        <p>{MESSAGES.landing.footer.tagline}</p>
        <nav aria-label={MESSAGES.landing.footer.navLabel} className="flex flex-wrap gap-4">
          <CustomLink href="/auth/login" variant="quiet">
            {MESSAGES.landing.footer.login}
          </CustomLink>
          <CustomLink href="/auth/register" variant="quiet">
            {MESSAGES.landing.footer.register}
          </CustomLink>
          <span className="text-muted-foreground">{MESSAGES.landing.footer.privacy}</span>
          <span className="text-muted-foreground">{MESSAGES.landing.footer.terms}</span>
        </nav>
      </Container>
    </footer>
  );
}
