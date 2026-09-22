/**
 * site.ts
 * Single source of truth for the site's origin, brand and contact details.
 *
 * www.bhgforklifttraining.com is the live host (the apex 308-redirects to it).
 * Every absolute URL the site emits — canonicals, sitemap <loc> entries, the
 * robots.txt Sitemap: line and JSON-LD — is built from SITE_URL, and every
 * visible phone number and email address comes from CONTACT, so they can't
 * drift apart between pages.
 */
export const SITE_URL = "https://www.bhgforklifttraining.com";

/** Brand shown in titles, schema and copy. */
export const SITE_NAME = "BHG Forklift Training";

/** The company behind the brand, used where a legal name belongs. */
export const LEGAL_NAME = "BHG Safety Partners LLC";

/**
 * The parent site. General safety consulting and non-forklift courses live
 * there; this site covers forklift operator training only.
 */
export const PARENT_SITE = {
  name: "BHG Safety Partners",
  url: "https://bhgsafety.com",
} as const;

export const CONTACT = {
  email: "info@bhgsafety.com",
  phone: "(573) 822-6448",
  phoneHref: "tel:+15738226448",
  phoneE164: "+15738226448",
  street: "11325 Dove Ridge Road",
  city: "Hannibal",
  region: "MO",
  postalCode: "63401",
} as const;

/** Absolute URL for a site-relative path, e.g. absoluteUrl("/about"). */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
