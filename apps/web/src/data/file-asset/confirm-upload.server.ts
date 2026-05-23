import "server-only";

import {
  confirmUploadInputSchema,
  FILE_UPLOAD_MUTATION_ERROR_CODES,
  type ConfirmUploadInput,
  type MutationResult,
} from "@pulse/domain";
import { getPrisma } from "@pulse/db";

import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";

export type ConfirmUploadResult = MutationResult<{ uploadStatus: "ready" }>;

async function markUploadReady(
  fileAssetId: string,
  blobUrl: string,
): Promise<ConfirmUploadResult> {
  const existing = await getPrisma().fileAsset.findFirst({
    where: { id: fileAssetId },
    select: { id: true, uploadStatus: true },
  });

  if (!existing) {
    return { ok: false, code: FILE_UPLOAD_MUTATION_ERROR_CODES.UPLOAD_NOT_FOUND };
  }

  if (existing.uploadStatus === "ready") {
    return { ok: true, data: { uploadStatus: "ready" } };
  }

  await getPrisma().fileAsset.update({
    where: { id: fileAssetId },
    data: {
      uploadStatus: "ready",
      blobUrl,
    },
  });

  return { ok: true, data: { uploadStatus: "ready" } };
}

export async function confirmUpload(
  input: ConfirmUploadInput,
): Promise<ConfirmUploadResult> {
  const parsed = confirmUploadInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: FILE_UPLOAD_MUTATION_ERROR_CODES.VALIDATION };
  }

  const { fileAssetId, blobUrl } = parsed.data;

  const existing = await getPrisma().fileAsset.findFirst({
    where: { id: fileAssetId },
    select: { ownerUserId: true },
  });

  if (!existing) {
    return { ok: false, code: FILE_UPLOAD_MUTATION_ERROR_CODES.UPLOAD_NOT_FOUND };
  }

  const ctx = await getPolicySessionContext();
  if (!ctx || ctx.userId !== existing.ownerUserId) {
    return { ok: false, code: FILE_UPLOAD_MUTATION_ERROR_CODES.FORBIDDEN };
  }

  return markUploadReady(fileAssetId, blobUrl);
}

export async function confirmUploadByPathname(
  pathname: string,
  blobUrl: string,
  ownerUserId?: string,
): Promise<ConfirmUploadResult> {
  const where = ownerUserId
    ? { blobPathname: pathname, ownerUserId }
    : { blobPathname: pathname };

  const existing = await getPrisma().fileAsset.findFirst({
    where,
    select: { id: true, ownerUserId: true },
  });

  if (!existing) {
    return { ok: false, code: FILE_UPLOAD_MUTATION_ERROR_CODES.UPLOAD_NOT_FOUND };
  }

  if (!ownerUserId) {
    const ctx = await getPolicySessionContext();
    if (!ctx || ctx.userId !== existing.ownerUserId) {
      return { ok: false, code: FILE_UPLOAD_MUTATION_ERROR_CODES.FORBIDDEN };
    }
  }

  return markUploadReady(existing.id, blobUrl);
}
