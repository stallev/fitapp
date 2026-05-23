"use client";

import { useRouter } from "next/navigation";

import { CATALOG_SORT, type CatalogSort, type CatalogTrainersQuery } from "@pulse/domain";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildCatalogHref } from "@/lib/catalog/build-catalog-search-params";
import { MESSAGES } from "@/lib/messages";

const SORT_OPTIONS: CatalogSort[] = [
  CATALOG_SORT.RATING,
  CATALOG_SORT.NEWEST,
  CATALOG_SORT.PRICE,
];

export type CatalogSortSelectProps = {
  query: CatalogTrainersQuery;
};

export function CatalogSortSelect({ query }: CatalogSortSelectProps) {
  const router = useRouter();

  return (
    <Select
      value={query.sort}
      onValueChange={(value) => {
        router.push(
          buildCatalogHref(query, { sort: value as CatalogSort, page: 1 }),
        );
      }}
    >
      <SelectTrigger size="sm" aria-label={MESSAGES.catalog.sortLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {SORT_OPTIONS.map((sort) => (
          <SelectItem key={sort} value={sort}>
            {MESSAGES.catalog.sort[sort]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
