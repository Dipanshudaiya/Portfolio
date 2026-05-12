'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Lazy load below-the-fold sections for faster initial page load
const Footer             = dynamic(() => import('@/components/layout/Footer'));
const ScrollVelocityBanner = dynamic(() => import('@/components/ui/ScrollVelocityBanner'));
const StatsSection       = dynamic(() => import('@/components/sections/StatsSection'));
const About              = dynamic(() => import('@/components/sections/About'));
const Skills             = dynamic(() => import('@/components/sections/Skills'));
const Projects           = dynamic(() => import('@/components/sections/Projects'));
const Contact            = dynamic(() => import('@/components/sections/Contact'));

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Noise Overlay for tactile feel */}
      <div className="noise-overlay" />
      
      <ScrollReveal />
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-4 overflow-visible w-full">
        <Hero />
        <ScrollVelocityBanner />
        <StatsSection />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
