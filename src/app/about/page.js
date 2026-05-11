'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

function SpotlightCard({ children, className = '' }) {
  const boundingRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  
  const handleMouseMove = (e) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setMousePosition({ x: localX, y: localY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={boundingRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group rounded-[2rem] bg-gray-100 dark:bg-white/5 overflow-hidden transition-all duration-300 tap-highlight-transparent ${className}`}
    >
      <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
         <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_40%,var(--theme-accent)_50%,transparent_60%)] animate-[border-flow_4s_linear_infinite]" />
      </div>

      <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] m-[1.5px] rounded-[calc(2rem-1.5px)] overflow-hidden">
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 md:group-hover:opacity-100 z-10 hidden md:block"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 80%)`
          }}
        />
        <div className="relative z-20 antialiased">
          {children}
        </div>
      </div>
    </div>
  );
}

function SwipeHint() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="md:hidden flex items-center justify-center gap-2 mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-500/60"
    >
      <span>← Swipe to explore →</span>
    </motion.div>
  );
}

export default function AboutPage() {
  const certifications = [
    { name: 'Advanced Web Development', org: 'Frontend Masters', year: '2024' },
    { name: 'React Native Masterclass', org: 'Udemy', year: '2023' }
  ];

  const education = [
    { 
      degree: 'MCA (Master of Computer Applications)', 
      school: 'JNVU University', 
      year: '2022 - 2024', 
      score: '85% (A+ Grade)',
      isCurrent: true 
    },
    { 
      degree: 'BCA (Bachelor of Computer Applications)', 
      school: 'JNVU University', 
      year: '2019 - 2022', 
      score: '80%',
      isCurrent: false 
    }
  ];

  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: `
        .about-main {
          --glass-bg: #FFFFFF;
          --glass-border: rgba(0,0,0,0.06);
          --spotlight-color: rgba(79, 70, 229, 0.03);
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --theme-accent: #4f46e5;
        }
        [data-theme='dark'] .about-main {
          --glass-bg: #0a0a0a;
          --glass-border: rgba(255,255,255,0.08);
          --spotlight-color: rgba(139, 92, 246, 0.04);
          --text-primary: #ededed;
          --text-secondary: #999;
          --theme-accent: #8B5CF6;
        }

        @keyframes border-flow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .tap-highlight-transparent { -webkit-tap-highlight-color: transparent; outline: none; }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
      `}} />
      <main className="about-main pt-[100px] md:pt-[140px] pb-[60px] md:pb-[80px] relative z-10 px-4 md:px-0">
        <div className="container max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="group inline-flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-[var(--theme-accent)] transition-all mb-8 md:mb-12 font-black text-[11px] uppercase tracking-widest bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-6 py-3 rounded-xl active:scale-95">
              <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.1fr] gap-6 md:gap-10">
            {/* Sidebar Column */}
            <div className="lg:sticky lg:top-[120px] h-fit flex flex-col gap-4 md:gap-8">
              <SpotlightCard className="p-0 text-center">
                <div className="p-8 md:p-10 flex flex-row lg:flex-col items-center gap-6 lg:gap-8 text-left lg:text-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 flex-shrink-0 group/profile">
                    <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-xl opacity-20 transition-opacity animate-pulse" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-xl z-10">
                      <Image src="/profile.png" alt="Dipanshu" fill className="object-cover" unoptimized />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter">Dipanshu Daiya</h1>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] md:text-xs tracking-widest uppercase mb-4">Full Stack Developer</p>
                    <div className="flex flex-wrap lg:justify-center gap-2">
                      {['React', 'Node.js', 'Next.js', 'MySQL'].map(tech => (
                        <span key={tech} className="text-[8px] md:text-[9px] font-black bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20 uppercase">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-10">
                  <motion.a href="/resume.pdf" download whileTap={{ scale: 0.96 }} className="w-full block bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg text-center">Download Resume 📥</motion.a>
                </div>
              </SpotlightCard>

              {/* CONTACT INFO */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <SpotlightCard>
                  <div className="p-5 md:p-6 border-l-4 border-indigo-500">
                    <h3 className="font-black text-indigo-600 dark:text-indigo-400 text-[8px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2">Email</h3>
                    <a href="mailto:dipanshudaiya4@gmail.com" className="text-[10px] md:text-sm font-bold text-gray-700 dark:text-gray-300 break-words line-clamp-1 md:line-clamp-none">dipanshudaiya4@gmail.com</a>
                  </div>
                </SpotlightCard>
                <SpotlightCard>
                  <div className="p-5 md:p-6 border-l-4 border-purple-500">
                    <h3 className="font-black text-purple-600 dark:text-purple-400 text-[8px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2">Phone</h3>
                    <a href="tel:+916378409862" className="text-[10px] md:text-sm font-bold text-gray-700 dark:text-gray-300">+91 6378409862</a>
                  </div>
                </SpotlightCard>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col gap-6 md:gap-10">
               <SpotlightCard><div className="p-8 md:p-12">
                 <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">About Me</h2>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">Hello! I'm a passionate Full Stack Developer focused on creating clean, user-friendly, and highly performant web applications. I enjoy bridging the gap between engineering and design.</p>
               </div></SpotlightCard>

               {/* EDUCATION */}
               <SpotlightCard className="overflow-hidden">
                 <div className="p-8 md:p-12">
                   <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-8 md:mb-12 flex items-center gap-3"><span className="text-indigo-500 text-3xl">🎓</span> Education Journey</h2>
                   <div className="hidden md:flex relative pl-10 border-l-2 border-indigo-500/20 flex-col gap-12">
                     {education.map((edu) => (
                       <div key={edu.degree} className="relative group/timeline">
                         <span className={`absolute -left-[51px] top-1 w-6 h-6 rounded-full bg-white dark:bg-[#0a0a0a] border-2 shadow-xl transition-all duration-300 group-hover/timeline:scale-125 ${edu.isCurrent ? 'border-indigo-500 shadow-indigo-500/30' : 'border-indigo-500/30'}`} />
                         <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{edu.degree}</h3>
                         <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{edu.school} • {edu.year}</p>
                         <div className="inline-flex flex-col bg-indigo-500/5 border border-indigo-500/10 px-8 py-4 rounded-2xl"><span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-1">Academic Performance</span><span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{edu.score}</span></div>
                       </div>
                     ))}
                   </div>
                   <div className="flex md:hidden overflow-x-auto gap-4 snap-x snap-mandatory no-scrollbar -mx-2 px-2">
                      {education.map((edu) => (
                        <div key={edu.degree} className="min-w-[85vw] snap-center p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-4">
                          <div className="flex items-center gap-3"><div className={`w-3 h-3 rounded-full ${edu.isCurrent ? 'bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-indigo-500/30'}`} /><span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{edu.year}</span></div>
                          <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{edu.degree}</h3>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">{edu.school}</p>
                          <div className="mt-2 bg-white dark:bg-white/5 p-4 rounded-xl border border-indigo-500/10"><span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Performance</span><span className="text-2xl font-black text-gray-900 dark:text-white">{edu.score}</span></div>
                        </div>
                      ))}
                   </div>
                   <SwipeHint />
                 </div>
               </SpotlightCard>

               {/* CERTIFICATIONS & OFF-SCREEN */}
               <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8">
                  <SpotlightCard className="h-full">
                    <div className="p-8 flex flex-col gap-6">
                      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3"><span className="text-indigo-500">🏆</span> Certifications</h2>
                      <div className="hidden md:flex flex-col gap-4">
                        {certifications.map((cert) => (
                          <div key={cert.name} className="p-5 md:p-6 rounded-2xl bg-indigo-50/50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 group/cert hover:border-indigo-500/30 transition-all">
                            <div className="flex justify-between items-start mb-3"><div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-lg">🏅</div><span className="px-2 py-0.5 bg-indigo-500 text-white text-[8px] font-black rounded-md uppercase tracking-widest">{cert.year}</span></div>
                            <h4 className="text-md font-black text-gray-900 dark:text-white leading-tight mb-1">{cert.name}</h4>
                            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{cert.org}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex md:hidden overflow-x-auto gap-4 snap-x snap-mandatory no-scrollbar -mx-2 px-2">
                        {certifications.map((cert) => (
                          <div key={cert.name} className="min-w-[75vw] snap-center p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-3">
                            <div className="flex justify-between items-center"><div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-lg">🏅</div><span className="px-2 py-0.5 bg-indigo-500 text-white text-[8px] font-black rounded-md uppercase tracking-widest">{cert.year}</span></div>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight">{cert.name}</h4>
                            <p className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{cert.org}</p>
                          </div>
                        ))}
                      </div>
                      <SwipeHint />
                    </div>
                  </SpotlightCard>

                  {/* Off-Screen (RESPONSIVE GRID) */}
                  <SpotlightCard className="h-full">
                    <div className="p-8 h-full flex flex-col justify-center">
                      <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-10 text-center uppercase tracking-widest flex items-center justify-center gap-3"><span className="text-indigo-500">⚡</span> Off-Screen</h2>
                      {/* Grid: 1 Row on Mobile (4 cols), 2x2 on Web (md:2 cols) */}
                      <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:gap-6 justify-items-center items-center flex-grow">
                        {['🎵', '📚', '☕', '✈️'].map(emoji => (
                          <div key={emoji} className="relative border-glow-container w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-50 dark:bg-white/5 flex flex-shrink-0 items-center justify-center text-xl md:text-3xl shadow-sm cursor-pointer overflow-hidden group tap-highlight-transparent">
                            <div className="border-glow-layer absolute inset-0 opacity-100 pointer-events-none">
                               <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent,var(--theme-accent),transparent,var(--theme-accent),transparent)] animate-[border-flow_3s_linear_infinite]" />
                            </div>
                            <div className="absolute inset-[2px] rounded-[calc(1rem-2px)] bg-white dark:bg-[#0a0a0a] z-10 flex items-center justify-center transition-colors group-hover:bg-indigo-50 dark:group-hover:bg-white/10">{emoji}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
               </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
