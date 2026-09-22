import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLiveCity, isServiceState } from "@/lib/live-cities";

/**
 * Unpublished city pages permanently redirect to their state hub, so links
 * and index entries for the ~1,590 retired city URLs keep their value.
 * Published cities (src/lib/live-cities.ts) and unknown states pass through.
 */
export function proxy(request: NextRequest) {
  const [, , state, city] = request.nextUrl.pathname.split("/");
  if (!state || !city) return NextResponse.next();

  if (isServiceState(state) && !isLiveCity(`${state}/${city}`)) {
    return NextResponse.redirect(
      new URL(`/locations/${state.toLowerCase()}`, request.url),
      308
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/locations/:state/:city",
};
