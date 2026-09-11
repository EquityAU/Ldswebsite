import { Caveat, Cormorant_Garamond, Fraunces, Great_Vibes, Inter, Montserrat, Playfair_Display } from "next/font/google";


export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});


export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});


export const labelScript = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-label-script",
  display: "swap",
});


export const labelSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-label-serif",
  display: "swap",
});


export const labelSans = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-label-sans",
  display: "swap",
});


export const labelHand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-label-hand",
  display: "swap",
});


export const labelClassic = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-label-classic",
  display: "swap",
});


export const fontVariables = [display, body, labelScript, labelSerif, labelSans, labelHand, labelClassic]
  .map((f) => f.variable)
  .join(" ");
