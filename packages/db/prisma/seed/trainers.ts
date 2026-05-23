import type { PrismaClient } from "../../src/generated/client";
import type { SeededUsers } from "./users";

export type SeededTrainerProfiles = {
  anna: { id: string };
  dmitry: { id: string };
  maria: { id: string };
  pending: { id: string };
};

const APPROVED_TRAINER_FIXTURES = [
  {
    key: "anna" as const,
    timezone: "Europe/Moscow",
    bio: "Certified yoga and pilates instructor with 8 years of experience.",
    experienceYears: 8,
    ratingAvg: 4.8,
    ratingCount: 32,
    specializationSlugs: ["yoga", "pilates"],
  },
  {
    key: "dmitry" as const,
    timezone: "Europe/Moscow",
    bio: "Strength and HIIT coach focused on functional fitness.",
    experienceYears: 10,
    ratingAvg: 4.7,
    ratingCount: 24,
    specializationSlugs: ["strength", "hiit"],
  },
  {
    key: "maria" as const,
    timezone: "America/New_York",
    bio: "Pilates and stretching specialist for recovery and mobility.",
    experienceYears: 6,
    ratingAvg: 4.9,
    ratingCount: 18,
    specializationSlugs: ["pilates", "stretching"],
  },
] as const;

const PENDING_TRAINER_FIXTURE = {
  key: "pending" as const,
  timezone: "Europe/Moscow",
  bio: "New trainer awaiting verification.",
  experienceYears: 3,
  specializationSlugs: ["yoga"],
} as const;

export async function seedTrainerProfiles(
  prisma: PrismaClient,
  users: SeededUsers,
  specializationMap: Map<string, string>,
): Promise<SeededTrainerProfiles> {
  const submittedAt = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const result = {} as SeededTrainerProfiles;

  for (const fixture of APPROVED_TRAINER_FIXTURES) {
    const user = users[fixture.key];
    const profile = await prisma.trainerProfile.upsert({
      where: { userId: user.id },
      update: {
        status: "approved",
        timezone: fixture.timezone,
        bio: fixture.bio,
        experienceYears: fixture.experienceYears,
        ratingAvg: fixture.ratingAvg,
        ratingCount: fixture.ratingCount,
        submittedAt,
        reviewedAt: submittedAt,
      },
      create: {
        userId: user.id,
        status: "approved",
        timezone: fixture.timezone,
        bio: fixture.bio,
        experienceYears: fixture.experienceYears,
        ratingAvg: fixture.ratingAvg,
        ratingCount: fixture.ratingCount,
        submittedAt,
        reviewedAt: submittedAt,
      },
    });

    for (const slug of fixture.specializationSlugs) {
      const specializationId = specializationMap.get(slug);
      if (!specializationId) continue;
      await prisma.trainerSpecialization.upsert({
        where: {
          trainerProfileId_specializationId: {
            trainerProfileId: profile.id,
            specializationId,
          },
        },
        update: {},
        create: {
          trainerProfileId: profile.id,
          specializationId,
        },
      });
    }

    result[fixture.key] = { id: profile.id };
  }

  const pendingUser = users[PENDING_TRAINER_FIXTURE.key];
  const pendingProfile = await prisma.trainerProfile.upsert({
    where: { userId: pendingUser.id },
    update: {
      status: "pending",
      timezone: PENDING_TRAINER_FIXTURE.timezone,
      bio: PENDING_TRAINER_FIXTURE.bio,
      experienceYears: PENDING_TRAINER_FIXTURE.experienceYears,
      submittedAt,
      reviewedAt: null,
      rejectionReason: null,
    },
    create: {
      userId: pendingUser.id,
      status: "pending",
      timezone: PENDING_TRAINER_FIXTURE.timezone,
      bio: PENDING_TRAINER_FIXTURE.bio,
      experienceYears: PENDING_TRAINER_FIXTURE.experienceYears,
      submittedAt,
    },
  });

  for (const slug of PENDING_TRAINER_FIXTURE.specializationSlugs) {
    const specializationId = specializationMap.get(slug);
    if (!specializationId) continue;
    await prisma.trainerSpecialization.upsert({
      where: {
        trainerProfileId_specializationId: {
          trainerProfileId: pendingProfile.id,
          specializationId,
        },
      },
      update: {},
      create: {
        trainerProfileId: pendingProfile.id,
        specializationId,
      },
    });
  }

  result.pending = { id: pendingProfile.id };
  return result;
}

export async function seedVerificationDocument(
  prisma: PrismaClient,
  users: SeededUsers,
  trainers: SeededTrainerProfiles,
) {
  const { SEED_IDS } = await import("./fixtures");

  await prisma.fileAsset.upsert({
    where: { id: SEED_IDS.pendingFileAsset },
    update: {
      uploadStatus: "ready",
      blobPathname: "seed/pending-trainer/certificate.pdf",
      mimeType: "application/pdf",
    },
    create: {
      id: SEED_IDS.pendingFileAsset,
      ownerUserId: users.pending.id,
      blobPathname: "seed/pending-trainer/certificate.pdf",
      mimeType: "application/pdf",
      uploadStatus: "ready",
    },
  });

  await prisma.verificationDocument.upsert({
    where: { id: SEED_IDS.pendingVerificationDoc },
    update: {
      docType: "certificate",
      fileAssetId: SEED_IDS.pendingFileAsset,
    },
    create: {
      id: SEED_IDS.pendingVerificationDoc,
      trainerProfileId: trainers.pending.id,
      docType: "certificate",
      fileAssetId: SEED_IDS.pendingFileAsset,
    },
  });
}
