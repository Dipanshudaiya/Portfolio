'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { href: 'https://github.com/Dipanshudaiya',                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',  alt: 'GitHub' },
  { href: 'https://www.linkedin.com/in/dipanshu-daiya-3064163b2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', alt: 'LinkedIn' },
  { href: 'https://x.com/dipanshudaiya96',                        icon: 'https://img.icons8.com/ios-filled/50/twitterx.png',                                   alt: 'Twitter' },
  { href: 'mailto:dipanshudaiya4@gmail.com',                      icon: 'https://img.icons8.com/color/48/gmail-new.png',                                      alt: 'Email' },
];

const FLOATING_ICONS = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React',  style: { top: '10%',  left: '-15%' }, delay: '0s' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'MySQL',  style: { top: '5%',   right: '-10%' }, delay: '1s' },
  { src: 'https://img.icons8.com/color/48/code.png',                                    alt: 'Code',   style: { bottom: '15%', right: '-20%' }, delay: '2s' },
];

export default function Hero() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <section id="home" className="relative w-full flex items-center justify-center pt-[80px] md:pt-[100px] pb-[60px] md:pb-[80px] overflow-hidden bg-transparent min-h-[600px] lg:h-[90vh] lg:max-h-[900px]">
      
      {/* ─── Strictly Contained Background (Shrinks on Zoom Out) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[1600px] h-full overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(13,148,136,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.22),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(13,148,136,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.12),transparent_50%)]" />
          
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full opacity-40 animate-twinkle"
              style={{ top: star.top, left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDelay: `${star.delay}s` }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 lg:gap-20 items-center text-center lg:text-left">

          {/* Left Content */}
          <div className="relative z-[10] max-w-[800px] mx-auto lg:mx-0">
            {/* Live Badge - Optimized for Mobile */}
            <div className="px-4 py-1.5 md:px-6 md:py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-2 md:gap-4 mb-6 md:mb-8 w-fit mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Available for Work</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,7vw,4.2rem)] leading-[1.1] mb-6 md:mb-8 font-black tracking-tighter text-gray-900 dark:text-white">
              Full Stack <br />
              <span className="text-teal-600 dark:text-teal-500">Developer</span>
            </h1>

            <p className="text-[1rem] md:text-[1.2rem] text-gray-500 dark:text-gray-400 mb-8 md:mb-12 max-w-[540px] mx-auto lg:mx-0 font-medium leading-relaxed">
              I build high-performance, scalable web applications with the <span className="text-gray-900 dark:text-white font-bold">MERN Stack</span> & Modern UI/UX principles.
            </p>

            {/* Buttons - Side by Side on Mobile */}
            <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-8 md:mb-12">
              <a href="#projects" className="group relative px-6 py-4 md:px-12 md:py-6 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl font-black text-[11px] md:text-[13px] uppercase tracking-[0.1em] md:tracking-[0.2em] overflow-hidden transition-all duration-200 hover:shadow-[0_20px_40px_rgba(13,148,136,0.35)] hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(13,148,136,0.2)] flex-1 sm:flex-none min-w-[140px] flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-2 md:gap-3">Projects <span className="text-lg group-hover:translate-x-1 transition-transform">→</span></span>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </a>
              <a href="/resume.pdf" download className="px-6 py-4 md:px-12 md:py-6 bg-[#1e293b] dark:bg-white text-white dark:text-[#0f172a] rounded-2xl font-black text-[11px] md:text-[13px] uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-200 hover:bg-[#0f172a] dark:hover:bg-gray-100 hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex-1 sm:flex-none min-w-[140px] flex items-center justify-center">
                Resume <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
            </div>

            {/* Social Icons - Optimized for Mobile */}
            <div className="flex justify-center lg:justify-start gap-4 md:gap-5">
              {SOCIAL_LINKS.map((s) => (
                <motion.a key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 md:w-12 md:h-12 p-2.5 md:p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-teal-500 transition-all duration-200 group shadow-sm">
                  <img src={s.icon} alt={s.alt} className={`w-full h-full object-contain ${s.alt === 'GitHub' || s.alt === 'Twitter' ? 'dark:invert dark:brightness-200' : ''}`} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Assembly */}
          <div className="relative flex justify-center items-center mt-8 md:mt-12 lg:mt-0 scale-90 md:scale-100">
            <div className="relative w-[clamp(260px,35vw,460px)] h-[clamp(260px,35vw,460px)] flex justify-center items-center overflow-visible">
              
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-visible">
                <div className="absolute w-[180%] h-[180%] border border-teal-500/10 rounded-full animate-[rotate_45s_linear_infinite_reverse] opacity-50" />
                <div className="absolute w-[150%] h-[150%] border border-teal-500/20 rounded-full animate-rotate opacity-70" />
                <div className="absolute w-[125%] h-[125%] border-2 border-dashed border-teal-500/30 rounded-full animate-[rotate_18s_linear_infinite]" />
              </div>

              {/* Image Frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] md:border-[10px] border-white dark:border-[#020617] z-20 shadow-[0_0_60px_rgba(13,148,136,0.3)]">
                <Image src="/profile.png" alt="Dipanshu" fill priority unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 to-transparent" />
              </div>

              {/* Tech Badges */}
              {FLOATING_ICONS.map((icon, idx) => (
                <motion.div
                  key={icon.alt}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 1.5 }}
                  className="absolute w-10 h-10 md:w-14 md:h-14 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-teal-500/30 rounded-xl md:rounded-2xl flex items-center justify-center p-2 md:p-3 shadow-2xl z-30"
                  style={{ ...icon.style }}
                >
                  <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 border-2 border-teal-500/30 rounded-[20px] relative">
          <div className="absolute top-2 left-1/2 w-1 h-2 bg-teal-500 rounded-sm -translate-x-1/2" />
        </motion.div>
      </div>
    </section>
  );
}
