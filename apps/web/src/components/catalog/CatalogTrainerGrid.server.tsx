import type { CatalogTrainersQuery } from "@pulse/domain";

import { ContentText } from "@/components/atoms";
import { TrainerCard } from "@/components/catalog/TrainerCard";
import { CatalogEmpty } from "@/components/catalog/CatalogEmpty";
import { CatalogPagination } from "@/components/catalog/filters/CatalogPagination.client";
import { CatalogSortSelectLazy } from "@/components/catalog/CatalogSortSelectLazy.client";
import { getCatalogTrainers } from "@/data/catalog/get-catalog-trainers.server";
import { formatCatalogResultsCount } from "@/lib/catalog/catalog-filter-utils";
import { getLocale, getMessages } from "@/lib/messages/server";

export type CatalogTrainerGridProps = {
  query: CatalogTrainersQuery;
  /** When true, first card is rendered by {@link CatalogFirstTrainerCard}. */
  skipFirst?: boolean;
};

export async function CatalogTrainerGrid({
  query,
  skipFirst = false,
}: CatalogTrainerGridProps) {
  const locale = await getLocale();
  const messages = await getMessages();
  const result = await getCatalogTrainers(query);

  if (result.items.length === 0) {
    return <CatalogEmpty />;
  }

  const gridItems = skipFirst ? result.items.slice(1) : result.items;

  return (
    <div className="space-y-4">
      {gridItems.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-2.5 lg:grid-cols-2">
          {gridItems.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              className="h-full min-w-0"
            />
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ContentText variant="muted" as="p">
          {formatCatalogResultsCount(
            result.pagination.totalCount,
            messages,
            locale,
          )}
        </ContentText>
        <CatalogSortSelectLazy query={result.appliedQuery} />
      </div>

      <CatalogPagination
        query={result.appliedQuery}
        page={result.pagination.page}
        totalPages={result.pagination.totalPages}
      />
    </div>
  );
}
