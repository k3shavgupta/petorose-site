/**
 * Optional sub-path the site is served from, e.g. "/petorose-site" on GitHub Pages.
 * Empty for local dev, Vercel and Cloudflare. Set NEXT_PUBLIC_BASE_PATH at build time.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefixes a root-relative public file URL (/assets/…) with the base path. next/link adds it on its own. */
export function asset(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path;
}
