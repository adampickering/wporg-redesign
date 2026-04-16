import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/wporg-redesign",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
