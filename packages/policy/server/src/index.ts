import "server-only";

export type { PolicySessionContext } from "@pulse/domain";
export { PolicyError, type PolicyDenyCode } from "./errors/policy-error";
export {
  assertCanApproveTrainer,
  assertCanCompleteBooking,
  assertCanConfirmBooking,
  assertCanInitiateUpload,
  assertCanManageComplaint,
  assertCanModerateReview,
  assertCanMutateSchedule,
  assertCanMutateTrainerProfile,
  assertCanMutateTrainerService,
  assertCanProcessRefund,
  assertCanReadPrivateDoc,
} from "./stubs";
export { assertCanCreateBooking } from "./booking/assert-can-create-booking";
export {
  assertCanCancelBooking,
  assertCanReadBooking,
  type BookingPolicyFacts,
} from "./booking/assert-can-read-booking";
export { assertCanPublishReview } from "./review/assert-can-publish-review";
export { assertCanToggleWishlist } from "./wishlist/assert-can-toggle-wishlist";
