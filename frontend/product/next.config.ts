import type { NextConfig } from "next";
import path from "path";

const strapiHostname = process.env.NEXT_PUBLIC_STRAPI_URL
  ? new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname
  : "localhost";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  transpilePackages: ["storybook"],
  images: {
    // In development Strapi runs on localhost (a private IP).
    // Next.js 15+ blocks image optimization requests to private IPs,
    // so we skip optimization in dev and let the browser fetch directly.
    unoptimized: isDev,
    remotePatterns: isDev
      ? []
      : [
          {
            protocol: "https",
            hostname: strapiHostname,
            pathname: "/uploads/**",
          },
        ],
  },
};

export default nextConfig;
