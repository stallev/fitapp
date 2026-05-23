export const TRAINER_STATUSES = ["pending", "approved", "rejected"] as const;

export type TrainerStatus = (typeof TRAINER_STATUSES)[number];
