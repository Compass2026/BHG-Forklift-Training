import HeroGlass from "@/components/sections/HeroGlass";
import StatsRow from "@/components/sections/StatsRow";
import ServiceGrid from "@/components/sections/ServiceGrid";
import AboutContactSplit from "@/components/sections/AboutContactSplit";
import HowWeWork from "@/components/sections/HowWeWork";
import FAQSection from "@/components/sections/FAQSection";
import Testimonial from "@/components/sections/Testimonial";

export default function Home() {
  return (
    <>
      <HeroGlass />
      <StatsRow />
      <ServiceGrid />
      <AboutContactSplit />
      <HowWeWork />
      <FAQSection />
      <Testimonial />
    </>
  );
}
