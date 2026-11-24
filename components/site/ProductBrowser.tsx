"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductSummary } from "@/lib/content";
import { NOTE_FILTERS, matchesNote, searchProducts } from "@/lib/product-utils";
import { ProductCard } from "./ProductCard";

const FEMA = "fema";

/** Products grid with free-text search (name, alias, CAS, chemical name, notes) and odour-note filters. */
export function ProductBrowser({ products }: { products: ProductSummary[] }) {
  const [query, setQuery] = useState("");
  const [note, setNote] = useState<string | null>(null);

  // Deep links: /products/?q=vanilla or ?note=floral
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const n = params.get("note");
    if (q) setQuery(q);
    if (n && (n === FEMA || NOTE_FILTERS.some((f) => f.id === n))) setNote(n);
  }, []);

  const results = useMemo(() => {
    const filtered = note
      ? products.filter((p) => (note === FEMA ? !!p.fema : matchesNote(p.description, note)))
      : products;
    return searchProducts(filtered, query);
  }, [products, query, note]);

  const chips = [{ id: null as string | null, label: "All" }, ...NOTE_FILTERS.map((n) => ({ id: n.id, label: n.label })), { id: FEMA, label: "FEMA listed" }];

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-noir-surface p-4 sm:p-6">
        <label className="block">
          <span className="text-sm font-medium text-noir-text">Search by name, CAS number, chemical name or note</span>
          <span className="mt-2 flex items-center gap-3 rounded-2xl border border-white/15 bg-noir-bg px-4 py-3 focus-within:border-noir-orchid">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 shrink-0 text-noir-muted">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. vanilla, 13481-87-3, jasmine"
              className="w-full bg-transparent text-base text-noir-text placeholder:text-noir-muted/70 focus:outline-none"
            />
          </span>
        </label>
        <fieldset>
          <legend className="text-sm font-medium text-noir-text">Filter by odour note</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => {
              const active = note === c.id;
              return (
                <button
                  key={c.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setNote(c.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                    active ? "bg-noir-text text-noir-bg" : "border border-white/15 text-noir-muted hover:border-noir-orchid hover:text-noir-text"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <p role="status" className="mt-6 text-sm text-noir-muted">
        {results.length === products.length ? `All ${products.length} products` : `${results.length} of ${products.length} products`}
        {" · "}Tenacity = how long the scent lasts
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {results.map((p, i) => (
            <li key={p.slug}>
              <ProductCard product={p} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-white/15 p-10 text-center">
          <p className="text-lg text-noir-text">No product matches “{query}”.</p>
          <p className="mt-2 text-noir-muted">
            Try another name or CAS number, or{" "}
            <a href="#enquire" className="text-noir-orchid underline underline-offset-4">
              ask us directly
            </a>
            : we may be able to help.
          </p>
        </div>
      )}
    </div>
  );
}
