import { Navbar } from "@/components/Navbar";
import { SideChrome } from "@/components/SideChrome";
import { SmoothScrollController } from "@/components/SmoothScrollController";
import { HeroSection } from "@/components/HeroSection";
import { CrossedTicker } from "@/components/CrossedTicker";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { BookVolumesSection } from "@/components/BookVolumesSection";
import { EveryLayerSection } from "@/components/EveryLayerSection";
import { SloganInterstitial } from "@/components/SloganInterstitial";
import { AuthorSection } from "@/components/AuthorSection";
import { ReceiptsSection } from "@/components/ReceiptsSection";
import { ForHireSection } from "@/components/ForHireSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/FooterSection";

export default function HomePage() {
  return (
    <>
      <SmoothScrollController />
      <Navbar />
      <SideChrome />
      <main id="main-content" tabIndex={-1} className="relative overflow-x-clip">
        <HeroSection />
        <CrossedTicker variant="hero-to-work" />
        <SelectedWorkSection />
        <BookVolumesSection />
        <CrossedTicker variant="volumes-to-stack" />
        <EveryLayerSection />
        <SloganInterstitial />
        <AuthorSection />
        <ReceiptsSection />
        <ForHireSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
