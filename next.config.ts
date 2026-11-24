import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: deployable as plain files on Cloudflare Workers (static assets) and on Vercel.
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Must match WIDTHS in scripts/optimize-images.mjs.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
