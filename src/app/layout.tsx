import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events On Charles - Elegant Event Space in Baltimore",
  description: "Create unforgettable memories at Events On Charles - your premier event venue on historic Charles Street in Baltimore. Perfect for weddings, celebrations, and corporate events.",
  keywords: "event space, venue rental, Baltimore events, Charles Street venue, weddings, corporate events, celebrations",
  openGraph: {
    title: "Events On Charles - Elegant Event Space in Baltimore",
    description: "Create unforgettable memories at Events On Charles - your premier event venue on historic Charles Street in Baltimore.",
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
