import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://sofxcking.cool"),
  title: "FXCK - So Fxcking Cool | Creative Studio",
  description:
    "FXCK is a minimalist creative studio building cool tools: Lomopic, Wordcounter, Jikan, and 中文简繁体转换器. Click to explore.",
  applicationName: "FXCK",
  keywords: [
    "fxck",
    "creative studio",
    "jikan",
    "lomopic",
    "wordcounter",
    "中文简繁体转换器",
    "minimalist design",
    "geometric art",
    "web tools",
  ],
  authors: [{ name: "FXCK Studio" }],
  creator: "FXCK Studio",
  publisher: "FXCK Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "FXCK - So Fxcking Cool | Creative Studio",
    description:
      "A minimalist creative studio building cool tools: Jikan, Lomopic, Wordcounter, and 中文简繁体转换器.",
    type: "website",
    url: "https://sofxcking.cool/",
    siteName: "FXCK",
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "FXCK - geometric brand preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FXCK - So Fxcking Cool | Creative Studio",
    description:
      "A minimalist creative studio building cool tools: Jikan, Lomopic, Wordcounter, and 中文简繁体转换器.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
