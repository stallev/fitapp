"use server";

import {
  FILE_UPLOAD_MUTATION_ERROR_CODES,
  initiateUploadInputSchema,
  type FileUploadPurpose,
  type MutationResult,
} from "@pulse/domain";

import { initiateUpload } from "@/data/file-asset/initiate-upload.server";
import { MESSAGES } from "@/lib/messages";

export type InitiateUploadActionResult = MutationResult<{
  fileAssetId: string;
  pathname: string;
}>;

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
    default:
      return MESSAGES.fileUpload.errors.generic;
  }
}

export async function initiateUploadAction(input: {
  purpose: FileUploadPurpose;
  mimeType: string;
  sizeBytes: number;
}): Promise<InitiateUploadActionResult> {
  const parsed = initiateUploadInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: FILE_UPLOAD_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.fileUpload.errors.validation,
    };
  }

  const result = await initiateUpload(parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message: mapUploadError(result.code),
    };
  }

  return result;
}
