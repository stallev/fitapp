export const BCRYPT_COST = 12;

export const FIXTURE_USERS = {
  admin: {
    email: "admin@pulse.dev",
    password: "admin123",
    fullName: "Pulse Admin",
    role: "admin" as const,
  },
  client: {
    email: "client@pulse.dev",
    password: "client123",
    fullName: "Alex Client",
    role: "client" as const,
  },
  anna: {
    email: "anna@pulse.dev",
    password: "trainer123",
    fullName: "Anna Yoga",
    role: "trainer" as const,
  },
  dmitry: {
    email: "dmitry@pulse.dev",
    password: "trainer123",
    fullName: "Dmitry Strength",
    role: "trainer" as const,
  },
  maria: {
    email: "maria@pulse.dev",
    password: "trainer123",
    fullName: "Maria Pilates",
    role: "trainer" as const,
  },
  pending: {
    email: "pending@pulse.dev",
    password: "trainer123",
    fullName: "Pending Trainer",
    role: "trainer" as const,
  },
} as const;

export const SPECIALIZATIONS = [
  { slug: "yoga", name: "Yoga" },
  { slug: "pilates", name: "Pilates" },
  { slug: "strength", name: "Strength Training" },
  { slug: "hiit", name: "HIIT" },
  { slug: "stretching", name: "Stretching" },
] as const;

/** Deterministic seed IDs for idempotent re-runs */
export const SEED_IDS = {
  pendingFileAsset: "11111111-1111-4111-8111-111111111101",
  pendingVerificationDoc: "11111111-1111-4111-8111-111111111102",
  bookingPending: "22222222-2222-4222-8222-222222222201",
  bookingConfirmed: "22222222-2222-4222-8222-222222222202",
  bookingCompleted: "22222222-2222-4222-8222-222222222203",
  bookingCancelled: "22222222-2222-4222-8222-222222222204",
  reviewMaria: "33333333-3333-4333-8333-333333333301",
  complaintOpen: "44444444-4444-4444-8444-444444444401",
  refundPending: "55555555-5555-4555-8555-555555555501",
} as const;
