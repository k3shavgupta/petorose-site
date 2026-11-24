"use client";

import { useState } from "react";

/** Loads the Google Maps embed only on request, so the page stays fast and cookie-free by default. */
export function MapFacade({ embedSrc, openHref, address }: { embedSrc: string; openHref: string; address: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-noir-surface sm:aspect-[16/9]">
      {show ? (
        <iframe title={`Map: ${address}`} src={embedSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full border-0" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(139,141,255,0.25),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(227,132,234,0.2),transparent_50%)] p-6 text-center">
          <div>
            <svg aria-hidden viewBox="0 0 24 24" className="mx-auto size-10 text-noir-orchid" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <p className="mt-3 text-noir-text">{address}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShow(true)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-noir-text hover:bg-white/5"
              >
                Show map
              </button>
              <a href={openHref} target="_blank" rel="noopener" className="rounded-full px-4 py-2 text-sm text-noir-orchid underline underline-offset-4">
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
