/**
 * Which location pages are published.
 *
 * data/locations.json holds ~1,600 candidate cities across the 17-state
 * service area, but only the cities listed here get a page. The rest were
 * near-identical programmatic pages copied from bhgsafety.com (SEO audit,
 * Sept 2026, finding #14), so the site launches with the cities that have
 * measured forklift search demand and grows one hyper-local page at a time.
 *
 * To publish a city: write its hyper-local content in src/content/cities/
 * (see types.ts there) and register it in src/content/cities/index.ts, then
 * add its slug ("<state>/<city>", exactly as in data/locations.json) to
 * LIVE_CITY_SLUGS. The build fails if a listed city has no content.
 * docs/city-rollout.md ranks which cities to publish next.
 * The page, the state hub, the locations index and the sitemap all pick it
 * up from this list. Unpublished city URLs 308-redirect to their state page
 * (see src/proxy.ts).
 *
 * Kept free of the locations.json import so the proxy stays lightweight.
 */

export const STATE_SLUGS = [
  "alabama",
  "arkansas",
  "georgia",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "mississippi",
  "missouri",
  "nebraska",
  "north-dakota",
  "oklahoma",
  "south-dakota",
  "tennessee",
  "texas",
] as const;

// Launch set, chosen 2026-09-22 from measured forklift search demand
// (see docs/city-rollout.md), plus St. Louis and Kansas City for the home market.
export const LIVE_CITY_SLUGS: readonly string[] = [
  "georgia/atlanta",
  "illinois/chicago",
  "indiana/indianapolis",
  "missouri/kansas-city",
  "missouri/st-louis",
  "oklahoma/oklahoma-city",
  "oklahoma/tulsa",
  "tennessee/memphis",
  "tennessee/nashville",
  "texas/dallas",
  "texas/houston",
  "texas/san-antonio",
];

const liveSet = new Set(LIVE_CITY_SLUGS);
const stateSet = new Set<string>(STATE_SLUGS);

export function isLiveCity(slug: string): boolean {
  return liveSet.has(slug.toLowerCase());
}

export function isServiceState(stateSlug: string): boolean {
  return stateSet.has(stateSlug.toLowerCase());
}
