import type { ProductSummary } from "@/lib/content";

const fold = (s: string | null | undefined) =>
  (s ?? "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

/**
 * Ranks products against a free-text query. Matches name and alias first, then CAS
 * (digits only, so "13481873" finds "13481-87-3"), then chemical name, formula and description.
 */
export function searchProducts<T extends ProductSummary>(items: T[], query: string): T[] {
  const q = fold(query).trim();
  if (!q) return items;
  const qDigits = q.replace(/[^0-9]/g, "");
  const scored: { p: T; score: number }[] = [];
  for (const p of items) {
    let score = 0;
    const name = fold(p.name);
    if (name.startsWith(q)) score += 100;
    else if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(name)) score += 60;
    // Mid-word hits ("rose" in "Prosethyl") rank below genuine odour-note matches in descriptions.
    else if (name.includes(q)) score += 8;
    if (fold(p.alsoKnownAs).includes(q)) score += 40;
    if (qDigits.length >= 3 && (p.cas ?? "").replace(/[^0-9]/g, "").includes(qDigits)) score += 80;
    if (fold(p.chemicalName).includes(q) || fold(p.formula) === q) score += 30;
    if (fold(p.description).includes(q)) score += 10;
    if (score) scored.push({ p, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name)).map((s) => s.p);
}

/** "> 350 HOURS" → "> 350 hours". Display only: the value itself is never changed. */
export function formatTenacity(t: string | null): string | null {
  if (!t) return null;
  return t.replace(/\b(HOURS|DAYS)\b/g, (m) => m.toLowerCase()).replace(/^>\s*/, "> ");
}

/** Approximate tenacity in hours, for drawing a relative bar. Ranges use their upper bound. */
export function tenacityHours(t: string | null): number | null {
  if (!t) return null;
  const m = /([\d.]+)(?:\s*-\s*([\d.]+))?\s*(hours?|days?)/i.exec(t);
  if (!m) return null;
  const n = Number(m[2] ?? m[1]);
  return /day/i.test(m[3]) ? n * 24 : n;
}

/** 0–1 position on a log scale from 1 hour to 30 days (the longest value in the catalogue). */
export function tenacityRatio(t: string | null): number {
  const h = tenacityHours(t);
  if (!h) return 0;
  return Math.min(1, Math.max(0.04, Math.log(h) / Math.log(720)));
}

/** Renders chemical formulas with subscript digits, e.g. C10H18O2. */
export function formulaParts(formula: string | null): { text: string; sub: boolean }[] {
  if (!formula) return [];
  return formula.split(/(\d+)/).filter(Boolean).map((text) => ({ text, sub: /^\d+$/.test(text) }));
}

/**
 * Odour-note filters. A product matches when its own description mentions one of the words,
 * so the filter never assigns a category the sources don't state.
 */
export const NOTE_FILTERS: { id: string; label: string; words: string[] }[] = [
  { id: "floral", label: "Floral", words: ["floral", "flower", "jasmin", "rose", "hyacinth", "tuberose", "neroli", "orris", "violet", "lilac", "gardenia", "osmanthus"] },
  { id: "fruity", label: "Fruity", words: ["fruit", "peach", "melon", "apple", "berry", "berries", "coconut", "pear", "tropical"] },
  { id: "citrus", label: "Citrus", words: ["citrus", "grapefruit", "orange", "bergamot", "lemon"] },
  { id: "green", label: "Green & herbal", words: ["green", "herb", "basil", "tarragon", "rosemary", "lavender", "celery", "sage", "galbanum"] },
  { id: "spicy", label: "Spicy", words: ["spic", "clove", "anis", "liquorice", "pepper"] },
  { id: "woody", label: "Woody", words: ["wood", "sandalwood", "vetiver"] },
  { id: "sweet", label: "Sweet & gourmand", words: ["vanilla", "caramel", "nutty", "nuts", "honey", "cocoa", "chocolate", "tonka", "rum", "maple", "creamy"] },
  { id: "musky", label: "Musky & animalic", words: ["musk", "animalic", "leather"] },
  { id: "marine", label: "Marine & fresh", words: ["marine", "ozonic", "watery", "fresh"] },
];

export function matchesNote(description: string | null, noteId: string): boolean {
  const note = NOTE_FILTERS.find((n) => n.id === noteId);
  const d = (description ?? "").toLowerCase();
  return !!note && note.words.some((w) => d.includes(w));
}
