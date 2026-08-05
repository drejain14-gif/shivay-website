import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStripSection } from "@/components/sections/TrustStripSection";
import { AboutUsScrollSection } from "@/components/sections/AboutUsScrollSection";
import { ServicesScrollSection } from "@/components/sections/ServicesScrollSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <AboutUsScrollSection />
      <ServicesScrollSection />
      <CtaSection />
    </>
  );
}
