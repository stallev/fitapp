import { NextResponse } from "next/server";

import { SCHEDULE_MUTATION_ERROR_CODES } from "@pulse/domain";

import { upsertTrainerClientNoteMutation } from "@/data/trainer/upsert-trainer-client-note.server";
import { MESSAGES } from "@/lib/messages";

export async function POST(
  request: Request,
  context: { params: Promise<{ clientId: string }> },
) {
  const { clientId } = await context.params;
  const body = (await request.json()) as { notes?: string };
  const result = await upsertTrainerClientNoteMutation({
    clientId,
    notes: body.notes ?? "",
  });

  if (!result.ok) {
    const message =
      result.code === SCHEDULE_MUTATION_ERROR_CODES.UNAUTHORIZED
        ? MESSAGES.trainer.clients.errors.unauthorized
        : result.code === SCHEDULE_MUTATION_ERROR_CODES.FORBIDDEN
          ? MESSAGES.trainer.clients.errors.forbidden
          : MESSAGES.trainer.clients.errors.notesSave;

    return NextResponse.json(
      { ...result, message },
      {
        status:
          result.code === SCHEDULE_MUTATION_ERROR_CODES.UNAUTHORIZED ? 401 : 400,
      },
    );
  }

  return NextResponse.json(result, { status: 200 });
}
