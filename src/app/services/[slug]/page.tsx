import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import servicesData from "../../../../data/services.json";
import ServiceContactForm from "@/components/sections/ServiceContactForm";
import Testimonial from "@/components/sections/Testimonial";
import FAQSection from "@/components/sections/FAQSection";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
}

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return (servicesData as Service[]).map((s) => ({ slug: s.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = (servicesData as Service[]).find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | BHG Safety Partners",
    };
  }

  return {
    title: `${service.title} | BHG Safety Partners`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | BHG Safety Partners`,
      description: service.shortDescription,
      type: "website",
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = (servicesData as Service[]).find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-bhg-gray-light overflow-hidden border-b border-gray-200"
        aria-labelledby="service-hero-heading"
      >
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #111827 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Orange glow */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-bhg-orange/8 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Back breadcrumb */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-bhg-gray-dark hover:text-bhg-orange transition-colors mb-8 group"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
            All Services
          </Link>

          {/* Eyebrow */}
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
            BHG Safety Partners
          </span>

          {/* Page H1 */}
          <h1
            id="service-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bhg-black leading-tight max-w-3xl"
          >
            {service.title}
          </h1>

          {/* Short description */}
          <p className="mt-5 text-lg text-bhg-gray-dark max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Orange accent divider */}
          <div className="flex items-center gap-3 mt-8">
            <span className="h-1 w-16 rounded-full bg-bhg-orange" />
            <span className="h-1 w-6 rounded-full bg-bhg-orange/40" />
          </div>
        </div>
      </section>

      {/* ── Two-Column Content Block ─────────────────────────────────────────── */}
      <section
        className="bg-white py-24"
        aria-labelledby="service-detail-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Left: Long Description + Benefits ── */}
            <div>
              <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                What We Do
              </span>
              <h2
                id="service-detail-heading"
                className="text-3xl sm:text-4xl font-bold text-bhg-black mb-6 leading-tight"
              >
                What to Expect
              </h2>

              {/* Long description */}
              <p className="text-bhg-gray-dark leading-relaxed text-base md:text-lg mb-10">
                {service.longDescription}
              </p>

              {/* Orange accent divider */}
              <div className="h-px w-full bg-gray-100 mb-10" />

              {/* Benefits */}
              <div>
                <span className="inline-block mb-5 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                  Key Benefits
                </span>
                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
                  aria-label={`Benefits of ${service.title}`}
                >
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm font-medium text-bhg-black"
                    >
                      <CheckCircle
                        className="w-5 h-5 text-bhg-orange flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust signal strip */}
              <div className="mt-12 flex items-center gap-4 p-5 rounded-2xl bg-bhg-gray-light border border-gray-100">
                <span className="text-2xl" aria-hidden="true">🎖️</span>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-bhg-orange mb-0.5">
                    Trusted Since 2014
                  </p>
                  <p className="text-sm text-bhg-gray-dark">
                    Disabled Veteran-Owned Small Business — serving clients
                    nationwide.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: Lead Capture Form ── */}
            <div>
              <ServiceContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── Social Proof ─────────────────────────────────────────────────────── */}
      <Testimonial />

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <FAQSection />
    </>
  );
}
