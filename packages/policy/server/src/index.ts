import "server-only";

export type { PolicySessionContext } from "@pulse/domain";
export { PolicyError, type PolicyDenyCode } from "./errors/policy-error";
export {
  assertCanApproveTrainer,
  assertCanCancelBooking,
  assertCanCompleteBooking,
  assertCanConfirmBooking,
  assertCanInitiateUpload,
  assertCanManageComplaint,
  assertCanModerateReview,
  assertCanMutateSchedule,
  assertCanMutateTrainerProfile,
  assertCanMutateTrainerService,
  assertCanProcessRefund,
  assertCanPublishReview,
  assertCanReadBooking,
  assertCanReadPrivateDoc,
} from "./stubs";
export { assertCanCreateBooking } from "./booking/assert-can-create-booking";
export { assertCanToggleWishlist } from "./wishlist/assert-can-toggle-wishlist";
