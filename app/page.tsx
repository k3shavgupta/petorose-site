import Image from "next/image";
import Link from "next/link";
import { Certifications } from "@/components/site/Certifications";
import { HeroSearch } from "@/components/site/HeroSearch";
import { LazyVideo } from "@/components/site/LazyVideo";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryCta, HowWeMakeIt, ProofStrip } from "@/components/site/Sections";
import { brandPhoto, company, getProduct, products, toSummary } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata = { alternates: { canonical: absoluteUrl("/") } };

const summaries = products.map(toSummary);
const pick = (slugs: string[]) => slugs.map((s) => toSummary(getProduct(s)!));

export default function HomePage() {
  const hero = brandPhoto("hero-bloom");
  const heroFallback = pick(company.homepage.featuredProducts);
  const newProducts = pick(company.homepage.newProducts);
  const featured = pick(company.homepage.featuredProducts);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-40 size-[30rem] rounded-full bg-noir-periwinkle/30 blur-3xl motion-safe:animate-drift" />
          <div className="absolute -right-24 top-20 size-[26rem] rounded-full bg-noir-orchid/25 blur-3xl motion-safe:animate-drift-slow" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pb-24 lg:pt-20">
          <div className="motion-safe:animate-rise">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-noir-orchid">Aroma chemicals · Bhiwadi, India</p>
            <h1 className="mt-5 font-noir-display text-5xl font-light leading-[0.95] sm:text-7xl">
              Innovating{" "}
              <em className="bg-gradient-to-r from-noir-periwinkle to-noir-orchid bg-clip-text font-normal text-transparent">Aromas</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-noir-muted">
              Specialty aroma chemicals and ingredients for fragrance and flavour, from India&rsquo;s first manufacturer of purest Anethole.
            </p>
            <div className="mt-8">
              <HeroSearch products={summaries} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products/" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5">
                Browse all {products.length} products
              </Link>
              <Link
                href="/contact/#enquiry"
                className="rounded-full bg-noir-saffron px-5 py-2.5 text-sm font-semibold text-noir-bg transition hover:bg-[#ffc56b]"
              >
                Request a quote
              </Link>
            </div>
          </div>

          {hero ? (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border border-white/10">
              <Image src={hero.file} alt={hero.subject ?? ""} fill preload sizes="(min-width: 1024px) 448px, 90vw" className="object-cover" />
            </div>
          ) : (
            <div aria-hidden className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
              {heroFallback.map((p, i) => (
                <div
                  key={p.slug}
                  className={`relative overflow-hidden rounded-t-[7rem] rounded-b-3xl border border-white/10 ${i === 0 ? "row-span-2" : "aspect-[4/5]"}`}
                >
                  <Image src={p.photo} alt="" fill preload={i === 0} sizes="(min-width: 1024px) 220px, 45vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-5 pb-24 sm:px-8">
        <ProofStrip />

        {/* Products */}
        <section aria-labelledby="new-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Our products</p>
              <h2 id="new-title" className="mt-2 font-noir-display text-4xl sm:text-5xl">
                New products
              </h2>
            </div>
            <Link href="/products/" className="text-sm text-noir-orchid underline underline-offset-4 hover:text-noir-text">
              View all {products.length} products →
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {newProducts.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="featured-title">
          <h2 id="featured-title" className="font-noir-display text-4xl sm:text-5xl">
            Featured products
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>

        {/* Intro */}
        <section aria-labelledby="about-title" className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">About us</p>
            <h2 id="about-title" className="mt-2 font-noir-display text-4xl sm:text-5xl">
              Because innovation is the only way forward
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-noir-muted">
            <p>
              Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, is part of the family-owned and operated{" "}
              <a href={company.group.url} target="_blank" rel="noopener" className="text-noir-text underline underline-offset-4">
                Banwari Group
              </a>{" "}
              based in New Delhi, India. We specialize in manufacturing aroma chemicals and aroma ingredients at our facility in the RIICO
              Industrial Area of Rajasthan.
            </p>
            <Link href="/about/" className="inline-block text-base text-noir-orchid underline underline-offset-4 hover:text-noir-text">
              Our story →
            </Link>
          </div>
        </section>

        <HowWeMakeIt />

        <Certifications />

        {/* Video */}
        <section aria-labelledby="video-title" className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <LazyVideo
            src={company.featureVideo.file}
            poster={company.featureVideo.poster}
            title="Meet Petorose Alcones"
            duration={company.featureVideo.duration}
            captions={company.featureVideo.captions}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Feature video</p>
            <h2 id="video-title" className="mt-2 font-noir-display text-3xl sm:text-4xl">
              Pioneering Mints &amp; Innovating Aromas
            </h2>
            <p className="mt-3 text-noir-muted">A two-minute introduction to Petorose Alcones and a few of our key offerings.</p>
          </div>
        </section>

        <EnquiryCta />
      </div>
    </>
  );
}
