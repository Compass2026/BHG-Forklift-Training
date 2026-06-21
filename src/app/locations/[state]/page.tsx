import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, ChevronRight } from "lucide-react";
import locationsData from "../../../../data/locations.json";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LocationEntry {
  slug: string;
  stateAbbr: string;
  stateName: string;
  stateSlug: string;
  city: string;
  keywords: string[];
}

interface PageProps {
  params: Promise<{ state: string }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sortCitiesAlpha(cities: LocationEntry[]): LocationEntry[] {
  return [...cities].sort((a, b) => a.city.localeCompare(b.city));
}

function getCitiesByStateSlug(stateSlug: string): LocationEntry[] {
  return (locationsData as LocationEntry[]).filter(
    (loc) => loc.stateSlug === stateSlug
  );
}

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = [
    ...new Set(
      (locationsData as LocationEntry[]).map((loc) => loc.stateSlug)
    ),
  ];
  return slugs.map((s) => ({ state: s }));
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const cities = getCitiesByStateSlug(stateSlug);
  if (!cities.length) return {};

  const { stateName, stateAbbr } = cities[0];

  return {
    title: `Safety Training & Consulting in ${stateName} | BHG Safety Partners`,
    description: `BHG Safety Partners delivers onsite OSHA safety training and compliance consulting across ${cities.length} cities in ${stateName}. Find your city and request a free consultation.`,
    keywords: [
      `${stateName} safety training`,
      `${stateAbbr} OSHA compliance`,
      `onsite safety consulting ${stateName}`,
      `workplace safety ${stateName}`,
      `BHG Safety ${stateName}`,
    ],
    openGraph: {
      title: `Safety Training & Consulting in ${stateName} | BHG Safety Partners`,
      description: `Expert onsite safety training across ${cities.length} cities in ${stateName}.`,
      type: "website",
    },
    alternates: {
      canonical: `/locations/${stateSlug}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StateHubPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const raw = getCitiesByStateSlug(stateSlug);

  if (!raw.length) notFound();

  const { stateName, stateAbbr } = raw[0];
  const cities = sortCitiesAlpha(raw);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <nav
        className="bg-white border-b border-gray-100 pt-24"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-bhg-orange transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <Link
            href="/locations"
            className="hover:text-bhg-orange transition-colors"
          >
            Locations
          </Link>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <span className="text-bhg-gray-dark font-medium">{stateName}</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative bg-bhg-black overflow-hidden"
        aria-labelledby="state-hero-heading"
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Orange glow */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-bhg-orange/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          {/* State abbr badge */}
          <div className="inline-flex items-center gap-2 bg-bhg-orange/10 border border-bhg-orange/20 rounded-full px-4 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-bhg-orange" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              {stateAbbr} · {cities.length} Cities
            </span>
          </div>

          <h1
            id="state-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Safety Training &amp; Consulting{" "}
            <span className="text-bhg-orange">in {stateName}</span>
          </h1>

          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            BHG Safety Partners brings expert OSHA compliance, onsite safety
            training, and industrial hygiene consulting directly to your
            facility anywhere in {stateName}.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Request a Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+15738226448"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm transition-all duration-200"
            >
              (573) 822-6448
            </a>
          </div>
        </div>
      </section>

      {/* ── City Grid ── */}
      <section
        className="bg-bhg-gray-light py-20"
        aria-labelledby="city-grid-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <h2
              id="city-grid-heading"
              className="text-2xl font-bold text-bhg-black"
            >
              Cities We Serve in {stateName}
            </h2>
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 tabular-nums">
              {cities.length} locations
            </span>
          </div>

          {/* Alphabetical grid */}
          <ul
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1"
            role="list"
          >
            {cities.map((loc) => {
              const [, citySlug] = loc.slug.split("/");
              return (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${stateSlug}/${citySlug}`}
                    id={`city-link-${loc.slug.replace("/", "-")}`}
                    className="group flex items-center gap-2 py-2 px-1 text-sm text-bhg-gray-dark hover:text-bhg-orange transition-colors duration-150"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-bhg-orange/30 flex-shrink-0 group-hover:bg-bhg-orange transition-colors duration-150"
                      aria-hidden="true"
                    />
                    {loc.city}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-bhg-gray-dark mb-2 text-base">
            Don&apos;t see your city? We serve businesses across all of{" "}
            {stateName} and the broader Midwest.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Contact us and we&apos;ll come to you.
          </p>
          <Link
            href="/contact"
            id="state-hub-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
