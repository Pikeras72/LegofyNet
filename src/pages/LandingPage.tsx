import { usePageTitle } from '../hooks/usePageTitle';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TechSection } from '../components/landing/TechSection';
import { GalleryTeaser } from '../components/landing/GalleryTeaser';
import { CtaBand } from '../components/landing/CtaBand';

export function LandingPage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <HowItWorks />
      <TechSection />
      <GalleryTeaser />
      <CtaBand />
    </>
  );
}
