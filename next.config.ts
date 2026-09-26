import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local + CDN video sources without optimization issues
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
