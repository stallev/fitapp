import { FILE_UPLOAD_PURPOSE } from "@pulse/domain";

import { MESSAGES } from "@/lib/messages";
import {
  getFileUploadExtensionLabels,
  getFileUploadMaxSizeMb,
} from "@/lib/files/file-upload-formats";

export function getCertificateUploadFormatsHint(): string {
  const extensions = getFileUploadExtensionLabels(FILE_UPLOAD_PURPOSE.CERTIFICATE);
  const maxMb = getFileUploadMaxSizeMb(FILE_UPLOAD_PURPOSE.CERTIFICATE);

  return MESSAGES.trainer.onboarding.certificateUploadHint
    .replace("{formats}", extensions.join(", "))
    .replace("{maxMb}", String(maxMb));
}
