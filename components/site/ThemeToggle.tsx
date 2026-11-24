"use client";

/** Switches between the dark and light themes and remembers the choice. The no-flash script in the layout applies it on load. */
export function ThemeToggle() {
  const toggle = () => {
    const light = document.documentElement.classList.toggle("light");
    try {
      localStorage.setItem("theme", light ? "light" : "dark");
    } catch {
      // Private mode: the choice simply isn't remembered.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", light ? "#f7f5fd" : "#120e24");
  };
  return (
    <button
      type="button"
      onClick={toggle}
      title="Switch light / dark theme"
      className="grid size-10 place-items-center rounded-full border border-white/15 text-noir-text transition hover:border-noir-orchid"
    >
      <span className="sr-only">Switch between light and dark theme</span>
      {/* Sun shown in dark mode (go light), moon in light mode (go dark). */}
      <svg aria-hidden viewBox="0 0 24 24" className="size-5 light:hidden" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg aria-hidden viewBox="0 0 24 24" className="hidden size-5 light:block" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    </button>
  );
}
