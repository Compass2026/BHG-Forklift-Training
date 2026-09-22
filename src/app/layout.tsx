import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import MobileQuoteButton from "@/components/MobileQuoteButton";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Onsite Forklift Training & Certification | BHG Forklift Training",
  description:
    "Onsite, OSHA-aligned forklift operator training and evaluations for Classes 1–7 at your facility. Based in Hannibal, MO, serving employers in 17 states.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-bhg-black">
        <Schema data={organizationSchema()} />
        <Navbar />
        <main className="flex-1 pt-[100px]">{children}</main>
        <Footer />
        <MobileQuoteButton />
      </body>
    </html>
  );
}
