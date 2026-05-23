"use client";

import {
  CATALOG_MIN_RATINGS,
  isSpecializationSlug,
  type CatalogMinRating,
  type CatalogTrainersQuery,
  type SpecializationSlug,
} from "@pulse/domain";

import { ContentText, SectionTitle } from "@/components/atoms";
import { FilterChip } from "@/components/ui/FilterChip";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import type { CatalogFilterOptions } from "@/data/catalog/get-catalog-filter-options.server";
import { MESSAGES } from "@/lib/messages";

export type CatalogFilterDraft = Pick<
  CatalogTrainersQuery,
  "maxPriceCents" | "minRating" | "specializations"
>;

export type CatalogFilterFieldsProps = {
  draft: CatalogFilterDraft;
  options: CatalogFilterOptions;
  onDraftChange: (patch: Partial<CatalogFilterDraft>) => void;
};

function getMaxPriceDollars(
  maxPriceCents: number | undefined,
  ceilingCents: number,
): number {
  if (maxPriceCents !== undefined) {
    return Math.round(maxPriceCents / 100);
  }

  return Math.round(ceilingCents / 100);
}

export function CatalogFilterFields({
  draft,
  options,
  onDraftChange,
}: CatalogFilterFieldsProps) {
  const maxPriceDollars = getMaxPriceDollars(
    draft.maxPriceCents,
    options.maxPriceCeilingCents,
  );
  const ceilingDollars = Math.max(1, Math.round(options.maxPriceCeilingCents / 100));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="catalog-max-price">
          {MESSAGES.catalog.maxPriceLabel}: ${maxPriceDollars}
        </Label>
        <Slider
          id="catalog-max-price"
          min={0}
          max={ceilingDollars}
          step={5}
          value={[maxPriceDollars]}
          onValueChange={([value]) => {
            onDraftChange({
              maxPriceCents:
                value >= ceilingDollars ? undefined : Math.max(value, 1) * 100,
            });
          }}
        />
      </div>

      <div className="space-y-3">
        <SectionTitle as="h3" className="text-left text-sm">
          {MESSAGES.catalog.ratingLabel}
        </SectionTitle>
        <RadioGroup
          value={draft.minRating?.toString() ?? "any"}
          onValueChange={(value) => {
            onDraftChange({
              minRating:
                value === "any" ? undefined : (Number(value) as CatalogMinRating),
            });
          }}
          className="grid grid-cols-2 gap-2"
        >
          <RadioGroupItem variant="tile" value="any">
            {MESSAGES.catalog.ratingAny}
          </RadioGroupItem>
          {CATALOG_MIN_RATINGS.map((rating) => (
            <RadioGroupItem key={rating} variant="tile" value={String(rating)}>
              {MESSAGES.catalog.ratingTier.replace("{value}", String(rating))}
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <SectionTitle as="h3" className="text-left text-sm">
          {MESSAGES.catalog.specialtyLabel}
        </SectionTitle>
        <div className="flex flex-wrap gap-2">
          {options.specializations.map((item) => {
            if (!isSpecializationSlug(item.slug)) {
              return null;
            }

            const slug = item.slug;
            const selected = draft.specializations.includes(slug);
            return (
              <FilterChip
                key={slug}
                selected={selected}
                onClick={() => {
                  const next: SpecializationSlug[] = selected
                    ? draft.specializations.filter((value) => value !== slug)
                    : [...draft.specializations, slug];
                  onDraftChange({ specializations: next });
                }}
              >
                {item.name}
              </FilterChip>
            );
          })}
        </div>
        {draft.specializations.length === 0 ? (
          <ContentText variant="mutedMicro" as="p">
            {MESSAGES.catalog.specialtyAll}
          </ContentText>
        ) : null}
      </div>
    </div>
  );
}
