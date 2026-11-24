import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.petorosealcones.com"),
  title: { default: "Petorose Alcones Pvt Ltd — Innovating Aromas", template: "%s | Petorose Alcones" },
  description:
    "Petorose Alcones Pvt Ltd, formerly Banwari Chemicals Pvt Ltd, manufactures aroma chemicals and aroma ingredients in Bhiwadi, Rajasthan. Part of the Banwari Group.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
