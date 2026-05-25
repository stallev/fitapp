import { ContentText } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { CustomLink } from "@/components/ui/CustomLink";
import { getMessages } from "@/lib/messages/server";


export async function LandingFooterSkeleton() {
  const messages = await getMessages();
  const { footer } = messages.landing;

  return (
    <footer className="border-t border-border bg-muted py-11" aria-hidden>
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
          <CustomLink href="/trainers" variant="quiet" tabIndex={-1}>
            {footer.links.trainers}
          </CustomLink>
          <CustomLink href="/features" variant="quiet" tabIndex={-1}>
            {footer.links.features}
          </CustomLink>
          <CustomLink href="/how-it-was-built" variant="quiet" tabIndex={-1}>
            {footer.links.howItWasBuilt}
          </CustomLink>
          <CustomLink href="/auth/register/trainer" variant="quiet" tabIndex={-1}>
            {footer.links.forTrainers}
          </CustomLink>
          <CustomLink href="#" variant="quiet" tabIndex={-1}>
            {footer.links.privacy}
          </CustomLink>
          <CustomLink href="#" variant="quiet" tabIndex={-1}>
            {footer.links.terms}
          </CustomLink>
        </nav>
        <ContentText variant="muted" as="p" className="text-center text-[12px]">
          {footer.copyright.replace("{year}", "\u00a0")}
        </ContentText>
      </Container>
    </footer>
  );
}
