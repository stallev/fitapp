import type { PrismaClient } from "../../src/generated/client";
import { SPECIALIZATIONS } from "./fixtures";

export async function seedSpecializations(prisma: PrismaClient) {
  for (const spec of SPECIALIZATIONS) {
    await prisma.specialization.upsert({
      where: { slug: spec.slug },
      update: { name: spec.name },
      create: { slug: spec.slug, name: spec.name },
    });
  }
}

export async function getSpecializationMap(prisma: PrismaClient) {
  const rows = await prisma.specialization.findMany();
  return new Map(rows.map((row) => [row.slug, row.id]));
}
