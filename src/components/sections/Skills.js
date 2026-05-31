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
  return (
    <section id="skills" className="w-full py-[100px] bg-transparent">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
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
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tighter text-gray-900 dark:text-white">
            Technologies I <span className="text-teal-500">Mastered.</span>
          </h2>
        </div>

        {/* Single Line Big Logo Loop */}
        <div className="max-w-[1280px] mx-auto overflow-hidden py-4">
          <LogoLoop 
            direction="left" 
            logos={[...SKILLS_TOP, ...SKILLS_BOTTOM]} 
            speed={40} 
            logoHeight={80} // Increased size significantly
            gap={40}
            renderItem={(item) => (
              <div className="relative h-[80px] w-[80px] group/logo rounded-2xl overflow-hidden p-[2px]">
                {/* Spinning border layer */}
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,rgba(20,184,166,0.8)_100%)] animate-[spin_2s_linear_infinite] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300" />
                
                {/* Content inner box */}
                <div className="relative z-10 w-full h-full flex items-center justify-center bg-white dark:bg-[#0a0a0a] border border-gray-200 group-hover/logo:border-transparent dark:border-transparent rounded-[calc(1rem-2px)] p-4 shadow-lg group-hover/logo:bg-teal-500/5 transition-all duration-300">
                  <img src={item.src} alt={item.alt} className="w-full h-full object-contain" />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
