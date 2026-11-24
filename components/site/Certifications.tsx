/**
 * Certifications as listed on the old website footer and the April 2025 catalogue (see content/INVENTORY.md).
 * Names only: every certificate copy on file has expired, so the PDFs are not linked until current copies arrive.
 */
export const CERTIFICATIONS = ["ISO 9001:2015", "ISO 22000:2018", "ISO 14001:2015", "Kosher", "Halal", "FSSAI", "US FDA registered"];

export function Certifications({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "rounded-3xl border border-white/10 bg-noir-surface p-6 sm:p-8"}>
      {!compact && (
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Quality &amp; compliance</p>
            <h2 className="mt-2 font-noir-display text-3xl">Certifications</h2>
          </div>
          <p className="max-w-sm text-sm text-noir-muted">
            Kosher and Halal certification is available product by product. Certificate copies on request.
          </p>
        </div>
      )}
      <ul className={`flex flex-wrap gap-3 ${compact ? "" : "mt-6"}`}>
        {CERTIFICATIONS.map((c) => (
          <li key={c} className="flex items-center gap-2 rounded-full border border-white/15 bg-noir-bg/40 px-4 py-2 text-sm">
            <svg aria-hidden viewBox="0 0 24 24" className="size-4 text-noir-orchid" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
