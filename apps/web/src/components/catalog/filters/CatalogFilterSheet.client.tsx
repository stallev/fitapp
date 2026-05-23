"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CatalogTrainersQuery } from "@pulse/domain";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconBadge } from "@/components/ui/IconBadge";
import { SlidersHorizontalIcon } from "lucide-react";
import type { CatalogFilterOptions } from "@/data/catalog/get-catalog-filter-options.server";
import { buildCatalogHref } from "@/lib/catalog/build-catalog-search-params";
import { countActiveCatalogFilters } from "@/lib/catalog/catalog-filter-utils";
import { MESSAGES } from "@/lib/messages";

import {
  CatalogFilterFields,
  type CatalogFilterDraft,
} from "./CatalogFilterFields.client";

export type CatalogFilterSheetProps = {
  query: CatalogTrainersQuery;
  options: CatalogFilterOptions;
};

function pickFilterDraft(query: CatalogTrainersQuery): CatalogFilterDraft {
  return {
    maxPriceCents: query.maxPriceCents,
    minRating: query.minRating,
    specializations: query.specializations,
  };
}

export function CatalogFilterSheet({ query, options }: CatalogFilterSheetProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CatalogFilterDraft>(() => pickFilterDraft(query));
  const activeCount = countActiveCatalogFilters(query);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(pickFilterDraft(query));
    }
    setOpen(nextOpen);
  };

  const handleApply = () => {
    router.push(
      buildCatalogHref(query, { ...draft, page: 1 }),
    );
    setOpen(false);
  };

  const handleClear = () => {
    router.push(
      buildCatalogHref(query, {
        maxPriceCents: undefined,
        minRating: undefined,
        specializations: [],
        page: 1,
      }),
    );
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" className="lg:hidden">
          <SlidersHorizontalIcon aria-hidden />
          {MESSAGES.catalog.filtersButton}
          {activeCount > 0 ? (
            <IconBadge count={activeCount} aria-label={`${activeCount} active filters`} />
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{MESSAGES.catalog.filtersTitle}</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-2">
          <CatalogFilterFields
            draft={draft}
            options={options}
            onDraftChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
          />
        </div>
        <SheetFooter className="flex-row gap-2">
          <Button type="button" variant="ghost" onClick={handleClear}>
            {MESSAGES.catalog.clearFilters}
          </Button>
          <Button type="button" onClick={handleApply}>
            {MESSAGES.catalog.applyFilters}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
