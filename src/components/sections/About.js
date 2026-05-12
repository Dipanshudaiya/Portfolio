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
    { icon: '🚀', text: '1+ Years Coding', sub: 'Experience', fullWidth: true },
    { icon: '💻', text: 'MERN Stack', sub: 'Specialist', fullWidth: false },
    { icon: '✨', text: 'Clean Code', sub: 'Maintainable', fullWidth: false },
  ];

  const TECH_BADGES = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', pos: 'top-4 -left-12', delay: 0 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node', pos: 'bottom-20 -right-12', delay: 1 },
  ];

  return (
    <section id="about" className="py-[60px] md:py-[60px] relative overflow-visible bg-transparent antialiased">
      <PageLoader isVisible={isRedirecting} projectName="About Me" onComplete={handleLoadingComplete} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes border-flow-teal {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .laser-mask {
          position: absolute;
          inset: 0;
          background: transparent;
          border: 1.5px solid transparent;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 10;
        }
      `}} />

      <div className="container relative z-10 px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 md:mb-24 text-center">
          <div className="px-6 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-4 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 dark:text-teal-400">Discovery</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] max-w-[800px] font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
            A passionate developer <br className="hidden md:block" /> who loves to <span className="text-teal-500">build things.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-20 items-center">
          
          {/* Left: Profile Image */}
          <div className="relative flex justify-center items-center scale-90 md:scale-100">
            <div className="relative w-[clamp(280px,35vw,440px)] h-[clamp(280px,35vw,440px)] flex justify-center items-center z-10">
              <div className="absolute -inset-4 rounded-[3rem] md:rounded-[3.5rem] p-[2px] bg-gradient-to-br from-teal-500 via-teal-400 to-teal-500 animate-rotate opacity-20">
                <div className="absolute inset-0 rounded-[3.5rem] bg-teal-500 blur-[30px] opacity-10" />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full h-full rounded-[3rem] md:rounded-[3.5rem] overflow-hidden border-[8px] md:border-[10px] border-white dark:border-[#0f172a] shadow-2xl z-20"
              >
                <Image src="/profile.png" alt="Dipanshu" fill sizes="(max-width: 768px) 280px, 440px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 via-transparent to-transparent" />
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-panel border-l-4 border-teal-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-2xl z-40 flex flex-col min-w-[180px] md:min-w-[200px] text-center md:text-left"
              >
                <span className="text-[8px] md:text-[9px] font-black text-teal-600 uppercase tracking-[0.3em] mb-1">Developer</span>
                <span className="text-base md:text-lg font-black tracking-tight">Dipanshu Daiya</span>
              </motion.div>
              {TECH_BADGES.map((badge, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: idx * 2 }}
                  className={`absolute ${badge.pos} w-14 h-14 md:w-16 md:h-16 glass-panel rounded-2xl p-3 md:p-4 z-30 hidden lg:flex items-center justify-center`}
                >
                  <img src={badge.src} alt={badge.alt} className="w-full h-full object-contain" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Content Column with Animated Borders */}
          <div className="space-y-6 md:space-y-8 relative z-10">
            {/* Main Content Card */}
            <div className="relative group rounded-[2.1rem] md:rounded-[2.6rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1.5px] tap-highlight-transparent">
              {/* THE LASER BORDER - MASKED */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_40%,#14b8a6_50%,transparent_60%)] animate-[border-flow-teal_4s_linear_infinite]" />
                <div className="laser-mask rounded-[2.1rem] md:rounded-[2.6rem]" />
              </div>

              <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(2.1rem-1.5px)] md:rounded-[calc(2.6rem-1.5px)] p-8 md:p-14 overflow-hidden">
                <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-8 md:mb-10">
                  I am a passionate <span className="text-teal-500 font-black tracking-tight">Full Stack Developer</span> with expertise in building modern, scalable web applications. My journey is driven by curiosity and a commitment to creating impactful digital experiences.
                </p>
                <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4 px-5 md:px-6 bg-teal-50 dark:bg-teal-500/5 rounded-full border border-teal-100 dark:border-teal-500/10 w-fit">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  <span className="text-[9px] md:text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">Ready to Work</span>
                </div>
              </div>
            </div>

            {/* Highlights Bento - Optimized with Animated Borders */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {HIGHLIGHTS.map((h, i) => (
                <div 
                  key={i}
                  className={`relative group rounded-[1.6rem] md:rounded-[2.1rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1.5px] tap-highlight-transparent ${h.fullWidth ? 'col-span-2 md:col-span-1' : 'col-span-1'}`}
                >
                  {/* THE LASER BORDER - MASKED */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_40%,#14b8a6_50%,transparent_60%)] animate-[border-flow-teal_3s_linear_infinite]" />
                    <div className="laser-mask rounded-[1.6rem] md:rounded-[2.1rem]" />
                  </div>

                  <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(1.6rem-1.5px)] md:rounded-[calc(2.1rem-1.5px)] p-6 md:p-8 flex flex-col items-center text-center gap-2 md:gap-3 transition-colors group-hover:bg-teal-500/5 cursor-pointer">
                    <span className="text-2xl md:text-3xl mb-1">{h.icon}</span>
                    <p className="text-[10px] md:text-[12px] font-black text-gray-900 dark:text-white uppercase tracking-wider md:tracking-widest leading-tight">{h.text}</p>
                    <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">{h.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Know More Button */}
            <div className="pt-4 md:pt-6">
              <motion.button
                onClick={handleAboutClick}
                whileHover={{ y: -4, shadow: "0 20px 40px rgba(13,148,136,0.35)" }}
                whileTap={{ scale: 0.96 }}
                className="group relative w-full md:w-fit px-8 md:px-14 py-5 md:py-6 bg-gradient-to-br from-teal-600 to-teal-700 text-white font-black text-[11px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-2xl overflow-hidden transition-all duration-200 shadow-[0_10px_20px_rgba(13,148,136,0.2)] flex items-center justify-center gap-3 md:gap-4"
              >
                <span className="relative z-10 flex items-center gap-3 md:gap-4">
                  Know More <span className="hidden sm:inline">About Me</span> <span className="text-xl md:text-2xl group-hover:translate-x-2 transition-transform duration-300">↗</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
