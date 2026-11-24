"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/products/", label: "Products" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header({ catalogueHref }: { catalogueHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-noir-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-lg" aria-label="Petorose Alcones, home">
          <span className="grid size-9 place-items-center rounded-xl bg-white p-1">
            <Image src="/assets/img/site/petroselogo.jpg" alt="" width={28} height={28} />
          </span>
          <span className="font-noir-display text-lg leading-none tracking-wide">
            Petorose <span className="text-noir-orchid">Alcones</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-noir-text ${
                isActive(n.href) ? "text-noir-text" : "text-noir-muted"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <a href={catalogueHref} download className="rounded-full px-4 py-2 text-noir-muted transition hover:bg-white/5 hover:text-noir-text">
            Catalogue <span aria-hidden>↓</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact/#enquiry"
            className="rounded-full bg-noir-saffron px-4 py-2 text-sm font-semibold text-noir-bg transition hover:bg-[#ffc56b]"
          >
            Enquire
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-10 place-items-center rounded-full border border-white/15 md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 px-5 pb-5 md:hidden">
          <ul className="flex flex-col pt-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  onClick={() => setOpen(false)}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className="block rounded-xl px-3 py-3 text-base text-noir-text hover:bg-white/5"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={catalogueHref} download onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base text-noir-text hover:bg-white/5">
                Download catalogue (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
