import "server-only";

export type { PolicySessionContext } from "@pulse/domain";
export { PolicyError, type PolicyDenyCode } from "./errors/policy-error";
export {
  assertCanApproveTrainer,
  assertCanCancelBooking,
  assertCanCompleteBooking,
  assertCanConfirmBooking,
  assertCanCreateBooking,
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
export { assertCanToggleWishlist } from "./wishlist/assert-can-toggle-wishlist";
