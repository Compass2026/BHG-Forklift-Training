import locationsData from "../../data/locations.json";
import { isLiveCity } from "@/lib/live-cities";

export interface LocationEntry {
  slug: string;
  stateAbbr: string;
  stateName: string;
  stateSlug: string;
  city: string;
  keywords: string[];
}

export interface ServiceState {
  stateSlug: string;
  stateName: string;
  stateAbbr: string;
}

const allLocations = locationsData as LocationEntry[];

/** Cities with a published page — see src/lib/live-cities.ts. */
export const liveLocations: LocationEntry[] = allLocations.filter((loc) =>
  isLiveCity(loc.slug)
);

/** Every state in the service area, alphabetical, whether or not it has a live city yet. */
export const serviceStates: ServiceState[] = [
  ...new Map(
    allLocations.map((loc) => [
      loc.stateSlug,
      { stateSlug: loc.stateSlug, stateName: loc.stateName, stateAbbr: loc.stateAbbr },
    ])
  ).values(),
].sort((a, b) => a.stateName.localeCompare(b.stateName));

export function findServiceState(stateSlug: string): ServiceState | undefined {
  return serviceStates.find((s) => s.stateSlug === stateSlug.toLowerCase());
}

/** A published city page, or undefined if the city is unknown or unpublished. */
export function findLiveLocation(state: string, city: string): LocationEntry | undefined {
  const slug = `${state}/${city}`.toLowerCase();
  return liveLocations.find((loc) => loc.slug === slug);
}

export function getLiveCitiesByState(stateSlug: string): LocationEntry[] {
  return liveLocations
    .filter((loc) => loc.stateSlug === stateSlug)
    .sort((a, b) => a.city.localeCompare(b.city));
}
