export const CACHE_TAGS = {
  landingCopy: (locale: string) => `landing:copy:${locale}`,
  trainersCatalog: "trainers:catalog",
  trainer: (id: string) => `trainer:${id}`,
  trainerSchedule: (id: string) => `trainer:${id}:schedule`,
  bookingsClient: (userId: string) => `bookings:client:${userId}`,
  bookingsTrainer: (trainerProfileId: string) =>
    `bookings:trainer:${trainerProfileId}`,
  booking: (id: string) => `booking:${id}`,
} as const;
