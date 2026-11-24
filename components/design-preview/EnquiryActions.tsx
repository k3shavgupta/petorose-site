"use client";

import { useState } from "react";
import type { ProductSummary } from "@/lib/content";

export function EnquiryActions({ product, catalogueFile }: { product: ProductSummary; catalogueFile: string }) {
  const [requested, setRequested] = useState(false);
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setRequested(true)}
          className="rounded-full bg-noir-saffron px-5 py-2.5 text-sm font-semibold text-noir-bg transition hover:bg-[#ffc56b]"
        >
          Request quote / sample
        </button>
        <span className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-noir-text">Full specs →</span>
      </div>
      <a
        href={`${catalogueFile}#page=${product.catalogue.pdfPage}`}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-block text-xs text-noir-muted underline underline-offset-4 hover:text-noir-text"
      >
        Catalogue, page {product.catalogue.page} (PDF)
      </a>
      <p role="status" className="mt-3 min-h-5 text-xs text-noir-orchid">
        {requested && `The enquiry form will open here with “${product.name}” pre-filled (built in Phase 3).`}
      </p>
    </div>
  );
}
