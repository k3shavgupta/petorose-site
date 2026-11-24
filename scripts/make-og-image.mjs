#!/usr/bin/env node
// Generates public/og-image.jpg (1200×630 social share image) from the logo and brand colours.
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const W = 1200;
const H = 630;

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="a" cx="18%" cy="10%" r="60%"><stop offset="0" stop-color="#8b8dff" stop-opacity=".55"/><stop offset="1" stop-color="#8b8dff" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="88%" cy="85%" r="55%"><stop offset="0" stop-color="#e384ea" stop-opacity=".45"/><stop offset="1" stop-color="#e384ea" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#8b8dff"/><stop offset="1" stop-color="#e384ea"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#120e24"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
  <text x="80" y="300" font-family="Georgia, 'DejaVu Serif', serif" font-size="96" font-weight="300" fill="#efebff">Innovating</text>
  <text x="80" y="400" font-family="Georgia, 'DejaVu Serif', serif" font-size="96" font-style="italic" fill="url(#t)">Aromas</text>
  <text x="80" y="500" font-family="'DejaVu Sans', Arial, sans-serif" font-size="30" fill="#b9b2dd">Petorose Alcones Pvt Ltd · Aroma chemicals · Bhiwadi, India</text>
</svg>`);

const logo = await sharp(path.join(ROOT, "public/assets/img/site/petroselogo.jpg")).resize(120, 120, { fit: "contain", background: "#ffffff" }).png().toBuffer();
const tile = await sharp({ create: { width: 152, height: 152, channels: 4, background: "#ffffff" } })
  .composite([{ input: logo, left: 16, top: 16 }])
  .png()
  .toBuffer();

await sharp(bg)
  .composite([{ input: tile, left: 80, top: 80 }])
  .jpeg({ quality: 88 })
  .toFile(path.join(ROOT, "public/og-image.jpg"));
console.log("wrote public/og-image.jpg");
