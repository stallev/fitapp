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
  TRAINER_STATUSES,
  type TrainerStatus,
} from "./types/trainer-status";
export { USER_ROLES, type UserRole } from "./types/user-role";

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
