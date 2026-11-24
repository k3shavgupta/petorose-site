# petorose-site

Rebuild of the Petorose Alcones website (petorosealcones.com) — Next.js + Tailwind. The site is fully static (`output: "export"`), so it deploys as plain files to Cloudflare Workers or Vercel.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

- `/design-preview` — the chosen visual direction (Rose Noir) with live search, product card and credibility sections.
- `npm run build` — writes the static site to `out/`. It first runs `scripts/optimize-images.mjs`, which turns every image in `public/assets/img` into responsive WebP sizes under `public/_img` (used by `lib/image-loader.ts`).
- `npm run lint` — ESLint.

## Content

All site content lives in `content/` as JSON (no CMS). `content/INVENTORY.md` explains where every fact came from and lists open questions. Images, certificates, the catalogue PDF and the feature video are in `public/assets/`.

### AI mood images

`content/image-prompts.json` holds one prompt per product, built only from that product's odour description. `GEMINI_API_KEY=… npm run images:generate` writes them to `public/assets/img/ai/<slug>.webp` and records the model and prompt in `content/ai-images.json`. They are illustrative only: never generate the plant, lab or people.

## Deploy

- **Cloudflare Workers:** `CLOUDFLARE_API_TOKEN=… npm run deploy:cloudflare` (config in `wrangler.jsonc`, serves `out/` as static assets).
- **Vercel:** import the repo with default settings; Vercel detects Next.js and runs `npm run build`.
