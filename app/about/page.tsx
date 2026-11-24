import type { Metadata } from "next";
import Image from "next/image";
import { Certifications } from "@/components/site/Certifications";
import { LazyVideo } from "@/components/site/LazyVideo";
import { EnquiryCta, HowWeMakeIt, ProofStrip } from "@/components/site/Sections";
import { brandPhoto, company } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const description =
  "Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, is part of the family-owned Banwari Group and manufactures specialty aroma chemicals in Bhiwadi, Rajasthan.";

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: { canonical: absoluteUrl("/about/") },
  openGraph: { title: "About us | Petorose Alcones", description, url: absoluteUrl("/about/") },
};

export default function AboutPage() {
  const photo = brandPhoto("oils-glassware");
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <header className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">About us</p>
          <h1 className="mt-2 font-noir-display text-5xl leading-tight sm:text-6xl">Because innovation is the only way forward</h1>
        </div>
        <p className="text-lg leading-relaxed text-noir-muted">
          Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, is part of the family-owned and operated Banwari Group based in New
          Delhi, India. We specialize in manufacturing aroma chemicals and aroma ingredients.
        </p>
      </header>

      {photo && (
        <div className="relative aspect-[16/7] overflow-hidden rounded-[2rem] border border-white/10">
          <Image src={photo.file} alt={photo.subject ?? ""} fill preload sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </div>
      )}

      <section aria-labelledby="story-title" className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <h2 id="story-title" className="font-noir-display text-4xl">
          Our story
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-noir-muted">
          <p>
            Having pioneered the mint industry under an experienced management with roots in the early 1970s, the{" "}
            <a href={company.group.url} target="_blank" rel="noopener" className="text-noir-text underline underline-offset-4">
              Banwari Group
            </a>{" "}
            forayed into specialty aroma chemicals with the mission of <em className="text-noir-text">&lsquo;Innovating Aromas&rsquo;</em>. With
            Petorose Alcones, the group commands a strong position in a niche segment by making single molecules accessible to a wide network
            of manufacturers and innovators.
          </p>
          <p>
            These specialty aroma chemicals are designed in the lab and imitate the properties of their naturally occurring counterparts,
            imparting longevity and strength in the application. With being India&rsquo;s first manufacturer of purest Anethole comes the
            responsibility to build better. With &lsquo;Make in India&rsquo; at our core, we have aligned our goals to become India&rsquo;s most
            trusted manufacturer of specialty aroma chemicals and ingredients.
          </p>
          <p>
            Petorose Alcones is led by industry experts and veterans. Our scientists and researchers have spent hours with chemicals and
            ingredients to create products out of the ordinary, so that you may enhance your fragrances and flavours. We believe our actions
            make us who we are, and that we are no more than the trust our clients have in us.
          </p>
        </div>
      </section>

      <ProofStrip />

      <section aria-labelledby="facility-title" className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <h2 id="facility-title" className="font-noir-display text-4xl">
          Our facility
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-noir-muted">
          <p>
            Our products are developed under the supervision of highly qualified scientists and lab experts, and manufactured in an
            all-compliant, international-grade facility in the RIICO Industrial Area of Bhiwadi, Rajasthan. The facility is about an
            hour&rsquo;s drive from Indira Gandhi International Airport, New Delhi.
          </p>
          <p>Certifications such as Kosher and Halal are available on a product-to-product basis.</p>
        </div>
      </section>

      <HowWeMakeIt />

      <Certifications />

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
        </div>
      </section>

      <EnquiryCta />
    </div>
  );
}
