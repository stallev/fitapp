"use client";

import { useRouter } from "next/navigation";

import type { CatalogTrainersQuery } from "@pulse/domain";

import { SectionTitle } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { PulseCard } from "@/components/ui/card";
import type { CatalogFilterOptions } from "@/data/catalog/get-catalog-filter-options.server";
import { buildCatalogHref } from "@/lib/catalog/build-catalog-search-params";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

import { CatalogFilterFields } from "./CatalogFilterFields.client";

export type CatalogFilterSidebarProps = {
  query: CatalogTrainersQuery;
  options: CatalogFilterOptions;
  className?: string;
};

export function CatalogFilterSidebar({
  query,
  options,
  className,
}: CatalogFilterSidebarProps) {
  const router = useRouter();

  const applyPatch = (patch: Partial<CatalogTrainersQuery>) => {
    router.push(buildCatalogHref(query, { ...patch, page: 1 }));
  };

  const handleClear = () => {
    router.push(
      buildCatalogHref(query, {
        maxPriceCents: undefined,
        minRating: undefined,
        specializations: [],
        q: "",
        page: 1,
      }),
    );
  };

  return (
    <aside className={cn("hidden lg:block", className)}>
      <PulseCard className="sticky top-24 p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <SectionTitle as="h2" className="text-left text-base">
            {MESSAGES.catalog.filtersTitle}
          </SectionTitle>
          <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
            {MESSAGES.catalog.clearFilters}
          </Button>
        </div>
        <CatalogFilterFields
          draft={query}
          options={options}
          onDraftChange={applyPatch}
        />
      </PulseCard>
    </aside>
  );
}
