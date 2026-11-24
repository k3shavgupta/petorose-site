#!/usr/bin/env node
// Pre-render responsive WebP variants for lib/image-loader.ts (static export has no image server).
// public/assets/img/<path>.<ext>  ->  public/_img/<path>-<width>.webp for every width in WIDTHS.
// Runs automatically before `next build` (see package.json "prebuild"). Skips files already up to date.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public/assets/img");
const OUT = path.join(ROOT, "public/_img");
// Must match images.deviceSizes + images.imageSizes in next.config.ts.
export const WIDTHS = [64, 128, 256, 384, 640, 828, 1080, 1280, 1920];
const SKIP = /^(third-party-about|cloudinary\/(gy4i|qerwn|sghelk))/;

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name)) yield p;
  }
}

let made = 0;
for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).split(path.sep).join("/");
  if (SKIP.test(rel)) continue;
  const base = rel.replace(/\.[a-z0-9]+$/i, "");
  const srcStat = await fs.stat(file);
  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    const st = await fs.stat(out).catch(() => null);
    if (st && st.mtimeMs >= srcStat.mtimeMs) continue;
    await fs.mkdir(path.dirname(out), { recursive: true });
    // Never upscale: small sources are written at their own width under the requested name.
    await sharp(file).resize({ width: Math.min(w, meta.width ?? w) }).webp({ quality: 78 }).toFile(out);
    made++;
  }
}
console.log(`optimize-images: ${made} variants written`);
