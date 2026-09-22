import type { Metadata } from "next";
import HeroGlass from "@/components/sections/HeroGlass";
import StatsRow from "@/components/sections/StatsRow";
import ServiceGrid from "@/components/sections/ServiceGrid";
import AboutContactSplit from "@/components/sections/AboutContactSplit";
import HowWeWork from "@/components/sections/HowWeWork";
import FAQSection from "@/components/sections/FAQSection";
import Testimonial from "@/components/sections/Testimonial";
import Schema from "@/components/Schema";
import { faqs } from "@/lib/faqs";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Schema data={faqPageSchema(faqs)} />
      <HeroGlass />
      <StatsRow />
      <ServiceGrid />
      <AboutContactSplit />
      <HowWeWork />
      <FAQSection faqs={faqs} />
      <Testimonial />
    </>
  );
}
