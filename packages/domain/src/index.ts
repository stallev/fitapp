export {
  AUTH_MUTATION_ERROR_CODES,
  MUTATION_ERROR_CODES,
  type AuthMutationErrorCode,
  type MutationErrorCode,
} from "./constants/mutation-error-codes";
export {
  CATALOG_MIN_RATINGS,
  CATALOG_SORT,
  CATALOG_SORTS,
  DEFAULT_CATALOG_PAGE_SIZE,
  MAX_CATALOG_PAGE_SIZE,
  type CatalogMinRating,
  type CatalogSort,
} from "./constants/catalog-sort";
export {
  SPECIALIZATION_SLUGS,
  SPECIALIZATION_SLUG_SET,
  isSpecializationSlug,
  type SpecializationSlug,
} from "./constants/specialization-slugs";
export {
  BOOKING_STATUSES,
  type BookingStatus,
} from "./types/booking-status";
export {
  type MutationErr,
  type MutationOk,
  type MutationResult,
} from "./types/mutation-result";
export {
  type PolicySessionContext,
} from "./types/policy-session-context";
export {
  TRAINER_STATUS,
  TRAINER_STATUSES,
  type TrainerStatus,
} from "./types/trainer-status";
export { USER_ROLE, USER_ROLES, type UserRole } from "./types/user-role";

export { isBookingStatus } from "./guards/is-booking-status";
export { isTrainerStatus } from "./guards/is-trainer-status";
export { isUserRole } from "./guards/is-user-role";

export {
  loginCredentialsSchema,
  type LoginCredentialsInput,
} from "./schemas/login-credentials";
export {
  registerClientSchema,
  type RegisterClientInput,
} from "./schemas/register-client";
export {
  catalogTrainersQuerySchema,
  defaultCatalogTrainersQuery,
  parseCatalogTrainersQuery,
  type CatalogTrainersQuery,
} from "./schemas/catalog-trainers-query";
