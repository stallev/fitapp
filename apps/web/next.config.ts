import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

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
  /** Hide dev route indicator (nextjs-portal) — it overlapped the marketing logo at top-left. */
  devIndicators: false,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns"],
    serverActions: {
      allowedOrigins: process.env.NEXT_PUBLIC_APP_URL
        ? [process.env.NEXT_PUBLIC_APP_URL]
        : [],
    },
  },
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

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});
