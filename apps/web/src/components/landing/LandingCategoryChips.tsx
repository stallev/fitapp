import Link from "next/link";

import { SectionTitle } from "@/components/atoms";
import { SpecChip } from "@/components/ui/SpecChip";
import { MESSAGES } from "@/lib/messages";

export function LandingCategoryChips() {
  return (
    <section aria-labelledby="landing-categories-heading" className="space-y-4">
      <SectionTitle as="h2" id="landing-categories-heading" className="text-left md:text-center">
        {MESSAGES.landing.categories.title}
      </SectionTitle>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
        {MESSAGES.landing.categories.items.map((item) => (
          <Link
            key={item.slug}
            href="/trainers"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <SpecChip>{item.label}</SpecChip>
          </Link>
        ))}
      </div>
    </section>
  );
}
