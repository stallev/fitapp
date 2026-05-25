import type { NextConfig } from "next";

function buildS3RemotePatterns(): NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> {
  const bucketName = process.env.S3_BUCKET_NAME;
  const bucketRegion = process.env.S3_BUCKET_REGION;

  if (!bucketName || !bucketRegion) {
    return [];
  }

  return [
    {
      protocol: "https",
      hostname: `${bucketName}.s3.${bucketRegion}.amazonaws.com`,
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: `${bucketName}.s3.amazonaws.com`,
      pathname: "/**",
    },
  ];
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  transpilePackages: [
    "@pulse/domain",
    "@pulse/db",
    "@pulse/policy-edge",
    "@pulse/policy-server",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/api/files/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      ...buildS3RemotePatterns(),
    ],
  },
};

export default nextConfig;
