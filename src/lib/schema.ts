/**
 * schema.ts
 * Builders for the JSON-LD blocks used across the site.
 *
 * Every absolute URL is composed from SITE_URL so structured data can never
 * point at the redirecting host.
 */
import { CONTACT, LEGAL_NAME, PARENT_SITE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList for a page's ancestor trail. Pass the full trail including
 * the page itself, e.g. [{ name: "Home", path: "/" }, { name: "Classes", path: "/classes" }].
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export type Faq = { question: string; answer: string };

/** FAQPage for a page that renders the matching Q&A visibly. */
export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** The business address, shared by Organization and LocalBusiness blocks. */
export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: CONTACT.street,
  addressLocality: CONTACT.city,
  addressRegion: CONTACT.region,
  postalCode: CONTACT.postalCode,
  addressCountry: "US",
} as const;

/** Site-wide Organization block, rendered once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/bhg-logo.png`,
    description:
      "BHG Forklift Training delivers onsite, OSHA-aligned forklift operator training and evaluations for OSHA truck Classes I through VII, from Hannibal, Missouri to employers across the Midwest.",
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: postalAddress,
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_SITE.name,
      url: PARENT_SITE.url,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export type BlogPostingInput = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated: string;
  author: string;
};

/** BlogPosting for a single article; the publisher is the business itself. */
export function blogPostingSchema(post: BlogPostingInput) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      name: post.author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/bhg-logo.png` },
    },
    image: `${SITE_URL}/bhg-logo.png`,
  };
}
