import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Formula } from "@/components/site/Formula";
import { JsonLd } from "@/components/site/JsonLd";
import { ProductCard } from "@/components/site/ProductCard";
import { catalogueHref, getProduct, knownApplications, photoCredits, productPhoto, products, toSummary } from "@/lib/content";
import { formatTenacity, tenacityRatio } from "@/lib/product-utils";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const title = `${p.name}${p.cas ? ` (CAS ${p.cas})` : ""}`;
  const description = `${p.name}${p.alsoKnownAs ? `, also known as ${p.alsoKnownAs}` : ""}: ${p.description ?? ""} Manufactured by Petorose Alcones, India.`.slice(0, 300);
  const url = absoluteUrl(`/products/${p.slug}/`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: `${title} | Petorose Alcones`, description, url, images: [{ url: absoluteUrl(productPhoto(p)) }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const photo = productPhoto(p);
  const credit = photoCredits[p.slug];
  const applications = knownApplications(p);
  const idx = products.indexOf(p);
  const related = [1, 2, 3].map((d) => products[(idx + d) % products.length]).map(toSummary);
  const enquiryHref = `/contact/?product=${p.slug}#enquiry`;

  const specs: [string, React.ReactNode][] = [
    ["Chemical name", p.chemicalName],
    ["Formula", p.formula ? <Formula value={p.formula} /> : null],
    ["CAS no.", p.cas],
    ["FEMA no.", p.fema],
    ["Tenacity", p.tenacity ? `${formatTenacity(p.tenacity)} (how long the scent lasts)` : null],
    ["Also known as", p.alsoKnownAs],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    alternateName: p.alsoKnownAs ?? undefined,
    description: p.description ?? undefined,
    image: absoluteUrl(photo),
    url: absoluteUrl(`/products/${p.slug}/`),
    category: "Aroma chemicals",
    brand: { "@type": "Brand", name: "Petorose Alcones" },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    additionalProperty: [
      p.cas && { "@type": "PropertyValue", name: "CAS number", value: p.cas },
      p.formula && { "@type": "PropertyValue", name: "Molecular formula", value: p.formula },
      p.chemicalName && { "@type": "PropertyValue", name: "Chemical name", value: p.chemicalName },
      p.fema && { "@type": "PropertyValue", name: "FEMA number", value: p.fema },
      p.tenacity && { "@type": "PropertyValue", name: "Tenacity", value: p.tenacity },
    ].filter(Boolean),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products/") },
      { "@type": "ListItem", position: 3, name: p.name, item: absoluteUrl(`/products/${p.slug}/`) },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
      <nav aria-label="Breadcrumb" className="text-sm text-noir-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/products/" className="hover:text-noir-text">
              Products
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-noir-text">
            {p.name}
          </li>
        </ol>
      </nav>

      <article className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-noir-raised">
              <Image src={photo} alt={credit?.subject ?? `Illustrative image for ${p.name}`} fill preload sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-xs text-noir-muted">
              Illustrative image{credit?.creator ? ` · Photo: ${credit.creator}${credit.source ? ` / ${credit.source}` : ""}` : ""}
            </figcaption>
          </figure>
          {p.images.structure && (
            <figure className="mt-6 rounded-3xl border border-white/10 bg-noir-surface p-5">
              <figcaption className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-muted">Chemical structure</figcaption>
              <div className="relative mt-3 aspect-[2/1] overflow-hidden rounded-2xl">
                <Image src={p.images.structure} alt={`Chemical structure of ${p.name}${p.chemicalName ? `, ${p.chemicalName}` : ""}`} fill sizes="(min-width: 1024px) 500px, 100vw" className="object-contain" />
              </div>
            </figure>
          )}
        </div>

        <div>
          {p.alsoKnownAs && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Also known as {p.alsoKnownAs}</p>}
          <h1 className="mt-2 font-noir-display text-5xl leading-tight sm:text-6xl">{p.name}</h1>
          {p.cas && <p className="mt-2 font-mono text-sm text-noir-muted">CAS {p.cas}</p>}
          <p className="mt-6 text-lg leading-relaxed text-noir-muted">{p.description}</p>
          {applications && (
            <p className="mt-4 text-noir-muted">
              <span className="text-noir-text">Suggested use:</span> {applications}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={enquiryHref} className="rounded-full bg-noir-saffron px-6 py-3 font-semibold text-noir-bg transition hover:bg-[#ffc56b]">
              Request a quote / sample
            </Link>
            <a
              href={catalogueHref(p.catalogue.pdfPage)}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-white/20 px-6 py-3 font-medium text-noir-text hover:bg-white/5"
            >
              Download catalogue (PDF, p. {p.catalogue.page})
            </a>
          </div>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-noir-muted">Specifications</h2>
          <table className="mt-3 w-full overflow-hidden rounded-2xl text-left text-sm">
            <tbody className="divide-y divide-white/10 border-y border-white/10">
              {specs
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="w-40 py-3 pr-4 align-top font-normal text-noir-muted">
                      {k}
                    </th>
                    <td className={`py-3 ${k === "Chemical name" ? "" : "font-mono"}`}>{v}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {p.tenacity && (
            <div aria-hidden className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-noir-periwinkle to-noir-orchid" style={{ width: `${tenacityRatio(p.tenacity) * 100}%` }} />
            </div>
          )}
          <p className="mt-4 text-xs text-noir-muted">
            For purity, packaging and documentation, please{" "}
            <Link href={enquiryHref} className="text-noir-text underline underline-offset-4">
              send us an enquiry
            </Link>
            . Kosher and Halal certification is available product by product.
          </p>
        </div>
      </article>

      <section aria-labelledby="related-title" className="mt-20">
        <h2 id="related-title" className="font-noir-display text-3xl">
          More from our catalogue
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <ProductCard product={r} />
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
    </div>
  );
}
