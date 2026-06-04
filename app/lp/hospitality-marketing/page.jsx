import React from 'react';
import HeroSection from './components/HeroSection';
import BrandsWeWorkWith from './components/BrandsWeWorkWith';
import IndustryCategories from './components/IndustryCategories';
import OurWork from './components/OurWork';
import Portfolio from './components/Portfolio';
import TestimonialsStats from './components/TestimonialsStats';
import WhyExperience from './components/WhyExperience';
import FinalCTASection from './components/FinalCTASection';
import StickyContactBar from './components/StickyContactBar';

export default function HospitalityLandingPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-white overflow-x-hidden">
      {/* 1. Hero Section (containing integrated Right Form + Left Badges) */}
      <HeroSection />

      {/* 2. Brand Marquee Section (NEW, light background, right below Hero) */}
      <BrandsWeWorkWith />

      {/* 3. Section 2: Built for Hospitality Grid & Merged Performance Stats */}
      <IndustryCategories />

      {/* 5. Section 3: Metrics Case-Study Snap Portfolio */}
      <Portfolio />

      {/* 5b. Section 3b: Our Work Video Showcase (Replacing the process timeline) */}
      <OurWork />

      {/* 6. Section 4: Why Beyond Reach & Experience Stats (Minimalized layout) */}
      <WhyExperience />

      {/* 7. Testimonials segment (White background, moved just above footer) */}
      <TestimonialsStats />

      {/* 8. Final CTA & Footer */}
      <FinalCTASection />

      {/* Bottom Sticky Action Bar (appears after scrolling past Hero) */}
      <StickyContactBar />
    </main>
  );
}
