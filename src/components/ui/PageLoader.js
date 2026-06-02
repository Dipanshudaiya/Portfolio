'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PageLoader = ({ isVisible, onComplete, projectName }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      const duration = 800; // Fast loading
      const interval = 16;
      const step = 100 / (duration / interval);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 200);
            return 100;
          }
          return prev + step;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const displayText = projectName || 'DIPANSHU';

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* ─── Premium Texture & Lighting ─── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} 
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />

      {/* ─── Central Typography Fill ─── */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Main Name with Bottom-to-Top Fill */}
        <div className="relative text-[clamp(3.5rem,10vw,10rem)] font-black uppercase tracking-tighter leading-none whitespace-nowrap px-4">
          {/* Layer 1: Outlined Text */}
          <span 
            className="text-transparent" 
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
          >
            DIPANSHU
          </span>
          
          {/* Layer 2: Solid Filled Text (Revealed from Bottom to Top) */}
          <motion.span 
            className="absolute top-0 left-4 text-teal-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]"
            style={{ 
              clipPath: `inset(${100 - progress}% 0 0 0)`,
            }}
          >
            DIPANSHU
          </motion.span>
        </div>

        {/* Destination Page Name */}
        <div className="mt-4 md:mt-8 text-center">
          <p className="text-sm md:text-xl font-black text-white uppercase tracking-[0.5em] md:tracking-[0.8em]">
            {projectName || 'PORTFOLIO'}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
          <p className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-[0.5em]">
            {progress < 100 ? 'Initializing Experience' : 'Ready'}
          </p>
        </div>

        {/* Massive Background Counter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none">
          <span className="text-[20rem] md:text-[30rem] font-black tabular-nums tracking-tighter text-white leading-none">
            {Math.round(progress)}
          </span>
        </div>
      </div>

      {/* ─── Minimalist Bottom Progress Line ─── */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
        <motion.div 
          className="h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]" 
          style={{ width: `${progress}%` }} 
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
};
