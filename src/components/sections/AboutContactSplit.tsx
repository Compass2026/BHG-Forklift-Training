"use client";

import { useState } from "react";

export default function AboutContactSplit() {
  const [focused, setFocused] = useState<string | null>(null);

  const inputClass = (name: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-bhg-black placeholder-gray-400 bg-white outline-none transition-all duration-200 ${
      focused === name
        ? "border-bhg-orange ring-2 ring-bhg-orange/20"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <section
      className="bg-white py-24 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Orange glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-bhg-orange/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: About ── */}
          <div>
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              About BHG
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-bold text-bhg-black mb-6 leading-tight"
            >
              Your Safety.{" "}
              <span className="relative inline-block">
                Our Mission.
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-bhg-orange/40" />
              </span>
            </h2>

            <div className="space-y-5 text-gray-600 leading-relaxed text-base">
              <p>
                At BHG Safety Partners, we provide customized safety consulting
                services that protect your workforce, reduce liability, and ensure
                full regulatory compliance. With decades of hands-on experience
                across construction, manufacturing, oil &amp; gas, and general
                industry — we bring the expertise your team needs.
              </p>
              <p>
                Our approach is simple: we listen first. Every business faces
                unique hazards and operational pressures. We tailor every training
                program, audit, and consultation to fit your exact environment —
                so you&apos;re never paying for a one-size-fits-all solution.
              </p>
              <p>
                From OSHA compliance and industrial hygiene surveys to onsite
                safety inspections and written safety program development, BHG
                Safety Partners is the trusted partner companies across Texas and
                nationwide rely on to keep their people safe and their operations
                running.
              </p>
            </div>

            {/* Orange accent divider */}
            <div className="flex items-center gap-3 mt-10">
              <span className="h-px w-12 bg-bhg-orange rounded-full" />
              <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                Trusted Since 2014
              </span>
            </div>

            {/* Veteran badge */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-3">
              <span className="text-2xl" aria-hidden="true">🎖️</span>
              <span className="text-sm font-semibold text-bhg-black">
                Disabled Veteran-Owned Small Business
              </span>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div
            id="contact-form-card"
            className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 md:p-10"
          >
            <h3 className="text-xl font-bold text-bhg-black mb-1">
              Get in Contact with us Here!
            </h3>
            <p className="text-sm text-bhg-gray-dark mb-7">
              Fill out the form below and we&apos;ll be in touch within one
              business day.
            </p>

            <form
              aria-label="Contact form"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              {/* Company Name */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
                >
                  Company Name
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="Acme Industries"
                  className={inputClass("company")}
                  onFocus={() => setFocused("company")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Your Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Jane Smith"
                  className={inputClass("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="jane@acmeindustries.com"
                  className={inputClass("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="contact-address"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
                >
                  Address
                </label>
                <input
                  id="contact-address"
                  type="text"
                  placeholder="123 Main St, Houston, TX 77001"
                  className={inputClass("address")}
                  onFocus={() => setFocused("address")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about your safety training needs..."
                  className={`${inputClass("message")} resize-none`}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Submit — outline that fills on hover */}
              <button
                type="submit"
                id="contact-submit"
                className="w-full py-3.5 rounded-xl border-2 border-bhg-orange text-bhg-orange font-semibold text-sm
                  hover:bg-bhg-orange hover:text-white hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-200 mt-2"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
