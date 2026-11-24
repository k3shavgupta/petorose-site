"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductSummary } from "@/lib/content";
import { formatTenacity, tenacityRatio } from "@/lib/product-utils";
import { Formula } from "./Formula";
import { EnquiryActions } from "./EnquiryActions";
import { ProductSearch } from "./ProductSearch";

interface Props {
  products: ProductSummary[];
  initialSlug: string;
  heroSlugs: string[];
  quickPicks: string[];
  catalogueFile: string;
}

const SearchIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export function NoirDirection({ products, initialSlug, heroSlugs, quickPicks, catalogueFile }: Props) {
  const [slug, setSlug] = useState(initialSlug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const bySlug = (s: string) => products.find((p) => p.slug === s)!;

  const select = (s: string) => {
    setSlug(s);
    document.getElementById("noir-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div className="font-noir-body text-noir-text">
      {/* Hero */}
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-noir-bg">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-32 size-[28rem] rounded-full bg-noir-periwinkle/35 blur-3xl motion-safe:animate-drift" />
          <div className="absolute -right-20 top-10 size-[24rem] rounded-full bg-noir-orchid/30 blur-3xl motion-safe:animate-drift-slow" />
          <div className="absolute bottom-[-10rem] left-1/3 size-[22rem] rounded-full bg-noir-saffron/20 blur-3xl motion-safe:animate-drift" />
        </div>

        <nav aria-label="Direction A example navigation" className="flex items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-6">
          <span className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white p-1.5">
              <Image src="/assets/img/site/petroselogo.jpg" alt="" width={28} height={28} />
            </span>
            <span className="font-noir-display text-lg tracking-wide">Petorose Alcones</span>
          </span>
          <ul className="hidden items-center gap-7 text-sm text-noir-muted md:flex">
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
            <li>
              <a href={catalogueFile} className="underline-offset-4 hover:text-noir-text hover:underline" download>
                Catalogue ↓
              </a>
            </li>
          </ul>
          <span className="rounded-full bg-noir-saffron px-4 py-2 text-sm font-semibold text-noir-bg">Enquire</span>
        </nav>

        <div className="grid items-center gap-12 px-5 pb-14 pt-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:pb-20 lg:pt-10">
          <div className="motion-safe:animate-rise">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-noir-orchid">
              Aroma chemicals · Bhiwadi, India
            </p>
            <h3 className="mt-5 font-noir-display text-5xl leading-[0.95] font-light sm:text-7xl">
              Innovating{" "}
              <em className="bg-gradient-to-r from-noir-periwinkle via-noir-orchid to-noir-saffron bg-clip-text font-normal text-transparent">
                Aromas
              </em>
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-noir-muted">
              Specialty aroma chemicals and ingredients for fragrance and flavour, from India&rsquo;s first manufacturer of purest
              Anethole.
            </p>

            <ProductSearch
              products={products}
              onSelect={select}
              label="Find a product"
              placeholder="Name, CAS no. or note"
              icon={<SearchIcon className="size-5 shrink-0 text-noir-muted" />}
              classes={{
                root: "mt-8 max-w-lg",
                label: "sr-only",
                field:
                  "flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 backdrop-blur-md focus-within:border-noir-orchid",
                input: "w-full bg-transparent text-base text-noir-text placeholder:text-noir-muted/80 focus:outline-none",
                list: "absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-noir-raised/95 p-1.5 shadow-2xl backdrop-blur-xl",
                option: "flex cursor-pointer items-baseline justify-between gap-4 rounded-xl px-3 py-2.5 text-sm",
                optionActive: "bg-white/10",
                optionMeta: "font-mono text-xs text-noir-muted",
                empty: "px-3 py-2.5 text-sm text-noir-muted",
              }}
            />
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-noir-muted">New:</span>
              {quickPicks.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => select(s)}
                  className="rounded-full border border-white/15 px-3 py-1 text-noir-text transition hover:border-noir-orchid hover:bg-white/5"
                >
                  {bySlug(s).name}
                </button>
              ))}
            </div>
          </div>

          <div aria-hidden className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            {heroSlugs.map((s, i) => (
              <div
                key={s}
                className={`relative overflow-hidden rounded-t-[7rem] rounded-b-3xl border border-white/10 motion-safe:animate-float ${
                  i === 0 ? "row-span-2" : "aspect-[4/5]"
                }`}
                style={{ animationDelay: `${i * -3}s` }}
              >
                <Image src={bySlug(s).images.product!} alt="" fill sizes="(min-width: 1024px) 220px, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product card */}
      <article
        id="noir-card"
        key={product.slug}
        aria-live="polite"
        className="mx-auto mt-10 max-w-md scroll-mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-noir-surface shadow-[0_30px_80px_-30px_rgba(139,141,255,0.45)] motion-safe:animate-rise"
      >
        <div className="relative aspect-[16/10]">
          <Image src={product.images.product!} alt={`${product.name} mood image`} fill sizes="448px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-surface via-noir-surface/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-noir-bg/70 px-3 py-1 font-mono text-xs text-noir-text backdrop-blur">
            CAS {product.cas ?? "—"}
          </span>
        </div>
        <div className="-mt-10 px-6 pb-6">
          {product.alsoKnownAs && (
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">aka {product.alsoKnownAs}</p>
          )}
          <h4 className="relative mt-1 font-noir-display text-3xl">{product.name}</h4>
          <p className="mt-3 text-sm leading-relaxed text-noir-muted">{product.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 text-sm">
            {[
              ["Formula", <Formula key="f" value={product.formula} />],
              ["FEMA", product.fema ?? "—"],
            ].map(([k, v]) => (
              <div key={k as string} className="bg-noir-surface p-3">
                <dt className="text-xs text-noir-muted">{k}</dt>
                <dd className="mt-0.5 font-mono">{v}</dd>
              </div>
            ))}
            <div className="col-span-2 bg-noir-surface p-3">
              <dt className="flex justify-between text-xs text-noir-muted">
                <span>Tenacity</span>
                <span className="font-mono text-noir-text">{formatTenacity(product.tenacity) ?? "—"}</span>
              </dt>
              <dd className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-noir-periwinkle via-noir-orchid to-noir-saffron transition-[width] duration-700"
                  style={{ width: `${tenacityRatio(product.tenacity) * 100}%` }}
                />
              </dd>
            </div>
          </dl>

          <EnquiryActions product={product} catalogueFile={catalogueFile} variant="noir" />
        </div>
      </article>
    </div>
  );
}
