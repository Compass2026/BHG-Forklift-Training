import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="compass-ga4" strategy="afterInteractive">{`(function () {
  if (!["bhgforklifttraining.com","www.bhgforklifttraining.com"].includes(window.location.hostname)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-KX0T01CER5');
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KX0T01CER5';
  document.head.appendChild(script);
})();`}</Script>
      </body>
    </html>
  );
}
