import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, GraduationCap, Truck } from "lucide-react";
import HeroGlass from "@/components/sections/HeroGlass";
import ServiceGrid from "@/components/sections/ServiceGrid";
import FAQSection from "@/components/sections/FAQSection";
import Schema from "@/components/Schema";
import { faqs } from "@/lib/faqs";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

// ─── SEO ──────────────────────────────────────────────────────────────────────

const TITLE = "Forklift Certification Training: OSHA Classes 1–7 | BHG";
const DESCRIPTION =
  "Onsite forklift certification training for all seven OSHA truck classes: formal instruction, hands-on practice and the workplace evaluation OSHA requires.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  alternates: {
    canonical: "/classes",
  },
};

// The three parts of operator training named in 29 CFR 1910.178(l)(2)(ii).
const trainingParts = [
  {
    icon: GraduationCap,
    title: "Formal instruction",
    body: "Classroom-style teaching on truck controls, stability, capacity, inspection and the hazards of your workplace, delivered at your site.",
  },
  {
    icon: Truck,
    title: "Practical training",
    body: "Hands-on demonstrations and exercises on the type of truck each operator will use, in the aisles, docks and yards where they work.",
  },
  {
    icon: ClipboardCheck,
    title: "Workplace evaluation",
    body: "An evaluation of each operator's performance in the workplace, with the details the employer needs for its certification record.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClassesPage() {
  return (
    <>
      <Schema
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Forklift Classes", path: "/classes" },
        ])}
      />
      <Schema data={faqPageSchema(faqs)} />

      <HeroGlass
        eyebrow="Forklift Classes"
        headline={
          <>
            Forklift Certification Training for{" "}
            <span className="text-bhg-orange">OSHA Classes 1–7</span>
          </>
        }
        subheadline="Onsite operator training and evaluations on the trucks your team actually drives."
        body="OSHA's powered industrial truck standard, 29 CFR 1910.178(l), requires every forklift operator to be trained and evaluated before operating on their own, and re-evaluated at least every three years. We deliver all of it at your facility."
        ctaPrimary={{ href: "/contact", label: "Schedule Training" }}
        ctaSecondary={{ href: "#classes", label: "Choose a Class" }}
        showScrollNudge={false}
      />

      {/* ── What OSHA requires ── */}
      <section className="bg-white py-20" aria-labelledby="requirements-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              How Certification Works
            </span>
            <h2
              id="requirements-heading"
              className="text-3xl sm:text-4xl font-bold text-bhg-black leading-tight"
            >
              What OSHA Requires of Every Operator
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Forklift certification is not a card an operator carries from job
              to job. Under OSHA&apos;s rule, the employer certifies that each
              operator has been trained and evaluated on the trucks and
              conditions of that workplace. Training has to cover both the
              truck (its controls, capacity, stability and inspection) and the
              workplace (surfaces, ramps, pedestrian traffic, narrow aisles and
              ventilation). We build each session around both.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingParts.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-200 bg-gray-50"
              >
                <Icon className="w-8 h-8 text-bhg-orange" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-bhg-black">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-500 max-w-3xl">
            Refresher training is required when an operator is seen operating
            unsafely, has an accident or near-miss, is assigned a different type
            of truck, or when workplace conditions change. Not sure which class
            your trucks fall into?{" "}
            <Link href="/contact" className="text-bhg-orange font-semibold hover:underline">
              Tell us what you run
            </Link>{" "}
            and we&apos;ll match the training to it.
          </p>
        </div>
      </section>

      {/* ── Class grid ── */}
      <div id="classes" className="scroll-mt-28">
        <ServiceGrid />
      </div>

      {/* ── FAQ ── */}
      <FAQSection faqs={faqs} />
    </>
  );
}
