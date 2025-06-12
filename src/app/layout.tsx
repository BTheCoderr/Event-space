import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elite Event Spaces - Premium Venue Rentals",
  description: "Discover and book premium event spaces for your special occasions. From intimate gatherings to corporate events, find the perfect venue with our modern amenities and professional service.",
  keywords: "event space, venue rental, corporate events, weddings, party hall, conference room",
  openGraph: {
    title: "Elite Event Spaces - Premium Venue Rentals",
    description: "Discover and book premium event spaces for your special occasions.",
    type: "website",
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
      </body>
    </html>
  );
}
