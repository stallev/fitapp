import "server-only";

import {
  TRAINER_STATUS,
  toggleWishlistInputSchema,
  WISHLIST_MUTATION_ERROR_CODES,
  type MutationResult,
  type ToggleWishlistInput,
} from "@pulse/domain";
import { getPrisma, isPrismaUniqueViolation } from "@pulse/db";
import { assertCanToggleWishlist, PolicyError } from "@pulse/policy-server";

import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";
import { MESSAGES } from "@/lib/messages";

export type ToggleWishlistResult = MutationResult<{ isWishlisted: boolean }>;

function mapPolicyError(error: PolicyError): ToggleWishlistResult {
  if (error.code === "UNAUTHORIZED") {
    return {
      ok: false,
      code: WISHLIST_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.wishlist.unauthorized,
    };
  }

  return {
    ok: false,
    code: WISHLIST_MUTATION_ERROR_CODES.FORBIDDEN,
    message: MESSAGES.wishlist.forbidden,
  };
}

export async function toggleWishlist(
  input: ToggleWishlistInput,
): Promise<ToggleWishlistResult> {
  const parsed = toggleWishlistInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: WISHLIST_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.wishlist.validationError,
    };
  }

  const ctx = await getPolicySessionContext();

  try {
    assertCanToggleWishlist(ctx);
  } catch (error) {
    if (error instanceof PolicyError) {
      return mapPolicyError(error);
    }

    throw error;
  }

  const { trainerProfileId, action } = parsed.data;
  const prisma = getPrisma();

  if (action === "add") {
    const trainer = await prisma.trainerProfile.findUnique({
      where: { id: trainerProfileId },
      select: { status: true },
    });

    if (!trainer || trainer.status !== TRAINER_STATUS.APPROVED) {
      return {
        ok: false,
        code: WISHLIST_MUTATION_ERROR_CODES.TRAINER_NOT_BOOKABLE,
        message: MESSAGES.wishlist.trainerNotBookable,
      };
    }

    try {
      await prisma.wishlist.create({
        data: {
          clientId: ctx.userId,
          trainerProfileId,
        },
      });
    } catch (error) {
      if (isPrismaUniqueViolation(error)) {
        return { ok: true, data: { isWishlisted: true } };
      }

      throw error;
    }

    return { ok: true, data: { isWishlisted: true } };
  }

  await prisma.wishlist.deleteMany({
    where: {
      clientId: ctx.userId,
      trainerProfileId,
    },
  });

  return { ok: true, data: { isWishlisted: false } };
}
