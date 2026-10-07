import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { CatalogFirstTrainerCard } from "@/components/catalog/CatalogFirstTrainerCard.server";
import { CatalogFirstTrainerCardSkeleton } from "@/components/catalog/CatalogFirstTrainerCardSkeleton";
import { CatalogTrainerGridSkeleton } from "@/components/catalog/CatalogTrainerGridSkeleton";
import { CatalogTrainerGrid } from "@/components/catalog/CatalogTrainerGrid.server";
import { CatalogFiltersChrome } from "@/components/catalog/CatalogFiltersChrome.server";
import { CatalogFiltersChromeSkeleton } from "@/components/catalog/CatalogFiltersChromeSkeleton";
import { CatalogResultsToolbar } from "@/components/catalog/CatalogResultsToolbar.server";
import { CatalogResultsToolbarSkeleton } from "@/components/catalog/CatalogResultsToolbarSkeleton";
import { CatalogGridRegionError } from "@/components/catalog/CatalogGridRegionError.client";
import { parseCatalogSearchParams } from "@/lib/catalog/parse-catalog-search-params";
import { getMessages } from "@/lib/messages/server";

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();
  return {
    title: messages.catalog.meta.title,
    description: messages.catalog.meta.description,
  };
}

type TrainersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TrainersPage({ searchParams }: TrainersPageProps) {
  const messages = await getMessages();
  const query = parseCatalogSearchParams(await searchParams);

  return (
    <div className="space-y-4">
      <PageHeader title={messages.catalog.title} />

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[280px_1fr] lg:gap-6">
        <div className="order-1 min-w-0 space-y-4 lg:order-2">
          <Suspense fallback={<CatalogFirstTrainerCardSkeleton />}>
            <CatalogFirstTrainerCard query={query} />
          </Suspense>

          <CatalogGridRegionError
            title={messages.catalog.error.title}
            description={messages.catalog.error.description}
            retryLabel={messages.common.segmentError.retry}
          >
            <Suspense fallback={<CatalogTrainerGridSkeleton />}>
              <CatalogTrainerGrid query={query} skipFirst />
            </Suspense>
          </CatalogGridRegionError>

          <Suspense fallback={<CatalogResultsToolbarSkeleton />}>
            <CatalogResultsToolbar query={query} />
          </Suspense>
        </div>

        <div className="order-2 lg:order-1">
          <Suspense fallback={<CatalogFiltersChromeSkeleton />}>
            <CatalogFiltersChrome query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
