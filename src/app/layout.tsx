import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { site } from "@/lib/site";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: profile.summary,
  applicationName: "Ivan Ilanić — Portfolio",
  authors: [{ name: site.name, ...(site.url && { url: site.url }) }],
  creator: site.name,
  ...(site.url && {
    metadataBase: new URL(site.url),
    alternates: { canonical: "/" },
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    title: site.title,
    description: profile.summary,
    siteName: "Ivan Ilanić — Portfolio",
    locale: "en_US",
    ...(site.url && { url: site.url }),
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: profile.summary,
  },
  ...(site.googleVerification && {
    verification: { google: site.googleVerification },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
