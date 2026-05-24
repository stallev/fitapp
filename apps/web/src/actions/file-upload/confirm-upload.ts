"use server";

import {
  confirmUploadInputSchema,
  FILE_UPLOAD_MUTATION_ERROR_CODES,
  type MutationResult,
} from "@pulse/domain";

import { confirmUpload } from "@/data/file-asset/confirm-upload.server";
import { MESSAGES } from "@/lib/messages";

export type ConfirmUploadActionResult = MutationResult<{
  uploadStatus: "ready";
  readUrl: string;
}>;

function mapUploadError(code: string): string {
  switch (code) {
    case FILE_UPLOAD_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.fileUpload.errors.unauthorized;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.fileUpload.errors.forbidden;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.UPLOAD_NOT_FOUND:
      return MESSAGES.fileUpload.errors.generic;
    case FILE_UPLOAD_MUTATION_ERROR_CODES.INVALID_UPLOAD_STATE:
      return MESSAGES.fileUpload.errors.generic;
    default:
      return MESSAGES.fileUpload.errors.generic;
  }
}

export async function confirmUploadAction(input: {
  fileAssetId: string;
  expectedSize: number;
}): Promise<ConfirmUploadActionResult> {
  const parsed = confirmUploadInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: FILE_UPLOAD_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.fileUpload.errors.validation,
    };
  }

  const result = await confirmUpload(parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message: mapUploadError(result.code),
    };
  }

  return result;
}
