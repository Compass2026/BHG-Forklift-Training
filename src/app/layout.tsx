import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import MobileQuoteButton from "@/components/MobileQuoteButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BHG Safety Partners | Safety Training & Compliance Experts",
  description:
    "BHG Safety Partners delivers industry-leading safety training, OSHA compliance, and workplace hazard assessments to protect your workforce and your business.",
  keywords: [
    "safety training",
    "OSHA compliance",
    "workplace safety",
    "BHG Safety",
    "safety consulting",
  ],
  openGraph: {
    title: "BHG Safety Partners | Safety Training & Compliance Experts",
    description:
      "Industry-leading safety training and OSHA compliance services for businesses of all sizes.",
    type: "website",
  },
};

// ─── Global Organization Schema ──────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BHG Safety Partners",
  url: "https://www.bhgsafetypartners.com",
  logo: "https://www.bhgsafetypartners.com/bhg-logo.png",
  description:
    "BHG Safety Partners delivers expert safety consulting, OSHA compliance audits, onsite safety training, and safety program development to businesses across Missouri, Illinois, and the Midwest.",
  telephone: "+15738226448",
  email: "office@bhgspllc.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hannibal",
    addressRegion: "MO",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+15738226448",
    email: "office@bhgspllc.com",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/bhgsafetypartners",
    "https://www.linkedin.com/company/bhg-safety-partners",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-bhg-black">
        <Schema data={organizationSchema} />
        <Navbar />
        <main className="flex-1 pt-[100px]">{children}</main>
        <Footer />
        <MobileQuoteButton />
      </body>
    </html>
  );
}
