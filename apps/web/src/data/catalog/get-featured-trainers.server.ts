import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { TRAINER_STATUS } from "@pulse/domain";
import { getPrisma } from "@pulse/db";

import { CACHE_TAGS } from "@/lib/cache/tags";
import {
  mapTrainerRow,
  TRAINER_CARD_SELECT,
  type CatalogTrainerCard,
} from "@/lib/catalog/catalog-trainer-card";

const FEATURED_TRAINERS_LIMIT = 6;

async function fetchFeaturedTrainerRows() {
  return getPrisma().trainerProfile.findMany({
    where: { status: TRAINER_STATUS.APPROVED },
    orderBy: [{ ratingAvg: "desc" }, { ratingCount: "desc" }],
    take: FEATURED_TRAINERS_LIMIT,
    select: TRAINER_CARD_SELECT,
  });
}

export async function getFeaturedTrainers(): Promise<CatalogTrainerCard[]> {
  "use cache";
  cacheTag(CACHE_TAGS.trainersCatalog);
  cacheLife("minutes");

  const rows = await fetchFeaturedTrainerRows();
  return rows.map(mapTrainerRow);
}

export type { CatalogTrainerCard as FeaturedTrainerCard } from "@/lib/catalog/catalog-trainer-card";
