import type { Metadata } from "next";
import { photoCredits } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits and licences for the photographs used on this website.",
  alternates: { canonical: absoluteUrl("/credits/") },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const entries = Object.entries(photoCredits).sort(([a], [b]) => a.localeCompare(b));
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <h1 className="font-noir-display text-5xl">Photo credits</h1>
      <p className="mt-4 text-noir-muted">
        Product photographs are illustrative and show the natural materials each aroma chemical&rsquo;s profile refers to. They are used
        under the licences listed below.
      </p>
      {entries.length === 0 ? (
        <p className="mt-8 text-noir-muted">All other images © Petorose Alcones Pvt Ltd.</p>
      ) : (
        <table className="mt-8 w-full text-left text-sm">
          <thead className="border-b border-white/15 text-noir-muted">
            <tr>
              <th scope="col" className="py-2 pr-4 font-medium">
                Image
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Photographer
              </th>
              <th scope="col" className="py-2 font-medium">
                Licence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {entries.map(([key, c]) => (
              <tr key={key}>
                <td className="py-3 pr-4">
                  {c.sourceUrl ? (
                    <a href={c.sourceUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-noir-orchid">
                      {c.subject ?? c.title ?? key}
                    </a>
                  ) : (
                    (c.subject ?? key)
                  )}
                </td>
                <td className="py-3 pr-4 text-noir-muted">
                  {c.creatorUrl ? (
                    <a href={c.creatorUrl} target="_blank" rel="noopener" className="hover:text-noir-text">
                      {c.creator}
                    </a>
                  ) : (
                    (c.creator ?? "—")
                  )}
                  {c.source ? ` · ${c.source}` : ""}
                </td>
                <td className="py-3 text-noir-muted">
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener" className="hover:text-noir-text">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
