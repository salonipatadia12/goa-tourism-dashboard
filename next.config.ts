import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/goa-tourism-dashboard",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
