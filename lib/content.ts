import fs from "node:fs";
import path from "node:path";
import productsJson from "@/content/products.json";
import companyJson from "@/content/company.json";
import { asset } from "./base-path";

export type ComplianceMark = boolean | null;

export interface Product {
  slug: string;
  name: string;
  alsoKnownAs: string | null;
  description: string | null;
  chemicalName: string | null;
  formula: string | null;
  cas: string | null;
  fema: string | null;
  tenacity: string | null;
  applications: string;
  videoNote: string | null;
  compliance: {
    foodGrade: ComplianceMark;
    kosher: ComplianceMark;
    gmo: ComplianceMark;
    source: string;
    needsConfirmation: boolean;
  };
  images: { product: string | null; structure: string | null };
  catalogue: { sNo: number; page: number; pdfPage: number };
  flags: string[];
}

export interface PhotoCredit {
  file: string;
  subject?: string;
  title?: string;
  creator?: string;
  creatorUrl?: string;
  license?: string;
  licenseUrl?: string;
  source?: string;
  sourceUrl?: string;
}

/** The subset of a product shipped to client components. `photo` is already resolved. */
export interface ProductSummary {
  slug: string;
  name: string;
  alsoKnownAs: string | null;
  description: string | null;
  chemicalName: string | null;
  formula: string | null;
  cas: string | null;
  fema: string | null;
  tenacity: string | null;
  photo: string;
  catalogue: { sNo: number; page: number; pdfPage: number };
}

export const products = productsJson as unknown as Product[];
export const company = companyJson;

// Licensed photos (scripts/… sourcing step) override the old site's product images when present.
// Read at build time so the site still builds before any photos exist.
function readCredits(): Record<string, PhotoCredit> {
  try {
    const file = path.join(process.cwd(), "content/image-credits.json");
    const all = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, PhotoCredit>;
    return Object.fromEntries(
      Object.entries(all).filter(([, c]) => c?.file && fs.existsSync(path.join(process.cwd(), "public", c.file))),
    );
  } catch {
    return {};
  }
}
export const photoCredits = readCredits();

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Photo for a product: licensed photo if available, else the image from the old site. */
export function productPhoto(p: Product): string {
  return photoCredits[p.slug]?.file ?? p.images.product ?? "/assets/img/site/banner.png";
}

export function brandPhoto(key: "hero-bloom" | "oils-glassware" | "botanicals-flatlay"): PhotoCredit | undefined {
  return photoCredits[key];
}

export function toSummary(p: Product): ProductSummary {
  const { slug, name, alsoKnownAs, description, chemicalName, formula, cas, fema, tenacity, catalogue } = p;
  return { slug, name, alsoKnownAs, description, chemicalName, formula, cas, fema, tenacity, catalogue, photo: productPhoto(p) };
}

/** Application text from sources, or null while it is still a TODO. */
export function knownApplications(p: Product): string | null {
  if (!p.applications || p.applications.startsWith("TODO")) return null;
  return p.applications.split(" (source")[0];
}

export const catalogueHref = (pdfPage?: number) => asset(`${company.catalogue.file}${pdfPage ? `#page=${pdfPage}` : ""}`);

export const phones = company.phones;
export const primaryPhone = company.phones[0];
export const email = company.email;
export const whatsappNumber = /^\+\d{8,15}$/.test(company.whatsapp?.number ?? "") ? company.whatsapp.number : null;
export const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Petorose Alcones, I have an enquiry about your aroma chemicals.")}`
  : null;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.display)}`;
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address.display)}&output=embed`;
