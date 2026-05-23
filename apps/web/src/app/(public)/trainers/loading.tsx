import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/container";
import { CatalogTrainerGridSkeleton } from "@/components/catalog/CatalogTrainerGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/lib/messages";

export default function TrainersLoading() {
  return (
    <Container as="main" variant="page" className="space-y-4">
      <PageHeader title={MESSAGES.catalog.title} />
      <Skeleton className="h-11 w-full rounded-full" />
      <CatalogTrainerGridSkeleton />
    </Container>
  );
}
