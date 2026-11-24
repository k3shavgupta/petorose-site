import { contrastRatio, wcagLabel } from "@/lib/color";

export interface Swatch {
  name: string;
  hex: string;
  role: string;
  /** Background or surface colour: contrast against the page background is not meaningful. */
  surface?: boolean;
}

/** Colour chips with their measured WCAG contrast against the direction's page background. */
export function Palette({ swatches, background, dark }: { swatches: Swatch[]; background: string; dark?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {swatches.map((s) => {
        const ratio = contrastRatio(s.hex, background);
        return (
          <li key={s.hex} className={`overflow-hidden rounded-2xl border ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"}`}>
            <div className="h-20 border-b border-black/5" style={{ backgroundColor: s.hex }} />
            <div className="p-3 text-xs">
              <p className="font-semibold">{s.name}</p>
              <p className={`font-mono ${dark ? "text-white/70" : "text-black/60"}`}>{s.hex.toUpperCase()}</p>
              <p className={`mt-1 ${dark ? "text-white/70" : "text-black/60"}`}>{s.role}</p>
              {!s.surface && (
                <p className={`mt-1 font-mono ${dark ? "text-white/80" : "text-black/70"}`}>
                  {ratio.toFixed(1)}:1 · {wcagLabel(ratio)}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
