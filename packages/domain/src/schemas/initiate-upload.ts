import { z } from "zod";

import { FILE_UPLOAD_PURPOSES } from "../constants/file-upload-purpose";

export const initiateUploadInputSchema = z.object({
  purpose: z.enum(FILE_UPLOAD_PURPOSES),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().positive(),
});

export type InitiateUploadInput = z.infer<typeof initiateUploadInputSchema>;

export const confirmUploadInputSchema = z.object({
  fileAssetId: z.string().uuid(),
  blobUrl: z.string().url(),
});

export type ConfirmUploadInput = z.infer<typeof confirmUploadInputSchema>;
