import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";

export function LandingFeaturedTrainersEmpty() {
  return (
    <section aria-labelledby="landing-featured-heading" className="space-y-4">
      <div className="rounded-xl border border-dashed border-border p-6 text-center">
        <h2 id="landing-featured-heading" className="font-heading text-xl text-foreground">
          {MESSAGES.landing.featured.empty.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {MESSAGES.landing.featured.empty.description}
        </p>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/trainers">{MESSAGES.landing.featured.empty.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
