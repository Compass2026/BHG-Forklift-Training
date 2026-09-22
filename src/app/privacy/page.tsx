import type { Metadata } from "next";
import Link from "next/link";
import Schema from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Privacy Policy | BHG Forklift Training",
  description:
    "How BHG Forklift Training collects, uses and protects the information you share through bhgforklifttraining.com, including contact and quote forms.",
  alternates: {
    canonical: "/privacy",
  },
};

// Update this whenever the policy text changes.
const EFFECTIVE_DATE = "September 22, 2026";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <div className="bg-white min-h-screen">
      <Schema data={crumbs} />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="bg-bhg-black pt-16 md:pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-bhg-orange mb-4">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-400">
            Effective {EFFECTIVE_DATE}
          </p>
        </div>
      </header>

      <div className="h-1 bg-bhg-orange" />

      {/* ── Body ───────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose prose-slate lg:prose-lg prose-headings:font-bold prose-headings:text-bhg-black prose-a:text-bhg-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-bhg-black max-w-none">
          <p>
            BHG Safety Partners LLC (&ldquo;BHG,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us&rdquo;) runs the BHG Forklift Training website at
            bhgforklifttraining.com. This policy explains what information we
            collect when you use the site, how we use it, and the choices you
            have.
          </p>

          <h2>Information you give us</h2>
          <p>
            When you fill out a contact or quote form on the site, we collect
            what you enter, which may include:
          </p>
          <ul>
            <li>Your name</li>
            <li>Your company name</li>
            <li>Your email address</li>
            <li>Your phone number</li>
            <li>Your address or the location where you need training</li>
            <li>The number of operators you need trained</li>
            <li>Your message</li>
          </ul>
          <p>
            We also record which page the form was sent from. If you email or
            call us directly, we keep the information you share in that
            conversation.
          </p>

          <h2>Information collected automatically</h2>
          <p>
            <strong>Server logs.</strong> Like most websites, our hosting
            provider automatically records technical details of each request,
            such as IP address, browser type, the page requested and the time
            of the request. These logs are used to operate, secure and
            troubleshoot the site.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiry and provide the quotes and training you ask about</li>
            <li>To communicate with you about the services you request</li>
            <li>To keep the site secure and prevent spam and abuse</li>
            <li>To meet our legal obligations</li>
          </ul>

          <h2>How we share information</h2>
          <p>
            <strong>We do not sell your personal information.</strong> We
            share it only with service providers that help us run the site and
            our business, and only for that purpose:
          </p>
          <ul>
            <li><strong>Vercel</strong>, which hosts the website</li>
            <li><strong>Resend</strong>, which delivers contact form submissions to our inbox by email</li>
            <li><strong>Google</strong>, which hosts the email inbox those submissions arrive in</li>
          </ul>
          <p>
            We may also disclose information when the law requires it, to
            protect our rights or the safety of others, or as part of a sale or
            reorganization of our business.
          </p>

          <h2>Cookies</h2>
          <p>
            The site does not use advertising or analytics cookies. If we add
            analytics in the future, we will update this policy first and
            describe what is collected and how to opt out.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep contact form submissions and related correspondence for as
            long as we need them to respond to you, provide our services and
            keep reasonable business records, and then delete them. Server logs
            are kept according to our hosting provider&apos;s retention
            settings.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over an encrypted (HTTPS) connection, and we
            limit access to the information you send us to the people who need
            it to respond. No method of transmission or storage is completely
            secure, so we can&apos;t guarantee absolute security.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to tell you what personal information we hold about
            you, correct it, or delete it. Depending on the state you live in,
            you may have additional rights under state privacy law. To make a
            request, email us at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We may
            need to confirm your identity before acting on a request.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            This site is intended for businesses and adults. It is not directed
            to children under 13, and we do not knowingly collect personal
            information from them. If you believe a child has sent us personal
            information, contact us and we will delete it.
          </p>

          <h2>Links to other websites</h2>
          <p>
            The site may link to websites we don&apos;t control, such as
            social media pages. Their privacy practices are governed by their
            own policies.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will
            post the new version on this page and change the effective date at
            the top.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy or your information can be sent to:
          </p>
          <p>
            BHG Safety Partners LLC
            <br />
            11325 Dove Ridge Road
            <br />
            Hannibal, MO 63401
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <br />
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </p>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-bhg-orange font-semibold hover:gap-3 transition-all duration-150"
          >
            Contact BHG Forklift Training
          </Link>
        </div>
      </article>
    </div>
  );
}
