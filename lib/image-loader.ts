import type { ImageLoaderProps } from "next/image";
import { asset } from "./base-path";

/**
 * Static-export image loader. `scripts/optimize-images.mjs` pre-renders every image under
 * public/assets/img into /_img/<path>-<width>.webp at the widths listed in next.config.ts,
 * so the site gets responsive WebP without an image server. Pass `src` without the base
 * path ("/assets/img/…"); it is added here.
 */
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith("/assets/img/")) return asset(src);
  const base = src.slice("/assets/img/".length).replace(/\.[a-z0-9]+$/i, "");
  return asset(`/_img/${base}-${width}.webp`);
}
