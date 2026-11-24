import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CertificateCards } from "@/components/site/Certifications";
import { LazyVideo } from "@/components/site/LazyVideo";
import { EnquiryCta, HowWeMakeIt, ProofStrip } from "@/components/site/Sections";
import { brandPhoto, company, getProduct, mapsHref, productPhoto, products } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const description =
  "Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, is part of the family-owned Banwari Group and manufactures specialty aroma chemicals in Bhiwadi, Rajasthan. ISO 9001, ISO 22000, ISO 14001, Kosher and Halal certified.";

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: { canonical: absoluteUrl("/about/") },
  openGraph: { title: "About us | Petorose Alcones", description, url: absoluteUrl("/about/") },
};

// Milestones are taken from the old website and the April 2025 catalogue; only the 1970s date is stated in the sources.
const MILESTONES = [
  {
    when: "Early 1970s",
    title: "Pioneering India’s mint industry",
    body: "The Banwari Group’s experienced management has its roots in the early 1970s, pioneering the mint industry in India.",
  },
  {
    when: "Banwari Chemicals",
    title: "Into specialty aroma chemicals",
    body: "The group forayed into specialty aroma chemicals with one mission: Innovating Aromas. Banwari Chemicals Pvt Ltd is today Petorose Alcones Pvt Ltd.",
  },
  {
    when: "A first for India",
    title: "Purest Anethole",
    body: "Petorose Alcones became India’s first manufacturer of purest Anethole, and with it took on the responsibility to build better.",
  },
  {
    when: "Today",
    title: `${products.length} specialty aroma chemicals`,
    body: "Single molecules made accessible to a wide network of perfumers, flavourists, manufacturers and innovators, with ‘Make in India’ at our core.",
  },
];

const VALUES = [
  {
    title: "Innovation",
    body: "Because innovation is the only way forward. Our scientists and researchers create products out of the ordinary, so that you can enhance your fragrances and flavours.",
  },
  { title: "Trust", body: "We believe our actions make us who we are, and that we are no more than the trust our clients have in us." },
  {
    title: "Make in India",
    body: "Our goal is to become India’s most trusted manufacturer of specialty aroma chemicals and ingredients, made in India for the world.",
  },
];

export default function AboutPage() {
  const photo = brandPhoto("oils-glassware") ?? brandPhoto("hero-bloom");
  const collage = ["anethole", "megavanil", "white-tuberose"].map((s) => productPhoto(getProduct(s)!));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 -top-40 size-[28rem] rounded-full bg-noir-periwinkle/25 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-noir-orchid/20 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">About Petorose Alcones</p>
            <h1 className="mt-3 font-noir-display text-5xl font-light leading-[1.02] sm:text-6xl">
              Because innovation is the <em className="text-noir-orchid">only way forward</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-noir-muted">
              Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, is part of the family-owned and operated Banwari Group based in New
              Delhi, India. We specialize in manufacturing aroma chemicals and aroma ingredients in Bhiwadi, Rajasthan.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2 text-sm">
              {["Part of the Banwari Group", "Formerly Banwari Chemicals", "Bhiwadi, Rajasthan"].map((t) => (
                <li key={t} className="rounded-full border border-white/15 px-3.5 py-1.5 text-noir-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {photo ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border border-white/10 lg:aspect-[4/4.6]">
              <Image src={photo.file} alt={photo.subject ?? ""} fill preload sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          ) : (
            <div aria-hidden className="grid grid-cols-3 gap-3">
              {collage.map((src, i) => (
                <div key={src} className={`relative aspect-[3/5] overflow-hidden rounded-t-full rounded-b-3xl border border-white/10 ${i === 1 ? "translate-y-8" : ""}`}>
                  <Image src={src} alt="" fill preload={i === 0} sizes="(min-width: 1024px) 160px, 30vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-5 py-16 sm:px-8 sm:py-20">
        <section aria-label="At a glance">
          <ProofStrip />
        </section>

        {/* Story timeline */}
        <section aria-labelledby="story-title" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Our story</p>
            <h2 id="story-title" className="mt-2 font-noir-display text-4xl sm:text-5xl">
              From mint pioneers to specialty aroma chemicals
            </h2>
            <p className="mt-5 text-noir-muted">
              With Petorose Alcones, the Banwari Group commands a strong position in a niche segment of the industry, making single molecules
              accessible to manufacturers and innovators worldwide.
            </p>
          </div>
          <ol className="relative space-y-10 border-l border-white/15 pl-8">
            {MILESTONES.map((m) => (
              <li key={m.title} className="relative">
                <span aria-hidden className="absolute -left-[2.45rem] top-1.5 size-3.5 rounded-full border-2 border-noir-orchid bg-noir-bg" />
                <p className="font-mono text-xs uppercase tracking-wider text-noir-periwinkle">{m.when}</p>
                <h3 className="mt-1 text-2xl font-semibold">{m.title}</h3>
                <p className="mt-2 leading-relaxed text-noir-muted">{m.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Values */}
        <section aria-labelledby="values-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">What drives us</p>
          <h2 id="values-title" className="mt-2 font-noir-display text-4xl sm:text-5xl">
            Innovating Aromas
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-3xl border border-white/10 bg-noir-surface p-6">
                <h3 className="font-noir-display text-2xl text-noir-orchid">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-noir-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Facility */}
        <section aria-labelledby="facility-title" className="grid gap-8 rounded-[2rem] border border-white/10 bg-noir-surface p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Our facility</p>
            <h2 id="facility-title" className="mt-2 font-noir-display text-4xl">
              Made in Bhiwadi, Rajasthan
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-noir-muted">
              Our products are designed and developed under the supervision of highly qualified scientists and lab experts, and manufactured
              in an all-compliant, international-grade facility in the RIICO Industrial Area, Bhiwadi.
            </p>
          </div>
          <dl className="grid gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-noir-bg/50 p-4">
              <dt className="text-xs uppercase tracking-wider text-noir-muted">Address</dt>
              <dd className="mt-1 text-base">{company.address.display}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-noir-bg/50 p-4">
              <dt className="text-xs uppercase tracking-wider text-noir-muted">Getting here</dt>
              <dd className="mt-1 text-base">About an hour&rsquo;s drive from Indira Gandhi International Airport, New Delhi</dd>
            </div>
            <a href={mapsHref} target="_blank" rel="noopener" className="text-noir-orchid underline underline-offset-4 hover:text-noir-text">
              Open in Google Maps ↗
            </a>
          </dl>
        </section>

        <HowWeMakeIt />

        {/* Certifications */}
        <section id="certifications" aria-labelledby="cert-title" className="scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Quality &amp; compliance</p>
              <h2 id="cert-title" className="mt-2 font-noir-display text-4xl sm:text-5xl">
                Certifications
              </h2>
            </div>
            <p className="max-w-md text-noir-muted">
              Our quality, food-safety and environmental systems are certified. Kosher and Halal certification is available product by product.
            </p>
          </div>
          <div className="mt-8">
            <CertificateCards />
          </div>
        </section>

        {/* Group */}
        <section aria-labelledby="group-title" className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Our group</p>
            <h2 id="group-title" className="mt-2 font-noir-display text-4xl">
              Part of the Banwari Group
            </h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-noir-surface p-6">
            <p className="text-lg leading-relaxed text-noir-muted">
              Petorose Alcones is part of the family-owned and operated Banwari Group based in New Delhi, which pioneered the mint industry and
              is built on the same principles and work ethics.
            </p>
            <a
              href={company.group.url}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5"
            >
              Visit banwari.org ↗
            </a>
          </div>
        </section>

        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-noir-display text-3xl font-light italic leading-snug sm:text-4xl">
            &ldquo;{company.catalogue.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-noir-muted">— {company.catalogue.quote.author}</figcaption>
        </figure>

        <section aria-labelledby="video-title" className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <LazyVideo
            src={company.featureVideo.file}
            poster={company.featureVideo.poster}
            title="Meet Petorose Alcones"
            duration={company.featureVideo.duration}
            captions={company.featureVideo.captions}
          />
          <div>
            <h2 id="video-title" className="font-noir-display text-3xl sm:text-4xl">
              Pioneering Mints &amp; Innovating Aromas
            </h2>
            <p className="mt-3 text-noir-muted">A two-minute introduction to Petorose Alcones.</p>
            <Link href="/products/" className="mt-5 inline-block text-noir-orchid underline underline-offset-4 hover:text-noir-text">
              Explore our products →
            </Link>
          </div>
        </section>

        <EnquiryCta />
      </div>
    </>
  );
}
