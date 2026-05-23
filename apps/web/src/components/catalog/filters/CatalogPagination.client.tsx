"use client";

import type { CatalogTrainersQuery } from "@pulse/domain";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { buildCatalogHref } from "@/lib/catalog/build-catalog-search-params";
import { MESSAGES } from "@/lib/messages";

export type CatalogPaginationProps = {
  query: CatalogTrainersQuery;
  page: number;
  totalPages: number;
};

export function CatalogPagination({
  query,
  page,
  totalPages,
}: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousHref =
    page > 1 ? buildCatalogHref(query, { page: page - 1 }) : undefined;
  const nextHref =
    page < totalPages ? buildCatalogHref(query, { page: page + 1 }) : undefined;

  return (
    <Pagination aria-label={MESSAGES.catalog.pagination.pageLabel
      .replace("{page}", String(page))
      .replace("{total}", String(totalPages))}
    >
      <PaginationContent>
        <PaginationItem>
          {previousHref ? (
            <PaginationPrevious href={previousHref} text={MESSAGES.catalog.pagination.previous} />
          ) : (
            <PaginationPrevious
              href="#"
              aria-disabled
              className="pointer-events-none opacity-50"
              text={MESSAGES.catalog.pagination.previous}
            />
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={buildCatalogHref(query, { page })} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          {nextHref ? (
            <PaginationNext href={nextHref} text={MESSAGES.catalog.pagination.next} />
          ) : (
            <PaginationNext
              href="#"
              aria-disabled
              className="pointer-events-none opacity-50"
              text={MESSAGES.catalog.pagination.next}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
