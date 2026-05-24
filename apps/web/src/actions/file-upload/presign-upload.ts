"use server";

import {
  FILE_UPLOAD_MUTATION_ERROR_CODES,
  presignUploadInputSchema,
  type MutationResult,
} from "@pulse/domain";

import { createPresignedPutUrl } from "@/data/file-asset/presign-upload.server";
import { MESSAGES } from "@/lib/messages";

export type PresignUploadActionResult = MutationResult<{ presignedUrl: string }>;

function mapUploadError(code: string): string {
  switch (code) {
    case FILE_UPLOAD_MUTATION_ERROR_CODES.INVALID_MIME:
      return MESSAGES.fileUpload.errors.invalidMime;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.FILE_TOO_LARGE:
      return MESSAGES.fileUpload.errors.tooLarge;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.fileUpload.errors.unauthorized;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.fileUpload.errors.forbidden;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.INVALID_UPLOAD_STATE:
      return MESSAGES.fileUpload.errors.generic;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.UPLOAD_NOT_FOUND:
      return MESSAGES.fileUpload.errors.generic;
    default:
      return MESSAGES.fileUpload.errors.generic;
  }
}

export async function presignUploadAction(input: {
  fileAssetId: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<PresignUploadActionResult> {
  const parsed = presignUploadInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: FILE_UPLOAD_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.fileUpload.errors.validation,
    };
  }

  const result = await createPresignedPutUrl(parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message: mapUploadError(result.code),
    };
  }

  return result;
}
