import "server-only";

import bcrypt from "bcryptjs";

import {
  registerTrainerSchema,
  TRAINER_MUTATION_ERROR_CODES,
  USER_ROLE,
  type MutationResult,
  type RegisterTrainerInput,
} from "@pulse/domain";
import { getPrisma } from "@pulse/db";

const BCRYPT_COST = 12;

export async function registerTrainerUser(
  input: RegisterTrainerInput,
): Promise<MutationResult<{ userId: string }>> {
  const parsed = registerTrainerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: TRAINER_MUTATION_ERROR_CODES.VALIDATION };
  }

  const { email, password, fullName } = parsed.data;
  const normalizedEmail = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, BCRYPT_COST);

  try {
    const user = await getPrisma().user.create({
      data: {
        email: normalizedEmail,
        fullName,
        passwordHash,
        role: USER_ROLE.TRAINER,
      },
      select: { id: true },
    });

    return { ok: true, data: { userId: user.id } };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { ok: false, code: TRAINER_MUTATION_ERROR_CODES.DUPLICATE_EMAIL };
    }

    throw error;
  }
}
