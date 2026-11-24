import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/base-path";
import { company } from "@/lib/content";

interface Cert {
  id: string;
  file: string | null;
  display: { title: string; subtitle: string; issuerPublic: string | null; scopePublic: string | null; thumb: string | null; numberPublic: string | null };
}

const certs = company.certifications as unknown as Cert[];

/** Short names for strips and the footer. */
export const CERTIFICATIONS = certs.map((c) => c.display.title);

const ShieldIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-4 text-noir-orchid" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/** Compact strip linking to the full certificate cards on the About page. */
export function Certifications() {
  return (
    <div className="rounded-3xl border border-white/10 bg-noir-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Quality &amp; compliance</p>
          <h2 className="mt-2 font-noir-display text-3xl">Certifications</h2>
        </div>
        <Link href="/about/#certifications" className="text-sm text-noir-orchid underline underline-offset-4 hover:text-noir-text">
          View certificates →
        </Link>
      </div>
      <ul className="mt-6 flex flex-wrap gap-3">
        {CERTIFICATIONS.map((c) => (
          <li key={c} className="flex items-center gap-2 rounded-full border border-white/15 bg-noir-bg/40 px-4 py-2 text-sm">
            <ShieldIcon />
            {c}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-noir-muted">Kosher and Halal certification is available product by product.</p>
    </div>
  );
}

/** Full certificate cards: preview, issuer, certificate number, scope and the PDF. */
export function CertificateCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {certs.map((c) => (
        <li key={c.id} className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-noir-surface">
          {c.display.thumb ? (
            <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-[#fff]">
              <Image
                src={c.display.thumb}
                alt={`${c.display.title} certificate, first page`}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="grid aspect-[4/3] place-items-center border-b border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(139,141,255,0.25),transparent_60%)]">
              <span className="font-noir-display text-5xl text-noir-orchid">{c.display.title}</span>
            </div>
          )}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <ShieldIcon />
              {c.display.title}
            </h3>
            <p className="text-sm text-noir-muted">{c.display.subtitle}</p>
            <dl className="mt-4 space-y-2 text-sm">
              {c.display.issuerPublic && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-noir-muted">Issued by</dt>
                  <dd>{c.display.issuerPublic}</dd>
                </div>
              )}
              {c.display.numberPublic && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-noir-muted">Certificate no.</dt>
                  <dd className="font-mono">{c.display.numberPublic}</dd>
                </div>
              )}
              {c.display.scopePublic && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-noir-muted">Scope</dt>
                  <dd>{c.display.scopePublic}</dd>
                </div>
              )}
            </dl>
            <div className="mt-auto pt-5">
              {c.file ? (
                <a
                  href={asset(c.file)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:border-noir-orchid hover:bg-white/5"
                >
                  View certificate (PDF)
                </a>
              ) : (
                <Link href="/contact/#enquiry" className="inline-flex text-sm text-noir-orchid underline underline-offset-4">
                  Details on request
                </Link>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
