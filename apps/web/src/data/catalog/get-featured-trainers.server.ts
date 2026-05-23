import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { TRAINER_STATUS } from "@pulse/domain";
import { getPrisma } from "@pulse/db";

import { CACHE_TAGS } from "@/lib/cache/tags";

const FEATURED_TRAINERS_LIMIT = 6;

export type FeaturedTrainerCard = {
  id: string;
  fullName: string;
  bio: string | null;
  photoUrl: string | null;
  ratingAvg: number;
  ratingCount: number;
  experienceYears: number | null;
  specializations: { slug: string; name: string }[];
  fromPriceCents: number | null;
  currency: string | null;
};

type FeaturedTrainerRow = Awaited<
  ReturnType<typeof fetchApprovedTrainerRows>
>[number];

async function fetchApprovedTrainerRows() {
  return getPrisma().trainerProfile.findMany({
    where: { status: TRAINER_STATUS.APPROVED },
    orderBy: [{ ratingAvg: "desc" }, { ratingCount: "desc" }],
    take: FEATURED_TRAINERS_LIMIT,
    select: {
      id: true,
      bio: true,
      photoUrl: true,
      ratingAvg: true,
      ratingCount: true,
      experienceYears: true,
      user: { select: { fullName: true } },
      specializations: {
        select: {
          specialization: { select: { slug: true, name: true } },
        },
      },
      services: {
        where: { isActive: true },
        orderBy: { priceCents: "asc" },
        take: 1,
        select: { priceCents: true, currency: true },
      },
    },
  });
}

function mapFeaturedTrainerRow(row: FeaturedTrainerRow): FeaturedTrainerCard {
  const cheapestService = row.services[0];

  return {
    id: row.id,
    fullName: row.user.fullName,
    bio: row.bio,
    photoUrl: row.photoUrl,
    ratingAvg: Number(row.ratingAvg),
    ratingCount: row.ratingCount,
    experienceYears: row.experienceYears,
    specializations: row.specializations.map((item) => item.specialization),
    fromPriceCents: cheapestService?.priceCents ?? null,
    currency: cheapestService?.currency ?? null,
  };
}

export async function getFeaturedTrainers(): Promise<FeaturedTrainerCard[]> {
  "use cache";
  cacheTag(CACHE_TAGS.trainersCatalog);
  cacheLife("minutes");

  const rows = await fetchApprovedTrainerRows();
  return rows.map(mapFeaturedTrainerRow);
}
