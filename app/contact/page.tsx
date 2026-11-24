import type { Metadata } from "next";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { MapFacade } from "@/components/site/MapFacade";
import { company, email, mapEmbedSrc, mapsHref, phones, products, whatsappHref } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const description = `Contact Petorose Alcones, Bhiwadi, Rajasthan: ${phones.map((p) => p.display).join(", ")} · ${email}. Request a quotation or sample.`;

export const metadata: Metadata = {
  title: "Contact us",
  description,
  alternates: { canonical: absoluteUrl("/contact/") },
  openGraph: { title: "Contact us | Petorose Alcones", description, url: absoluteUrl("/contact/") },
};

export default function ContactPage() {
  const productOptions = products.map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Contact us</p>
        <h1 className="mt-2 font-noir-display text-5xl sm:text-6xl">We&rsquo;re here to help</h1>
        <p className="mt-4 max-w-xl text-lg text-noir-muted">
          Ask for a quotation, a sample or technical information. We respond promptly by email.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.35fr]">
        <section aria-labelledby="office-title" className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-noir-surface p-6">
            <h2 id="office-title" className="text-sm font-semibold uppercase tracking-[0.2em] text-noir-muted">
              {company.address.label}
            </h2>
            <address className="mt-3 text-lg not-italic leading-relaxed">
              {company.name}
              <br />
              {company.address.streetAddress}
              <br />
              {company.address.addressLocality}, {company.address.addressRegion} – {company.address.postalCodeAsDisplayed}
              <br />
              India
            </address>
            <ul className="mt-6 space-y-3">
              {phones.map((p) => (
                <li key={p.e164}>
                  <a href={`tel:${p.e164}`} className="flex items-center gap-3 rounded-xl text-noir-text hover:text-noir-orchid">
                    <PhoneIcon />
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-xl text-noir-text hover:text-noir-orchid">
                  <MailIcon />
                  {email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${phones[0].e164}`} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5">
                Call us
              </a>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full bg-noir-saffron px-5 py-2.5 text-sm font-semibold text-noir-bg transition hover:bg-[#ffc56b]"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
          <MapFacade embedSrc={mapEmbedSrc} openHref={mapsHref} address={company.address.display} />
        </section>

        <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 rounded-3xl border border-white/10 bg-noir-surface p-6 sm:p-8">
          <h2 id="enquiry-title" className="font-noir-display text-3xl">
            Send your query
          </h2>
          <p className="mb-6 mt-2 text-sm text-noir-muted">Choose a product to request a quotation, sample or technical information.</p>
          <EnquiryForm products={productOptions} email={email} />
        </section>
      </div>
    </div>
  );
}

const PhoneIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0 text-noir-orchid" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
const MailIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0 text-noir-orchid" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
