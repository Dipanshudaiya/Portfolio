'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollVelocityBanner from '@/components/ui/ScrollVelocityBanner';
import Hero from '@/components/hero/Hero';
import StatsSection from '@/components/sections/StatsSection';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Noise Overlay for tactile feel */}
      <div className="noise-overlay" />
      
      <ScrollReveal />
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-0 overflow-visible w-full">
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
