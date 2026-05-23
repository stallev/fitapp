/** Auth mutation error codes (login, register, password reset). */
export const AUTH_MUTATION_ERROR_CODES = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  TERMS_REQUIRED: "TERMS_REQUIRED",
  PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
  VALIDATION: "VALIDATION",
  DUPLICATE_EMAIL: "DUPLICATE_EMAIL",
} as const;

export type AuthMutationErrorCode =
  (typeof AUTH_MUTATION_ERROR_CODES)[keyof typeof AUTH_MUTATION_ERROR_CODES];

/** Wishlist mutation error codes. */
export const WISHLIST_MUTATION_ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  TRAINER_NOT_BOOKABLE: "TRAINER_NOT_BOOKABLE",
  VALIDATION: "VALIDATION",
} as const;

export type WishlistMutationErrorCode =
  (typeof WISHLIST_MUTATION_ERROR_CODES)[keyof typeof WISHLIST_MUTATION_ERROR_CODES];

/** Booking mutation error codes. */
export const BOOKING_MUTATION_ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  VALIDATION: "VALIDATION",
  SLOT_UNAVAILABLE: "SLOT_UNAVAILABLE",
  TRAINER_NOT_BOOKABLE: "TRAINER_NOT_BOOKABLE",
  SERVICE_INACTIVE: "SERVICE_INACTIVE",
  SLOT_IN_PAST: "SLOT_IN_PAST",
} as const;

export type BookingMutationErrorCode =
  (typeof BOOKING_MUTATION_ERROR_CODES)[keyof typeof BOOKING_MUTATION_ERROR_CODES];

/** All known mutation error codes — extend as domains ship. */
export const MUTATION_ERROR_CODES = {
  ...AUTH_MUTATION_ERROR_CODES,
  ...WISHLIST_MUTATION_ERROR_CODES,
  ...BOOKING_MUTATION_ERROR_CODES,
} as const;

export type MutationErrorCode =
  (typeof MUTATION_ERROR_CODES)[keyof typeof MUTATION_ERROR_CODES];
