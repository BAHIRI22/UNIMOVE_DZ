'use client';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProblemSolutionSection } from '@/components/ProblemSolutionSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { AboutProjectSection } from '@/components/AboutProjectSection';
import { VisionSection } from '@/components/VisionSection';
import { Footer } from '@/components/Footer';
import StudentDayBanner from '@/components/StudentDayBanner';

export default function Home() {
  return (
    <main className="w-full">
      <StudentDayBanner />
      <Header />
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <AboutProjectSection />
      <VisionSection />
      <Footer />
    </main>
  );
}
