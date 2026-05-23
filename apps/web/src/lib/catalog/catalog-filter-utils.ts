import type { CatalogTrainersQuery } from "@pulse/domain";

import { hasActiveCatalogFilters } from "@/lib/catalog/parse-catalog-search-params";

export function countActiveCatalogFilters(query: CatalogTrainersQuery): number {
  let count = 0;

  if (query.q.trim()) {
    count += 1;
  }

  if (query.maxPriceCents !== undefined) {
    count += 1;
  }

  if (query.minRating !== undefined) {
    count += 1;
  }

  count += query.specializations.length;

  return count;
}

export function formatCatalogResultsCount(count: number): string {
  const template =
    count === 1
      ? "{count} тренер"
      : count >= 2 && count <= 4
        ? "{count} тренера"
        : "{count} тренеров";

  return template.replace("{count}", String(count));
}

export function getSpecializationName(
  slug: string,
  options: { slug: string; name: string }[],
): string {
  return options.find((item) => item.slug === slug)?.name ?? slug;
}

export { hasActiveCatalogFilters };
