/**
 * Hyper-local content for a published city page.
 *
 * Every published city (src/lib/live-cities.ts) must have one of these in
 * src/content/cities/, registered in src/content/cities/index.ts. The build
 * fails if a published city has no content, or if its content breaks the
 * rules checked in validateCityContent() (index.ts), so a thin template page
 * can't go live by accident.
 *
 * The test for every field: if you swapped in another city's name, would the
 * sentence still be true? If so, it isn't local enough.
 *
 * Only verifiable facts belong here, each backed by an entry in `sources`.
 * Never invent clients, projects, testimonials, drive times or local offices.
 * This is a forklift training site: write about where forklifts work in the
 * city and what that means for operator training, not general safety.
 */

export interface CityMaterialHandling {
  /** Short sector or place name, e.g. "Port Houston container terminals". */
  name: string;
  /** 1–2 sentences: the forklift and material-handling work there, and its hazards. */
  detail: string;
}

export interface CityFaq {
  question: string;
  answer: string;
}

export interface CitySource {
  label: string;
  url: string;
}

export interface CityContent {
  /** "<state>/<city>", matching data/locations.json. */
  slug: string;
  /** Last substantive content update, YYYY-MM-DD. Drives the sitemap lastmod. */
  updated: string;
  /** Meta description, 120–160 characters, specific to this city. */
  metaDescription: string;
  /** Hero subheading, 1–2 sentences. */
  lede: string;
  /** Opening section, 2–3 paragraphs about forklift work and training in this city. */
  intro: string[];
  /** 3–5 local sectors or places where forklifts work, and their hazards. */
  materialHandling: CityMaterialHandling[];
  /** The OSHA (or state-plan) office that covers this city. */
  oshaOffice: {
    name: string;
    /** Street address or city of the office, as published by OSHA or the state plan. */
    location: string;
    url: string;
    /** Shown under the office when a county is split between offices, or a state plan applies. */
    note?: string;
  };
  /** 2–4 local conditions that shape forklift work: climate, geography, state rules. */
  localConsiderations: string[];
  /** Nearby towns, suburbs or counties this page covers. */
  serviceArea: string[];
  /** 2–4 slugs from data/classes.json most relevant to this market. */
  featuredClasses: string[];
  /** 3–5 questions a local employer would actually ask. Rendered visibly and as FAQPage JSON-LD. */
  faqs: CityFaq[];
  /**
   * Optional proof from real BHG work in this area: projects, clients (with
   * permission) or testimonials. Never invent these.
   */
  proof?: { quote: string; attribution: string }[];
  /** Where the facts came from. Not rendered; kept for review. At least 3. */
  sources: CitySource[];
}
