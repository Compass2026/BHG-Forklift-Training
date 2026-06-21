import type { Metadata } from "next";
import HeroGlass from "@/components/sections/HeroGlass";
import ServiceGrid from "@/components/sections/ServiceGrid";
import HowWeWork from "@/components/sections/HowWeWork";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Safety Services | BHG Safety Partners",
  description:
    "Explore BHG Safety Partners' comprehensive safety solutions: OSHA compliance consulting, onsite safety training, industrial hygiene surveys, hazard assessments, and more — built for the Midwest.",
  keywords: [
    "safety training services",
    "OSHA compliance consulting",
    "industrial hygiene surveys",
    "hazard assessments",
    "onsite safety training",
    "safety audits midwest",
  ],
  openGraph: {
    title: "Safety Services | BHG Safety Partners",
    description:
      "Comprehensive safety solutions — OSHA compliance, training, audits, and industrial hygiene for Midwest businesses.",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroGlass
        eyebrow="What We Do"
        headline={
          <>
            Comprehensive{" "}
            <span className="text-bhg-orange">Safety Solutions</span>
          </>
        }
        subheadline="Every service we offer is built around one goal: your people go home safe."
        body="From OSHA compliance audits and industrial hygiene surveys to forklift certification and written safety program development — BHG Safety Partners has the expertise your business needs."
        ctaPrimary={{ href: "/contact", label: "Request a Consultation" }}
        ctaSecondary={{ href: "/about", label: "About Our Team" }}
        showScrollNudge
      />

      {/* ── Service Grid ── */}
      <ServiceGrid />

      {/* ── How We Work ── */}
      <HowWeWork />
    </>
  );
}
