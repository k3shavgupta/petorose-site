import { Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });

export const jbmono = JetBrains_Mono({ variable: "--font-jbmono", subsets: ["latin"], display: "swap" });
