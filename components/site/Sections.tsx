import Image from "next/image";
import Link from "next/link";
import { brandPhoto, catalogueHref } from "@/lib/content";

// Every claim is quoted or tightened from a source listed in content/INVENTORY.md.
export const PROOF = [
  { value: "Early 1970s", label: "Management roots in pioneering India’s mint industry" },
  { value: "India’s first", label: "manufacturer of purest Anethole" },
  { value: "39", label: "specialty aroma chemicals for fragrance and flavour" },
  { value: "~1 hour", label: "from Delhi’s IGI Airport to our Bhiwadi facility" },
];

const STEPS = [
  {
    title: "Designed in the lab",
    body: "Our specialty aroma chemicals are designed in the lab to imitate the properties of their naturally occurring counterparts, adding longevity and strength in application.",
  },
  { title: "Developed by experts", body: "Every product is developed under the supervision of highly qualified scientists and lab experts." },
  {
    title: "Made in Bhiwadi",
    body: "Manufactured in an all-compliant, international-grade facility in the RIICO Industrial Area, Bhiwadi, Rajasthan.",
  },
  {
    title: "Tested before it reaches you",
    body: "We rigorously test every product before it reaches you, and Kosher and Halal certification is available product by product.",
  },
];

export function ProofStrip() {
  return (
    <dl className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {PROOF.map((p) => (
        <div key={p.value} className="bg-noir-surface p-6">
          <dt className="font-noir-display text-4xl font-light text-noir-orchid">{p.value}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-noir-muted">{p.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HowWeMakeIt() {
  const photo = brandPhoto("botanicals-flatlay") ?? brandPhoto("oils-glassware");
  return (
    <div className={`grid gap-10 ${photo ? "lg:grid-cols-[1fr_1.1fr] lg:items-center" : ""}`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">How we make it</p>
        <h2 className="mt-2 max-w-xl font-noir-display text-4xl sm:text-5xl">Designed in the lab, made in Rajasthan</h2>
        <ol className={`mt-8 grid gap-5 ${photo ? "" : "md:grid-cols-2 lg:grid-cols-4"}`}>
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl border border-white/10 bg-noir-surface p-5">
              <span className="font-mono text-sm text-noir-periwinkle">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-noir-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {photo && (
        <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 lg:aspect-[4/5]">
          <Image src={photo.file} alt={photo.subject ?? ""} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          <figcaption className="sr-only">{photo.subject}</figcaption>
        </figure>
      )}
    </div>
  );
}

export function EnquiryCta({ id }: { id?: string }) {
  return (
    <div id={id} className="relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-noir-surface p-8 sm:p-12">
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-noir-orchid/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-10 -z-10 size-80 rounded-full bg-noir-periwinkle/25 blur-3xl" />
      <h2 className="max-w-2xl font-noir-display text-3xl sm:text-5xl">Need a quotation or a sample?</h2>
      <p className="mt-4 max-w-xl text-noir-muted">
        Tell us the product and quantity and our team will get back to you. We are more than happy to send samples.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact/#enquiry" className="rounded-full bg-noir-saffron px-6 py-3 font-semibold text-noir-bg transition hover:bg-[#ffc56b]">
          Send an enquiry
        </Link>
        <a href={catalogueHref()} download className="rounded-full border border-white/20 px-6 py-3 font-medium text-noir-text hover:bg-white/5">
          Download catalogue (PDF)
        </a>
      </div>
    </div>
  );
}
