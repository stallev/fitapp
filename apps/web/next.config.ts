import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@pulse/domain", "@pulse/db"],
};

export default nextConfig;
