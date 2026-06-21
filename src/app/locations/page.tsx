import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import locationsData from "../../../data/locations.json";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LocationEntry {
  slug: string;
  stateAbbr: string;
  stateName: string;
  stateSlug: string;
  city: string;
  keywords: string[];
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Midwest Locations We Serve | BHG Safety Partners",
  description:
    "BHG Safety Partners delivers onsite safety training and OSHA compliance consulting across Missouri, Illinois, and the broader Midwest. Find your area and get a free consultation today.",
  keywords: [
    "midwest safety consulting locations",
    "Missouri safety training",
    "Illinois OSHA compliance",
    "onsite safety training near me",
    "BHG Safety service area",
  ],
  openGraph: {
    title: "Midwest Locations We Serve | BHG Safety Partners",
    description:
      "Onsite safety training and OSHA compliance across Missouri, Illinois, and the Midwest.",
    type: "website",
  },
  alternates: {
    canonical: "/locations",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Groups location entries by stateName */
function groupByState(
  locations: LocationEntry[]
): Record<string, LocationEntry[]> {
  return locations.reduce(
    (acc, loc) => {
      if (!acc[loc.stateName]) acc[loc.stateName] = [];
      acc[loc.stateName].push(loc);
      return acc;
    },
    {} as Record<string, LocationEntry[]>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LocationsPage() {
  const grouped = groupByState(locationsData as LocationEntry[]);
  const stateNames = Object.keys(grouped).sort();

  return (
    <>
      {/* ── Page Header ── */}
      <section
        className="relative bg-bhg-black overflow-hidden"
        aria-labelledby="locations-heading"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-bhg-orange" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              Service Areas
            </span>
          </div>
          <h1
            id="locations-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Midwest Areas{" "}
            <span className="text-bhg-orange">We Serve</span>
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            We bring expert safety training and OSHA compliance consulting
            directly to your facility — no travel hassle for your team.
          </p>
        </div>
      </section>

      {/* ── Location Grid by State ── */}
      <section
        className="bg-bhg-gray-light py-24"
        aria-labelledby="locations-grid-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="locations-grid-heading" className="sr-only">
            Locations by State
          </h2>

          <div className="space-y-16">
            {stateNames.map((stateName) => {
              const cities = grouped[stateName];
              const stateSlug = cities[0]?.stateSlug ?? stateName.toLowerCase().replace(/\s+/g, "-");

              return (
                <div key={stateName}>
                  {/* State header */}
                  <div className="flex items-center gap-4 mb-8">
                    <Link
                      href={`/locations/${stateSlug}`}
                      className="text-xs font-semibold tracking-widest uppercase text-bhg-orange hover:underline underline-offset-2"
                    >
                      {stateName}
                    </Link>
                    <span className="flex-1 h-px bg-gray-200" />
                    <Link
                      href={`/locations/${stateSlug}`}
                      className="text-xs text-gray-400 hover:text-bhg-orange transition-colors"
                    >
                      {cities.length} {cities.length === 1 ? "area" : "areas"} →
                    </Link>
                  </div>

                  {/* City cards */}
                  <ul
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    role="list"
                  >
                    {cities.map((loc) => {
                      const [stateSlug, citySlug] = loc.slug.split("/");
                      return (
                        <li key={loc.slug}>
                          <Link
                            href={`/locations/${stateSlug}/${citySlug}`}
                            id={`location-link-${loc.slug.replace("/", "-")}`}
                            className="group flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 hover:shadow-md hover:border-bhg-orange/30 hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-bhg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-bhg-orange/20 transition-colors">
                                <MapPin
                                  className="w-4 h-4 text-bhg-orange"
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-bhg-black group-hover:text-bhg-orange transition-colors">
                                  {loc.city}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {loc.stateAbbr}
                                </p>
                              </div>
                            </div>
                            <ArrowRight
                              className="w-4 h-4 text-bhg-orange flex-shrink-0 group-hover:translate-x-1 transition-transform"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <p className="text-bhg-gray-dark mb-6 text-base">
              Don&apos;t see your area? We serve businesses nationwide —
              let&apos;s talk.
            </p>
            <Link
              href="/contact"
              id="locations-cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Request a Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
