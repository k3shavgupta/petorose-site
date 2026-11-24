# petorose-site

Rebuild of the Petorose Alcones website (petorosealcones.com) — Next.js + Tailwind, deployed on Vercel.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

- `/design-preview` — the two visual directions (Phase 2). The search and product card there use the real catalogue.
- `npm run build` — production build; `npm run lint` — ESLint.

## Content

All site content lives in `content/` as JSON (no CMS). `content/INVENTORY.md` explains where every fact came from and lists open questions. Images, certificates, the catalogue PDF and the feature video are in `public/assets/`.
