import type { CityContent } from "./types";

const content: CityContent = {
  slug: "georgia/marietta",
  updated: "2026-09-22",
  metaDescription:
    "Onsite forklift training in Marietta, GA and Cobb County: aerospace suppliers near Lockheed Martin, wholesale distribution centers, on your own trucks.",
  lede:
    "Marietta, Georgia is where Lockheed Martin builds the C-130J, and the rest of Cobb County has a strong concentration of wholesale distributors, including Genuine Parts (NAPA) and HD Supply. BHG Forklift Training comes to your Marietta-area facility and trains and evaluates your operators on your own trucks.",
  intro: [
    "Georgia's Department of Economic Development marked 75 years of Lockheed Martin production in Marietta in June 2026, noting that the 8-million-square-foot site builds the C-130J Super Hercules and F-35 center wing assemblies and that the company is adding 1,200 Marietta jobs. Cobb County's economic development office says the county draws aerospace suppliers that want to sit near Lockheed and Dobbins Joint Air Reserve Base, alongside a strong concentration of durable goods wholesalers. Both groups rely on forklift operators every shift.",
    "Georgia has no OSHA State Plan covering private employers, so a Marietta warehouse or plant is under federal OSHA and follows 29 CFR 1910.178 as written. OSHA assigns Cobb County to its Atlanta West Area Office. The practical question for most Cobb employers is not which rule applies but whether each operator has been trained and evaluated on the specific trucks and conditions in their building.",
    "BHG Forklift Training, a service of the Hannibal, Missouri company BHG Safety Partners LLC, handles that at your facility. Operators get classroom instruction, hands-on practice and an individual evaluation while doing their actual job on your trucks, and sessions can be run in English or Spanish. When they pass, your company certifies them. BHG covers all seven truck classes in the same visit.",
  ],
  materialHandling: [
    {
      name: "Aerospace manufacturing and suppliers",
      detail:
        "Lockheed Martin produces the C-130J and the F-35 center wing assembly in Marietta, and Cobb County markets itself to first and second tier suppliers that want to be close to Lockheed. Aircraft parts are large, costly and often awkwardly shaped, so operators need to understand load center, attachments and spotters, and slow travel around tooling and assembly areas.",
    },
    {
      name: "Wholesale distribution centers",
      detail:
        "Cobb County lists Genuine Parts Company (NAPA) and HD Supply among its major wholesale companies, both headquartered in the county, and describes office-warehouse space ranging up to buildings of more than 100,000 square feet. Parts and supply distribution depends on order pickers, reach trucks and pallet jacks in racked aisles, where elevated picking, rack strikes and pedestrian traffic top the list of hazards.",
    },
    {
      name: "Foodservice and refrigeration",
      detail:
        "Reinhart Food Service and Hussmann both appear on Cobb County's wholesale trade list. Foodservice distribution means moving between freezer, cooler and dry storage all day, so operators need practice with condensation on floors, cold exposure and battery trucks working at low temperatures.",
    },
  ],
  oshaOffice: {
    name: "OSHA Atlanta West Area Office",
    location: "1995 North Park Place SE, Suite 525, Atlanta, GA 30339",
    url: "https://www.osha.gov/contactus/bystate/GA/areaoffice",
    note: "OSHA's Georgia county list assigns Cobb County, and neighboring Paulding, Bartow and Douglas counties, to the Atlanta West Area Office. Cherokee County is assigned to the Atlanta East Area Office at 2296 Henderson Mill Road NE, Suite 200, Atlanta, GA 30345.",
  },
  localConsiderations: [
    "Federal OSHA covers private employers in Marietta and the rest of Cobb County, since Georgia does not run a State Plan for the private sector. The forklift rule is 29 CFR 1910.178, with training on each truck type and a performance evaluation at least every three years.",
    "A Cobb County company with a second building in Cherokee County deals with two federal area offices: Atlanta West for Cobb and Atlanta East for Cherokee. The standard is the same, but inspections and complaints go through different offices.",
    "The National Weather Service office in Peachtree City says north Georgia outside the mountains can expect 90 degrees or higher on 30 to 60 days a year and about 120 days with measurable rain. Heat in trailers and on outdoor yards, and wet dock approaches after summer storms, should shape how and when operators do outdoor loading.",
  ],
  serviceArea: [
    "Cobb County",
    "Kennesaw",
    "Smyrna",
    "Acworth",
    "Powder Springs",
    "Austell",
    "Mableton",
    "Paulding County",
    "Cherokee County",
    "Bartow County",
  ],
  featuredClasses: ["class-1-forklift", "class-2-forklift", "class-3-forklift", "class-4-forklift"],
  faqs: [
    {
      question: "Which OSHA office covers our facility in Marietta, Georgia?",
      answer:
        "Federal OSHA's Atlanta West Area Office, at 1995 North Park Place SE, Suite 525, in Atlanta. OSHA's Georgia county list assigns Cobb County to that office. Georgia has no State Plan covering private employers, so 29 CFR 1910.178 applies directly. If you also run a site in Cherokee County, that one falls under the Atlanta East Area Office instead.",
    },
    {
      question: "We supply parts to the aerospace industry in Cobb County. What should forklift training cover?",
      answer:
        "The standard topics, plus the loads you actually move. Long, light or oddly shaped parts shift a truck's load center, and many shops use attachments, fork extensions or spotters for them. Operators should read the capacity plate for the truck as equipped and be evaluated moving your real parts through your aisles. BHG runs that training and evaluation at your facility.",
    },
    {
      question: "Our order pickers work high racking all day. Do they need separate training?",
      answer:
        "Yes. OSHA requires training on each type of truck an operator uses, and a Class 2 order picker lifts the operator along with the load, which brings fall protection and overhead clearance into play. Someone who is qualified on a sit-down Class 1 truck still needs training and an evaluation on the order picker. BHG covers each class your Marietta distribution center runs.",
    },
    {
      question: "Do we need to re-evaluate operators if we move to a new warehouse in Cobb County?",
      answer:
        "Refresher training is required when workplace conditions change in a way that affects safe operation, and a new building with different racking, aisle widths, dock layouts or traffic patterns usually qualifies. Otherwise each operator needs an evaluation at least every three years. BHG can train and evaluate your crew in the new building before or right after the move.",
    },
  ],
  sources: [
    { label: "OSHA: Georgia area offices and county assignments", url: "https://www.osha.gov/contactus/bystate/GA/areaoffice" },
    { label: "OSHA: State Plans (Georgia under federal OSHA jurisdiction)", url: "https://www.osha.gov/stateplans" },
    {
      label: "Georgia Department of Economic Development: Lockheed Martin's 75 years in Marietta (June 2026)",
      url: "https://georgia.org/press-releases/2026/georgia-applauds-lockheed-martins-75-years-production-impact",
    },
    {
      label: "Cobb County Economic Development: Target Sectors",
      url: "https://www.cobbcounty.gov/economic-development/why-cobb/target-sectors",
    },
    { label: "NWS Atlanta/Peachtree City: What's Typical in North and Central Georgia?", url: "https://www.weather.gov/ffc/clisumlst" },
    { label: "OSHA: 29 CFR 1910.178 Powered industrial trucks", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178" },
  ],
};

export default content;
