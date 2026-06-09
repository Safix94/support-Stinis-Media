import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stinis Media Support",
  description: "Meld snel een probleem met je website bij Stinis Media.",
  metadataBase: new URL("https://support.stinismedia.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>{children}</body>
    </html>
  );
}
