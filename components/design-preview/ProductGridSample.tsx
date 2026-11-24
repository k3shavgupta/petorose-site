import Image from "next/image";
import type { ProductSummary } from "@/lib/content";
import { formatTenacity, tenacityRatio } from "@/lib/product-utils";

/** Light "mist" surface for scanning many products: the dark brand look stays in the hero, nav and footer. */
export function ProductGridSample({ products, total }: { products: ProductSummary[]; total: number }) {
  return (
    <div className="rounded-[2rem] bg-mist-bg p-5 text-mist-ink sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-orchid">Our products</p>
          <h4 className="mt-2 font-noir-display text-4xl">What we make</h4>
        </div>
        <div className="flex flex-wrap gap-2 text-sm" aria-label="Example filters">
          {[`All ${total}`, "New", "Featured"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-3.5 py-1.5 ${i === 0 ? "bg-mist-ink text-white" : "border border-mist-line bg-white text-mist-muted"}`}
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
            className="group overflow-hidden rounded-2xl border border-mist-line bg-mist-card transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(72,69,228,0.45)]"
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
              <p className="mt-0.5 font-mono text-xs text-mist-muted">CAS {p.cas ?? "—"}</p>
              <div className="mt-3 flex flex-col gap-1.5 text-xs text-mist-muted sm:flex-row sm:items-center sm:gap-2">
                <span className="h-1 w-full overflow-hidden rounded-full bg-mist-line sm:w-auto sm:flex-1">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-mist-violet to-mist-orchid"
                    style={{ width: `${tenacityRatio(p.tenacity) * 100}%` }}
                  />
                </span>
                <span className="font-mono">{formatTenacity(p.tenacity)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-mist-muted">
        Showing {products.length} of {total}. &ldquo;New&rdquo; and &ldquo;Featured&rdquo; are the old site&rsquo;s homepage picks. Grouping by
        odour family or application needs categories from Petorose; no source has them yet.
      </p>
    </div>
  );
}
