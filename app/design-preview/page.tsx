import type { Metadata } from "next";
import { CredibilitySections } from "@/components/design-preview/CredibilitySections";
import { NoirDirection } from "@/components/design-preview/NoirDirection";
import { Palette, type Swatch } from "@/components/design-preview/Palette";
import { ProductGridSample } from "@/components/design-preview/ProductGridSample";
import { asset } from "@/lib/base-path";
import { company, products, toSummary } from "@/lib/content";
import { fraunces } from "./fonts";

export const metadata: Metadata = {
  title: "Design preview",
  robots: { index: false, follow: false },
};

const DARK: Swatch[] = [
  { name: "Night", hex: "#120e24", role: "Hero, nav, footer", surface: true },
  { name: "Aubergine", hex: "#1d1636", role: "Dark cards, panels", surface: true },
  { name: "Mist", hex: "#efebff", role: "Text on dark" },
  { name: "Lavender", hex: "#b9b2dd", role: "Secondary text on dark" },
  { name: "Periwinkle", hex: "#8b8dff", role: "Logo blue, lifted for dark" },
  { name: "Orchid", hex: "#e384ea", role: "Logo pink, labels" },
  { name: "Saffron", hex: "#ffb648", role: "Calls to action only" },
];

const summaries = products.map(toSummary);
const home = company.homepage;
const gridSlugs = [...home.newProducts, ...home.featuredProducts, "anethole", "white-tuberose"];

export default function DesignPreviewPage() {
  return (
    <div className={`${fraunces.variable} min-h-dvh bg-noir-bg font-noir-body text-noir-text`}>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Phase 2 · Chosen direction</p>
        <h1 className="mt-3 font-noir-display text-4xl sm:text-6xl">Rose Noir, refined for credibility</h1>
        <div className="mt-4 max-w-2xl space-y-3 text-lg text-noir-muted">
          <p>
            One purple theme throughout: the two colours of the rose-hexagon logo on deep night purple, with saffron reserved for
            buttons that start an enquiry.
          </p>
          <p>
            For credibility, buyers see what Petorose makes and how: heritage, the Bhiwadi facility, the process, certifications and the
            feature video. Every line is sourced from the old site, catalogue or video. Dashed frames mark the real photos still needed.
          </p>
        </div>
        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          {[
            ["#look", "Palette & type"],
            ["#hero", "Hero + product"],
            ["#credibility", "How we make it"],
            ["#products", "Product list"],
            ["#needed", "What we need"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-white/15 px-4 py-2 text-noir-text hover:border-noir-orchid hover:bg-white/5">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="look" aria-labelledby="look-title" className="scroll-mt-4 bg-[#0b0818] py-16 text-noir-text">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 id="look-title" className="font-noir-display text-4xl">
              Palette &amp; type
            </h2>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-noir-muted">Colours</h3>
            <div className="mt-4">
              <Palette swatches={DARK} background="#120e24" dark />
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-noir-muted">Type</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-noir-muted">Headings · Fraunces (soft serif)</p>
                <p className="mt-2 font-noir-display text-5xl font-light italic">Aromas</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-noir-muted">Body · Inter</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Specialty aroma chemicals designed in the lab to imitate their naturally occurring counterparts.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-noir-muted">Technical data · system mono</p>
                <p className="mt-2 font-mono text-sm">CAS 13481-87-3 · FEMA 3710</p>
              </div>
            </div>
          </div>
        </section>

        <section id="hero" aria-labelledby="hero-title" className="scroll-mt-4 bg-[#0b0818] pb-16 text-noir-text">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 id="hero-title" className="mb-6 font-noir-display text-4xl">
              Hero + product card
            </h2>
            <NoirDirection
              products={summaries}
              initialSlug={home.featuredProducts[0]}
              heroSlugs={home.featuredProducts}
              quickPicks={home.newProducts}
              catalogueFile={asset(company.catalogue.file)}
            />
          </div>
        </section>

        <section id="credibility" aria-labelledby="cred-title" className="scroll-mt-4 bg-noir-bg py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 id="cred-title" className="sr-only">
              Credibility sections
            </h2>
            <CredibilitySections
              video={{
                file: company.featureVideo.file,
                poster: "/assets/img/video/feature-video-poster.jpg",
                duration: company.featureVideo.duration,
                captions: company.featureVideo.captions,
              }}
            />
          </div>
        </section>

        <section id="products" aria-labelledby="products-title" className="scroll-mt-4 bg-[#0b0818] py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 id="products-title" className="sr-only">
              Product list
            </h2>
            <ProductGridSample products={gridSlugs.map((s) => summaries.find((p) => p.slug === s)!)} total={products.length} />
          </div>
        </section>

        <section id="needed" aria-labelledby="needed-title" className="mx-auto max-w-6xl scroll-mt-4 px-5 py-16 sm:px-8">
          <h2 id="needed-title" className="font-noir-display text-3xl sm:text-4xl">
            What Petorose needs to supply for full credibility
          </h2>
          <ul className="mt-6 grid gap-3 text-noir-muted sm:grid-cols-2">
            {[
              "Real photos: plant exterior, production floor, R&D lab, QC lab, people at work, finished product",
              "A short description of how products are made and tested (process steps, QC checks, documents provided such as COA or TDS)",
              "Current certificates: ISO 9001, ISO 22000, ISO 14001, Kosher, Halal, FDA registration, plus the FSSAI licence number",
              "Confirmed Kosher / Halal / food-grade status per product (the old site and catalogue disagree)",
              "Optional: capacity, export markets, packaging options and minimum order quantities",
              "Optional: real facility footage. The current video uses an AI presenter and stock clips, which many B2B buyers read as less credible than a short plant walkthrough",
            ].map((t) => (
              <li key={t} className="rounded-2xl border border-white/10 bg-noir-surface p-4 text-sm leading-relaxed">
                {t}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
