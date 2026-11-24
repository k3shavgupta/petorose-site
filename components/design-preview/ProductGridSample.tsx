import Image from "next/image";
import type { ProductSummary } from "@/lib/content";
import { formatTenacity, tenacityRatio } from "@/lib/product-utils";

/** Product grid sample in the single Rose Noir theme. */
export function ProductGridSample({ products, total }: { products: ProductSummary[]; total: number }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-noir-bg p-5 text-noir-text sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Our products</p>
          <h4 className="mt-2 font-noir-display text-4xl">What we make</h4>
        </div>
        <div className="flex flex-wrap gap-2 text-sm" aria-label="Example filters">
          {[`All ${total}`, "New", "Featured"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-3.5 py-1.5 ${i === 0 ? "bg-noir-text text-noir-bg" : "border border-white/15 text-noir-muted"}`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {products.map((p) => (
          <li
            key={p.slug}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-noir-surface transition hover:-translate-y-0.5 hover:border-noir-periwinkle/50 hover:shadow-[0_18px_40px_-20px_rgba(139,141,255,0.5)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.images.product!}
                alt=""
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-sm font-semibold sm:text-base">{p.name}</p>
              <p className="mt-0.5 font-mono text-xs text-noir-muted">CAS {p.cas ?? "—"}</p>
              <div className="mt-3 text-xs text-noir-muted" title="Tenacity: how long the scent lasts">
                <p className="flex justify-between gap-2">
                  <span>Tenacity</span>
                  <span className="font-mono text-noir-text">{formatTenacity(p.tenacity) ?? "—"}</span>
                </p>
                <span aria-hidden className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-noir-periwinkle to-noir-orchid"
                    style={{ width: `${tenacityRatio(p.tenacity) * 100}%` }}
                  />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-noir-muted">
        Showing {products.length} of {total}. &ldquo;New&rdquo; and &ldquo;Featured&rdquo; are the old site&rsquo;s homepage picks. Grouping by
        odour family or application needs categories from Petorose; no source has them yet.
      </p>
    </div>
  );
}
