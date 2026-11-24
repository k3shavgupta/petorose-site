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

/** The subset of a product that is safe and small enough to ship to client components. */
export type ProductSummary = Pick<
  Product,
  "slug" | "name" | "alsoKnownAs" | "description" | "chemicalName" | "formula" | "cas" | "fema" | "tenacity" | "images" | "catalogue"
>;

export const products = productsJson as unknown as Product[];
export const company = companyJson;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function toSummary(p: Product): ProductSummary {
  const { slug, name, alsoKnownAs, description, chemicalName, formula, cas, fema, tenacity, images, catalogue } = p;
  return { slug, name, alsoKnownAs, description, chemicalName, formula, cas, fema, tenacity, images, catalogue };
}

export const catalogueHref = (pdfPage?: number) =>
  asset(`${company.catalogue.file}${pdfPage ? `#page=${pdfPage}` : ""}`);
