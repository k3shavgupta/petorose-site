"use client";

import { useState } from "react";
import type { ProductSummary } from "@/lib/content";

export function EnquiryActions({
  product,
  catalogueFile,
  variant,
}: {
  product: ProductSummary;
  catalogueFile: string;
  variant: "noir" | "lab";
}) {
  const [requested, setRequested] = useState(false);
  const styles =
    variant === "noir"
      ? {
          primary: "bg-noir-saffron text-noir-bg hover:bg-[#ffc56b] rounded-full",
          secondary: "border border-white/20 text-noir-text hover:bg-white/5 rounded-full",
          link: "text-noir-muted hover:text-noir-text",
          note: "text-noir-orchid",
        }
      : {
          primary: "bg-lab-ink text-white hover:bg-lab-indigo rounded-lg",
          secondary: "border border-lab-ink/20 text-lab-ink hover:border-lab-ink rounded-lg",
          link: "text-lab-muted hover:text-lab-ink",
          note: "text-lab-indigo",
        };
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2.5">
        <button type="button" onClick={() => setRequested(true)} className={`px-5 py-2.5 text-sm font-semibold transition ${styles.primary}`}>
          Request quote / sample
        </button>
        <span className={`px-5 py-2.5 text-sm font-medium ${styles.secondary}`}>Full specs →</span>
      </div>
      <a
        href={`${catalogueFile}#page=${product.catalogue.pdfPage}`}
        target="_blank"
        rel="noopener"
        className={`mt-4 inline-block text-xs underline underline-offset-4 ${styles.link}`}
      >
        Catalogue, page {product.catalogue.page} (PDF)
      </a>
      <p role="status" className={`mt-3 min-h-5 text-xs ${styles.note}`}>
        {requested && `The enquiry form will open here with “${product.name}” pre-filled (built in Phase 3).`}
      </p>
    </div>
  );
}
