import type { ImageLoaderProps } from "next/image";

/**
 * Static-export image loader. `scripts/optimize-images.mjs` pre-renders every image under
 * public/assets/img into /_img/<path>-<width>.webp at the widths listed in next.config.ts,
 * so the site gets responsive WebP without an image server (works on Vercel and Cloudflare).
 */
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith("/assets/img/")) return src;
  const base = src.slice("/assets/img/".length).replace(/\.[a-z0-9]+$/i, "");
  return `/_img/${base}-${width}.webp`;
}
