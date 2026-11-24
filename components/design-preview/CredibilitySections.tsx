import { LazyVideo } from "./LazyVideo";

// Every claim below is quoted or tightened from a source listed in content/INVENTORY.md; `source` is shown on hover.
const PROOF = [
  { value: "Early 1970s", label: "Management roots in pioneering India’s mint industry", source: "Catalogue, About" },
  { value: "India’s first", label: "manufacturer of purest Anethole", source: "Old website, About" },
  { value: "39", label: "specialty aroma chemicals for fragrance and flavour", source: "Catalogue, April 2025" },
  { value: "~1 hour", label: "from Delhi’s IGI Airport to our Bhiwadi facility", source: "Old website, About" },
];

const STEPS = [
  {
    title: "Designed in the lab",
    body: "Our specialty aroma chemicals are designed in the lab to imitate the properties of their naturally occurring counterparts, adding longevity and strength in application.",
    photo: "R&D lab",
    source: "Catalogue, About",
  },
  {
    title: "Developed by experts",
    body: "Every product is developed under the supervision of highly qualified scientists and lab experts.",
    photo: "Scientists at work",
    source: "Catalogue, About",
  },
  {
    title: "Made in Bhiwadi",
    body: "Manufactured in an all-compliant, international-grade facility in the RIICO Industrial Area, Bhiwadi, Rajasthan.",
    photo: "Plant exterior and production floor",
    source: "Catalogue and website, About",
  },
  {
    title: "Tested and certified",
    body: "Every product is rigorously tested before it reaches you, with certifications such as Kosher and Halal available product by product.",
    photo: "QC lab and finished product",
    source: "Feature video; catalogue, About",
  },
];

const CERTS = ["ISO 9001:2015", "ISO 22000:2018", "ISO 14001:2015", "Kosher", "Halal", "FSSAI", "US FDA registered"];

export function CredibilitySections({ video }: { video: { file: string; poster: string; duration: string; captions?: string } }) {
  return (
    <div className="space-y-16 text-noir-text">
      {/* Proof strip */}
      <dl className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map((p) => (
          <div key={p.value} title={`Source: ${p.source}`} className="bg-noir-surface p-6">
            <dt className="font-noir-display text-4xl font-light text-noir-orchid">{p.value}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-noir-muted">{p.label}</dd>
          </div>
        ))}
      </dl>

      {/* How we make it */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">How we make it</p>
        <h4 className="mt-2 max-w-2xl font-noir-display text-4xl sm:text-5xl">Designed in the lab, made in Rajasthan</h4>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <div
                role="img"
                aria-label={`Placeholder: photo of ${s.photo} needed`}
                className="relative grid aspect-[4/3] place-items-center md:aspect-[4/5] overflow-hidden rounded-[999px_999px_1.25rem_1.25rem] border border-dashed border-noir-periwinkle/50 bg-[radial-gradient(circle_at_30%_20%,rgba(139,141,255,0.25),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(227,132,234,0.2),transparent_55%)] p-6 text-center"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-noir-muted">
                  Photo needed
                  <span className="mt-1 block font-noir-display text-lg normal-case tracking-normal text-noir-text">{s.photo}</span>
                </span>
              </div>
              <p className="mt-5 font-mono text-xs text-noir-periwinkle">0{i + 1}</p>
              <h5 className="mt-1 text-xl font-semibold">{s.title}</h5>
              <p className="mt-2 text-sm leading-relaxed text-noir-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Certifications */}
      <div className="rounded-3xl border border-white/10 bg-noir-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="font-noir-display text-2xl">Certifications</h4>
          <p className="rounded-full bg-noir-saffron/15 px-3 py-1 text-xs font-medium text-noir-saffron">
            Design only: every certificate on file has expired, so this goes live with current copies
          </p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <li key={c} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
              <svg aria-hidden viewBox="0 0 24 24" className="size-4 text-noir-orchid" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Video */}
      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <LazyVideo src={video.file} poster={video.poster} title="Meet Petorose Alcones" duration={video.duration} captions={video.captions} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir-orchid">Feature video</p>
          <h4 className="mt-2 font-noir-display text-3xl">Pioneering Mints &amp; Innovating Aromas</h4>
          <p className="mt-3 text-sm leading-relaxed text-noir-muted">
            The existing 2-minute introduction. It loads only when pressed, so it costs nothing on page speed.
          </p>
        </div>
      </div>
    </div>
  );
}
