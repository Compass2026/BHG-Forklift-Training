import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2 } from "lucide-react";
import ServiceGrid from "@/components/sections/ServiceGrid";
import AboutContactSplit from "@/components/sections/AboutContactSplit";
import Schema from "@/components/Schema";
import locationsData from "../../../../../data/locations.json";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, postalAddress } from "@/lib/schema";
import forkliftClasses from "../../../../../data/classes.json";

// ─── Types ──────────────────────────────────────────────────────────────────

interface LocationEntry {
  slug: string;
  stateAbbr: string;
  stateName: string;
  stateSlug: string;
  city: string;
  keywords: string[];
}

type PageParams = Promise<{ state: string; city: string }>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Longest title that fits in 65 characters for this city. */
function cityTitle(city: string, stateAbbr: string): string {
  const candidates = [
    `Forklift Training & Certification in ${city}, ${stateAbbr} | BHG`,
    `Forklift Training in ${city}, ${stateAbbr} | BHG Forklift Training`,
    `Forklift Training in ${city}, ${stateAbbr} | BHG`,
    `Forklift Training in ${city}, ${stateAbbr}`,
  ];
  return candidates.find((t) => t.length <= 65) ?? candidates[candidates.length - 1];
}

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

  if (!location) return {};

  const title = cityTitle(location.city, location.stateAbbr);
  const description = `Onsite forklift operator training and OSHA evaluations in ${location.city}, ${location.stateName}, for truck Classes 1–7 on your own equipment.`;

  return {
    title,
    description,
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
    name: SITE_NAME,
    url: `${SITE_URL}/locations/${location.slug}`,
    logo: `${SITE_URL}/bhg-logo.png`,
    image: `${SITE_URL}/bhg-logo.png`,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    description: `Onsite forklift operator training and evaluations in ${location.city}, ${location.stateName}.`,
    address: postalAddress,
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
      name: "Forklift Operator Training",
      itemListElement: forkliftClasses.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.title,
          url: `${SITE_URL}/classes/${c.slug}`,
        },
      })),
    },
  };

  return (
    <>
      {/* ── LocalBusiness + BreadcrumbList JSON-LD ── */}
      <Schema data={localBusinessSchema} />
      <Schema
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: location.stateName, path: `/locations/${location.stateSlug}` },
          { name: location.city, path: `/locations/${location.slug}` },
        ])}
      />

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
            Onsite Forklift Training in{" "}
            <span className="relative inline-block">
              <span className="text-bhg-orange">{location.city}</span>
            </span>
            ,{" "}
            <span className="text-bhg-orange">{location.stateName}</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            BHG Forklift Training brings operator training and hands-on
            evaluations to warehouses, plants and job sites in {location.city}{" "}
            and the surrounding {location.stateName} region, on the trucks your
            team already runs.
          </p>

          {/* Trust signals */}
          <ul className="mt-10 flex flex-wrap gap-4" role="list">
            {[
              "OSHA Classes 1–7",
              "Training at Your Facility",
              "Hands-On Evaluations",
              "Certification Records",
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
              Request Forklift Training
            </a>
          </div>
        </div>
      </section>

      {/* ── Service Grid ── */}
      <ServiceGrid />

      {/* ── About + Contact Form ── */}
      <AboutContactSplit
        source={`the ${location.city}, ${location.stateAbbr} location page`}
      />
    </>
  );
}
