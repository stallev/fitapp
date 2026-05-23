import Link from "next/link";

import { ContentText, Heading } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { RatingStars } from "@/components/ui/RatingStars";
import { SpecChip } from "@/components/ui/SpecChip";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import type { CatalogTrainerCard } from "@/lib/catalog/catalog-trainer-card";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

export type TrainerCardProps = {
  trainer: CatalogTrainerCard;
  className?: string;
  /** Preload photo for above-the-fold LCP candidates (catalog grid, landing). */
  imagePriority?: boolean;
};

function formatTrainerPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function getTrainerTagline(trainer: CatalogTrainerCard): string {
  if (trainer.bio?.trim()) {
    return trainer.bio.trim();
  }

  return trainer.specializations.map((item) => item.name).join(" · ");
}

export function TrainerCard({
  trainer,
  className,
  imagePriority = false,
}: TrainerCardProps) {
  const tagline = getTrainerTagline(trainer);
  const visibleSpecs = trainer.specializations.slice(0, 2);
  const hiddenSpecCount = trainer.specializations.length - visibleSpecs.length;
  const firstName = trainer.fullName.split(" ")[0]?.toUpperCase() ?? "PHOTO";
  const photoLabel = `PHOTO · ${firstName}`;

  return (
    <div className={cn("min-w-[280px] shrink-0 md:min-w-0", className)}>
      <Link href={`/trainers/${trainer.id}`} className="block h-full">
        <PulseCard variant="catalog" interactive className="h-full">
          <div className="flex h-full gap-3 p-3 md:min-h-[7.5rem]">
            <PhotoSlot
              label={photoLabel}
              src={trainer.photoUrl}
              alt={trainer.fullName}
              aspect="square"
              className="w-24 shrink-0 self-start"
              priority={imagePriority}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <Heading
                    as="h3"
                    visualLevel="h4"
                    className="truncate font-heading font-normal"
                  >
                    {trainer.fullName}
                  </Heading>
                  <ContentText variant="muted" as="p" className="mt-0.5 line-clamp-1">
                    {tagline}
                  </ContentText>
                </div>
                <VerifiedBadge iconOnly className="shrink-0">
                  {MESSAGES.landing.featured.verifiedBadge}
                </VerifiedBadge>
              </div>

              <div className="mt-1.5 flex items-center gap-1.5">
                <RatingStars value={trainer.ratingAvg} size="sm" />
                <ContentText
                  variant="mutedMicro"
                  as="span"
                  className="font-mono text-foreground"
                >
                  {trainer.ratingAvg.toFixed(1)}
                </ContentText>
                <ContentText variant="mutedMicro" as="span">
                  · {trainer.ratingCount} {MESSAGES.landing.featured.reviewsLabel}
                </ContentText>
              </div>

              <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                <div className="flex flex-wrap gap-1">
                  {visibleSpecs.map((spec) => (
                    <SpecChip key={spec.slug}>{spec.name}</SpecChip>
                  ))}
                  {hiddenSpecCount > 0 ? (
                    <SpecChip>+{hiddenSpecCount}</SpecChip>
                  ) : null}
                </div>
                {trainer.fromPriceCents !== null && trainer.currency ? (
                  <div className="shrink-0 text-right">
                    <ContentText variant="mutedMicro" as="p" className="leading-none">
                      {MESSAGES.landing.featured.fromPriceLabel}
                    </ContentText>
                    <ContentText
                      as="p"
                      variant="smallEmphasis"
                      className="mt-0.5 font-heading text-[18px] leading-none"
                    >
                      {formatTrainerPrice(trainer.fromPriceCents, trainer.currency)}
                    </ContentText>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </PulseCard>
      </Link>
    </div>
  );
}
