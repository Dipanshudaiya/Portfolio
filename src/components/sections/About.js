'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PageLoader } from '../ui/PageLoader';

export default function About() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleAboutClick = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
  };

  const handleLoadingComplete = () => {
    router.push('/about');
  };

  const HIGHLIGHTS = [
    { icon: '🚀', text: '3+ Years Coding', sub: 'Experience' },
    { icon: '💻', text: 'MERN Stack', sub: 'Specialist' },
    { icon: '✨', text: 'Clean Code', sub: 'Maintainable' },
  ];

  const TECH_BADGES = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', pos: 'top-4 -left-12', delay: 0 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node', pos: 'bottom-20 -right-12', delay: 1 },
  ];

  return (
    <section id="about" className="py-[120px] relative overflow-visible bg-transparent">
      <PageLoader isVisible={isRedirecting} projectName="About Me" onComplete={handleLoadingComplete} />

      <div className="container relative z-10">
        <div className="flex flex-col items-center mb-24">
          <div className="px-6 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-4 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-600 dark:text-teal-400">Discovery</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,3.8rem)] text-center max-w-[800px] font-black tracking-tighter text-gray-900 dark:text-white">
            A passionate developer <br/> who loves to <span className="text-teal-500">build things.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
          
          {/* Left: Compact Image Assembly */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-[clamp(300px,35vw,440px)] h-[clamp(300px,35vw,440px)] flex justify-center items-center z-10">
              
              <div className="absolute -inset-4 rounded-[3.5rem] p-[2px] bg-gradient-to-br from-teal-500 via-teal-400 to-teal-500 animate-rotate opacity-20">
                <div className="absolute inset-0 rounded-[3.5rem] bg-teal-500 blur-[30px] opacity-10" />
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full h-full rounded-[3.5rem] overflow-hidden border-[10px] border-white dark:border-[#0f172a] shadow-2xl z-20"
              >
                <Image src="/profile.png" alt="Dipanshu" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 via-transparent to-transparent" />
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-panel border-l-4 border-teal-600 px-8 py-4 rounded-2xl shadow-2xl z-40 flex flex-col min-w-[200px]"
              >
                <span className="text-[9px] font-black text-teal-600 uppercase tracking-[0.3em] mb-1">Developer</span>
                <span className="text-lg font-black tracking-tight">Dipanshu Daiya</span>
              </motion.div>

              {TECH_BADGES.map((badge, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: idx * 2 }}
                  className={`absolute ${badge.pos} w-16 h-16 glass-panel rounded-2xl p-4 z-30 hidden lg:flex items-center justify-center`}
                >
                  <img src={badge.src} alt={badge.alt} className="w-full h-full object-contain" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Bento-style Content Card */}
          <div className="space-y-8 relative z-10">
            <div className="glass-card rounded-[2.5rem] p-10 md:p-14 group transition-all duration-500 dark:!bg-[#0a0a0a] hover:shadow-[0_0_50px_rgba(20,184,166,0.15)] hover:border-teal-300 dark:hover:border-teal-500/30 active:scale-[0.99] cursor-pointer">
              <p className="text-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                I am a passionate <span className="text-teal-500 font-black tracking-tight">Full Stack Developer</span> with expertise in building modern, scalable web applications. My journey is driven by curiosity and a commitment to creating impactful digital experiences.
              </p>
              
              <div className="flex items-center gap-4 py-4 px-6 bg-teal-50 dark:bg-teal-500/5 rounded-full border border-teal-100 dark:border-teal-500/10 w-fit">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.3em]">Ready to Work</span>
              </div>
            </div>

            {/* Highlights Bento */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div 
                   key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden p-[2px] rounded-[1.5rem] md:rounded-[2rem] cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(13,148,136,0.2)] transition-all duration-300 ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  {/* Spinning border layer */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,rgba(13,148,136,0.8)_100%)] animate-[spin_4s_linear_infinite] opacity-100 transition-opacity duration-200" />
                  
                  {/* Inner Card Background & Content */}
                  <div className="relative z-10 w-full h-full p-5 md:p-8 bg-white dark:!bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] md:rounded-[calc(2rem-1px)] flex flex-col items-center text-center gap-2 md:gap-3 border border-transparent transition-colors duration-200 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none">
                    <span className="text-2xl md:text-3xl mb-1 relative z-10">{h.icon}</span>
                    <p className="text-[10px] md:text-[12px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] md:tracking-widest leading-tight relative z-10">{h.text}</p>
                    <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60 relative z-10">{h.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-4 md:pt-6 flex justify-center md:justify-start">
              <button
                onClick={handleAboutClick}
                className="group relative w-full md:w-auto px-8 md:px-14 py-5 md:py-6 bg-gradient-to-br from-teal-600 to-teal-700 text-white font-black text-[11px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-[1.2rem] md:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(13,148,136,0.35)] hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(13,148,136,0.2)] flex justify-center items-center"
              >
                <span className="relative z-10 flex items-center gap-3 md:gap-4">
                  Know More About Me <span className="text-xl md:text-2xl group-hover:translate-x-2 transition-transform duration-500">↗</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
