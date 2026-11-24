import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="font-mono text-sm text-noir-orchid">404</p>
      <h1 className="mt-2 font-noir-display text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-noir-muted">The page you are looking for has moved or no longer exists.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/products/" className="rounded-full bg-noir-saffron px-5 py-2.5 font-semibold text-noir-on-accent hover:bg-[#ffc56b]">
          Browse products
        </Link>
        <Link href="/" className="rounded-full border border-white/20 px-5 py-2.5 hover:bg-white/5">
          Home
        </Link>
      </div>
    </div>
  );
}
