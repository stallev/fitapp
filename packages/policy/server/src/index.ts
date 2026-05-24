import "server-only";

export type { PolicySessionContext } from "@pulse/domain";
export { PolicyError, type PolicyDenyCode } from "./errors/policy-error";
export {
  assertCanApproveTrainer,
  assertCanConfirmBooking,
  assertCanManageComplaint,
  assertCanModerateReview,
  assertCanProcessRefund,
  assertCanReadPrivateDoc,
} from "./stubs";
export { assertCanInitiateUpload } from "./file-upload/assert-can-initiate-upload";
export { assertCanReadFileAsset } from "./file-upload/assert-can-read-file-asset";
export {
  assertCanAccessTrainerClient,
  assertCanUpsertTrainerClientNote,
  type TrainerClientPolicyFacts,
} from "./trainer/assert-can-access-trainer-client";
export { assertCanMutateSchedule, type TrainerSchedulePolicyFacts } from "./trainer/assert-can-mutate-schedule";
export { assertCanMutateTrainerProfile } from "./trainer/assert-can-mutate-trainer-profile";
export {
  assertCanEditTrainerProfile,
  type TrainerProfileEditPolicyFacts,
} from "./trainer/assert-can-edit-trainer-profile";
export {
  assertCanMutateTrainerService,
  type TrainerServicePolicyFacts,
} from "./trainer/assert-can-mutate-trainer-service";
export { assertCanCreateBooking } from "./booking/assert-can-create-booking";
export {
  assertCanCompleteBooking,
  type CompleteBookingPolicyFacts,
} from "./booking/assert-can-complete-booking";
export {
  assertCanCancelBooking,
  assertCanReadBooking,
  type BookingPolicyFacts,
} from "./booking/assert-can-read-booking";
export { assertCanPublishReview } from "./review/assert-can-publish-review";
export { assertCanToggleWishlist } from "./wishlist/assert-can-toggle-wishlist";
