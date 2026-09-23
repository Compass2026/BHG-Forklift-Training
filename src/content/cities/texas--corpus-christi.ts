import type { CityContent } from "./types";

const content: CityContent = {
  slug: "texas/corpus-christi",
  updated: "2026-09-22",
  metaDescription:
    "Onsite forklift training in Corpus Christi for port cargo docks, refinery warehouses and Coastal Bend plants, on your own trucks, per OSHA 1910.178(l).",
  lede:
    "In Corpus Christi, forklifts move pipe and wind turbine parts across open wharves, stage parts and supplies at refineries and chemical plants, and run cold docks at beef and grocery operations. BHG trains and evaluates your operators at your facility, on the trucks they already drive.",
  intro: [
    "The Port of Corpus Christi calls itself the third-largest port in the United States by total waterborne tonnage. Its customers moved a record 110.3 million tons through the ship channel in the first half of 2026. Most of that tonnage is liquid cargo such as crude oil, LNG and refined products, but the port's general cargo docks still handle steel pipe, flat steel, super-sacks, wind components and project cargo. On the landside, refineries, plastics plants and a steel mill in neighboring San Patricio County keep warehouses, laydown yards and maintenance shops busy around the bay.",
    "Each of those places has its own forklift hazards. On a wharf, the dangers are open edges, rail lines set into the apron, and long loads that block the operator's view. Inside a refinery fence, the question is whether a given truck is approved for the area at all. At a beef plant or grocery warehouse, operators deal with wet floors, freezer doors and constant turns at the dock. OSHA's rule expects training and evaluation to match the truck and the place it runs, and a generic course can't do that.",
    "BHG Forklift Training is based in Hannibal, Missouri, and belongs to BHG Safety Partners LLC, a Disabled Veteran-Owned company. We come to your Corpus Christi site and work through the classroom material, hands-on practice and a performance evaluation on your equipment, your docks and your yard. Sessions can be run in English or Spanish. Your company keeps the certification decision, signing off each operator who completes the training and passes the evaluation.",
  ],
  materialHandling: [
    {
      name: "Port of Corpus Christi general cargo docks",
      detail:
        "The port lists five multi-purpose cargo docks for wind turbine components, steel pipe, flat steel, containers, Ro/Ro, super-sacks and heavy lift cargo, with over 120 acres of open storage on the Northside and a 76-acre open storage yard on the Southside. Pneumatic-tire forklifts and telehandlers working these laydown yards handle long and heavy loads on open ground, next to crane lifts and dockside rail tracks.",
    },
    {
      name: "Dock 9 rail canopy and Dock 15 bagging lines",
      detail:
        "At Dock 9, a 48-foot-wide canopy covers double rail tracks behind the warehouse for transfers of weather-sensitive cargo, and two high-speed bagging lines sit near Dock 15. Moving bags and super-sacks between railcars, warehouses and trucks means working on dock boards and next to rail cars, and loads can tear or slide off the forks.",
    },
    {
      name: "Refineries and petrochemical plants",
      detail:
        "The Corpus Christi Regional Economic Development Corporation lists Valero, Flint Hills, CITGO, Celanese, Chemours, LyondellBasell and Gulf Coast Growth Ventures among Coastal Bend chemical and petrochemical employers. Warehouses and turnaround staging areas at these sites put forklifts near flammable liquids and gases, where the truck's designation has to match the area classification.",
    },
    {
      name: "Steel and plastics plants in San Patricio County",
      detail:
        "CCREDC reports that Steel Dynamics opened a 1.2 million-square-foot steel plant in Sinton in spring 2022, and that the SABIC and ExxonMobil joint venture Gulf Coast Growth Ventures opened a 1,300-acre plastics plant in Gregory the same year. Steel coil and bagged resin both call for heavy-capacity trucks, the right attachments and careful stacking.",
    },
    {
      name: "Food processing and grocery distribution",
      detail:
        "CCREDC's major employer list includes HEB Stores & Bakery with 3,847 employees and STX Beef Processors with 750. Operators in beef processing and grocery warehouses cross wet floors and pass in and out of cold rooms, and on busy docks they share space with people on foot.",
    },
  ],
  oshaOffice: {
    name: "OSHA Corpus Christi Area Office",
    location: "400 Mann Street, Suite 100, Corpus Christi, TX 78401",
    url: "https://www.osha.gov/contactus/bystate/TX/areaoffice",
    note: "OSHA assigns Nueces County to its Corpus Christi Area Office, along with San Patricio, Aransas, Kleberg, Jim Wells, Refugio, Bee and Live Oak counties.",
  },
  localConsiderations: [
    "Texas does not run an OSHA-approved State Plan, so federal OSHA enforces 29 CFR 1910.178 at private Corpus Christi employers. On the port's docks, marine terminal work falls under 29 CFR Part 1917, and 1917.1 makes the general industry training rule, 1910.178(l), apply there too. A stevedore, a terminal and a warehouse all end up with the same training and evaluation duty.",
    "29 CFR 1910.178(c) ties truck designations to hazardous location classes. In a refinery warehouse, a tank farm or a chemical plant's drum storage area, a standard gasoline, LP-gas or electric truck may not be allowed. Operators should know how to read their truck's designation and the area markings, and whether the truck can go in at all.",
    "NOAA's 1991-2020 normals for Corpus Christi show 122.9 days a year at 90 degrees or hotter. On open wharves and laydown yards, heat and Gulf humidity add up, so operators need water, shade, rest breaks and time to acclimate.",
    "NWS Corpus Christi notes that Hurricane Harvey in August 2017 was the first Category 4 hurricane to make landfall on the Middle Texas Coast since Celia in 1970. Storm preparation at a warehouse or yard means securing or moving stacked loads, parking and charging trucks away from flood-prone areas, and inspecting every truck before it goes back into service.",
  ],
  serviceArea: [
    "Nueces County",
    "San Patricio County",
    "Robstown",
    "Portland",
    "Ingleside",
    "Gregory",
    "Sinton",
    "Aransas Pass",
    "Kingsville",
  ],
  featuredClasses: ["class-1-forklift", "class-3-forklift", "class-5-forklift", "class-7-forklift"],
  faqs: [
    {
      question: "Which OSHA office covers forklift operations in Corpus Christi?",
      answer:
        "The federal OSHA Corpus Christi Area Office at 400 Mann Street, Suite 100. OSHA assigns Nueces County to that office, and San Patricio County as well. Texas has no State Plan for private employers, so 29 CFR 1910.178 applies directly, and there is no separate state forklift rule layered on top of it.",
    },
    {
      question: "Our operators work on the port docks. Does the general industry training rule still apply?",
      answer:
        "Yes. Marine terminal work is covered by 29 CFR Part 1917, and its truck section is 1917.43, but 1917.1 applies the 1910.178(l) operator training requirement at marine terminals too. Training should cover wharf edges, rail tracks set into the apron, long loads like pipe, and working near crane lifts. We evaluate operators on the ground they actually work.",
    },
    {
      question: "Can a regular propane forklift go into our refinery warehouse?",
      answer:
        "It depends on how the area is classified. 29 CFR 1910.178(c) lists which truck designations are allowed in locations with flammable gases, vapors, liquids or combustible dust, and some classified areas need specially designated trucks or none at all. We cover truck designations and area markings in instruction, so operators know to check before they drive into a new area.",
    },
    {
      question: "We have telehandlers on the laydown yard and electric forklifts in the warehouse. Is one evaluation enough?",
      answer:
        "No. OSHA requires training and evaluation for each type of truck an operator is authorized to use and for the conditions where it runs. A rough terrain telehandler on an open yard and a Class 1 electric truck in a warehouse are handled very differently. BHG trains and evaluates your people on each class they drive.",
    },
  ],
  sources: [
    { label: "OSHA: Texas area offices and county assignments (Nueces County)", url: "https://www.osha.gov/contactus/bystate/TX/areaoffice" },
    { label: "OSHA: State Plans (Texas under federal OSHA jurisdiction)", url: "https://www.osha.gov/stateplans" },
    { label: "OSHA: 29 CFR 1910.178 Powered industrial trucks", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178" },
    { label: "eCFR: 29 CFR 1917.1 Scope and applicability (1910.178(l) applies at marine terminals)", url: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1917/subpart-A/section-1917.1" },
    { label: "Port of Corpus Christi: Q2 2026 tonnage release (third largest U.S. port by tonnage)", url: "https://portofcc.com/port-of-corpus-christi-customers-deliver-best-second-quarter-best-first-half-in-port-history/" },
    { label: "Port of Corpus Christi: Breakbulk cargo", url: "https://portofcc.com/capabilities/cargo/breakbulk/" },
    { label: "Port of Corpus Christi: Cargo docks", url: "https://portofcc.com/capabilities/facilities/cargo-docks/" },
    { label: "Corpus Christi Regional EDC: Community Profile (industries and major employers)", url: "https://www.ccredc.com/clientuploads/Community_Profile_-_3.12.24.pdf" },
    {
      label: "NOAA NCEI: 1991-2020 annual normals, Corpus Christi (USW00012924)",
      url: "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-annualseasonal-1991-2020&stations=USW00012924&dataTypes=ANN-TMAX-AVGNDS-GRTH090&format=json",
    },
    { label: "NWS Corpus Christi: Major Hurricane Harvey, August 25-29, 2017", url: "https://www.weather.gov/crp/hurricane_harvey" },
  ],
};

export default content;
