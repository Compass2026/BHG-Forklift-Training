"use client";

import { useActionState, useState } from "react";

import { submitContactForm } from "@/app/actions/contact";
import { initialContactFormState } from "@/lib/contact-email";

// ─── Standalone contact form card — reused across service detail pages ─────────

export default function ServiceContactForm({
  serviceName,
}: {
  serviceName?: string;
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
    <div
      id="service-contact-form-card"
      className="bg-bhg-gray-light rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 sticky top-8"
    >
      <span className="inline-block mb-2 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
        Get in Touch
      </span>
      <h3 className="text-xl font-bold text-bhg-black mb-1">
        Request a Free Consultation
      </h3>
      <p className="text-sm text-bhg-gray-dark mb-7">
        Fill out the form below and we&apos;ll be in touch within one business
        day.
      </p>

      <form
        aria-label="Service inquiry form"
        action={formAction}
        className="space-y-4"
      >
        <input
          type="hidden"
          name="source"
          value={
            serviceName
              ? `the ${serviceName} service page`
              : "a service page"
          }
        />
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
            htmlFor="svc-contact-company"
            className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
          >
            Company Name
          </label>
          <input
            id="svc-contact-company"
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
            htmlFor="svc-contact-name"
            className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
          >
            Your Name
          </label>
          <input
            id="svc-contact-name"
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
            htmlFor="svc-contact-email"
            className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
          >
            Email Address
          </label>
          <input
            id="svc-contact-email"
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

        {/* Phone */}
        <div>
          <label
            htmlFor="svc-contact-phone"
            className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
          >
            Phone Number
          </label>
          <input
            id="svc-contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={pending}
            placeholder="(555) 000-0000"
            className={inputClass("phone")}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="svc-contact-message"
            className="block text-xs font-semibold text-bhg-black mb-1.5 tracking-wide"
          >
            Message
          </label>
          <textarea
            id="svc-contact-message"
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

        {/* Submit */}
        <button
          type="submit"
          id="svc-contact-submit"
          disabled={pending}
          className="w-full py-3.5 rounded-xl bg-bhg-orange text-white font-semibold text-sm shadow-md shadow-bhg-orange/25 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
  );
}
