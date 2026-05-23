import type { PolicySessionContext } from "@pulse/domain";

import { assertNotImplemented } from "../errors/policy-error";

function policyStub(_ctx: PolicySessionContext, ..._rest: unknown[]): void {
  void _ctx;
  void _rest;
  assertNotImplemented();
}

export const assertCanConfirmBooking = policyStub;
export const assertCanCompleteBooking = policyStub;
export const assertCanMutateTrainerProfile = policyStub;
export const assertCanMutateTrainerService = policyStub;
export const assertCanMutateSchedule = policyStub;
export const assertCanToggleWishlist = policyStub;
export const assertCanPublishReview = policyStub;
export const assertCanModerateReview = policyStub;
export const assertCanApproveTrainer = policyStub;
export const assertCanInitiateUpload = policyStub;
export const assertCanReadPrivateDoc = policyStub;
export const assertCanManageComplaint = policyStub;
export const assertCanProcessRefund = policyStub;
