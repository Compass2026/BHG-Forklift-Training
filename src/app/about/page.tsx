import type { Metadata } from "next";
import { ShieldCheck, Award, Users } from "lucide-react";
import HeroGlass from "@/components/sections/HeroGlass";
import StatsRow from "@/components/sections/StatsRow";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Us | BHG Safety Partners",
  description:
    "Learn about BHG Safety Partners — a Disabled Veteran-Owned business with over 45 years of experience delivering OSHA compliance, safety training, and industrial hygiene services across the Midwest.",
  keywords: [
    "BHG Safety Partners about",
    "disabled veteran-owned safety company",
    "OSHA compliance experts",
    "safety training history",
    "midwest safety consulting",
  ],
  openGraph: {
    title: "About Us | BHG Safety Partners",
    description:
      "A Disabled Veteran-Owned business with over 45 years of experience in safety training and OSHA compliance.",
    type: "website",
  },
  alternates: {
    canonical: "/about",
  },
};

// ─── Values ───────────────────────────────────────────────────────────────────

const values = [
  {
    id: "value-integrity",
    icon: ShieldCheck,
    title: "Uncompromising Integrity",
    body: "We provide honest assessments and straightforward recommendations — because your people's lives depend on accurate information, not upsells.",
  },
  {
    id: "value-veteran",
    icon: Award,
    title: "Veteran-Led Excellence",
    body: "Founded and operated by a Disabled Veteran, our military-grade discipline and attention to detail is embedded in every training program and audit we deliver.",
  },
  {
    id: "value-tailored",
    icon: Users,
    title: "Tailored for Your Team",
    body: "No cookie-cutter curricula. We learn your operation, your hazards, and your workforce before crafting a program that actually sticks.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroGlass
        eyebrow="On-Site Safety Specialists"
        headline={
          <>
            Expert Forklift Training by{" "}
            <span className="text-bhg-orange">Industry Veterans</span>
          </>
        }
        subheadline="On-site, OSHA-compliant forklift and material handling training."
        body="We provide comprehensive, on-site safety training and operator evaluations designed to keep your workforce safe and your operations fully compliant. Our team of instructors brings decades of real-world warehouse, construction, and logistics experience to every training program we deliver."
        ctaPrimary={{ href: "/contact", label: "Schedule Training" }}
        ctaSecondary={{ href: "/services", label: "Our Classes" }}
        showScrollNudge={false}
      />

      {/* ── Stats ── */}
      <StatsRow />

      {/* ── Company History & Values ── */}
      <section
        className="bg-bhg-gray-light py-24"
        aria-labelledby="about-history-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Prose history */}
            <div>
              <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                Our Story
              </span>
              <h2
                id="about-history-heading"
                className="text-3xl sm:text-4xl font-bold text-bhg-black mb-8 leading-tight"
              >
                Decades of Real-World{" "}
                <span className="relative inline-block">
                  Logistics & Safety Expertise
                  <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-bhg-orange/30" />
                </span>
              </h2>

              <div className="prose prose-gray max-w-none text-bhg-gray-dark">
                <p>
                  BHG Safety Partners was born from a simple, non-negotiable
                  belief: workplace safety is not a compliance checkbox — it is a
                  moral obligation. Specialized in forklift and material handling operations, we provide on-site, OSHA-compliant safety training across the nation. Founded by industry veterans with more than 45 years of combined logistics and safety experience, our firm has grown into one of the industry's most trusted partners.
                </p>
                <p>
                  Our roots are in the field. Our safety instructors spent decades managing logistics yards, driving heavy equipment on active construction sites, and supervising busy distribution warehouses before stepping into the classroom. That real-world, hands-on experience shapes every class and operator evaluation we deliver.
                </p>
                <p>
                  We have trained and certified over 31,000 operators and served more than 5,000 companies. Our curriculum covers all 7 OSHA forklift classes—from warehouse electric riders to heavy rough-terrain telehandlers. We teach operators how to conduct inspections, calculate load capacities, maintain stability center, and navigate hazards under real working conditions.
                </p>
                <p>
                  As a Disabled Veteran-Owned Small Business, we bring precision, discipline, and accountability to every client engagement. We hold ourselves to a higher standard, ensuring your team is fully certified and your operations remain compliant and incident-free.
                </p>
              </div>

              <div className="flex items-center gap-3 mt-10">
                <span className="h-px w-12 bg-bhg-orange rounded-full" />
                <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                  Trusted Since 2014
                </span>
              </div>
            </div>

            {/* Values cards */}
            <div className="space-y-6">
              <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                What We Stand For
              </span>

              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.id}
                    id={v.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex gap-5 group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-bhg-orange/10 flex items-center justify-center group-hover:bg-bhg-orange/20 transition-colors">
                      <Icon
                        className="w-6 h-6 text-bhg-orange"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-bhg-black mb-2">
                        {v.title}
                      </h3>
                      <p className="text-sm text-bhg-gray-dark leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
