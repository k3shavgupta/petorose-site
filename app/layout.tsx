import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/site/JsonLd";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { asset } from "@/lib/base-path";
import { catalogueHref, company, email, phones, whatsappHref } from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz", "SOFT"], display: "swap" });

// Bump when public/og-image.jpg changes so WhatsApp, LinkedIn etc. fetch the new image.
const OG_IMAGE = "/og-image.jpg?v=2";

const DESCRIPTION =
  "Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, manufactures specialty aroma chemicals and aroma ingredients in Bhiwadi, Rajasthan, India. Part of the Banwari Group.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: "Petorose Alcones — Innovating Aromas | Aroma chemicals manufacturer, India", template: "%s | Petorose Alcones" },
  description: DESCRIPTION,
  applicationName: "Petorose Alcones",
  openGraph: {
    type: "website",
    siteName: "Petorose Alcones",
    locale: "en_IN",
    url: absoluteUrl("/"),
    title: "Petorose Alcones — Innovating Aromas",
    description: DESCRIPTION,
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Petorose Alcones — Innovating Aromas" }],
  },
  twitter: { card: "summary_large_image", title: "Petorose Alcones — Innovating Aromas", description: DESCRIPTION, images: [absoluteUrl(OG_IMAGE)] },
  icons: { icon: asset("/favicon.ico"), apple: asset("/assets/site-meta/logo192.png") },
};

export const viewport: Viewport = { themeColor: "#120e24", colorScheme: "dark light" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: company.name,
  legalName: company.legalName,
  alternateName: company.formerName,
  slogan: company.tagline,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/assets/site-meta/logo512.png"),
  email,
  telephone: phones.map((p) => p.e164),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.streetAddress,
    addressLocality: company.address.addressLocality,
    addressRegion: company.address.addressRegion,
    postalCode: company.address.postalCode,
    addressCountry: company.address.addressCountry,
  },
  parentOrganization: { "@type": "Organization", name: company.group.name, url: company.group.url },
  contactPoint: phones.map((p) => ({ "@type": "ContactPoint", telephone: p.e164, email, contactType: "sales", areaServed: "Worldwide", availableLanguage: ["en", "hi"] })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-noir-bg font-noir-body text-noir-text">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-noir-saffron px-4 py-2 font-semibold text-noir-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <Header catalogueHref={catalogueHref()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {whatsappHref && <WhatsAppButton href={whatsappHref} />}
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
