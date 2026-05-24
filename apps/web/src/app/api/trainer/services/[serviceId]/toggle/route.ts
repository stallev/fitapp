import { NextResponse } from "next/server";

import { TRAINER_SERVICE_MUTATION_ERROR_CODES } from "@pulse/domain";

import { toggleTrainerServiceActive } from "@/data/trainer/trainer-service-mutations.server";
import { MESSAGES } from "@/lib/messages";

export async function POST(
  _request: Request,
  context: { params: Promise<{ serviceId: string }> },
) {
  const { serviceId } = await context.params;
  const result = await toggleTrainerServiceActive(serviceId);

  if (!result.ok) {
    const message =
      result.code === TRAINER_SERVICE_MUTATION_ERROR_CODES.NOT_FOUND
        ? MESSAGES.trainer.services.errors.notFound
        : result.code === TRAINER_SERVICE_MUTATION_ERROR_CODES.UNAUTHORIZED
          ? MESSAGES.trainer.services.errors.unauthorized
          : result.code === TRAINER_SERVICE_MUTATION_ERROR_CODES.FORBIDDEN
            ? MESSAGES.trainer.services.errors.forbidden
            : MESSAGES.trainer.services.toggleError;

    return NextResponse.json(
      { ...result, message },
      {
        status:
          result.code === TRAINER_SERVICE_MUTATION_ERROR_CODES.UNAUTHORIZED
            ? 401
            : 400,
      },
    );
  }

  return NextResponse.json(result, { status: 200 });
}
