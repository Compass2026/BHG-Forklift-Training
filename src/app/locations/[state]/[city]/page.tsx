import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  Warehouse,
} from "lucide-react";
import AboutContactSplit from "@/components/sections/AboutContactSplit";
import FAQSection from "@/components/sections/FAQSection";
import Schema from "@/components/Schema";
import { getCityContent } from "@/content/cities";
import { findLiveLocation, liveLocations } from "@/lib/locations";
import { breadcrumbSchema, faqPageSchema, postalAddress } from "@/lib/schema";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import classesData from "../../../../../data/classes.json";

type PageParams = Promise<{ state: string; city: string }>;

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

// ─── generateStaticParams ────────────────────────────────────────────────────

// Only published cities are built. Unpublished city URLs are redirected to
// their state page by src/proxy.ts before they reach this route.
export const dynamicParams = false;

export async function generateStaticParams() {
  // A published city must have hyper-local content; fail the build rather
  // than ship a thin template page. (Content rules are checked in
  // src/content/cities/index.ts.)
  const missing = liveLocations
    .map((loc) => loc.slug)
    .filter((slug) => !getCityContent(slug));
  if (missing.length) {
    throw new Error(
      `Published cities without content in src/content/cities: ${missing.join(", ")}`
    );
  }

  return liveLocations.map((loc) => {
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
  const location = findLiveLocation(state, city);
  const content = location && getCityContent(location.slug);
  if (!location || !content) return {};

  const title = cityTitle(location.city, location.stateAbbr);
  const description = content.metaDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: `/locations/${location.slug}`,
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
  const location = findLiveLocation(state, city);
  const content = location && getCityContent(location.slug);

  if (!location || !content) {
    notFound();
  }

  const featured = content.featuredClasses
    .map((slug) => classesData.find((c) => c.slug === slug))
    .filter((c): c is (typeof classesData)[number] => Boolean(c));

  const cityFaqs = content.faqs.map((faq, i) => ({
    id: `${state}-${city}-faq-${i + 1}`,
    ...faq,
  }));

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
    description: content.metaDescription,
    address: postalAddress,
    areaServed: [
      {
        "@type": "City",
        name: location.city,
        containedInPlace: {
          "@type": "State",
          name: location.stateName,
        },
      },
      ...content.serviceArea.map((name) => ({ "@type": "Place", name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Forklift Operator Training",
      itemListElement: classesData.map((c) => ({
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
      <Schema data={localBusinessSchema} />
      <Schema data={faqPageSchema(content.faqs)} />
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          {/* Visible breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest uppercase">
              <li>
                <Link href="/locations" className="text-white/50 hover:text-bhg-orange transition-colors">
                  Locations
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li>
                <Link
                  href={`/locations/${location.stateSlug}`}
                  className="text-white/50 hover:text-bhg-orange transition-colors"
                >
                  {location.stateName}
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li className="flex items-center gap-1.5 text-bhg-orange">
                <MapPin className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                {location.city}, {location.stateAbbr}
              </li>
            </ol>
          </nav>

          <h1
            id="local-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
          >
            Forklift Training &amp; Certification in{" "}
            <span className="text-bhg-orange">{location.city}</span>,{" "}
            <span className="text-bhg-orange">{location.stateName}</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            {content.lede}
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
                <span className="text-sm font-medium text-white/80">{item}</span>
              </li>
            ))}
          </ul>

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

      {/* ── Local intro + OSHA office ── */}
      <section className="bg-white py-20" aria-labelledby="local-intro-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2
              id="local-intro-heading"
              className="text-3xl font-bold text-bhg-black leading-tight"
            >
              Forklift Operator Training in {location.city}
            </h2>
            <div className="mt-6 space-y-5 text-base text-bhg-gray-dark leading-relaxed">
              {content.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-bhg-gray-light p-6">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-bhg-orange" aria-hidden="true" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                  Who Enforces OSHA Here
                </h3>
              </div>
              <p className="text-sm font-semibold text-bhg-black">
                <a
                  href={content.oshaOffice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bhg-orange transition-colors"
                >
                  {content.oshaOffice.name}
                </a>
              </p>
              <p className="mt-1 text-sm text-bhg-gray-dark">
                {content.oshaOffice.location}
              </p>
              {content.oshaOffice.note && (
                <p className="mt-3 text-xs text-bhg-gray-dark leading-relaxed">
                  {content.oshaOffice.note}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-bhg-gray-light p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-bhg-orange" aria-hidden="true" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                  Areas Covered From This Page
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2" role="list">
                {content.serviceArea.map((area) => (
                  <li
                    key={area}
                    className="text-xs font-medium text-bhg-gray-dark bg-white border border-gray-200 rounded-full px-3 py-1"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Where forklifts work locally ── */}
      <section
        className="bg-bhg-gray-light py-20"
        aria-labelledby="local-material-handling-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="local-material-handling-heading"
            className="text-3xl font-bold text-bhg-black"
          >
            Where Forklifts Work in {location.city}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2" role="list">
            {content.materialHandling.map((item) => (
              <li
                key={item.name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-bhg-orange/10 flex items-center justify-center mb-4">
                  <Warehouse className="w-5 h-5 text-bhg-orange" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-bhg-black">{item.name}</h3>
                <p className="mt-2 text-sm text-bhg-gray-dark leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Local considerations ── */}
      <section
        className="bg-white py-20"
        aria-labelledby="local-considerations-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="local-considerations-heading"
            className="text-3xl font-bold text-bhg-black"
          >
            What Shapes Forklift Safety in {location.city}
          </h2>
          <ul className="mt-8 space-y-5" role="list">
            {content.localConsiderations.map((item, i) => (
              <li key={i} className="flex gap-4">
                <AlertTriangle
                  className="w-5 h-5 text-bhg-orange flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-base text-bhg-gray-dark leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Featured classes ── */}
      <section className="bg-gray-900 py-20" aria-labelledby="local-classes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 id="local-classes-heading" className="text-3xl font-bold text-white">
              Forklift Classes {location.city} Employers Need Most
            </h2>
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bhg-orange hover:gap-3 transition-all duration-150"
            >
              All forklift classes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {featured.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/classes/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-bhg-orange/50 hover:bg-white/10 transition-all duration-200"
                >
                  <span className="text-base font-bold text-white group-hover:text-bhg-orange transition-colors">
                    {c.title}
                  </span>
                  <span className="mt-2 text-sm text-white/60 leading-relaxed">
                    {c.shortDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection faqs={cityFaqs} heading={`${location.city} Forklift Training Questions`} />

      {/* ── About + Contact Form ── */}
      <AboutContactSplit
        source={`the ${location.city}, ${location.stateAbbr} location page`}
      />
    </>
  );
}
