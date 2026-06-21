import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle, Clock, Award, ShieldAlert, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import classesData from "../../../../data/classes.json";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ForkliftClass {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
}

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return (classesData as ForkliftClass[]).map((c) => ({ slug: c.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = (classesData as ForkliftClass[]).find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Class Not Found | BHG Safety Partners",
    };
  }

  return {
    title: `${course.title} | BHG Safety Partners`,
    description: course.shortDescription,
    alternates: {
      canonical: `/classes/${course.slug}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = (classesData as ForkliftClass[]).find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  // Curriculum outline
  const curriculum = [
    "Pre-operation inspections and safety checklists",
    "Load capacity, center of gravity, and stability rules",
    "Safe maneuvering, turning, and loading/unloading techniques",
    "Operating around pedestrians and in tight warehouse layouts",
    "Refueling or battery charging safety protocols",
    "OSHA standard 29 CFR 1910.178 compliance review",
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* ── Hero Header ── */}
      <header className="bg-gray-950 py-20 border-b border-gray-800 text-center relative overflow-hidden">
        {/* Subtle orange ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-bhg-orange/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-bhg-orange transition-colors mb-6 uppercase tracking-wider"
          >
            ← Back to Classes
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none">
            {course.title}
          </h1>
          <p className="mt-4 text-bhg-orange text-sm sm:text-base font-black tracking-widest uppercase">
            Comprehensive OSHA-Aligned Certification
          </p>
        </div>
      </header>

      {/* ── Course Overview Layout (2-Column Grid) ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 border-l-4 border-bhg-orange pl-3">
                Course Description
              </h2>
              <p className="text-gray-700 text-base leading-relaxed font-medium">
                {course.longDescription}
              </p>
            </section>

            {/* What You Will Learn */}
            <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6 border-l-4 border-bhg-orange pl-3">
                What You Will Learn
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculum.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-bhg-orange shrink-0 mt-0.5 animate-pulse" />
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prerequisites & Duration */}
            <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6 border-l-4 border-bhg-orange pl-3">
                Prerequisites & Duration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Duration */}
                <div className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <Clock className="w-8 h-8 text-bhg-orange shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Course Duration</h4>
                    <p className="text-sm text-gray-600 mt-1 font-medium leading-relaxed">
                      4 to 6 Hours total (Classroom training + hands-on practical operator evaluation).
                    </p>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <Users className="w-8 h-8 text-bhg-orange shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Prerequisites</h4>
                    <p className="text-sm text-gray-600 mt-1 font-medium leading-relaxed">
                      Must be 18 years or older. No prior forklift experience or license required.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Sticky CTA Card) */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-gray-100 border-2 border-bhg-orange rounded-2xl p-8 shadow-md flex flex-col justify-between">
              <div>
                {/* Sticky Header */}
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-snug">
                  Schedule Your Team's Training
                </h3>
                
                {/* Prompt */}
                <p className="text-sm text-gray-700 mt-4 leading-relaxed font-semibold">
                  Looking to certify operators at your facility? We bring our OSHA-compliant safety instructors and equipment evaluations directly to your site.
                </p>
                
                {/* Highlights */}
                <div className="mt-6 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                    <Award className="w-4 h-4 text-bhg-orange" />
                    OSHA 29 CFR 1910.178 Compliant
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                    <ShieldAlert className="w-4 h-4 text-bhg-orange" />
                    Fully Insured Safety Instructors
                  </div>
                </div>
              </div>

              {/* Free Quote Button */}
              <Link
                href={`/contact?class=${slug}`}
                className="mt-8 w-full bg-bhg-orange hover:bg-bhg-orange/95 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 shadow-md text-center inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider text-sm"
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
