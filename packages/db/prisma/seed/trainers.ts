import type { PrismaClient } from "../../src/generated/client";
import { SEED_PHOTO_URLS } from "./fixtures";
import type { SeededUsers } from "./users";

export const APPROVED_TRAINER_KEYS = [
  "anna",
  "dmitry",
  "maria",
  "ivan",
  "elena",
  "sergey",
] as const;

export type ApprovedTrainerKey = (typeof APPROVED_TRAINER_KEYS)[number];

export type SeededTrainerProfiles = Record<
  ApprovedTrainerKey | "pending",
  { id: string }
>;

type ApprovedTrainerFixture = {
  key: ApprovedTrainerKey;
  timezone: string;
  bio: string;
  experienceYears: number;
  ratingAvg: number;
  ratingCount: number;
  photoUrl: string | null;
  specializationSlugs: readonly string[];
};

const APPROVED_TRAINER_FIXTURES: ApprovedTrainerFixture[] = [
  {
    key: "anna",
    timezone: "Europe/Berlin",
    bio: "Certified yoga and pilates instructor with 8 years of experience.",
    experienceYears: 8,
    ratingAvg: 4.8,
    ratingCount: 32,
    photoUrl: SEED_PHOTO_URLS.anna,
    specializationSlugs: ["yoga", "pilates"],
  },
  {
    key: "dmitry",
    timezone: "America/Chicago",
    experienceYears: 10,
    ratingAvg: 4.7,
    ratingCount: 24,
    photoUrl: null,
    specializationSlugs: ["strength", "hiit"],
  },
  {
    key: "maria",
    timezone: "America/New_York",
    bio: "Pilates and stretching specialist for recovery and mobility.",
    experienceYears: 6,
    ratingAvg: 4.9,
    ratingCount: 18,
    photoUrl: SEED_PHOTO_URLS.maria,
    specializationSlugs: ["pilates", "stretching"],
  },
  {
    key: "ivan",
    timezone: "Europe/London",
    experienceYears: 7,
    ratingAvg: 4.6,
    ratingCount: 21,
    photoUrl: null,
    specializationSlugs: ["hiit", "strength"],
  },
  {
    key: "elena",
    timezone: "Europe/Berlin",
    bio: "Mobility and yoga instructor helping clients restore balance and flexibility.",
    experienceYears: 5,
    ratingAvg: 4.8,
    ratingCount: 15,
    photoUrl: SEED_PHOTO_URLS.elena,
    specializationSlugs: ["yoga", "stretching"],
  },
  {
    key: "sergey",
    timezone: "America/Los_Angeles",
    experienceYears: 12,
    ratingAvg: 4.9,
    ratingCount: 28,
    photoUrl: null,
    specializationSlugs: ["strength"],
  },
];

const PENDING_TRAINER_FIXTURE = {
  key: "pending" as const,
  timezone: "Europe/Paris",
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
        photoUrl: fixture.photoUrl,
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
        photoUrl: fixture.photoUrl,
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
      photoUrl: null,
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
