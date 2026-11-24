import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: deployable as plain files on GitHub Pages, Cloudflare Workers and Vercel.
  output: "export",
  // "/petorose-site" for the GitHub Pages project URL; empty everywhere else.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
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
