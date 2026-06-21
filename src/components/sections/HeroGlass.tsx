import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CtaLink {
  href: string;
  label: string;
}

interface HeroGlassProps {
  /** Small eyebrow label above the headline */
  eyebrow?: string;
  /** Main H1 content — accepts a ReactNode so callers can include <span> highlights */
  headline?: ReactNode;
  /** Larger subheadline below the H1 */
  subheadline?: string;
  /** Body paragraph text */
  body?: string;
  /** Primary CTA button */
  ctaPrimary?: CtaLink;
  /** Secondary / ghost CTA button */
  ctaSecondary?: CtaLink;
  /** Show the animated scroll nudge at the bottom */
  showScrollNudge?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroGlass({
  eyebrow = "Trusted Since 2014",
  headline = (
    <span className="flex flex-row items-center gap-4 text-left">
      <span className="inline-block px-4 py-1.5 border-[3px] border-bhg-orange text-bhg-orange font-black tracking-wider text-3xl sm:text-4xl md:text-5xl rounded-lg">
        BHG
      </span>
      <span className="block font-black tracking-tight text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-[0.95]">
        FORKLIFT
        <br />
        TRAINING
      </span>
    </span>
  ),
  subheadline = "On-Site, Hands On, OSHA Certified Forklift Training. Tailored to your team and industry.",
  body = "With over 45 years of combined experience, BHG Forklift Training delivers top-tier safety training, operator certifications, and OSHA compliance support — helping businesses across the Midwest protect their people and stay compliant.",
  ctaPrimary = { href: "/contact", label: "Click here" },
  ctaSecondary = { href: "/services", label: "Learn More" },
  showScrollNudge = true,
}: HeroGlassProps) {
  return (
    <section
      className="relative min-h-[100svh] sm:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/warehouse-forklift.png"
        alt="Warehouse forklift"
        aria-hidden="true"
      />

      {/* Dark overlay so the white text pops */}
      <div
        className="absolute inset-0 bg-black/75"
        aria-hidden="true"
      />

      {/* Subtle orange accent glow bottom-left */}
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-bhg-orange/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16 flex items-center sm:items-start">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl p-4 sm:p-6 md:p-10 shadow-2xl max-w-xl w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3 sm:mb-6">
            <span className="h-px w-8 bg-bhg-orange" />
            <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              {eyebrow}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-5">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl font-medium text-white/90 mb-2 sm:mb-4 leading-snug">
            {subheadline}
          </p>

          {/* Body */}
          <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl mb-5 sm:mb-10 line-clamp-3 sm:line-clamp-none">
            {body}
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={ctaPrimary.href}
              id="hero-cta-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-lg shadow-bhg-orange/30 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {ctaPrimary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={ctaSecondary.href}
              id="hero-cta-learn"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      {showScrollNudge && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      )}
    </section>
  );
}
