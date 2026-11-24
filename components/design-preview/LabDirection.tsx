"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductSummary } from "@/lib/content";
import { formatTenacity, tenacityRatio } from "@/lib/product-utils";
import { EnquiryActions } from "./EnquiryActions";
import { Formula } from "./Formula";
import { ProductSearch } from "./ProductSearch";

interface Props {
  products: ProductSummary[];
  initialSlug: string;
  heroSlug: string;
  quickPicks: string[];
  catalogueFile: string;
  facts: { value: string; label: string }[];
}

// Decorative accent per product, cycled by catalogue number; carries no meaning about the product.
const ACCENTS = ["#4845e4", "#a832ba", "#ff6b2c", "#2fb36b", "#ffd23f"];
const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

export function LabDirection({ products, initialSlug, heroSlug, quickPicks, catalogueFile, facts }: Props) {
  const [slug, setSlug] = useState(initialSlug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const bySlug = (s: string) => products.find((p) => p.slug === s)!;
  const accent = ACCENTS[(product.catalogue.sNo - 1) % ACCENTS.length];
  const segments = Math.round(tenacityRatio(product.tenacity) * 12);

  const select = (s: string) => {
    setSlug(s);
    document.getElementById("lab-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div className="font-sans text-lab-ink">
      {/* Hero */}
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-lab-ink/10 bg-lab-paper">
        <nav aria-label="Direction B example navigation" className="flex items-center justify-between gap-4 border-b border-lab-ink/10 px-5 py-4 sm:px-10">
          <span className="flex items-center gap-2.5">
            <Image src="/assets/img/site/petroselogo.jpg" alt="" width={32} height={32} className="mix-blend-multiply" />
            <span className="font-lab-display text-lg font-semibold tracking-tight">Petorose Alcones</span>
          </span>
          <ul className="hidden items-center gap-1 font-lab-mono text-xs uppercase tracking-wider text-lab-muted md:flex">
            {["Products", "About", "Contact"].map((l) => (
              <li key={l} className="rounded-md px-3 py-2">
                {l}
              </li>
            ))}
            <li>
              <a href={catalogueFile} download className="rounded-md px-3 py-2 hover:bg-lab-ink/5 hover:text-lab-ink">
                Catalogue ↓
              </a>
            </li>
          </ul>
          <span className="rounded-lg bg-lab-indigo px-4 py-2 text-sm font-semibold text-white">Enquire</span>
        </nav>

        <div className="grid items-center gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:py-16">
          <div className="motion-safe:animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-lab-ink/15 bg-white px-3 py-1 font-lab-mono text-xs text-lab-muted">
              <span className="size-2 rounded-full bg-lab-lime" aria-hidden /> Formerly Banwari Chemicals · Banwari Group
            </p>
            <h3 className="mt-6 font-lab-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.88] font-bold tracking-[-0.04em]">
              Innovating
              <br />
              <span className="bg-[linear-gradient(90deg,#4845e4,#a832ba_40%,#ff6b2c_75%,#ffb000)] bg-clip-text text-transparent">Aromas</span>
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-lab-muted">
              Aroma chemicals and aroma ingredients, manufactured in Bhiwadi, Rajasthan, for perfumers and flavour houses.
            </p>

            <ProductSearch
              products={products}
              onSelect={select}
              label="Search 39 products"
              placeholder="rose, 13481-87-3, vanilla…"
              classes={{
                root: "mt-8 max-w-lg",
                label: "mb-2 block font-lab-mono text-xs uppercase tracking-wider text-lab-muted",
                field:
                  "flex items-center rounded-xl border-2 border-lab-ink bg-white px-4 py-3 shadow-[4px_4px_0_0_#16152a] transition focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[2px_2px_0_0_#4845e4]",
                input: "w-full bg-transparent font-lab-mono text-base placeholder:text-lab-muted/70 focus:outline-none",
                list: "absolute inset-x-0 top-full z-20 mt-3 overflow-hidden rounded-xl border-2 border-lab-ink bg-white shadow-[4px_4px_0_0_#16152a]",
                option: "flex cursor-pointer items-baseline justify-between gap-4 border-b border-lab-ink/10 px-4 py-2.5 text-sm last:border-0",
                optionActive: "bg-lab-lemon/60",
                optionMeta: "font-lab-mono text-xs text-lab-muted",
                empty: "px-4 py-2.5 text-sm text-lab-muted",
              }}
            />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-lab-mono text-xs uppercase text-lab-muted">New →</span>
              {quickPicks.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => select(s)}
                  className="rounded-md px-2.5 py-1 text-sm font-medium text-lab-ink ring-1 ring-lab-ink/15 transition hover:-translate-y-0.5 hover:ring-lab-ink"
                  style={{ backgroundColor: `${ACCENTS[i + 2]}26` }}
                >
                  {bySlug(s).name}
                </button>
              ))}
            </div>
          </div>

          <div aria-hidden className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: HEX }}>
              <div
                className="absolute -inset-1/4 motion-safe:animate-spin-slower"
                style={{ background: "conic-gradient(from 0deg, #4845e4, #a832ba, #ff6b2c, #ffd23f, #2fb36b, #4845e4)" }}
              />
            </div>
            <div className="absolute inset-[9%] overflow-hidden bg-lab-paper" style={{ clipPath: HEX }}>
              <Image src={bySlug(heroSlug).images.product!} alt="" fill sizes="(min-width: 1024px) 320px, 80vw" className="object-cover" preload />
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-1 border-t border-lab-ink/10 sm:grid-cols-3">
          {facts.map((f, i) => (
            <div key={f.label} className={`px-5 py-5 sm:px-10 ${i ? "border-t border-lab-ink/10 sm:border-l sm:border-t-0" : ""}`}>
              <dt className="font-lab-mono text-xs uppercase tracking-wider text-lab-muted">{f.label}</dt>
              <dd className="mt-1 font-lab-display text-xl font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Product card */}
      <article
        id="lab-card"
        key={product.slug}
        aria-live="polite"
        className="mx-auto mt-10 grid max-w-3xl scroll-mt-6 overflow-hidden rounded-2xl border-2 border-lab-ink bg-white shadow-[8px_8px_0_0_var(--accent)] motion-safe:animate-rise sm:grid-cols-[0.9fr_1.1fr]"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        <div className="relative min-h-56 border-b-2 border-lab-ink sm:border-b-0 sm:border-r-2">
          <Image src={product.images.product!} alt={`${product.name} mood image`} fill sizes="(min-width: 640px) 330px, 100vw" className="object-cover" />
          <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 font-lab-mono text-xs ring-2 ring-lab-ink">
            No. {String(product.catalogue.sNo).padStart(2, "0")}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-lab-display text-3xl font-bold tracking-tight">{product.name}</h4>
              {product.alsoKnownAs && <p className="mt-0.5 text-sm text-lab-muted">also known as {product.alsoKnownAs}</p>}
            </div>
            <span className="mt-1 size-4 shrink-0 rotate-45 rounded-[3px]" style={{ backgroundColor: accent }} aria-hidden />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-lab-muted">{product.description}</p>

          <dl className="mt-5 divide-y divide-lab-ink/10 border-y border-lab-ink/10 font-lab-mono text-sm">
            {[
              ["CAS", product.cas ?? "—"],
              ["FEMA", product.fema ?? "—"],
              ["Formula", <Formula key="f" value={product.formula} />],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between gap-4 py-2">
                <dt className="text-lab-muted">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
            <div className="py-2.5">
              <dt className="flex justify-between">
                <span className="text-lab-muted">Tenacity</span>
                <span>{formatTenacity(product.tenacity) ?? "—"}</span>
              </dt>
              <dd className="mt-2 flex gap-1" aria-hidden>
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className="h-2 flex-1 rounded-sm" style={{ backgroundColor: i < segments ? accent : "#16152a14" }} />
                ))}
              </dd>
            </div>
          </dl>

          <EnquiryActions product={product} catalogueFile={catalogueFile} variant="lab" />
        </div>
      </article>
    </div>
  );
}
