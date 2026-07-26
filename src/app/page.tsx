import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStripSection } from "@/components/sections/TrustStripSection";
import { SpecialtySection } from "@/components/sections/SpecialtySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutTeaserSection } from "@/components/sections/AboutTeaserSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <SpecialtySection />
      <ServicesSection />
      <ProcessSection />
      <AboutTeaserSection />
      <CtaSection />
    </>
  );
}
