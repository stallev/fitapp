import type { CatalogTrainersQuery } from "@pulse/domain";

import { ContentText } from "@/components/atoms";
import { TrainerCard } from "@/components/catalog/TrainerCard";
import { CatalogEmpty } from "@/components/catalog/CatalogEmpty";
import { CatalogError } from "@/components/catalog/CatalogError";
import { CatalogPagination } from "@/components/catalog/filters/CatalogPagination.client";
import { CatalogSortSelect } from "@/components/catalog/filters/CatalogSortSelect.client";
import { getCatalogTrainers } from "@/data/catalog/get-catalog-trainers.server";
import { formatCatalogResultsCount } from "@/lib/catalog/catalog-filter-utils";

export type CatalogTrainerGridProps = {
  query: CatalogTrainersQuery;
};

export async function CatalogTrainerGrid({ query }: CatalogTrainerGridProps) {
  let result;

  try {
    result = await getCatalogTrainers(query);
  } catch {
    return <CatalogError />;
  }

  if (result.items.length === 0) {
    return <CatalogEmpty />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ContentText variant="muted" as="p">
          {formatCatalogResultsCount(result.pagination.totalCount)}
        </ContentText>
        <CatalogSortSelect query={result.appliedQuery} />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {result.items.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} className="min-w-0" />
        ))}
      </div>

      <CatalogPagination
        query={result.appliedQuery}
        page={result.pagination.page}
        totalPages={result.pagination.totalPages}
      />
    </div>
  );
}
