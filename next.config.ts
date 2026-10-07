import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production on iPage is a static Next.js export. The PHP form endpoint in
  // public/api is copied into /out/api during `npm run build`.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Keep Cloudflare Quick Tunnel previews working during local development.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
