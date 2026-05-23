export const CACHE_TAGS = {
  trainersCatalog: "trainers:catalog",
  trainer: (id: string) => `trainer:${id}`,
  bookingsClient: (userId: string) => `bookings:client:${userId}`,
  booking: (id: string) => `booking:${id}`,
} as const;
