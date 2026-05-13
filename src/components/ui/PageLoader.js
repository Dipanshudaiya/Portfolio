'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ isVisible = true, onComplete, projectName = "Portfolio" }) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isFinishing, setIsFinishing] = useState(false);
  const pathname = usePathname();
  const initialPathname = useRef(pathname);
  const progressTimer = useRef(null);

  // Initialize and handle progress
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setProgress(0);
      setIsFinishing(false);
      initialPathname.current = pathname; // Capture path when starting

      const startProgress = () => {
        progressTimer.current = setInterval(() => {
          setProgress(prev => {
            if (prev < 30) return prev + 3;
            if (prev < 60) return prev + 1.5;
            if (prev < 88) return prev + 0.5;
            if (prev < 95) return prev + 0.1;
            return prev;
          });
        }, 40);
      };

      startProgress();

      // Absolute safety timeout
      const safetyTimeout = setTimeout(() => {
        finishLoading();
      }, 5000);

      return () => {
        if (progressTimer.current) clearInterval(progressTimer.current);
        clearTimeout(safetyTimeout);
      };
    } else if (shouldRender && !isFinishing) {
      // If external visibility is turned off but we haven't finished yet
      finishLoading();
    }
  }, [isVisible]);

  // Detect path change to trigger 100%
  useEffect(() => {
    if (isVisible && !isFinishing && pathname !== initialPathname.current) {
      finishLoading();
    }
  }, [pathname, isVisible, isFinishing]);

  const finishLoading = () => {
    if (isFinishing) return;
    setIsFinishing(true);
    
    if (progressTimer.current) clearInterval(progressTimer.current);
    
    // Smooth but fast jump to 100%
    setProgress(100);
    
    // Wait for the bar to hit 100% visually and the user to "feel" the completion
    setTimeout(() => {
      setShouldRender(false);
      if (onComplete) onComplete();
    }, 1000); // Increased to 1s for a more intentional feel
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden pointer-events-none"
      >
        {/* Background Grain/Noise Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Top & Bottom Reveal Panels */}
        <motion.div 
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute inset-0 bg-[#030303] z-10 origin-top"
        />
        <motion.div 
          initial={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute inset-0 bg-[#030303] z-10 origin-bottom"
        />

        <div className="relative z-20 flex flex-col items-center gap-12">
          {/* Main Logo / Name Reveal */}
          <div className="relative">
            {/* Outlined Base Name */}
            <h1 className="text-[12vw] md:text-[8rem] font-black tracking-[-0.05em] leading-none select-none text-transparent stroke-text opacity-20">
              DIPANSHU
            </h1>
            
            {/* Filled Animated Name */}
            <div 
              className="absolute inset-0 overflow-hidden transition-all duration-300"
              style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            >
              <h1 className="text-[12vw] md:text-[8rem] font-black tracking-[-0.05em] leading-none select-none bg-gradient-to-t from-teal-500 to-emerald-400 bg-clip-text text-transparent">
                DIPANSHU
              </h1>
            </div>

            {/* Horizontal Scanline */}
            <motion.div 
              className="absolute left-0 right-0 h-[2px] bg-teal-400/80 shadow-[0_0_20px_rgba(20,184,166,0.8)] z-30"
              style={{ top: `${100 - progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Minimalist Controls Section */}
          <div className="flex flex-col items-center gap-6 w-[250px] md:w-[400px]">
             {/* Percentage Counter */}
             <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-white/10" />
                <span className="text-[1.5rem] md:text-[2rem] font-black text-white tabular-nums tracking-tighter">
                  {Math.round(progress)}<span className="text-teal-500 text-lg ml-1">%</span>
                </span>
                <span className="h-[1px] w-12 bg-white/10" />
             </div>

             {/* Ultra Thin Progress Bar */}
             <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-teal-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
             </div>

             {/* Status Message */}
             <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-teal-500/60 uppercase tracking-[0.5em]">
                  {progress < 100 ? 'Accessing Core...' : 'Authorization Granted'}
                </span>
                <div className="flex gap-1">
                   {[...Array(3)].map((_, i) => (
                     <motion.div 
                       key={i}
                       animate={{ opacity: [0.2, 1, 0.2] }}
                       transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                       className="w-1 h-1 bg-teal-500 rounded-full"
                     />
                   ))}
                </div>
             </div>
          </div>
        </div>

        <style jsx global>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          }
          @media (max-width: 768px) {
            .stroke-text {
              -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.3);
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
