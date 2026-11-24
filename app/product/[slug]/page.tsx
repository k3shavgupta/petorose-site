import type { Metadata } from "next";
import Link from "next/link";
import seoLandingPages from "@/content/seo-landing-pages.json";
import { asset } from "@/lib/base-path";
import { getProduct, products } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

// Old site URLs (/product/<slug>, plus 56 Anethole landing URLs) forward to the new product pages,
// so existing links and search results keep working on a static host.
export const dynamicParams = false;

const legacySlugs = seoLandingPages.map((s) => s.path.replace("/product/", ""));
const target = (slug: string) => (getProduct(slug) ? slug : "anethole");

export function generateStaticParams() {
  return [...products.map((p) => p.slug), ...legacySlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const slug = target((await params).slug);
  return {
    title: getProduct(slug)?.name,
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(`/products/${slug}/`) },
  };
}

export default async function LegacyProductRedirect({ params }: PageProps<"/product/[slug]">) {
  const slug = target((await params).slug);
  const href = `/products/${slug}/`;
  return (
    <div className="mx-auto max-w-xl px-5 py-24 sm:px-8">
      <meta httpEquiv="refresh" content={`0; url=${asset(href)}`} />
      <p className="text-lg text-noir-muted">
        This page has moved to{" "}
        <Link href={href} className="text-noir-orchid underline underline-offset-4">
          {getProduct(slug)?.name}
        </Link>
        .
      </p>
    </div>
  );
}
