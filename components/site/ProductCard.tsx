import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/lib/content";
import { formatTenacity, tenacityRatio } from "@/lib/product-utils";

export function ProductCard({ product, priority = false }: { product: ProductSummary; priority?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-noir-surface transition hover:-translate-y-0.5 hover:border-noir-periwinkle/50 hover:shadow-[0_18px_40px_-20px_rgba(139,141,255,0.5)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-noir-raised">
        <Image
          src={product.photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 46vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-sm font-semibold text-noir-text sm:text-base">{product.name}</h3>
        {product.alsoKnownAs && <p className="mt-0.5 line-clamp-1 text-xs text-noir-muted">aka {product.alsoKnownAs}</p>}
        <p className="mt-1 font-mono text-xs text-noir-muted">CAS {product.cas ?? "—"}</p>
        <div className="mt-auto pt-3 text-xs text-noir-muted">
          <p className="flex justify-between gap-2">
            <span>Tenacity</span>
            <span className="font-mono text-noir-text">{formatTenacity(product.tenacity) ?? "—"}</span>
          </p>
          <span aria-hidden className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-noir-periwinkle to-noir-orchid"
              style={{ width: `${tenacityRatio(product.tenacity) * 100}%` }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
