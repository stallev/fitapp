export {
  AUTH_MUTATION_ERROR_CODES,
  BOOKING_MUTATION_ERROR_CODES,
  MUTATION_ERROR_CODES,
  REVIEW_MUTATION_ERROR_CODES,
  WISHLIST_MUTATION_ERROR_CODES,
  type AuthMutationErrorCode,
  type BookingMutationErrorCode,
  type MutationErrorCode,
  type ReviewMutationErrorCode,
  type WishlistMutationErrorCode,
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
  BOOKING_STATUS,
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
export {
  toggleWishlistActionSchema,
  toggleWishlistInputSchema,
  type ToggleWishlistInput,
} from "./schemas/toggle-wishlist";
export {
  createBookingInputSchema,
  type CreateBookingInput,
} from "./schemas/create-booking";
export {
  cancelBookingInputSchema,
  type CancelBookingInput,
} from "./schemas/cancel-booking";
export {
  publishReviewInputSchema,
  type PublishReviewInput,
} from "./schemas/publish-review";
export {
  bookingOverlapsExisting,
  buildBookingSnapshots,
  isSlotAllowed,
  validateCreateBookingSlot,
  validateSlotNotInPast,
  type BookingServiceSnapshotSource,
  type BookingSnapshots,
  type CreateBookingValidationError,
} from "./booking/create-booking";
export {
  CLIENT_CANCELLATION_WINDOW_MS,
  canClientCancelBooking,
  isClientCancellationWindowOpen,
  validateClientCancelBooking,
  type CancelBookingValidationError,
  type ClientCancelBookingFacts,
} from "./booking/cancel-booking";
export {
  validatePublishReview,
  type PublishReviewFacts,
  type PublishReviewValidationError,
} from "./review/publish-review";
export {
  type BookingOverlapInput,
  type DateRange,
  type GenerateAvailableSlotsInput,
  type ScheduleExceptionInput,
  type SlotDto,
  type WeeklyIntervalInput,
} from "./types/slot-dto";
export {
  generateAvailableSlots,
  getLocalDateRangeFromToday,
  listLocalDatesFromToday,
} from "./scheduling/generate-available-slots";
export { formatTrainerTimezoneLabel } from "./scheduling/format-timezone-label";
