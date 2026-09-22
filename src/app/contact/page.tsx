import type { Metadata } from "next";
import Schema from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import ContactContent from "@/components/sections/ContactContent";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact BHG Forklift Training | Schedule Onsite Training",
  description:
    "Call (573) 822-6448, email info@bhgsafety.com or send the form to schedule onsite forklift operator training and evaluations for your team.",
  openGraph: {
    title: "Contact BHG Forklift Training | Schedule Onsite Training",
    description:
      "Call (573) 822-6448, email info@bhgsafety.com or send the form to schedule onsite forklift operator training and evaluations for your team.",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Schema
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      {/* ── Page Header ── */}
      <section
        className="relative bg-bhg-black overflow-hidden"
        aria-labelledby="contact-page-heading"
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
            <span className="h-px w-8 bg-bhg-orange" />
            <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              Reach Out
            </span>
            <span className="h-px w-8 bg-bhg-orange" />
          </div>
          <h1
            id="contact-page-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-tight"
          >
            Get a <span className="text-bhg-orange">Custom Training Quote</span>
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-semibold">
            Ready to certify your forklift operators? Fill out the quote request form below and our team will follow up within one business day.
          </p>
        </div>
      </section>

      {/* ── Contact Split (client component for form interactivity) ── */}
      <ContactContent />
    </>
  );
}
