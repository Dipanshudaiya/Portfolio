'use client';
import { motion } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';

const SKILLS_TOP = [
  { alt: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { alt: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { alt: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { alt: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { alt: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { alt: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
];

const SKILLS_BOTTOM = [
  { alt: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { alt: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { alt: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { alt: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { alt: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { alt: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

export default function Skills() {
  const renderSkillIcon = (item, size = 80) => (
    <div 
      className="relative group/logo rounded-2xl md:rounded-[1.5rem] overflow-hidden p-[1px] bg-gray-200 dark:bg-white/10"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      {/* THE LASER BORDER - UNIVERSAL MASK */}
      <div className="laser-border-container">
        <div className="rotating-gradient" />
      </div>

      <div className="relative z-20 w-full h-full flex items-center justify-center bg-white dark:bg-[#0a0a0a] rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] p-3 md:p-4 shadow-lg group-hover/logo:bg-teal-500/5 transition-all duration-300">
        <img src={item.src} alt={item.alt} className="w-full h-full object-contain antialiased" />
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative w-full py-[60px] md:py-[60px] bg-transparent overflow-hidden antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes border-flow-teal {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .laser-border-container {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          background: transparent;
          border-radius: inherit;
          padding: 2.2px; /* Border Thickness */
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .rotating-gradient {
          position: absolute;
          inset: -200%;
          background: conic-gradient(from 0deg, transparent 30%, #14b8a6 50%, transparent 70%);
          animation: border-flow-teal 4s linear infinite;
        }
      `}} />
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <div className="px-6 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-4 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-600 dark:text-teal-400">Stack</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-black tracking-tighter text-gray-900 dark:text-white">
            Technologies I <span className="text-teal-500">Mastered.</span>
          </h2>
        </div>

        {/* Desktop View: Single Line Loop */}
        <div className="hidden lg:block max-w-[1400px] mx-auto overflow-hidden py-8">
          <LogoLoop 
            direction="left" 
            logos={[...SKILLS_TOP, ...SKILLS_BOTTOM]} 
            speed={40} 
            logoHeight={85} 
            gap={45}
            renderItem={(item) => renderSkillIcon(item, 85)}
          />
        </div>

        {/* Mobile View: Two Lines Loop (Opposite Directions) */}
        <div className="block lg:hidden space-y-6 py-4">
          <LogoLoop 
            direction="left" 
            logos={SKILLS_TOP} 
            speed={25} 
            logoHeight={65} 
            gap={20}
            renderItem={(item) => renderSkillIcon(item, 65)}
          />
          <LogoLoop 
            direction="right" 
            logos={SKILLS_BOTTOM} 
            speed={25} 
            logoHeight={65} 
            gap={20}
            renderItem={(item) => renderSkillIcon(item, 65)}
          />
        </div>
      </div>
    </section>
  );
}
