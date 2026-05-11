'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PageLoader = ({ isVisible, onComplete, projectName }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      const duration = 2000; 
      const interval = 16;
      const step = 100 / (duration / interval);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 600);
            return 100;
          }
          return prev + step;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#01040a] overflow-hidden"
    >
      {/* ─── Strictly Contained Background (Shrinks on Zoom Out) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[1600px] h-full overflow-hidden">
          
          {/* Intense Animated Mesh Gradients (Auroras) - Contained */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: ['-10%', '10%', '-10%'],
              y: ['-5%', '5%', '-5%'],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-teal-600/15 blur-[120px] rounded-full mix-blend-screen"
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              x: ['10%', '-10%', '10%'],
              y: ['5%', '-5%', '5%'],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] bg-teal-500/10 blur-[110px] rounded-full mix-blend-screen"
          />

          {/* Grid Sync - Contained */}
          <motion.div 
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `
                linear-gradient(to right, rgba(20, 184, 166, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} 
          />

          {/* Floating Particles - Contained */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0], 
                y: [0, -250],
                x: [0, (i % 2 === 0 ? 60 : -60)],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
              className="absolute w-1 h-1 bg-teal-400 rounded-full"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: `${80 + Math.random() * 20}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Central Loader Content ─── */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Orbital Progress */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-16">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[0.5px] border-teal-500/20 rounded-full shadow-[0_0_30px_rgba(20,184,166,0.1)]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-dashed border-teal-500/5 rounded-full"
          />
          
          <div className="relative flex flex-col items-center">
            <div className="flex items-baseline">
              <motion.span 
                key={Math.floor(progress)}
                className="text-7xl font-black text-white tabular-nums tracking-tighter"
              >
                {Math.round(progress)}
              </motion.span>
              <span className="text-teal-500 text-2xl font-bold ml-1">%</span>
            </div>
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[9px] font-black text-teal-400 uppercase tracking-[0.4em] mt-3"
            >
              Initializing Core
            </motion.div>
          </div>
        </div>

        {/* Branding */}
        <div className="text-center space-y-6">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-white tracking-[0.1em] uppercase">
            {projectName || 'Dipanshu'}<span className="text-teal-500 animate-pulse">_</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-[11px] text-white font-bold uppercase tracking-[1em]"
          >
            Developing Excellence
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mt-20 w-80">
          <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-700 via-teal-400 to-teal-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,4,10,0.9)_100%)]" />
    </motion.div>
  );
};
