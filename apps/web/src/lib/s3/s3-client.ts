import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

import { getS3Region } from "./s3-config";

let s3Client: S3Client | undefined;

export function getS3Client(): S3Client {
  if (!s3Client) {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new Error("AWS credentials are not configured");
    }

    s3Client = new S3Client({
      region: getS3Region(),
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return s3Client;
}
