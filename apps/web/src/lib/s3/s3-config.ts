import "server-only";

export function getS3BucketName(): string {
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  if (!bucket) {
    throw new Error("AWS_S3_BUCKET_NAME is not configured");
  }

  return bucket;
}

export function getS3Region(): string {
  const region = process.env.AWS_REGION;
  if (!region) {
    throw new Error("AWS_REGION is not configured");
  }

  return region;
}

export const S3_UPLOAD_URL_TTL_SECONDS = 300;
export const S3_READ_URL_TTL_SECONDS = 7200;
