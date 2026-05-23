import "server-only";

import { getPrisma } from "@pulse/db";

export async function isTrainerWishlisted(
  clientId: string,
  trainerProfileId: string,
): Promise<boolean> {
  const prisma = getPrisma();
  const entry = await prisma.wishlist.findUnique({
    where: {
      clientId_trainerProfileId: {
        clientId,
        trainerProfileId,
      },
    },
    select: { clientId: true },
  });

  return entry !== null;
}

export async function getWishlistedTrainerIds(
  clientId: string,
  trainerProfileIds: string[],
): Promise<Set<string>> {
  if (trainerProfileIds.length === 0) {
    return new Set();
  }

  const prisma = getPrisma();
  const entries = await prisma.wishlist.findMany({
    where: {
      clientId,
      trainerProfileId: { in: trainerProfileIds },
    },
    select: { trainerProfileId: true },
  });

  return new Set(entries.map((entry) => entry.trainerProfileId));
}
