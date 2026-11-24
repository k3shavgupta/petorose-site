"use client";

import { useRouter } from "next/navigation";
import type { ProductSummary } from "@/lib/content";
import { ProductSearch } from "./ProductSearch";

/** Hero search: pick a product and go straight to its page. */
export function HeroSearch({ products }: { products: ProductSummary[] }) {
  const router = useRouter();
  return (
    <ProductSearch
      products={products}
      onSelect={(slug) => router.push(`/products/${slug}/`)}
      label="Find a product"
      placeholder="Search by name, CAS no. or note"
      icon={
        <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 shrink-0 text-noir-muted">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      }
      classes={{
        root: "max-w-lg",
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
  );
}
