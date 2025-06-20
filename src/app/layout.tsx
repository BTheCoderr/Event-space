import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events On Charles - Premier Event Venue in Providence, RI",
  description: "Where your most treasured moments come to life. Our elegant event space provides the perfect setting for weddings, celebrations, and corporate gatherings in historic Providence, Rhode Island.",
  keywords: "event venue, wedding venue, Providence RI, event space, corporate events, celebrations, Charles Street",
  authors: [{ name: "Events On Charles" }],
  openGraph: {
    title: "Events On Charles - Premier Event Venue",
    description: "Elegant event space in historic Providence, Rhode Island",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events On Charles - Premier Event Venue",
    description: "Elegant event space in historic Providence, Rhode Island",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
