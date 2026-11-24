import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductBrowser, ProductBrowserFromUrl } from "@/components/site/ProductBrowser";
import { EnquiryCta } from "@/components/site/Sections";
import { catalogueHref, company, products, toSummary } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const description = `All ${products.length} specialty aroma chemicals manufactured by Petorose Alcones in Bhiwadi, India: search by name, CAS number or odour note.`;

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: absoluteUrl("/products/") },
  openGraph: { title: "Products | Petorose Alcones", description, url: absoluteUrl("/products/") },
};

export default function ProductsPage() {
  const summaries = products.map(toSummary);
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Product catalogue · {company.catalogue.edition}</p>
          <h1 className="mt-2 font-noir-display text-5xl sm:text-6xl">Our products</h1>
          <p className="mt-4 max-w-xl text-lg text-noir-muted">
            {products.length} specialty aroma chemicals for fragrance and flavour. Open any product for its chemical name, formula, CAS and
            FEMA numbers and tenacity.
          </p>
        </div>
        <a href={catalogueHref()} download className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5">
          Download catalogue (PDF)
        </a>
      </header>

      <div className="mt-10">
        <Suspense fallback={<ProductBrowser products={summaries} />}>
          <ProductBrowserFromUrl products={summaries} />
        </Suspense>
      </div>

      <div className="mt-20">
        <EnquiryCta id="enquire" />
      </div>
    </div>
  );
}
