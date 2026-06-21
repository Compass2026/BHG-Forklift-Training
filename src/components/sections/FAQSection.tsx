"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    question: "What types of safety training do you offer?",
    answer:
      "We offer a comprehensive range of OSHA-aligned safety training programs, including General Industry (10 & 30 hour), Construction (10 & 30 hour), Confined Space Entry, Forklift Operator, Hazmat (HAZWOPER), First Aid/CPR, and much more. Both onsite and virtual delivery options are available.",
  },
  {
    id: "faq-2",
    question: "Can you customize safety programs for my business?",
    answer:
      "Absolutely. Every industry has unique hazards, and a generic safety program often leaves dangerous gaps. We work directly with your team to assess your operations, identify specific risks, and develop written safety programs, training materials, and compliance checklists tailored to your business.",
  },
  {
    id: "faq-3",
    question: "Do you offer onsite and virtual safety training?",
    answer:
      "Yes — we offer both formats to fit your operational needs. Our onsite training takes place at your facility or job site, giving us the opportunity to reference real-world hazards in your environment. Our virtual sessions deliver the same quality instruction via live webinar, complete with Q&A and documentation.",
  },
  {
    id: "faq-4",
    question: "How long does a compliance audit typically take?",
    answer:
      "Most compliance audits are completed within one to two days on site, depending on your facility size and the scope of your operations. After the walkthrough, we provide a comprehensive written report with findings, risk ratings, and a prioritized corrective action plan.",
  },
  {
    id: "faq-5",
    question: "Do you serve companies outside of Texas?",
    answer:
      "Yes — while we are headquartered in Texas, BHG Safety Partners serves clients nationwide. We regularly travel to job sites and facilities across the country for onsite training, audits, and inspections.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      className="bg-gray-100 py-24 relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      {/* Orange glow top-right */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bhg-orange/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Context + Image ── */}
          <div>
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              Client Questions
            </span>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold text-bhg-black mb-5 leading-tight"
            >
              General Questions
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-base max-w-md">
              We get a lot of the same great questions from new clients. Here are
              the answers to the ones we hear most often — if yours isn&apos;t
              listed, don&apos;t hesitate to reach out directly.
            </p>

            {/* Training session image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="/safety-training.png"
                alt="BHG Safety Partners training session in progress"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bhg-black/70 via-bhg-black/20 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white text-xs font-semibold tracking-wide uppercase opacity-90">
                Onsite Safety Training Session
              </p>
            </div>
          </div>

          {/* ── Right: Accordion ── */}
          <div className="space-y-3" role="list">
            {faqs.map(({ id, question, answer }) => {
              const isOpen = openId === id;
              return (
                <div
                  key={id}
                  id={id}
                  role="listitem"
                  className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-bhg-orange shadow-lg shadow-bhg-orange/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Question button */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer`}
                    onClick={() => toggle(id)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-all duration-200 ${
                      isOpen
                        ? "bg-bhg-orange text-white"
                        : "bg-gray-50 text-bhg-black hover:bg-gray-200"
                    }`}
                  >
                    <span className="font-semibold text-sm leading-snug">
                      {question}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center opacity-70">
                      {isOpen ? (
                        <Minus className="w-3 h-3" aria-hidden="true" />
                      ) : (
                        <Plus className="w-3 h-3" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  {/* Answer panel */}
                  <div
                    id={`${id}-answer`}
                    role="region"
                    aria-labelledby={id}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-5 py-4 text-sm text-gray-600 leading-relaxed bg-white">
                      {answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
