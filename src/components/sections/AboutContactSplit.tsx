"use client";

import { useActionState, useState } from "react";

import { submitContactForm } from "@/app/actions/contact";
import { initialContactFormState } from "@/lib/contact-email";

export default function AboutContactSplit({
  source = "the home page",
}: {
  source?: string;
}) {
  const [focused, setFocused] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );

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
                BHG Forklift Training trains and evaluates forklift operators at
                your facility, on your own trucks. Our instructors bring decades of
                hands-on experience in warehouses, distribution centers,
                manufacturing plants and construction sites.
              </p>
              <p>
                Our approach is simple: we listen first. Every facility has its
                own trucks, layout and traffic patterns. We build each session
                around your equipment, your aisles and docks, and your shifts —
                so your operators train for the work they actually do.
              </p>
              <p>
                From Class 1 electric riders in the warehouse to Class 7 rough
                terrain forklifts on the job site, we cover every OSHA truck class,
                from our base in Hannibal, Missouri to employers across the
                Midwest.
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

            <form aria-label="Contact form" action={formAction} className="space-y-4">
              <input type="hidden" name="source" value={source} />
              {/* Honeypot — hidden from people, catnip for bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

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
                  name="company"
                  type="text"
                  autoComplete="organization"
                  disabled={pending}
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
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={pending}
                  aria-invalid={state.errors.name ? true : undefined}
                  placeholder="Jane Smith"
                  className={inputClass("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                />
                {state.errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {state.errors.name}
                  </p>
                )}
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
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={pending}
                  aria-invalid={state.errors.email ? true : undefined}
                  placeholder="jane@acmeindustries.com"
                  className={inputClass("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
                {state.errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {state.errors.email}
                  </p>
                )}
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
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  disabled={pending}
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
                  name="message"
                  rows={4}
                  required
                  disabled={pending}
                  aria-invalid={state.errors.message ? true : undefined}
                  placeholder="Tell us about your safety training needs..."
                  className={`${inputClass("message")} resize-none`}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
                {state.errors.message && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {state.errors.message}
                  </p>
                )}
              </div>

              {/* Submit — outline that fills on hover */}
              <button
                type="submit"
                id="contact-submit"
                disabled={pending}
                className="w-full py-3.5 rounded-xl border-2 border-bhg-orange text-bhg-orange font-semibold text-sm
                  hover:bg-bhg-orange hover:text-white hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-200 mt-2
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent
                  disabled:hover:text-bhg-orange disabled:hover:translate-y-0"
              >
                {pending ? "Sending…" : "Send Message"}
              </button>

              {/* Submission status */}
              <p
                aria-live="polite"
                className={`text-sm font-medium ${
                  state.status === "success"
                    ? "text-green-700"
                    : state.status === "error"
                      ? "text-red-600"
                      : ""
                }`}
              >
                {state.message}
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
