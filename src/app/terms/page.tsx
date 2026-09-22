import type { Metadata } from "next";
import Link from "next/link";
import Schema from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Terms of Service | BHG Forklift Training",
  description:
    "The terms that govern your use of bhgforklifttraining.com, including how to rely on the forklift safety and OSHA information published on the site.",
  alternates: {
    canonical: "/terms",
  },
};

// Update this whenever the terms change.
const EFFECTIVE_DATE = "September 22, 2026";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsOfServicePage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
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
            Terms of Service
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
            These terms govern your use of bhgforklifttraining.com (the
            &ldquo;site&rdquo;), which is run by BHG Safety Partners LLC
            (&ldquo;BHG,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) under the
            name BHG Forklift Training. By using the site, you agree to these terms. If
            you don&apos;t agree, please don&apos;t use the site.
          </p>

          <h2>About the information on this site</h2>
          <p>
            The articles, class descriptions and other content on the site
            are general information about forklift safety and OSHA
            requirements. They are not legal advice, and they are not a
            substitute for a safety assessment of your own workplace.
            Regulations change, and what applies to you depends on your
            industry, your equipment, your location and the work your people
            do.
          </p>
          <p>
            Before you act on anything you read here, check the current
            regulations that apply to you, or{" "}
            <Link href="/contact">talk to us</Link> or another qualified
            professional about your situation. Reading the site doesn&apos;t
            create a client relationship.
          </p>

          <h2>Our services</h2>
          <p>
            The site describes the forklift training we offer.
            Submitting a form or requesting a quote doesn&apos;t create a
            contract. Any services we provide are governed by the proposal,
            quote or agreement we agree with you in writing, and those terms
            control if they differ from anything on the site.
          </p>
          <p>
            Our training and evaluations help you work toward compliance and a
            safer workplace. We can&apos;t guarantee a particular outcome, such
            as the result of an OSHA inspection. Under OSHA&apos;s rules, the
            employer remains responsible for certifying its operators and for
            keeping its workplace safe and compliant.
          </p>

          <h2>Using the site</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the site for anything unlawful</li>
            <li>Send false information or spam through our contact forms</li>
            <li>Try to break into, overload or disrupt the site or the systems behind it</li>
            <li>Copy the site&apos;s content at scale, for example by scraping, to republish it as your own</li>
          </ul>

          <h2>Our content</h2>
          <p>
            The text, graphics, logos and other content on the site belong to
            BHG Safety Partners LLC or the people who licensed them to us, and are
            protected by copyright and trademark law. You&apos;re welcome to
            view, print and share pages for your own internal, non-commercial
            use, such as passing an article along to your team, as long as you
            keep any notices on them. Any other use needs our written
            permission.
          </p>

          <h2>Links to other websites</h2>
          <p>
            The site may link to websites we don&apos;t control, including
            government resources and social media. We aren&apos;t responsible
            for their content, accuracy or privacy practices.
          </p>

          <h2>Privacy</h2>
          <p>
            How we handle the information you share with us is described in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Disclaimer</h2>
          <p>
            We work to keep the site accurate and available, but it is provided
            &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the extent
            the law allows, we make no warranties about the site, express or
            implied, including that it will be accurate, complete, current,
            uninterrupted or error-free.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent the law allows, BHG Safety Partners LLC is not liable for
            any indirect, incidental, special or consequential damages arising
            from your use of the site or your reliance on its content. This
            section covers the site only. Our responsibilities for services we
            deliver to you are set by our written agreement with you.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Missouri,
            without regard to its conflict-of-law rules.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. When we do, we will
            post the new version on this page and change the effective date at
            the top. If you keep using the site after an update, the updated
            terms apply.
          </p>

          <h2>Contact us</h2>
          <p>Questions about these terms can be sent to:</p>
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
