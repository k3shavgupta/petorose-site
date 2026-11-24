import Link from "next/link";
import { CERTIFICATIONS } from "@/components/site/Certifications";
import { catalogueHref, company, email, phones, whatsappHref } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#0b0818] text-sm text-noir-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-noir-display text-2xl text-noir-text">Petorose Alcones Pvt Ltd</p>
          <p className="mt-1 text-noir-orchid">{company.tagline}</p>
          <address className="mt-5 not-italic leading-relaxed">{company.address.display}</address>
          <ul className="mt-4 space-y-1.5">
            {phones.map((p) => (
              <li key={p.e164}>
                <a href={`tel:${p.e164}`} className="hover:text-noir-text">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${email}`} className="hover:text-noir-text">
                {email}
              </a>
            </li>
            {whatsappHref && (
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener" className="hover:text-noir-text">
                  WhatsApp {company.whatsapp.display}
                </a>
              </li>
            )}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold text-noir-text">Explore</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/products/" className="hover:text-noir-text">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about/" className="hover:text-noir-text">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-noir-text">
                Contact us
              </Link>
            </li>
            <li>
              <a href={catalogueHref()} download className="hover:text-noir-text">
                Product catalogue (PDF)
              </a>
            </li>
            <li>
              <a href={company.group.url} target="_blank" rel="noopener" className="hover:text-noir-text">
                Banwari Group <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <Link href="/credits/" className="hover:text-noir-text">
                Photo credits
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-noir-text">Certifications</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CERTIFICATIONS.map((c) => (
              <li key={c} className="rounded-full border border-white/15 px-3 py-1 text-xs">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs sm:px-8">
          © 2019–{year} Petorose Alcones Private Limited, formerly Banwari Chemicals Pvt Ltd. All rights reserved. Made in India.
        </p>
      </div>
    </footer>
  );
}
