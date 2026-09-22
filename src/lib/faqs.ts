/**
 * faqs.ts
 * Home and /classes FAQ content.
 *
 * Kept out of FAQSection.tsx (a Client Component) so Server Components can
 * import the data to build FAQPage JSON-LD — importing a value from a
 * "use client" module yields a client reference, not the array itself.
 *
 * Regulatory answers cite 29 CFR 1910.178(l), OSHA's powered industrial
 * truck operator training rule. Keep them in step with the eCFR text:
 * https://www.ecfr.gov/current/title-29/section-1910.178
 */
export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "faq-1",
    question: "What does OSHA require for forklift operator certification?",
    answer:
      "Under 29 CFR 1910.178(l), every operator must complete formal instruction, practical hands-on training and an evaluation of their operating skills in the workplace before running a truck unsupervised. The employer then certifies that each operator was trained and evaluated. The certification records the operator's name, the training date, the evaluation date and who did the training and evaluation.",
  },
  {
    id: "faq-2",
    question: "Can forklift certification be done completely online?",
    answer:
      "No. Online modules can cover the classroom portion, but OSHA also requires practical training and an evaluation of each operator's performance in the workplace. That hands-on part has to happen on the kind of truck the operator will use, which is why we train at your facility.",
  },
  {
    id: "faq-3",
    question: "How often do forklift operators need to be re-evaluated?",
    answer:
      "OSHA requires an evaluation of each operator's performance at least once every three years. Refresher training is required sooner if an operator is seen operating unsafely, is involved in an accident or near-miss, is assigned to a different type of truck, or when workplace conditions change in a way that affects safe operation.",
  },
  {
    id: "faq-4",
    question: "Which forklift classes do you train on?",
    answer:
      "All seven OSHA truck classes: Class 1 electric riders, Class 2 narrow aisle reach trucks and order pickers, Class 3 electric pallet jacks and walkies, Class 4 and 5 engine-powered cushion and pneumatic tire forklifts, Class 6 tow tractors, and Class 7 rough terrain forklifts and telehandlers. Training is specific to the trucks your operators actually use.",
  },
  {
    id: "faq-5",
    question: "Do you come to our facility?",
    answer:
      "Yes. Our training is onsite: we come to your warehouse, plant or job site so operators train and are evaluated on your own equipment, in the aisles, docks and yards where they work. We are based in Hannibal, Missouri and travel to employers across the Midwest.",
  },
];
