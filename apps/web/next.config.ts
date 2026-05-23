import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: [
    "@pulse/domain",
    "@pulse/db",
    "@pulse/policy-edge",
    "@pulse/policy-server",
  ],
};

export default nextConfig;
