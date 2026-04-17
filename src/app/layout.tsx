import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WpMarkSymbol } from "@/components/shared/WpMark";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordPress",
  description: "The open source publishing platform of choice for millions of websites worldwide.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <WpMarkSymbol />
        {children}
      </body>
    </html>
  );
}
