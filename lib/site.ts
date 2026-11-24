import { BASE_PATH } from "./base-path";

/**
 * Public origin of the deployed site, including any base path.
 * NEXT_PUBLIC_SITE_URL overrides it (the GitHub Pages workflow sets the github.io URL).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || `https://www.petorosealcones.com${BASE_PATH}`).replace(/\/$/, "");

/** Absolute URL for a site path such as "/products/". */
export const absoluteUrl = (p: string) => `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;
