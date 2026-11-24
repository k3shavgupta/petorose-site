# Content inventory — petorosealcones.com (Phase 1)

Extracted 2026-11-24 from the live site (client-side React app, rendered with headless Chrome via Playwright), its JavaScript bundle (`/static/js/main.3670ae15.js`), the product catalogue PDF and the six certificate PDFs linked in the footer. Nothing below was invented: where a source is silent the content files say `TODO`. Contradictions are **flagged, not fixed** — both values are kept in `content/products.json` → `sources` / `discrepancies`.

**Content files**

| File | What it holds |
|---|---|
| `content/company.json` | Company facts, history (website + catalogue wording), group, address, phones, email, certifications with numbers and expiry dates, catalogue, video, homepage selections, footer, SEO meta |
| `content/products.json` | 39 products, one object each: top-level fields for the new site + raw `sources.site` / `sources.pdf` + `discrepancies` + `flags` |
| `content/seo-landing-pages.json` | 56 Anethole SEO landing URLs (title tag, meta description, keywords) |
| `content/certified-products.json` | Products named on the Kosher and Halal certificates (most are not in the catalogue) |
| `content/source/` | Raw evidence: rendered page text, catalogue text, certificate text, bundle data, asset manifest, catalogue badge montage, full discrepancy list |
| `public/assets/` | Every downloaded image, logo, certificate, catalogue PDF, video, font and favicon (no hotlinks) |
| `scripts/legacy-extract/` | The scripts that produced all of the above (re-runnable) |

## 1. Sources

| Source | How | Taken |
|---|---|---|
| `/` (home) | Playwright render + bundle | Hero "INNOVATING AROMAS" + "Know More" → /about; **New Products**: Hyacinth Core, Isocaproic Acid, Jalclone; event banner (FAFAI Expo 2025); feature video; **Featured Products**: Methyl-3-nonenoate, Para Propyl Phenol, Chavibetol 50%; "All Products" button; floating buttons: catalogue, feature video, WhatsApp |
| `/products` | Playwright render | Searchable table of all 39 products (S.No, name, CAS) |
| `/product/<slug>` × 39 | Playwright render + bundle arrays | Name, alias, description, chemical name, formula, CAS, FEMA, tenacity, product photo, structure diagram, compliance badge image, "Enquiry" modal |
| `/about` | Playwright render + bundle | "About Us — Because INNOVATION is the only way forward" + 3 paragraphs; 3 hotlinked stock photos |
| `/contact` | Playwright render + bundle | "We're here to help.", Head Office address, phones, email, "Send your Query" form |
| Footer (all pages) | render | Address, phones, email, Important Links (incl. Banwari Group → banwari.org), Certifications (6 PDF links), copyright, "Made in India", Design Avenue credit |
| Header (all pages) | render + bundle | Products / About us / Contact us / Catalogue (Heyzine flip-book modal) / Brochure (PDF download, filename `ProductCatalogueWeb2025`) |
| `/product/<56 SEO slugs>` | bundle (+ 9 sampled with Playwright) | Localised title/description/keywords only; page body is identical to `/product/anethole` (verified on all 9 rendered) |
| `/about.html`, `/contact.html` | Playwright render | Linked from the footer; render **only header + footer** (empty pages) |
| `ProductCatalogueWeb.da3d1a6d2bcc9e488694.pdf` (44 pp, "Product Catalogue April 2025") | pdftotext / pdfplumber + visual check | Cover, contents (39 products + "Also Known As" + page), About text, one page per product, Jean-Claude Ellena quote, Group Companies, Certifications, contact block |
| `FDA PAPL.pdf`, `HALAL PAPL.pdf`, `ISO 9001 PAPL.pdf`, `ISO 14001 PAPL.pdf`, `ISO 22000 PAPL.pdf`, `KOSHER PAPL.pdf` | pdftotext; Halal and ISO 14001 are image-only and were read visually | Issuer, numbers, scope, issue and expiry dates, certified product lists |
| `robots.txt` | curl | Allows everything; **no sitemap.xml** exists (request returns the SPA shell) |
| `Petorose Alcones Feature Video.mp4` (2:08) | Frames viewed with ffmpeg; narration transcribed with Whisper `small.en`, names corrected by hand | **AI avatar presenter ("Rose", "Powered by AI") over stock imagery — no footage of the facility, lab or production.** Claims: state-of-the-art facility in Rajasthan, seamless supply chain, consistent quality, "rigorously testing every product before it reaches you", "more than happy to send samples", prompt email replies, LinkedIn (no URL), FAFAI Expo 2025. Product remarks for Chavibetol, Ethyl Isocaproate, Para Propyl Phenol (in `products.json` → `videoNote`). Transcript: `content/source/video-transcript.txt`; captions: `public/assets/video/…en.vtt` |

## 2. Products

The website and the catalogue list **the same 39 products** — the catalogue adds no extra products. (Extra product *names* do appear on the Kosher/Halal certificates; see §5.) Anethole, which you mentioned, is product #2 and also has 56 SEO landing pages.

| # | Product | Slug | Also known as | CAS | FEMA | Tenacity | Cat. page | Food / Kosher / GMO (catalogue) |
|---|---|---|---|---|---|---|---|---|
| 1 | Altanol | `altanol` | Toscanol | 16510-27-3 | 4759 | 48 HOURS | 2 | ✗ ✗ ✗ |
| 2 | Anethole (Synthetic) | `anethole` | Anethole 21/22 | 4180-23-8 | 2086 | 24 HOURS | 3 | ✓ ✓ ✗ |
| 3 | Arednitryl | `arednitryl` | Cantryl | 15373-31-6 | — | 30 DAYS | 4 | ✗ ✗ ✗ |
| 4 | Caprifloren | `caprifloren` | Aprifloren | 67663-01-08 | 3999 | 180 HOURS | 5 | ✗ ✗ ✗ |
| 5 | Celerytone | `celerytone` | Celery Ketone / Celerone | 3720-16-9 | 3577 | 15 HOURS | 6 | ✓ ✓ ✗ |
| 6 | Chavibetol 50% | `chavibetol-50` | — | 501-19-9 | — | 240 HOURS | 7 | ✓ ✗ ✗ |
| 7 | Chavicol | `chavicol` | — | 501-92-8 | 4075 | 48 HOURS | 8 | ✓ ✗ ✗ |
| 8 | Chavicyl Acetate | `chavicyl-acetate` | Chavicol Acetate | 61499-22-7 | — | 24 HOURS | 9 | ✓ ✗ ✗ |
| 9 | Creamy Lactone 10% | `creamy-lactone` | Methyl Laitone 10% | 77-93-0 / 94201-19-1 | — | 165 HOURS | 10 | ✗ ✗ ✗ |
| 10 | Ethyl Isocaproate | `ethyl-isocaproate` | — | 25415-67-2 | 4343 | 3 HOURS | 11 | ✗ ✗ ✗ |
| 11 | Fadeus | `fadeus` | Diola | 4747-07-3 | 4291 | 24 HOURS | 12 | ✗ – ✗ |
| 12 | Gardeniamide | `gardeniamide` | Gardamide | 84434-18-4 | 3241 | 72 HOURS | 13 | ✗ ✗ ✗ |
| 13 | Grecazine | `grecazine` | Verdoracine | 14374-92-6 | — | 24 HOURS | 14 | ✗ ✗ ✗ |
| 14 | Gulabow | `gulabow` | Anatolyl | 24817-51-4 | 3632 | 48 HOURS | 15 | ✓ ✓ ✗ |
| 15 | Hijacynth | `hijacynth` | Jacinthaflor | 33941-99-0 | — | 10 HOURS | 16 | – – ✗ |
| 16 | Hyacinth Acetal | `hyacinth-acetal` | Acetal CD | 29895-73-6 | 2877 | 48 HOURS | 17 | ✓ ✓ ✗ |
| 17 | Hyacinth Core | `hyacinth-core` | Hyacinth Body | 2556-10-7 | — | 18 HOURS | 18 | ✗ ✓ ✗ |
| 18 | Isocaproic Acid | `isocaproic-acid` | Hexonic Acid | 646-07-1 | 3463 | 72 HOURS | 19 | ✓ ✓ ✗ |
| 19 | Jalclone | `jalclone` | — | 207228-93-1 | — | 350 HOURS | 20 | – – ✗ |
| 20 | Jasnoate | `jasnoate` | Gelsone | 29214-60-6 | 4459 | 48 HOURS | 21 | ✓ – ✗ |
| 21 | Laval | `laval` | Lavender Aldehyde | 35158-25-9 | 3406 | 8-10 HOURS | 22 | ✓ ✓ ✗ |
| 22 | Megavanil | `megavanil` | Ultravanil | 25265-71-8 / 2563-07-7 | — | > 350 HOURS | 23 | ✗ ✗ ✗ |
| 23 | Methyl-3-Nonenoate | `methyl-3-nonenoate` | — | 13481-87-3 | 3710 | > 24 HOURS | 24 | ✓ ✓ ✗ |
| 24 | Muscomme W | `muscomme-w` | Edenolide | 478695-70-4 | — | 50 HOURS | 25 | ✗ ✓ ✗ |
| 25 | Narangama | `narangama` | Orange Flower Ether | 14576-08-0 | — | 3 HOURS | 26 | ✗ ✗ ✗ |
| 26 | Neroli Ketone | `neroli-ketone` | Nerone | 31375-17-4 | — | > 30 HOURS | 27 | ✗ ✗ ✗ |
| 27 | Newfoleon | `newfoleon` | Neofolione / Novafoleon | 111-79-5 | 2725 | 15 HOURS | 28 | ✓ ✓ ✗ |
| 28 | Nutclone One | `nutclone-one` | Nutty Cyclohexanone | 1193-18-6 | 3360 | 24 HOURS | 29 | – – ✗ |
| 29 | Orrisnitrile | `orrisnitrile` | Irisnitrile | 29127-83-1 | — | 48 HOURS | 30 | – – ✗ |
| 30 | Palsantol | `palsantol` | — | 104864-90-6 | — | 336 HOURS | 31 | ✗ ✗ ✗ |
| 31 | Para Propyl Phenol | `para-propyl-phenol` | — | 645-56-7 | 3649 | 10 HOURS | 32 | ✓ ✓ ✗ |
| 32 | Phenyl Ethyl Propionate | `phenyl-ethyl-propionate` | — | 122-70-3 | 2867 | 96 HOURS | 33 | ✓ ✓ ✗ |
| 33 | Prosethyl | `prosethyl` | Rosethyl | 64988-06-03 | — | > 48 HOURS | 34 | – – ✗ |
| 34 | Rhumytal | `rhumytal` | Rhum Acetal | 1670-47-9 | 4516 | > 24 HOURS | 35 | ✗ ✗ ✗ |
| 35 | Val Acetate | `val-acetate` | Vetikolacetate | 68083-58-9 | — | 24 HOURS | 36 | ✗ ✗ ✗ |
| 36 | Valakon | `valakon` | Vetikon | 7403-42-1 | — | 12 HOURS | 37 | ✗ ✗ ✗ |
| 37 | Vanilathon | `vanilathon` | Creosol | 93-51-6 | 2671 | 24 HOURS | 38 | ✓ ✓ ✗ |
| 38 | Whiskey 91 | `whiskey-91` | Whiskey Lactone | 39212-23-2 | 3803 | 60 HOURS | 39 | – – ✗ |
| 39 | White Tuberose | `white-tuberose` | Methyl Tuberate | 33673-62-0 | — | 160 HOURS | 40 | – – ✗ |

Compliance column: ✓ / ✗ = tick / cross icon on the catalogue page, – = badge not printed. Read visually for every page (`content/source/catalogue-badges-montage.png`) because the PDF text layer doesn't record the icon.

**How the top-level product fields were chosen.** Default = catalogue value (April 2025, the newest document); website value used when the catalogue is silent. Exceptions where the catalogue has an evident typo or less information: Anethole chemical name ("1-mthoxy…" in catalogue), Anethole alias (catalogue just repeats "Anethole"; website "Anethole 21/22"), and the Orrisnitrile name ("Orrisnitril" on its catalogue page). Both raw values are always kept in `sources`. Fields that no source provides — separate odour profile, applications, purity, packaging — are `TODO`. "50%" (Chavibetol) and "10%" (Creamy Lactone) are part of the product names; no other purity data exists.

## 3. Contradictions and unclear items (flagged, not fixed)

### Certifications
1. **"ISO 90001"** in the website footer. The linked certificate is **ISO 9001:2015** (QRO, no. 305023011113Q). Almost certainly a typo.
2. **Every certificate copy on the old site has expired** (today is 2026-11-24):

   | Certificate | Number | Issued | Valid until |
   |---|---|---|---|
   | US FDA registration (via Willow Glen Consultancy) | 17306564766 | 2023-11-11 | **2024-12-31** |
   | Kosher (Pareve), acct OOS9148M | — | 2023-08-16 | **2024-07-31** |
   | Halal (Indian Halal Services) | 2109/08/23 | 2023-08-09 | **2025-08-08** |
   | ISO 9001:2015 (QRO) | 305023011113Q | 2023-09-08 | **2026-01-10** |
   | ISO 22000:2018 (QRO) | 305023091406F | 2023-09-14 | **2026-09-13** |
   | ISO 14001:2015 (Royal Assessments) | E2023115636 | 2023-11-22 | **2026-11-21** |

   TODO: current certificates are needed before the new site links to them.
3. **Website vs catalogue certification sets differ.** Website footer: FDA, Halal, ISO 9001, ISO 14001, ISO 22000, Kosher. Catalogue back cover: Halal, ISO 22000:2018, ISO 9001:2015, Kosher, **FSSAI**. FSSAI is not on the website and has no certificate or licence number. FDA and ISO 14001 are not in the catalogue.
4. The FDA document is a private agent's certificate of registration; the agent states that the US FDA does not recognise it. Showing it as "FDA certified" would overstate it. Suggest wording such as "US FDA registered facility".
5. Old site says "ensuring all certifications like Halal and Kosher"; the catalogue says "availability of certifications like Kosher and Halal **on a product-to-product basis**". The badges confirm it varies by product.

### Per-product compliance badges (Food Grade / Kosher / GMO)
The website and catalogue disagree for most products. Example: the website shows Altanol, Gardeniamide, Grecazine, Megavanil, Neroli Ketone and Rhumytal as Food grade ✓ Kosher ✓; the catalogue marks all three ✗. The Kosher certificate lists Chavibetol and (probably) Grecazine, but the catalogue marks Kosher ✗ for both. Three products (Anethole, Caprifloren, Celerytone) show a **broken badge image** on the website. "GMO ✗" appears on every product and probably means "non-GMO", but that's an interpretation — confirm.
`compliance` in products.json uses the catalogue values with `needsConfirmation: true` wherever the sources conflict. **Nothing about Kosher/Halal/food-grade status should go live until confirmed.**

| Product | Website badge (Food / Kosher / GMO) | Catalogue (Food / Kosher / GMO) | Certificate listings |
|---|---|---|---|
| Altanol | ✓ ✓ ✗ | ✗ ✗ ✗ | — |
| Anethole (Synthetic) | broken image (../images/pet-icon1.png) | ✓ ✓ ✗ | kosher: Anethole; halal: Anethole |
| Arednitryl | – – ✗ | ✗ ✗ ✗ | — |
| Caprifloren | broken image (../images/pet-icon1.png) | ✗ ✗ ✗ | — |
| Celerytone | broken image (../images/only-gmo.png) | ✓ ✓ ✗ | kosher: Celery Ketone; halal: Celery Ketone (Celerytone) |
| Chavibetol 50% | ✓ ✓ ✗ | ✓ ✗ ✗ | kosher: Chavibetol; halal: Chavibetol |
| Chavicol | ✓ ✓ ✗ | ✓ ✗ ✗ | halal: Chavicol |
| Chavicyl Acetate | – – ✗ | ✓ ✗ ✗ | — |
| Creamy Lactone 10% | none shown | ✗ ✗ ✗ | — |
| Ethyl Isocaproate | none shown | ✗ ✗ ✗ | — |
| Fadeus | ✓ – ✗ | ✗ – ✗ | — |
| Gardeniamide | ✓ ✓ ✗ | ✗ ✗ ✗ | — |
| Grecazine | ✓ ✓ ✗ | ✗ ✗ ✗ | kosher: 2-Propenyl Para Cymene (probable: matches Grecazine chemical name) |
| Gulabow | none shown | ✓ ✓ ✗ | — |
| Hyacinth Core | none shown | ✗ ✓ ✗ | — |
| Isocaproic Acid | none shown | ✓ ✓ ✗ | — |
| Jalclone | none shown | – – ✗ | — |
| Laval | ✓ ✓ ✗ | ✓ ✓ ✗ | kosher: 2-Isopropyl-5-Methyl-Hexenal (probable: same chemical as Laval, CAS 35158-25-9); halal: Methyl Isopropy Hexenal (Laval) |
| Megavanil | ✓ ✓ ✗ | ✗ ✗ ✗ | — |
| Methyl-3-Nonenoate | ✓ ✓ ✗ | ✓ ✓ ✗ | kosher: Methyl-3-Nonenoate; halal: Methyl - 3 - Nonenoate |
| Muscomme W | none shown | ✗ ✓ ✗ | — |
| Narangama | none shown | ✗ ✗ ✗ | — |
| Neroli Ketone | ✓ ✓ ✗ | ✗ ✗ ✗ | — |
| Palsantol | none shown | ✗ ✗ ✗ | — |
| Para Propyl Phenol | ✓ ✓ ✗ | ✓ ✓ ✗ | kosher: Para Propylphenol |
| Phenyl Ethyl Propionate | ✓ ✓ ✗ | ✓ ✓ ✗ | kosher: Phenyl Ethyl Propionate; halal: Phenyl Ethyl Propionate |
| Rhumytal | ✓ ✓ ✗ | ✗ ✗ ✗ | — |
| Val Acetate | none shown | ✗ ✗ ✗ | — |
| Valakon | none shown | ✗ ✗ ✗ | — |
| Vanilathon | ✓ ✓ ✗ | ✓ ✓ ✗ | halal: Methyl Guaiacol (Vanilathon) |
| Whiskey 91 | – – ✗ | – – ✗ | halal: Methyl Octalactone (probable: Whiskey 91 is whiskey lactone, 5-butyl-4-methyloxolan-2-one) |

### Technical data
- **Invalid CAS check digits**: Caprifloren `67663-01-08` and Prosethyl `64988-06-03` (in both sources) aren't valid CAS numbers — the last segment must be one digit. Not corrected.
- **Nutclone One**: the website's CAS field contains the formula `C7H10O`; the catalogue gives CAS `1193-18-6`.
- **Chavibetol 50%**: website formula `- C10H1202` (zeros instead of letter O); catalogue `C10H12O2`.
- **Tenacity**: the website has "&gt;" on several values that the catalogue drops (Anethole, Caprifloren, Chavicyl Acetate, Gardeniamide, Hyacinth Acetal). The website also renders every tenacity as e.g. "18 HOURS HOURS" (duplicated unit) and shows none for Fadeus (catalogue: 24 HOURS).
- **Hyacinth Acetal**: different chemical name (website `2-(phenylmethyl)-1,3-dioxan-5-ol`; catalogue `Phenylacetaldehyde Glycerylacetal`) and a completely different description.
- **Gardeniamide**: FEMA 3241 appears on the website only.
- **Anethole**: catalogue title "Anethole (Synthetic)"; the website alias is "Anethole 21/22" (meaning of 21/22 not stated). The catalogue chemical name has a typo ("1-mthoxy").
- **Names**: "Creamy Lactone" (website) vs "Creamy Lactone 10%" (catalogue); "Orrisnitrile" vs "Orrisnitril" (catalogue product page; its contents page says Orrisnitrile).
- **The catalogue contradicts itself** (contents page vs product page alias): Muscomme W "Eddenolide" vs "Edenolide"; Val Acetate "Vetikyl Acetate" vs "Vetikolacetate"; Valakon "Vetikol" vs "Vetikon"; White Tuberose "Methyle Tuberate" vs "Methyl Tuberate"; Ethyl Isocaproate "Ethyle Isocaproate" vs no alias. products.json uses the product-page alias (which matches the website).

| Product | Field | Website | Catalogue (Apr 2025) | Used in products.json |
|---|---|---|---|---|
| Anethole (Synthetic) | name | Anethole | Anethole (Synthetic) | Anethole (Synthetic) |
| Anethole (Synthetic) | alsoKnownAs | Anethole 21/22 | Anethole | Anethole 21/22 |
| Anethole (Synthetic) | chemicalName | 1-methoxy-4-[(1Z)-prop-1-en-1-yl]benzene | 1-mthoxy-4-[(1Z)-prop-1-en-1-yl] benzene | 1-methoxy-4-[(1Z)-prop-1-en-1-yl]benzene |
| Anethole (Synthetic) | tenacity | >24 | 24 HOURS | 24 HOURS |
| Caprifloren | tenacity | >180 | 180 HOURS | 180 HOURS |
| Chavibetol 50% | formula | - C10H1202 | C10H12O2 | C10H12O2 |
| Chavicyl Acetate | tenacity | >24 | 24 HOURS | 24 HOURS |
| Creamy Lactone 10% | name | Creamy Lactone | Creamy Lactone 10% | Creamy Lactone 10% |
| Fadeus | tenacity | — | 24 HOURS | 24 HOURS |
| Gardeniamide | chemicalName | N,2-Dimethyl-Nphenylbutyramide | N,2-Dimethyl-N-phenylbutyramide | N,2-Dimethyl-N-phenylbutyramide |
| Gardeniamide | fema | 3241 | — | 3241 |
| Gardeniamide | tenacity | >72 | 72 HOURS | 72 HOURS |
| Hyacinth Acetal | chemicalName | 2-(phenylmethyl)-1,3-dioxan-5-ol | Phenylacetaldehyde Glycerylacetal | Phenylacetaldehyde Glycerylacetal |
| Hyacinth Acetal | tenacity | >48 | 48 HOURS | 48 HOURS |
| Nutclone One | cas | C7H10O | 1193-18-6 | 1193-18-6 |
| Orrisnitrile | name | Orrisnitrile | Orrisnitril | Orrisnitrile |
| Palsantol | chemicalName | beta,2,2,3-tetramethyldelta-methylene-3-cyclopentene-1-butanol | beta,2,2,3-tetramethyl-delta-methylene-3-cyclopentene-1-butanol | beta,2,2,3-tetramethyl-delta-methylene-3-cyclopentene-1-butanol |

### Company facts
- **Group age**: website "a 40 years old business group"; catalogue "roots in the early 1970s" (50+ years).
- **Headquarters**: the video says the Banwari Group is "headquartered in New Delhi"; the website labels the Bhiwadi address "Head Office".
- **Para Propyl Phenol**: description says the odour is "undesirably sweet, clove-like and somewhat smoky", while the video calls it "leathery, smoky, perfect for oud fragrances". Not contradictory, but the website should pick one voice.
- **Feature video is AI-presented with stock footage.** It is the only video asset, and it contains no real imagery of how Petorose makes its products. Real facility photos/footage are the biggest gap for credibility.
- **Location wording**: "family-owned and operated Banwari Group based in New Delhi" (website sentence is ungrammatical — the catalogue says "is a part of the … Banwari Group"). Manufacturing and the head office are in Bhiwadi, Rajasthan.
- **Address variants**: certificates add "Phase-1"/"Phase I" and "Distt. Alwar". The website and catalogue omit them.
- **Group companies**: the catalogue shows Banwari, **Sampe** and Petorose Alcones. The website mentions only Banwari Group. There is no information on Sampe beyond its logo.
- **Claims to keep verbatim** (unverified marketing claims): "India's first manufacturer of purest Anethole", "Having pioneered the mint industry", "makes us the leader in the field of Aroma Chemicals".
- **Copyright** "©2019-2024" is stale.

### Site defects worth not carrying over
- Every non-product page has the `<title>` "Anethole | Petorose Alcones Pvt Ltd" (pre-render bug). Product meta descriptions read "…is a leading manufacturer and exporter of alcone products in India".
- The home "New Products" card for Isocaproic Acid uses alt text "Fadeus".
- Footer links to `/about.html` and `/contact.html` render empty pages. Redirect them in the new site.
- The 56 SEO URLs (`/product/anethole-supplier-uk`, `/product/comprar-anetol-brasil`, …) all show the same Anethole page under localised titles (EN, PT, DE, PL, FR, ES, IT, SK; the Belgium/Netherlands/Thailand/South Africa pages are in English). Decide whether to redirect them to `/products/anethole` (301) or keep them. They may carry search traffic. **Their copy contradicts the catalogue**: titles and keywords say "Natural Flavoring", "natural Anethole", "natural sweetener", while the catalogue calls the product "Anethole (Synthetic)".
- The homepage event banner advertises **XXVI FAFAI International Convention & Expo 2025, 5–7 March 2025, Stall S8**, which is a past event.
- Forms posted to `https://www.petorosealcones.com/api/v1/{contact,product,whatsapp}`. They will be replaced in Phase 3.

### Typos in website product copy
The catalogue version (used in products.json) corrects these: "methyl chavical", "balsimic", "add more flavour", "betelplant", "odor profil", "thedirection", "LOVAL", "Magavanil", "undrtones", "ha fruity", "vanila … balsamin". Every website/catalogue wording difference is listed below. Some are substantive (Hyacinth Acetal, Creamy Lactone, Isocaproic Acid).

<details><summary>All 23 description differences</summary>

- **Altanol**
  - Website: “Altanol is a great substitute for basil oil, tarragon oil, methyl chavical and even safrole. It has a sweet and spicy note of estragole and is anisic in essence, with a liquorice character and a touch of saffron and myrtle.”
  - Catalogue: “Altanol is a great substitute for basil oil, tarragon oil, methyl chavicol, and even safrole. It has a sweet and spicy note of estragole and is anisic in essence, with a liquorice character and a touch of saffron and myrtle.”
- **Anethole (Synthetic)**
  - Website: “Being the chief component of star anise, anise seed oil and sweet fennel, Anethole has a sweet and mildly spicy, floral and fruity,anisic-balsimic odour.”
  - Catalogue: “Being the chief component of star anise, anise seed oil and sweet fennel, Anethole has a sweet and mildly spicy, floral and fruity, anisic-balsamic odour.”
- **Caprifloren**
  - Website: “With an excellent diffusivity, this green floral, lactonic component with aroma notes of peach and coconut, add more flavour to white flower compositions.”
  - Catalogue: “With an excellent diffusivity, this green floral, lactonic component with aroma notes of peach and coconut, adds more flavour to white flower compositions.”
- **Chavibetol 50%**
  - Website: “Chavibetol is the primary component of essential oil from the leaves of the betelplant. It is an aromatic compound with a spicy note.”
  - Catalogue: “Chavibetol is the primary component of essential oil from the leaves of the betel plant. It is an aromatic compound with a spicy note.”
- **Chavicyl Acetate**
  - Website: “Another core component of betel, chavicyl acetate has a strong and spicy odor profil, similar to chavicol and chavibetol.”
  - Catalogue: “Another core component of betel, chavicyl acetate has a strong and spicy odor profile, similar to chavicol and chavibetol.”
- **Creamy Lactone 10%**
  - Website: “A very powerful and effective spiro lactone, enhancing white flower notes like jasmine and tuberose, and fruity notes like peach and osmanthus. It adds milkiness to sandalwood accords and works well with tonka.”
  - Catalogue: “A very powerful and effective spiro lactone, wherever creamy or fruity core is required. It enhances white flower notes like jasmine and tuberose and fruity notes like peach and osmanthus. It adds milkiness to sandalwood accords and works very well with tonka.”
- **Gardeniamide**
  - Website: “With a grapefruit citrus heartnote and rhubarb, Gardeniamide works well with other green citrus notes, adding a long lasting citrus effect.”
  - Catalogue: “With a grapefruit citrus heartnote and rhubarb, Gardeniamide works well with other green citrus notes, adding a long-lasting citrus effect.”
- **Hijacynth**
  - Website: “A powerful floral note in thedirection of Jasmine and Hyacinth, animalic as well in character.”
  - Catalogue: “A powerful floral note in the direction of Jasmine and Hyacinth, animalic as well in character.”
- **Hyacinth Acetal**
  - Website: “Common notes of floral green, honey, rose and tea, the odour of Hyacinth Acetal is dry and leafy, while the flavour is aromatically herbal.”
  - Catalogue: “Hyacinth Acetal has dried nuances of roses, honey, lilac, black tea and of course hyacinth, best used in floral compounds demanding soft but very long lasting heart. It shows the character of green accords with chypre compositions.”
- **Hyacinth Core**
  - Website: “Defined by notes of hyacinth florals and sweet pea, Hyacinth Core can be used with fruity, green, and violet leaf notes.”
  - Catalogue: “Defined by notes of hyacinth florals, and sweet pea, Hyacinth Core can be used with fruity, green and violet leaf notes.”
- **Isocaproic Acid**
  - Website: “A saturated fatty acid with a pungent odor found naturally in various sources like cheese, milk, and sweat. The odor is sour, penetrating, and unpleasant, similar to rancid butter.”
  - Catalogue: “Isocaproic Acid is a saturated fatty acid with a pungent odor found naturally in various sources like cheese, milk and sweat. The odor can be described as sour and penetrating, with unpleasant character similar to that of rancid butter.”
- **Laval**
  - Website: “A powerful, diffusing herbaceous odour, LOVAL has lavender and cocoa powder overtones. It blends well with bergamot and clary sage, imparting dry woody notes for blueberry,cranberry and chocolate.”
  - Catalogue: “A powerful, diffusing herbaceous odour. LAVAL has lavender and cocoa powder overtones. It blends well with bergamot and clary sage, imparting dry woody notes for blueberry, cranberry and chocolate.”
- **Megavanil**
  - Website: “Magavanil is a strong vanilla absolute note, that mixes well with vanillin and ethyl vanillin. Unlike other vanilla notes, it doesn't discolor much.”
  - Catalogue: “Megavanil is a strong vanilla absolute note, that mixes well with vanillin and ethyl vanillin. Unlike other vanilla notes, it doesn't discolor much.”
- **Methyl-3-Nonenoate**
  - Website: “An intense fresh, fruity, green odor with cucumber undrtones, with a varying tropical taste resembling melons and apples.”
  - Catalogue: “An intense fresh, fruity, green odor with cucumber undertones, with a varying tropical taste resembling melons and apples.”
- **Muscomme W**
  - Website: “White Musk with powdery, creamy notes and fresh fruity undertones.”
  - Catalogue: “White Musk with powdery, creamy notes; and fresh fruity undertones.”
- **Narangama**
  - Website: “A complete set of fresh-citrusy notes of Orange, Bergamot, and Grapefruit, underlined with Neroli. Narangama possesses hints of florals subtly.”
  - Catalogue: “A complete set of fresh-citrusy notes of Orange, Bergamot and Grapefruit, underlined with Neroli, Narangama possesses hints of florals subtly.”
- **Newfoleon**
  - Website: “NewFoleon is designed for perfect blending with floral notes, imparting the greeny sense of freshness. It is stable, while diffusing comfortably”
  - Catalogue: “NewFoleon is designed for perfect blending with floral notes, imparting the greeny sense of freshness. It is stable, while diffusing comfortably.”
- **Orrisnitrile**
  - Website: “Strengthens orris and violet flower notes, with green fatty floral tones”
  - Catalogue: “Strengthens orris and violet flower notes, with green fatty floral tones.”
- **Para Propyl Phenol**
  - Website: “A medicinal phenolic odor that is undesirably sweet, clove-like and somewhat smoky”
  - Catalogue: “A medicinal phenolic odor that is undesirably sweet, clove-like and somewhat smoky.”
- **Phenyl Ethyl Propionate**
  - Website: “Like other phenolics, Phenyl Ethyl Propionate ha fruity, honeyed and slightly spicy odour.”
  - Catalogue: “Like other phenolics, Phenyl Ethyl Propionate has fruity, honeyed and slightly spicy odour.”
- **Val Acetate**
  - Website: “This intensifies the spicy-green aspects while enhancing the bitterness of grapefruit, underlining Vetiver. The overall odor with Vetiver is beautifully composed with Rhubarb, Grapefruit, and Green Peppers.”
  - Catalogue: “This intensifies the spicy-green aspects, while enhancing the bitterness of grapefruit, underlining Vetiver. The overall odour with Vetiver is beautifully composed with Rhubarb, Grapefruit, and Green Peppers.”
- **Valakon**
  - Website: “With a vetiver-like floral profile, Valakon pulls Vetiver oil to the top notes and enhances the fruitiness of gardenia flowers. It also adds a fresh and woody touch to the composition.”
  - Catalogue: “With a vetiver like floral profile, Valakon pulls Vetiver oil to the top notes and enhances the fruitiness of gardenia flowers. It also adds a fresh and woody touch to the composition.”
- **Vanilathon**
  - Website: “A modifier in floral, leathery and animalic compositions, Vanilathon is a spicy vanila note with leather like hints and balsamin undertone.”
  - Catalogue: “A modifier in floral, leathery and animalic compositions, Vanilathon is a spicy vanilla note with leather-like hints and balsamic undertone.”
</details>

## 4. Assets (`public/assets/`)

| Folder | Contents |
|---|---|
| `img/site/` | 39 product photos, 29 structure diagrams (6 of them were inlined in the bundle, saved as `inline-module-*.png`), logo mark (`petroselogo.jpg`), wordmark (`typefacee.png`), footer lockup (`mono.jpg`), hero (`banner.png`), product banner, FAFAI event banner |
| `img/cloudinary/` | 3 compliance-badge images and 10 structure diagrams that the old site loaded from Cloudinary |
| `img/third-party-about/` | 2 of 3 hotlinked About-page stock photos (mygardenlife.com, perfumersapprentice.com). **Probably not licensed for reuse — don't use them on the new site.** The 3rd (IndiaMART `5.imimg.com`) refused download (HTTP 444). |
| `certificates/` | 6 certificate PDFs |
| `docs/productcatalogueweb.pdf` | Catalogue, April 2025 (3.5 MB) |
| `video/petorose-alcones-feature-video.mp4` | Feature video, 2:08, 1920×1080, **22 MB**. Needs compressing and captions. No transcript exists. |
| `fonts/poppins-regular.ttf` | Old site font (Poppins, OFL) |
| `site-meta/` | favicon.ico, logo192.png, logo512.png, manifest.json |

Not downloaded: the Flag of India image (Wikimedia returned HTTP 400; it's trivial to recreate) and the Heyzine flip-book (an external embed: https://heyzine.com/flip-book/e08acd5c76.html). No vector/SVG logo exists anywhere. Group-company logos (Banwari, Sampe) and certification logos exist only inside the catalogue PDF. URL → file mapping: `content/source/asset-manifest.json`.

## 5. Open questions / TODOs for Petorose Alcones

1. Current, unexpired certificates (FDA, Kosher, Halal, ISO 9001, ISO 22000, ISO 14001) and the FSSAI licence number.
2. Per-product Food Grade / Kosher / GMO status — the website and catalogue disagree (§3). What does "GMO ✗" mean?
3. Correct CAS numbers for Caprifloren and Prosethyl; tenacity "&gt;" values; Hyacinth Acetal description and chemical name; Gardeniamide FEMA.
4. Should the ~45 additional products named on the Kosher/Halal certificates (menthol, mint oils, eugenol, limonene, etc., in `content/certified-products.json`) be listed on the new site? There are no specs for them.
5. Applications, purity/grade, packaging and MOQ per product. Only the video hints at applications, for 2 products (Chavibetol: betel fragrances and flavours; Para Propyl Phenol: oud fragrances).
6. WhatsApp number for the WhatsApp button (none is published).
7. Map pin or coordinates for the Bhiwadi facility.
8. Group age (40 years vs since the early 1970s), and whether to present Sampe as a group company.
9. Vector logo (SVG), plus licensed imagery to replace the third-party About photos.
10. What to do with the 56 Anethole SEO landing URLs (redirect vs keep).
11. **Real photos of how products are made**: plant exterior, production floor, R&D lab, QC lab, people at work, finished product. Plus a short description of the process and quality checks (and which documents ship with an order, e.g. COA/TDS). None of this exists in any source.
12. LinkedIn URL (the video mentions LinkedIn; no link exists anywhere).

## 6. Reproducing

```
cd scripts/legacy-extract   # run in a scratch dir that has playwright-core, acorn, acorn-walk, pdfplumber, pillow
node crawl.mjs              # render pages → pages/*.txt|html, screenshots
node extract-bundle.mjs     # parse main.js → bundle-arrays.json (+ inline images)
node download-assets.mjs <repo>   # → public/assets + asset-manifest.json
python parse_pdf.py         # catalogue → pdf-products.json (badge matrix is hand-read; see BADGES)
node merge.mjs <repo>       # → content/products.json, content/seo-landing-pages.json, discrepancies.json
```
