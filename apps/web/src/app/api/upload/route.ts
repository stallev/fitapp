import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import {
  FILE_UPLOAD_MUTATION_ERROR_CODES,
  getMaxUploadSizeBytes,
  isFileUploadPurpose,
  validateUploadRequest,
  type FileUploadPurpose,
} from "@pulse/domain";
import { assertCanInitiateUpload, PolicyError } from "@pulse/policy-server";

import { confirmUploadByPathname } from "@/data/file-asset/confirm-upload.server";
import { auth } from "@/auth";
import { MESSAGES } from "@/lib/messages";

type UploadClientPayload = {
  purpose?: FileUploadPurpose;
  mimeType?: string;
  sizeBytes?: number;
};

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    return NextResponse.json(
      {
        ok: false,
        code: FILE_UPLOAD_MUTATION_ERROR_CODES.UNAUTHORIZED,
        message: MESSAGES.fileUpload.errors.unauthorized,
      },
      { status: 401 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const payload = parseClientPayload(clientPayload);
        if (!payload.purpose || !payload.mimeType || !payload.sizeBytes) {
          throw new Error(MESSAGES.fileUpload.errors.validation);
        }

        if (!isFileUploadPurpose(payload.purpose)) {
          throw new Error(MESSAGES.fileUpload.errors.forbidden);
        }

        const ctx = {
          userId: session.user!.id!,
          role: session.user!.role!,
        };

        assertCanInitiateUpload(ctx, payload.purpose);

        const validation = validateUploadRequest(
          payload.purpose,
          payload.mimeType,
          payload.sizeBytes,
        );
        if (validation) {
          throw new Error(mapUploadValidationMessage(validation.code));
        }

        return {
          allowedContentTypes: [payload.mimeType],
          maximumSizeInBytes: getMaxUploadSizeBytes(payload.purpose),
          tokenPayload: JSON.stringify({
            userId: session.user!.id,
            purpose: payload.purpose,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const data = tokenPayload ? JSON.parse(tokenPayload) : {};
        if (!data.userId || typeof data.userId !== "string") {
          return;
        }

        await confirmUploadByPathname(blob.pathname, blob.url, data.userId);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof PolicyError
        ? MESSAGES.fileUpload.errors.forbidden
        : error instanceof Error
          ? error.message
          : MESSAGES.fileUpload.errors.generic;

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function parseClientPayload(clientPayload: string | null): UploadClientPayload {
  if (!clientPayload) {
    return {};
  }

  try {
    return JSON.parse(clientPayload) as UploadClientPayload;
  } catch {
    return {};
  }
}

function mapUploadValidationMessage(code: string): string {
  switch (code) {
    case FILE_UPLOAD_MUTATION_ERROR_CODES.INVALID_MIME:
      return MESSAGES.fileUpload.errors.invalidMime;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.FILE_TOO_LARGE:
      return MESSAGES.fileUpload.errors.tooLarge;
    default:
      return MESSAGES.fileUpload.errors.validation;
  }
}
