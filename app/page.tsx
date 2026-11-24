import Link from "next/link";

// Temporary until Phase 3 builds the real home page.
export default function Home() {
  return (
    <main className="min-h-dvh bg-noir-bg text-noir-text">
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-noir-orchid">Petorose Alcones · site rebuild</p>
        <h1 className="text-3xl font-semibold">Design preview</h1>
        <p className="text-noir-muted">The new site is being built. The chosen design direction is ready to review.</p>
        <Link
          href="/design-preview"
          className="w-fit rounded-full bg-noir-saffron px-5 py-3 font-semibold text-noir-bg hover:bg-[#ffc56b]"
        >
          Open the design preview →
        </Link>
      </div>
    </main>
  );
}
