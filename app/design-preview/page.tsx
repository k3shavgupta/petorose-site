import type { Metadata } from "next";
import { Palette, type Swatch } from "@/components/design-preview/Palette";
import { LabDirection } from "@/components/design-preview/LabDirection";
import { NoirDirection } from "@/components/design-preview/NoirDirection";
import { company, products, toSummary } from "@/lib/content";
import { fraunces, grotesk, jbmono } from "./fonts";

export const metadata: Metadata = {
  title: "Design preview",
  robots: { index: false, follow: false },
};

const NOIR: Swatch[] = [
  { name: "Night", hex: "#120e24", role: "Page background", surface: true },
  { name: "Aubergine", hex: "#1d1636", role: "Cards, panels", surface: true },
  { name: "Mist", hex: "#efebff", role: "Body text" },
  { name: "Lavender", hex: "#b9b2dd", role: "Secondary text" },
  { name: "Periwinkle", hex: "#8b8dff", role: "Brand (logo blue, lifted for dark)" },
  { name: "Orchid", hex: "#e384ea", role: "Brand (logo pink), labels" },
  { name: "Saffron", hex: "#ffb648", role: "Calls to action" },
];

const LAB: Swatch[] = [
  { name: "Paper", hex: "#faf8f4", role: "Page background", surface: true },
  { name: "Ink", hex: "#16152a", role: "Text, outlines, primary button" },
  { name: "Indigo", hex: "#4845e4", role: "Brand (logo blue), links" },
  { name: "Orchid", hex: "#a832ba", role: "Brand (logo pink)" },
  { name: "Tangerine", hex: "#ff6b2c", role: "Accent fill only" },
  { name: "Lime", hex: "#2fb36b", role: "Accent fill only" },
  { name: "Lemon", hex: "#ffd23f", role: "Highlight fill only" },
];

const summaries = products.map(toSummary);
const home = company.homepage;

export default function DesignPreviewPage() {
  return (
    <div className={`${fraunces.variable} ${grotesk.variable} ${jbmono.variable} bg-neutral-100 text-neutral-900`}>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Phase 2 · Design direction</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Two directions for petorosealcones.com</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          Both use the colours of the existing rose-hexagon logo, real copy and all {products.length} products from{" "}
          <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-sm">content/products.json</code>. The search and product
          card are live: type a name, a CAS number or a note such as &ldquo;vanilla&rdquo;, pick a result, and the card updates. That is
          the planned two-click path to an enquiry: search → product → request quote.
        </p>
        <nav aria-label="Directions" className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          <a href="#direction-a" className="rounded-full bg-[#120e24] px-4 py-2 text-white hover:bg-[#2a2150]">
            A · Rose Noir
          </a>
          <a href="#direction-b" className="rounded-full border-2 border-[#16152a] bg-white px-4 py-2 hover:bg-[#ffd23f]">
            B · Spectrum Lab
          </a>
          <a href="#compare" className="rounded-full px-4 py-2 text-neutral-600 underline underline-offset-4 hover:text-neutral-900">
            Compare
          </a>
        </nav>
      </header>

      <main>
        {/* Direction A */}
        <section id="direction-a" aria-labelledby="a-title" className="scroll-mt-4 bg-[#0b0818] py-16 text-noir-text">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-noir-orchid">Direction A</p>
            <h2 id="a-title" className="mt-2 font-noir-display text-4xl sm:text-5xl">
              Rose Noir
            </h2>
            <p className="mt-3 max-w-2xl text-noir-muted">
              Evening-perfumery mood: deep night background, jewel-bright brand colours, a soft high-contrast serif and slow drifting
              colour fields. Feels like a fine-fragrance house while keeping technical data crisp.
            </p>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-noir-muted">Palette</h3>
            <div className="mt-4">
              <Palette swatches={NOIR} background="#120e24" dark />
            </div>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-noir-muted">Type</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-noir-muted">Display · Fraunces (soft serif)</p>
                <p className="mt-2 font-noir-display text-5xl font-light italic">Aromas</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-noir-muted">Body · Inter</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Specialty aroma chemicals designed in the lab to imitate their naturally occurring counterparts.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-noir-muted">Data · system mono</p>
                <p className="mt-2 font-mono text-sm">CAS 13481-87-3 · FEMA 3710</p>
              </div>
            </div>

            <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-noir-muted">Hero + product card</h3>
            <NoirDirection
              products={summaries}
              initialSlug={home.featuredProducts[0]}
              heroSlugs={home.featuredProducts}
              quickPicks={home.newProducts}
              catalogueFile={company.catalogue.file}
            />
          </div>
        </section>

        {/* Direction B */}
        <section id="direction-b" aria-labelledby="b-title" className="scroll-mt-4 bg-[#f1eee7] py-16 text-lab-ink">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="font-lab-mono text-xs uppercase tracking-[0.2em] text-lab-indigo">Direction B</p>
            <h2 id="b-title" className="mt-2 font-lab-display text-4xl font-bold tracking-tight sm:text-5xl">
              Spectrum Lab
            </h2>
            <p className="mt-3 max-w-2xl text-lab-muted">
              Bright, precise and graphic: warm paper, ink outlines, the logo&rsquo;s hexagon as a spinning colour wheel and a full
              spectrum of accents. Leans into chemistry and data, so CAS numbers and specs feel at home.
            </p>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-lab-muted">Palette</h3>
            <div className="mt-4">
              <Palette swatches={LAB} background="#faf8f4" />
            </div>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-lab-muted">Type</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border-2 border-lab-ink bg-white p-5">
                <p className="font-lab-mono text-xs text-lab-muted">Display · Space Grotesk</p>
                <p className="mt-2 font-lab-display text-5xl font-bold tracking-tight">Aromas</p>
              </div>
              <div className="rounded-2xl border-2 border-lab-ink bg-white p-5">
                <p className="font-lab-mono text-xs text-lab-muted">Body · Inter</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Specialty aroma chemicals designed in the lab to imitate their naturally occurring counterparts.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-lab-ink bg-white p-5">
                <p className="font-lab-mono text-xs text-lab-muted">Data · JetBrains Mono</p>
                <p className="mt-2 font-lab-mono text-sm">CAS 13481-87-3 · FEMA 3710</p>
              </div>
            </div>

            <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-lab-muted">Hero + product card</h3>
            <LabDirection
              products={summaries}
              initialSlug={home.featuredProducts[0]}
              heroSlug={home.featuredProducts[0]}
              quickPicks={home.newProducts}
              catalogueFile={company.catalogue.file}
              facts={[
                { value: `${products.length} aroma chemicals`, label: "In the catalogue" },
                { value: "Bhiwadi, Rajasthan", label: "~1 hr from Delhi airport" },
                { value: "Banwari Group", label: "Part of" },
              ]}
            />
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-title" className="mx-auto max-w-6xl scroll-mt-4 px-5 py-16 sm:px-8">
          <h2 id="compare-title" className="text-3xl font-semibold tracking-tight">
            Compare
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b border-neutral-300 text-neutral-500">
                <tr>
                  <th scope="col" className="py-2 pr-4 font-medium" />
                  <th scope="col" className="py-2 pr-4 font-medium">
                    A · Rose Noir
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    B · Spectrum Lab
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 align-top">
                {[
                  ["Mood", "Luxurious, perfumery, evening", "Bright, scientific, energetic"],
                  ["Strongest for", "Fine-fragrance buyers, brand perception", "Procurement and R&D scanning specs fast"],
                  ["Product photos", "Hero of the page; dark frames flatter them", "Supporting role; outlines and colour carry it"],
                  ["Long spec tables", "Good, but dark tables are tiring at length", "Excellent, mono data on paper"],
                  ["Printing / PDFs", "Needs a light print stylesheet", "Prints as-is"],
                  ["Risk", "Dark sites can feel heavy on mobile in daylight", "Can feel playful if accents are overused"],
                ].map(([k, a, b]) => (
                  <tr key={k}>
                    <th scope="row" className="py-3 pr-4 font-medium">
                      {k}
                    </th>
                    <td className="py-3 pr-4 text-neutral-700">{a}</td>
                    <td className="py-3 text-neutral-700">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 max-w-2xl text-neutral-600">
            Reply with <strong>A</strong> or <strong>B</strong>, or mix them (for example B&rsquo;s layout with A&rsquo;s serif headings).
            Both share the same structure, search and enquiry flow, so only the visual layer changes.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-neutral-500">
            Not shown yet by design: Kosher, Halal and food-grade marks, which stay hidden until Petorose confirms them, and the
            certifications strip, which needs current certificates. See <code>content/INVENTORY.md</code>.
          </p>
        </section>
      </main>
    </div>
  );
}
