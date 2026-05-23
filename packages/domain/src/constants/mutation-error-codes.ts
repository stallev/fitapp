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

/** All known mutation error codes — extend as domains ship. */
export const MUTATION_ERROR_CODES = {
  ...AUTH_MUTATION_ERROR_CODES,
} as const;

export type MutationErrorCode =
  (typeof MUTATION_ERROR_CODES)[keyof typeof MUTATION_ERROR_CODES];
