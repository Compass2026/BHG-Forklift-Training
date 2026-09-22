import type { CityContent } from "./types";

const content: CityContent = {
  slug: "missouri/hannibal",
  updated: "2026-09-22",
  metaDescription:
    "Onsite forklift training in Hannibal, MO, BHG's home base, for Marion and Ralls County plants, BNSF rail sidings and the Mississippi River port site.",
  lede:
    "Forklift operator training and evaluations for Hannibal-area plants, rail-served shippers and riverfront sites, delivered at your facility on your own trucks by a company based right here in Hannibal.",
  intro: [
    "Hannibal is where BHG Forklift Training is based, and it is a freight town in a small package. The Hannibal Regional Economic Development Council (HREDC) points out that four-lane US Highway 61 and Interstate 72 intersect in the city, BNSF and Norfolk Southern both provide rail service, and the Mississippi River forms Hannibal's eastern border with barge access. Trucks, rail cars and barges all load and unload within a few miles of one another, and each mode sets up forklift work differently.",
    "The region's industrial base is heavier than its size suggests. HREDC's list of major employers includes General Mills, BASF, Continental Cement, Watlow, Spartan Light Metal Products, Hannibal Carbide, Hannibal Machine and Rack Builders. That mix means electric counterbalance trucks in food and packaging areas, propane trucks moving stock and fixtures through machine shops, and pneumatic-tire trucks working outdoor yards around cement and bulk materials.",
    "BHG delivers the three parts of training that 29 CFR 1910.178(l) requires: formal instruction, practical hands-on training, and an evaluation of each operator's performance in your workplace, using your own trucks. We cover all seven OSHA truck classes, so a plant with a Class 5 yard truck outside and electric trucks inside can be handled in one visit. Your company then certifies its operators.",
  ],
  materialHandling: [
    {
      name: "Marion-Ralls Regional Port Authority riverfront site",
      detail:
        "The port authority describes 85-plus acres of industrial land on the Mississippi, next to the BNSF rail yard and protected by a 100-year industrial levee. A $27,324,552 federal PIDP grant announced in April 2026 will fund a barge receiving dock, conveyors and a 21,000-ton dry fertilizer warehouse built with GROWMARK, so new dock, warehouse and truck-loading work is on the way, with forklifts sharing space with conveyors, rail and bulk-handling equipment.",
    },
    {
      name: "Metal, machining and industrial manufacturers",
      detail:
        "HREDC lists Spartan Light Metal Products, Watlow, Hannibal Carbide, Hannibal Machine, Consolidated Machine and NEMO Manufacturing among the area's industrial employers. Moving raw stock, finished parts and heavy fixtures calls for operators who understand load centers and capacity plates, and indoor propane trucks bring carbon monoxide and ventilation into the training.",
    },
    {
      name: "Food and chemical production",
      detail:
        "General Mills and BASF both appear on HREDC's major-employer list for the Hannibal region. Food and chemical plants run steady pallet traffic between production, storage and shipping docks, where pedestrian crossings, trailer loading and the handling of drums and totes are central to operator evaluations.",
    },
    {
      name: "Cement, aggregates and bulk materials",
      detail:
        "HREDC's employer list includes Continental Cement and Bleigh Ready Mix. Outdoor yards with gravel, grades and dust are Class 5 pneumatic-tire territory, and some jobs call for rough terrain forklifts, so training covers stability on uneven ground and visibility around loaders and haul trucks.",
    },
  ],
  oshaOffice: {
    name: "OSHA St. Louis Area Office",
    location:
      "Robert A. Young Federal Building, 1222 Spruce Street, Room 9.104, St. Louis, MO 63103",
    url: "https://www.osha.gov/contactus/bystate/MO/areaoffice",
    note: "OSHA assigns Marion and Ralls counties, along with neighboring Pike, Monroe, Shelby and Lewis counties, to the St. Louis Area Office. Sites across the river in Adams County, Illinois (Quincy) fall under OSHA's Peoria Area Office instead.",
  },
  localConsiderations: [
    "Missouri private employers are under federal OSHA, so the federal powered industrial truck standard, 29 CFR 1910.178, applies directly. Hannibal-area inspections come from the St. Louis Area Office, not Kansas City, even though Hannibal sits in the northern half of the state.",
    "Rail is part of daily work here. With BNSF and Norfolk Southern both serving the area, operators loading boxcars need to know OSHA's rules for rail cars: wheel stops or other positive protection so cars can't move during loading, brakes set and wheel blocks in place, and a check of the car floor before driving onto it.",
    "Riverfront property brings flood planning into the picture. The port authority's site depends on its industrial levee, and operators working near the river may face wet, silty surfaces and changing dock conditions, which count as a change in workplace conditions that can call for refresher training under 1910.178(l)(4).",
  ],
  serviceArea: [
    "Marion County",
    "Ralls County",
    "Palmyra",
    "New London",
    "Monroe City",
    "Pike County",
    "Louisiana",
    "Bowling Green",
    "Monroe County",
    "Shelby County",
  ],
  featuredClasses: ["class-1-forklift", "class-4-forklift", "class-5-forklift"],
  faqs: [
    {
      question: "Which OSHA office covers forklift operations in Hannibal?",
      answer:
        "Missouri is a federal OSHA state for private employers. OSHA assigns Marion and Ralls counties to its St. Louis Area Office in the Robert A. Young Federal Building on Spruce Street. If your company also runs a site across the river in Quincy or elsewhere in Adams County, Illinois, that location falls under OSHA's Peoria Area Office, so you would deal with two different federal offices.",
    },
    {
      question: "BHG is based in Hannibal. Do you still train at our facility?",
      answer:
        "Yes. All BHG training happens at the employer's site, on the trucks your operators actually drive. Being based in Hannibal just means we are local. The hands-on portion and the workplace evaluation take place in your aisles, on your docks and in your yard, because OSHA requires operators to be evaluated in the workplace, not in a generic classroom.",
    },
    {
      question: "We load rail cars on a BNSF siding. Is that covered in the training?",
      answer:
        "Yes. If your operators drive onto boxcars or work next to rail cars, that becomes part of the site-specific training and evaluation. It covers the OSHA rules on wheel stops and positive protection so cars can't move, setting brakes and blocks, placing and securing bridge plates, and checking the car floor for damage before driving onto it.",
    },
    {
      question: "How often do our operators need to be re-evaluated?",
      answer:
        "Under 29 CFR 1910.178(l)(4), each operator's performance must be evaluated at least once every three years. Refresher training is also required after unsafe operation, an accident or near miss, a poor evaluation, assignment to a different type of truck, or a change in workplace conditions, such as a new warehouse layout or a move to riverfront or rail-siding work.",
    },
  ],
  sources: [
    {
      label: "OSHA: Missouri area offices and county coverage (Marion, Ralls to St. Louis Area Office)",
      url: "https://www.osha.gov/contactus/bystate/MO/areaoffice",
    },
    {
      label: "OSHA: Illinois area offices (Adams County to Peoria Area Office)",
      url: "https://www.osha.gov/contactus/bystate/IL/areaoffice",
    },
    {
      label: "OSHA: 29 CFR 1910.178 Powered industrial trucks",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178",
    },
    {
      label: "Hannibal Regional Economic Development Council: Major employers",
      url: "https://hredc.com/site-selector-tool-kit/major-employers/",
    },
    {
      label: "Hannibal Regional Economic Development Council: Transportation and market access",
      url: "https://hredc.com/site-selector-tool-kit/market-access/",
    },
    {
      label: "Hannibal Regional Economic Development Council: Marion-Ralls Regional Port Authority",
      url: "https://hredc.com/marion-ralls-port-authority/",
    },
    {
      label: "HREDC: Congressman Graves announces $27.3 million grant for Marion-Ralls Regional Port Authority",
      url: "https://hredc.com/news/congressman-graves-announces-27-3-million-grant-for-marion-ralls-regional-port-authority/",
    },
  ],
};

export default content;
