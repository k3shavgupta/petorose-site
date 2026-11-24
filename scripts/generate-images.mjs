#!/usr/bin/env node
// Generate mood images with Gemini from content/image-prompts.json.
// Usage: GEMINI_API_KEY=... node scripts/generate-images.mjs [--only slug,slug] [--force]
// Output: public/assets/img/ai/<slug>.webp (+ content/ai-images.json recording model and prompt).
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/assets/img/ai");
const LOG = path.join(ROOT, "content/ai-images.json");
const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("GEMINI_API_KEY is not set");
  process.exit(1);
}

const cfg = JSON.parse(await fs.readFile(path.join(ROOT, "content/image-prompts.json"), "utf8"));
const model = process.env.GEMINI_IMAGE_MODEL || cfg.model;
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const force = args.includes("--force");

const jobs = [
  ...Object.entries(cfg.products).map(([slug, subject]) => ({ slug, subject, aspectRatio: cfg.aspectRatio })),
  ...Object.entries(cfg.brand).map(([slug, b]) => ({ slug, subject: b.prompt, aspectRatio: b.aspectRatio })),
].filter((j) => !only || only.includes(j.slug));

const log = JSON.parse(await fs.readFile(LOG, "utf8").catch(() => "{}"));
await fs.mkdir(OUT_DIR, { recursive: true });

async function generate(prompt, aspectRatio) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio, imageSize: cfg.imageSize } },
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${res.status} ${body.error?.message ?? JSON.stringify(body).slice(0, 300)}`);
  const part = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part) throw new Error(`no image in response: ${JSON.stringify(body).slice(0, 300)}`);
  return Buffer.from(part.inlineData.data, "base64");
}

let ok = 0;
for (const job of jobs) {
  const file = path.join(OUT_DIR, `${job.slug}.webp`);
  if (!force && (await fs.stat(file).catch(() => null))) continue;
  const prompt = `${job.subject}. ${cfg.style}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const raw = await generate(prompt, job.aspectRatio);
      // Master copy capped at 1920px; responsive sizes come from scripts/optimize-images.mjs.
      await sharp(raw).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 86 }).toFile(file);
      log[job.slug] = { file: `/assets/img/ai/${job.slug}.webp`, model, prompt, aspectRatio: job.aspectRatio, generatedAt: new Date().toISOString() };
      await fs.writeFile(LOG, JSON.stringify(log, null, 2) + "\n");
      console.log(`ok   ${job.slug}`);
      ok++;
      break;
    } catch (e) {
      console.warn(`fail ${job.slug} (attempt ${attempt}): ${e.message}`);
      if (attempt === 3) process.exitCode = 1;
      else await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
}
console.log(`generated ${ok} of ${jobs.length}`);
