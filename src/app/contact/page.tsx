import type { Metadata } from "next";
import ContactContent from "@/components/sections/ContactContent";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact Us | BHG Safety Partners",
  description:
    "Get in touch with BHG Safety Partners. Call (573) 822-6448, email us, or fill out our contact form for a free safety consulting consultation — we respond within one business day.",
  keywords: [
    "contact BHG Safety Partners",
    "safety consulting quote",
    "OSHA training contact",
    "safety training inquiry midwest",
    "(573) 822-6448",
  ],
  openGraph: {
    title: "Contact Us | BHG Safety Partners",
    description:
      "Reach BHG Safety Partners by phone, email, or contact form. Free consultations for all new clients.",
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
