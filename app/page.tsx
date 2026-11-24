import Link from "next/link";

// Temporary until Phase 3 builds the real home page.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 p-8">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">Petorose Alcones · site rebuild</p>
      <h1 className="text-3xl font-semibold">Design preview in progress</h1>
      <p className="text-neutral-600">The new site is being built. Two visual directions are ready to compare.</p>
      <Link href="/design-preview" className="w-fit rounded-full bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-700">
        Open the design preview →
      </Link>
    </main>
  );
}
