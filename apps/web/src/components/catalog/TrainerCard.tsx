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

export function TrainerCard({ trainer, className }: TrainerCardProps) {
  const tagline = getTrainerTagline(trainer);
  const visibleSpecs = trainer.specializations.slice(0, 2);
  const hiddenSpecCount = trainer.specializations.length - visibleSpecs.length;
  const photoLabel = trainer.fullName.split(" ")[0]?.toUpperCase() ?? "PHOTO";

  return (
    <Link
      href={`/trainers/${trainer.id}`}
      className={cn("block min-w-[280px] shrink-0 md:min-w-0", className)}
    >
      <PulseCard variant="row" interactive className="h-full">
        <PhotoSlot
          label={photoLabel}
          src={trainer.photoUrl}
          alt={trainer.fullName}
          aspect="square"
          className="w-24 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Heading as="h3" visualLevel="h4" className="truncate">
                {trainer.fullName}
              </Heading>
              <ContentText variant="muted" as="p" className="mt-0.5 line-clamp-1">
                {tagline}
              </ContentText>
            </div>
            <VerifiedBadge className="shrink-0">
              {MESSAGES.landing.featured.verifiedBadge}
            </VerifiedBadge>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5">
            <RatingStars value={trainer.ratingAvg} size="sm" />
            <ContentText variant="mutedMicro" as="span" className="font-mono">
              {trainer.ratingAvg.toFixed(1)}
            </ContentText>
            <ContentText variant="mutedMicro" as="span">
              · {trainer.ratingCount} {MESSAGES.landing.featured.reviewsLabel}
            </ContentText>
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {visibleSpecs.map((spec) => (
                <SpecChip key={spec.slug}>{spec.name}</SpecChip>
              ))}
              {hiddenSpecCount > 0 ? (
                <SpecChip>+{hiddenSpecCount}</SpecChip>
              ) : null}
            </div>
            {trainer.fromPriceCents !== null && trainer.currency ? (
              <div className="text-right">
                <ContentText variant="mutedMicro" as="p">
                  {MESSAGES.landing.featured.fromPriceLabel}
                </ContentText>
                <ContentText variant="smallEmphasis" as="p" className="font-heading">
                  {formatTrainerPrice(trainer.fromPriceCents, trainer.currency)}
                </ContentText>
              </div>
            ) : null}
          </div>
        </div>
      </PulseCard>
    </Link>
  );
}
