#!/usr/bin/env node
// Turns the old site's chemical-structure images (dark lines on a baked-in mauve or white background)
// into transparent line drawings: public/assets/img/structures/<slug>.png, black lines on alpha.
// The product page tints them per theme with CSS (inverted in dark mode).
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/assets/img/structures");
const products = JSON.parse(await fs.readFile(path.join(ROOT, "content/products.json"), "utf8"));
await fs.mkdir(OUT, { recursive: true });

for (const p of products) {
  if (!p.images.structure) continue;
  // Flatten transparent sources onto white so every image becomes "dark lines on a light background".
  const { data, info } = await sharp(path.join(ROOT, "public", p.images.structure))
    .flatten({ background: "#ffffff" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Background = most common grey level. Usually lines are darker than it; a few sources draw light
  // lines on a dark patterned background instead (e.g. Jasnoate), where only near-white pixels are kept.
  const hist = new Uint32Array(256);
  for (const v of data) hist[v]++;
  let bg = 0;
  for (let v = 1; v < 256; v++) if (hist[v] > hist[bg]) bg = v;
  const lightLines = bg < 128;
  const ink = 30;
  const alpha = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const t = lightLines ? (data[i] - 150) / 60 : (bg - data[i] - 8) / Math.max(1, bg - ink - 8);
    alpha[i] = Math.round(Math.min(1, Math.max(0, t)) * 255);
  }

  // Drop frame lines: rows/columns that are mostly ink across the whole image.
  const { width: w, height: h } = info;
  for (let y = 0; y < h; y++) {
    let n = 0;
    for (let x = 0; x < w; x++) if (alpha[y * w + x] > 128) n++;
    if (n > w * 0.7) for (let x = 0; x < w; x++) alpha[y * w + x] = 0;
  }
  for (let x = 0; x < w; x++) {
    let n = 0;
    for (let y = 0; y < h; y++) if (alpha[y * w + x] > 128) n++;
    if (n > h * 0.7) for (let y = 0; y < h; y++) alpha[y * w + x] = 0;
  }

  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < alpha.length; i++) out[i * 4 + 3] = alpha[i]; // RGB stays 0 (black)
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, `${p.slug}.png`));
}
console.log(`clean-structures: ${products.length} structures written`);
