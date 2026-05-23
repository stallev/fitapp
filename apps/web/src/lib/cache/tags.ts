export const CACHE_TAGS = {
  trainersCatalog: "trainers:catalog",
  trainer: (id: string) => `trainer:${id}`,
} as const;
