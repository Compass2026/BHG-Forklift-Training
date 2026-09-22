import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, ChevronRight } from "lucide-react";
import Schema from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";
import classesData from "../../../../data/classes.json";
import {
  findServiceState,
  getLiveCitiesByState,
  serviceStates,
} from "@/lib/locations";

interface PageProps {
  params: Promise<{ state: string }>;
}

// ─── Static Params ────────────────────────────────────────────────────────────

// All 17 service-area states keep a hub, even before their first city page.
export const dynamicParams = false;

export async function generateStaticParams() {
  return serviceStates.map((s) => ({ state: s.stateSlug }));
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const serviceState = findServiceState(stateSlug);
  if (!serviceState) return {};

  const { stateName } = serviceState;
  const title = `Forklift Training & Certification in ${stateName} | BHG`;
  const description = `Onsite forklift operator training and hands-on OSHA evaluations for employers across ${stateName}, covering truck Classes 1–7 at your own facility.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: `/locations/${stateSlug}`,
    },
  };
}
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StateHubPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const serviceState = findServiceState(stateSlug);

  if (!serviceState) notFound();

  const { stateName, stateAbbr } = serviceState;
  const cities = getLiveCitiesByState(stateSlug);

  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: stateName, path: `/locations/${stateSlug}` },
  ]);

  return (
    <>
      <Schema data={crumbs} />
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
              {stateAbbr} · Service Area
            </span>
          </div>

          <h1
            id="state-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Forklift Training{" "}
            <span className="text-bhg-orange">in {stateName}</span>
          </h1>

          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            BHG Forklift Training brings forklift operator training and
            hands-on evaluations for OSHA truck Classes 1–7 to your facility
            anywhere in {stateName}.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Request Forklift Training
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-sm transition-all duration-200"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── City Pages ── */}
      {cities.length > 0 && (
        <section
          className="bg-bhg-gray-light py-20"
          aria-labelledby="city-grid-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <h2
                id="city-grid-heading"
                className="text-2xl font-bold text-bhg-black"
              >
                Forklift Training by City in {stateName}
              </h2>
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              role="list"
            >
              {cities.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    id={`city-link-${loc.slug.replace("/", "-")}`}
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
                        <p className="text-xs text-gray-400">{loc.stateAbbr}</p>
                      </div>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-bhg-orange flex-shrink-0 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Classes ── */}
      <section
        className="bg-white py-16 border-t border-gray-100"
        aria-labelledby="state-classes-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="state-classes-heading"
            className="text-2xl font-bold text-bhg-black"
          >
            Forklift Classes We Teach in {stateName}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {classesData.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/classes/${c.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-bhg-black hover:text-bhg-orange transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-bhg-orange shrink-0" aria-hidden="true" />
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-bhg-gray-dark mb-2 text-base">
            Don&apos;t see your city? We serve businesses across all of{" "}
            {stateName}, not just the cities listed here.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Contact us and we&apos;ll come to you.
          </p>
          <Link
            href="/contact"
            id="state-hub-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Request Forklift Training
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
