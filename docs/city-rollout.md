# City landing page rollout plan

Ranked list of the next city pages for bhgforklifttraining.com, built from measured forklift search demand. Machine-readable version: `data/city-rollout.json`. Keyword data pulled **2026-09-22**.

## Summary

- **32 cities are live** (`src/lib/live-cities.ts`): the 12 launch cities plus all of Waves 1 and 2, published 2026-09-22. The launch cities are: Houston, Chicago, Memphis, Atlanta, San Antonio, Indianapolis, Dallas, Oklahoma City, Nashville, Tulsa, St. Louis and Kansas City. They were chosen from this same data: the top forklift-demand cities plus the home market.
- **245 candidates scored** (below): the top 15 cities per state from `data/locations.json`, plus Hannibal, MO and Quincy, IL, minus the 12 live cities.
- **30 candidates have measurable forklift demand** (at least one keyword at 10+ searches/month). The other 213 measured zero, including Hannibal and Quincy.
- **Waves 1-4 hold 32 pages**: all 30 cities with demand, plus Hannibal and Quincy as home-area overrides. At 2-3 pages/week, that is about 12-14 weeks of publishing.
- **Demand is concentrated.** Houston (380/mo), Chicago (260), El Paso (250) and Memphis (240) dwarf everything else. Outside the top 20, cities show 10-20 searches/month, which is at the floor of what Google Ads reports. Pages beyond Wave 4 should come from real signals (Search Console impressions on state pages, customer locations), not volume.

## Method

**Candidates.** `data/locations.json` has no population field. Within each state the list is ordered roughly by population, largest first, so **position in the state's list is used as the population-rank proxy** (`populationRank` 1 = first city listed for the state).

**Keywords.** Two forklift patterns per city, US national search volume, English: `forklift training <city>` and `forklift certification <city>`. Ambiguous or common names (Springfield, Jackson, Columbus, Aurora, Kansas City, Augusta and others) are queried with the state abbreviation (e.g. `forklift training springfield mo`), and each such row says so.

**Sources (DataForSEO MCP, Google Ads search volume).**
1. **bhgsafety.com's rollout data** (`Compass2026/BHGSafetyPartners`, `data/city-rollout.json`, pulled the same day). It measured these two forklift patterns for 240 candidate cities: Google Ads for population rank 1-8 in every state and for all Missouri, Illinois and Texas candidates, and DataForSEO Labs for the rest. Its OSHA keywords are not used here. Each row's `source` field records which applies.
2. **New pulls for this repo** covering the 17 cities that data excluded because they were live on bhgsafety.com (Atlanta, Birmingham, Chicago, Des Moines, Fargo, Houston, Indianapolis, Jackson MS, Little Rock, Louisville, Memphis, New Orleans, Oklahoma City, Omaha, Sioux Falls, St. Louis, Wichita), plus Hannibal and Quincy.
3. **Other patterns sampled and dropped.** `forklift license <city>` returned 10/mo in Houston and Chicago. `forklift classes <city>` returned 10 in Houston and a grouped bucket in Chicago. Neither adds meaningful signal, so they aren't scored.

**Grouped buckets.** Google Ads sometimes reports one grouped volume, with identical volume, CPC and competition, for close variants (e.g. Chicago: training = certification = 260). Those are **counted once**, not summed, and the row says so.

**Score (exact formula).**

```
demand     = forklift training + forklift certification volume (grouped buckets counted once; null = 0)
tierPoints = 5 if Tier 1, 2 if Tier 2, 0 if Tier 3
popPoints  = max(0, 16 - populationRank) / 5      # rank 1 -> 3.0, rank 15 -> 0.2
score      = demand + tierPoints + popPoints
```

Volumes come in steps of 10 and tier + population add at most 8, so **demand decides the order**. Tier and population only break ties.

**Proximity tiers (by state).** Tier 1 = Missouri, Illinois. Tier 2 = Iowa, Kansas, Nebraska, Indiana, Kentucky, Tennessee, Arkansas, Oklahoma. Tier 3 = Texas, Louisiana, Mississippi, Alabama, Georgia, North Dakota, South Dakota.

**Wave rules.** Wave 1 = Hannibal and Quincy (home-area override), then the top 8 by score. Waves 2+ take the remaining cities with demand in score order, 10 per wave.

## Rollout waves

Rank = suggested publish order. Demand = searches/month (US).

### Wave 1: 10 pages (published 2026-09-22)

| Rank | City | State | Slug | Demand | Top keyword | Tier | Notes |
|---:|---|---|---|---:|---|:-:|---|
| 1 | Hannibal | MO | `missouri/hannibal` | 0 | - | 1 | Home base (BHG HQ). Home-area override: in Wave 1 whatever its measured demand. Queried as "hannibal mo". |
| 2 | Quincy | IL | `illinois/quincy` | 0 | - | 1 | Home area, across the river from Hannibal. Home-area override. Queried as "quincy il" (Quincy, MA is larger). |
| 3 | El Paso | TX | `texas/el-paso` | 250 | forklift certification el paso (210) | 3 | Most "forklift certification el paso" volume is flagged as partly Spanish-language search. |
| 4 | Fort Worth | TX | `texas/fort-worth` | 90 | forklift training fort worth (50) | 3 |  |
| 5 | New Orleans | LA | `louisiana/new-orleans` | 50 | forklift training new orleans (30) | 3 |  |
| 6 | Austin | TX | `texas/austin` | 50 | forklift certification austin (40) | 3 |  |
| 7 | Omaha | NE | `nebraska/omaha` | 40 | forklift training omaha (20) | 2 |  |
| 8 | Augusta | GA | `georgia/augusta` | 40 | forklift training augusta ga (20) | 3 | Ambiguous name - queried with state suffix ("augusta ga"). |
| 9 | Baton Rouge | LA | `louisiana/baton-rouge` | 40 | forklift training baton rouge (20) | 3 |  |
| 10 | Arlington | TX | `texas/arlington` | 40 | forklift training arlington tx (30) | 3 | Ambiguous name - queried with state suffix ("arlington tx"). |

### Wave 2: 10 pages (published 2026-09-22)

| Rank | City | State | Slug | Demand | Top keyword | Tier | Notes |
|---:|---|---|---|---:|---|:-:|---|
| 11 | Birmingham | AL | `alabama/birmingham` | 30 | forklift training birmingham al (20) | 3 |  |
| 12 | Aurora | IL | `illinois/aurora` | 20 | forklift training aurora il (10) | 1 | Ambiguous name - queried with state suffix ("aurora il"). |
| 13 | Knoxville | TN | `tennessee/knoxville` | 20 | forklift training knoxville (10) | 2 |  |
| 14 | Jackson | TN | `tennessee/jackson` | 20 | forklift training jackson tn (20) | 2 | Ambiguous name - queried with state suffix ("jackson tn"). |
| 15 | Jackson | MS | `mississippi/jackson` | 20 | forklift training jackson ms (10) | 3 |  |
| 16 | Columbus | GA | `georgia/columbus` | 20 | forklift training columbus ga (10) | 3 | Ambiguous name - queried with state suffix ("columbus ga"). |
| 17 | Shreveport | LA | `louisiana/shreveport` | 20 | forklift certification shreveport (20) | 3 |  |
| 18 | Mobile | AL | `alabama/mobile` | 20 | forklift training mobile al (10) | 3 | Ambiguous name - queried with state suffix ("mobile al"). |
| 19 | Lafayette | LA | `louisiana/lafayette` | 20 | forklift training lafayette la (10) | 3 | Ambiguous name - queried with state suffix ("lafayette la"). |
| 20 | Albany | GA | `georgia/albany` | 20 | forklift training albany ga (10) | 3 | Ambiguous name - queried with state suffix ("albany ga"). |

### Wave 3: 10 pages

| Rank | City | State | Slug | Demand | Top keyword | Tier | Notes |
|---:|---|---|---|---:|---|:-:|---|
| 21 | Springfield | MO | `missouri/springfield` | 10 | forklift training springfield mo (10) | 1 | Ambiguous name - queried with state suffix ("springfield mo"). |
| 22 | Elgin | IL | `illinois/elgin` | 10 | forklift training elgin (10) | 1 |  |
| 23 | Peoria | IL | `illinois/peoria` | 10 | forklift training peoria il (10) | 1 | Ambiguous name - queried with state suffix ("peoria il"). |
| 24 | Des Moines | IA | `iowa/des-moines` | 10 | forklift training des moines (10) | 2 |  |
| 25 | Fort Wayne | IN | `indiana/fort-wayne` | 10 | forklift training fort wayne (10) | 2 |  |
| 26 | Lexington | KY | `kentucky/lexington` | 10 | forklift training lexington (10) | 2 |  |
| 27 | Athens | GA | `georgia/athens` | 10 | forklift training athens ga (10) | 3 | Ambiguous name - queried with state suffix ("athens ga"). |
| 28 | Corpus Christi | TX | `texas/corpus-christi` | 10 | forklift certification corpus christi (10) | 3 |  |
| 29 | Monroe | LA | `louisiana/monroe` | 10 | forklift certification monroe la (10) | 3 | Ambiguous name - queried with state suffix ("monroe la"). |
| 30 | Lubbock | TX | `texas/lubbock` | 10 | forklift training lubbock (10) | 3 |  |

### Wave 4: 2 pages

| Rank | City | State | Slug | Demand | Top keyword | Tier | Notes |
|---:|---|---|---|---:|---|:-:|---|
| 31 | Marietta | GA | `georgia/marietta` | 10 | forklift training marietta ga (10) | 3 | Ambiguous name - queried with state suffix ("marietta ga"). |
| 32 | Amarillo | TX | `texas/amarillo` | 10 | forklift training amarillo (10) | 3 |  |

## Zero measured demand: the state page covers these for now

These 213 candidates had no volume on either keyword. **Promote one into a wave only if Search Console shows it earning impressions** (e.g. `forklift training <city>` queries landing on the state page), or if BHG has real customers there. The first 30 by score (Tier 1 and larger cities first):

| # | Slug | Tier | Pop. rank |
|---:|---|:-:|---:|
| 1 | `illinois/joliet` | 1 | 3 |
| 2 | `illinois/rockford` | 1 | 4 |
| 3 | `missouri/columbia` | 1 | 4 |
| 4 | `illinois/springfield` | 1 | 5 |
| 5 | `missouri/independence` | 1 | 5 |
| 6 | `missouri/lee-s-summit` | 1 | 6 |
| 7 | `missouri/o-fallon` | 1 | 7 |
| 8 | `illinois/champaign` | 1 | 8 |
| 9 | `missouri/st-joseph` | 1 | 8 |
| 10 | `illinois/waukegan` | 1 | 9 |
| 11 | `missouri/st-charles` | 1 | 9 |
| 12 | `illinois/cicero` | 1 | 10 |
| 13 | `missouri/blue-springs` | 1 | 10 |
| 14 | `illinois/bloomington` | 1 | 11 |
| 15 | `missouri/joplin` | 1 | 11 |
| 16 | `illinois/naperville` | 1 | 12 |
| 17 | `missouri/chesterfield` | 1 | 12 |
| 18 | `illinois/evanston` | 1 | 13 |
| 19 | `missouri/jefferson-city` | 1 | 13 |
| 20 | `illinois/decatur` | 1 | 14 |
| 21 | `missouri/cape-girardeau` | 1 | 14 |
| 22 | `illinois/schaumburg` | 1 | 15 |
| 23 | `missouri/florissant` | 1 | 15 |
| 24 | `arkansas/little-rock` | 2 | 1 |
| 25 | `kansas/wichita` | 2 | 1 |
| 26 | `kentucky/louisville` | 2 | 1 |
| 27 | `arkansas/fort-smith` | 2 | 2 |
| 28 | `iowa/cedar-rapids` | 2 | 2 |
| 29 | `kansas/overland-park` | 2 | 2 |
| 30 | `nebraska/lincoln` | 2 | 2 |

The full list is in `data/city-rollout.json` (rows with `wave: null`).

## How to publish a city

1. Write `src/content/cities/<state>--<city>.ts` following `src/content/cities/types.ts`: forklift-specific local facts, each backed by a source, with no invented clients, projects or drive times.
2. Register it in `src/content/cities/index.ts`.
3. Add the slug to `LIVE_CITY_SLUGS` in `src/lib/live-cities.ts`.
4. `npm run build`. The build fails if the content is missing or breaks the rules in `validateCityContent`.

## Caveats

- **Volumes are low and coarse.** Below the top 20, a 10-20 difference is noise. Treat Waves 2-4 as roughly equal priority, and let practical factors (existing clients, travel routing) reorder within a wave.
- **El Paso** leads the candidates, and much of its `forklift certification el paso` volume is flagged as partly Spanish-language search. BHG confirmed (2026-09-22) that it trains in Spanish, so the El Paso page says so.
- **Texas and the Gulf South dominate the list.** Seven of the top 10 candidates are Tier 3. BHG confirmed (2026-09-22) that it travels to all 17 service-area states, so tiers now only break ties.
- **Kansas City** is live on the Missouri side. Unsuffixed metro queries (`forklift training kansas city` 50/mo) aren't counted for any candidate. A Kansas-side page (e.g. Olathe or Overland Park) would need its own content, because OSHA's Wichita office covers Johnson and Wyandotte counties.
- **Ambiguous names queried with a state suffix** under-count real demand, because many local searchers omit the state.
- **Labs-only rows** (population rank 9-15 outside MO/IL/TX, from the bhgsafety.com data) may miss small volumes that Google Ads would report.
- **Overlap with bhgsafety.com.** The parent site's rollout plan targets many of the same cities for OSHA training. Where both sites publish a city, keep this site's page strictly about forklifts, so the two pages answer different searches.

## Data problems in `data/locations.json`

- **`kentucky/hopkins-ville` / "Hopkins Ville"** should be **Hopkinsville**. Fix it before publishing.
- **`louisiana/laplace` / "Laplace"**: the official spelling is **LaPlace**.
- **`north-dakota/lincoln`** (about 4k people) sits at #14, which looks out of population order.
- **Unincorporated places listed as cities**: `nebraska/chalco`, `louisiana/metairie` and others. Copy should not call them "the City of ...".
- **Population order is dated in places** (Nashville is now larger than Memphis, Huntsville larger than Birmingham). This affects the tie-breaker only.

## Indexing checkpoint rule

- Publish **2-3 new city pages per week**.
- After each batch, **check Search Console's Pages report 2-4 weeks later.**
- If **about 80%+ of the new pages are indexed and earning impressions**, move up to **4-5 pages/week**.
- If **"Crawled - currently not indexed" grows**, **pause and improve the existing pages** before adding more: add more local specifics, internal links from the state hub, and real customer details.
- Re-pull keyword volumes each quarter (next: 2026-12).
