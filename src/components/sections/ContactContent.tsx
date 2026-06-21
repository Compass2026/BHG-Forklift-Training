"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

// ─── Contact Info ─────────────────────────────────────────────────────────────

const contactDetails = [
  {
    id: "contact-phone",
    icon: Phone,
    label: "Phone",
    value: "(573) 822-6448",
    href: "tel:+15738226448",
  },
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    value: "info@bhgsafety.com",
    href: "mailto:info@bhgsafety.com",
  },
  {
    id: "contact-address",
    icon: MapPin,
    label: "Headquarters",
    value: "11325 Dove Ridge Road, Hannibal MO 63401",
    href: "https://maps.google.com/?q=11325+Dove+Ridge+Road,+Hannibal,+MO+63401",
  },
  {
    id: "contact-hours",
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 7 AM – 6 PM CT",
    href: null,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactContent() {
  const [focused, setFocused] = useState<string | null>(null);

  const inputClass = (name: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-bhg-black placeholder-gray-400 bg-white outline-none transition-all duration-200 ${
      focused === name
        ? "border-bhg-orange ring-2 ring-bhg-orange/20"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <section className="bg-white py-24" aria-labelledby="contact-split-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Contact Info ── */}
          <div>
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              Contact Information
            </span>
            <h2
              id="contact-split-heading"
              className="text-3xl sm:text-4xl font-bold text-bhg-black mb-8 leading-tight"
            >
              We&apos;re Based in the{" "}
              <span className="relative inline-block">
                Midwest
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-bhg-orange/30" />
              </span>
              , Serving Nationwide.
            </h2>

            <div className="space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div
                    id={item.id}
                    className="flex items-start gap-5 group"
                  >
                    {/* Icon bubble */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-bhg-orange/10 flex items-center justify-center group-hover:bg-bhg-orange/20 transition-colors">
                      <Icon
                        className="w-6 h-6 text-bhg-orange"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Text */}
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-bhg-orange mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold text-bhg-black group-hover:text-bhg-orange transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.id}>{inner}</div>
                );
              })}
            </div>

            {/* Divider accent */}
            <div className="flex items-center gap-3 mt-12">
              <span className="h-px w-12 bg-bhg-orange rounded-full" />
              <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
                Trusted Since 2014
              </span>
            </div>

            {/* Veteran badge */}
            <div className="mt-8 inline-flex items-center gap-3 bg-bhg-gray-light rounded-xl px-5 py-3 border border-gray-100">
              <span className="text-2xl" aria-hidden="true">🎖️</span>
              <span className="text-sm font-semibold text-bhg-gray-dark">
                Disabled Veteran-Owned Small Business
              </span>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div
            id="contact-form-card"
            className="bg-bhg-gray-light rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10"
          >
            <h3 className="text-xl font-bold text-bhg-black mb-1">
              Request a Custom Quote
            </h3>
            <p className="text-sm text-bhg-gray-dark mb-7">
              Fill out the form below and we&apos;ll be in touch within one business
              day.
            </p>

            <form
              aria-label="Contact form"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
                >
                  Full Name
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

              {/* Company Name */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
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

              {/* Email Address */}
              <div>
                <label
                  htmlFor="contact-email-input"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
                >
                  Email Address
                </label>
                <input
                  id="contact-email-input"
                  type="email"
                  placeholder="jane@acmeindustries.com"
                  className={inputClass("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="contact-phone-input"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone-input"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className={inputClass("phone")}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Training Location (Dropdown) */}
              <div>
                <label
                  htmlFor="contact-location"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
                >
                  Training Location
                </label>
                <select
                  id="contact-location"
                  className={`${inputClass("location")} appearance-none`}
                  onFocus={() => setFocused("location")}
                  onBlur={() => setFocused(null)}
                  defaultValue=""
                >
                  <option value="" disabled>Select training location...</option>
                  <option value="On-Site at Our Facility">On-Site at Our Facility</option>
                  <option value="At a BHG Training Center">At a BHG Training Center</option>
                </select>
              </div>

              {/* Estimated Operators to Train (Number) */}
              <div>
                <label
                  htmlFor="contact-operators"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
                >
                  Estimated Number of Operators to Train
                </label>
                <input
                  id="contact-operators"
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  className={inputClass("operators")}
                  onFocus={() => setFocused("operators")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide uppercase"
                >
                  Message / Special Requirements
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

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit"
                className="w-full py-3.5 rounded-xl bg-bhg-orange hover:bg-bhg-orange/95 text-white font-black text-sm shadow-md shadow-bhg-orange/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-2 uppercase tracking-wider"
              >
                Request Quote
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
