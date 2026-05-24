import { connection } from "next/server";

import { ContentText } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { CustomLink } from "@/components/ui/CustomLink";
import { MESSAGES } from "@/lib/messages";

export async function LandingFooter() {
  await connection();
  const { footer } = MESSAGES.landing;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted py-11">
      <Container
        variant="marketing"
        className="flex flex-col items-center justify-between gap-6 md:flex-row"
      >
        <div className="text-center md:text-left">
          <p className="font-heading text-xl tracking-tight text-foreground">
            {footer.tagline}
          </p>
          <ContentText variant="muted" as="p" className="mt-1">
            {footer.subtitle}
          </ContentText>
        </div>
        <nav
          aria-label={footer.navLabel}
          className="flex flex-wrap justify-center gap-7"
        >
          <CustomLink href="/trainers" variant="quiet">
            {footer.links.about}
          </CustomLink>
          <CustomLink href="/auth/register/trainer" variant="quiet">
            {footer.links.forTrainers}
          </CustomLink>
          <CustomLink href="#" variant="quiet">
            {footer.links.privacy}
          </CustomLink>
          <CustomLink href="#" variant="quiet">
            {footer.links.terms}
          </CustomLink>
        </nav>
        <ContentText variant="muted" as="p" className="text-center text-[12px]">
          {footer.copyright.replace("{year}", String(year))}
        </ContentText>
      </Container>
    </footer>
  );
}
