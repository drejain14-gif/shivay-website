import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStripSection } from "@/components/sections/TrustStripSection";
import { AboutUsScrollSection } from "@/components/sections/AboutUsScrollSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <AboutUsScrollSection />
      <ServicesSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
