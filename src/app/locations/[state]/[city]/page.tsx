import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2 } from "lucide-react";
import ServiceGrid from "@/components/sections/ServiceGrid";
import AboutContactSplit from "@/components/sections/AboutContactSplit";
import Schema from "@/components/Schema";
import locationsData from "../../../../../data/locations.json";

// ─── Types ──────────────────────────────────────────────────────────────────

interface LocationEntry {
  slug: string;
  stateAbbr: string;
  stateName: string;
  city: string;
  keywords: string[];
}

type PageParams = Promise<{ state: string; city: string }>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findLocation(state: string, city: string): LocationEntry | undefined {
  const expectedSlug = `${state}/${city}`;
  return locationsData.find(
    (loc) => loc.slug.toLowerCase() === expectedSlug.toLowerCase()
  );
}

// ─── generateStaticParams ────────────────────────────────────────────────────

export async function generateStaticParams() {
  return locationsData.map((loc) => {
    const [state, city] = loc.slug.split("/");
    return { state, city };
  });
}

// ─── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { state, city } = await params;
  const location = findLocation(state, city);

  if (!location) {
    return {
      title: "Location Not Found | BHG Safety Partners",
    };
  }

  const title = `Safety Training & OSHA Compliance in ${location.city}, ${location.stateAbbr} | BHG Safety Partners`;
  const description = `BHG Safety Partners provides expert safety consulting, OSHA compliance audits, and onsite safety training in ${location.city}, ${location.stateName}. Protect your workforce and reduce liability today.`;

  return {
    title,
    description,
    keywords: location.keywords,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: `/locations/${state}/${city}`,
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function LocationPage({
  params,
}: {
  params: PageParams;
}) {
  const { state, city } = await params;
  const location = findLocation(state, city);

  if (!location) {
    notFound();
  }

  // ── LocalBusiness JSON-LD (dynamic per city) ────────────────────────────
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BHG Safety Partners",
    url: `https://www.bhgsafetypartners.com/locations/${location.slug}`,
    logo: "https://www.bhgsafetypartners.com/bhg-logo.png",
    image: "https://www.bhgsafetypartners.com/bhg-logo.png",
    telephone: "+15738226448",
    description: `BHG Safety Partners provides expert safety consulting, OSHA compliance audits, and onsite safety training in ${location.city}, ${location.stateName}.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hannibal",
      addressRegion: "MO",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: location.city,
      containedInPlace: {
        "@type": "State",
        name: location.stateName,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Safety Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Safety Consulting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workplace Safety Training" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Onsite Safety Inspections" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compliance Audits" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Safety Program Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trusted Safety Partner" } },
      ],
    },
  };

  return (
    <>
      {/* ── LocalBusiness JSON-LD ── */}
      <Schema data={localBusinessSchema} />

      {/* ── Local Hero ── */}
      <section
        className="relative bg-bhg-black overflow-hidden"
        aria-labelledby="local-hero-heading"
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        {/* Orange gradient glow */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-bhg-orange/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          {/* Location breadcrumb badge */}
          <div className="flex items-center gap-2 mb-6">
            <MapPin
              className="w-4 h-4 text-bhg-orange"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              {location.city}, {location.stateAbbr}
            </span>
          </div>

          {/* Main heading */}
          <h1
            id="local-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
          >
            Expert Safety Consulting &amp; Training in{" "}
            <span className="relative inline-block">
              <span className="text-bhg-orange">{location.city}</span>
            </span>
            ,{" "}
            <span className="text-bhg-orange">{location.stateName}</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            BHG Safety Partners brings decades of hands-on safety expertise
            directly to businesses in {location.city} and the surrounding{" "}
            {location.stateName} region. OSHA compliance, training, audits, and
            more — we protect your people.
          </p>

          {/* Trust signals */}
          <ul className="mt-10 flex flex-wrap gap-4" role="list">
            {[
              "OSHA-Aligned Training",
              "Onsite Inspections",
              "Compliance Audits",
              "No Long-Term Contracts",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              >
                <CheckCircle2
                  className="w-4 h-4 text-bhg-orange flex-shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="mt-10">
            <a
              href="#contact-form-card"
              id={`local-cta-${state}-${city}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* ── Service Grid ── */}
      <ServiceGrid />

      {/* ── About + Contact Form ── */}
      <AboutContactSplit />
    </>
  );
}
