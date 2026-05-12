'use client';
import { useState, useEffect } from 'react';

export default function PageLoader({ isVisible = true, onComplete, projectName = "System" }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    setLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible || !loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes line-glow {
          0%, 100% { opacity: 0.3; filter: blur(5px); }
          50% { opacity: 1; filter: blur(8px); }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .cyber-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #14b8a6, transparent);
          width: 100%;
          position: absolute;
          animation: line-glow 2s ease-in-out infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />

      <div className="cyber-line top-[20%]" />
      <div className="cyber-line bottom-[20%]" />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center" style={{ animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="flex flex-col items-center">
          <h1 className="text-[1.5rem] md:text-[2rem] font-black tracking-[0.5em] text-white uppercase mb-2">
            Dipanshu<span className="text-teal-500">.</span>
          </h1>
          <div className="h-[2px] w-12 bg-teal-500 rounded-full" />
        </div>

        <div className="w-[200px] md:w-[300px]">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-black tracking-[0.3em] text-teal-500 uppercase">
              {projectName} Initializing
            </span>
            <span className="text-[14px] font-mono font-bold text-white leading-none">{progress}%</span>
          </div>
          <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300 ease-out rounded-full relative shadow-[0_0_15px_rgba(20,184,166,0.5)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%]" 
                   style={{ animation: 'shimmer 1.5s infinite linear' }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 opacity-30">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-bold text-white uppercase tracking-widest">Protocol</span>
            <span className="text-[8px] font-mono text-teal-400 uppercase leading-none">HTTPS/V3</span>
          </div>
          <div className="h-4 w-[1px] bg-white/20 self-center" />
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-bold text-white uppercase tracking-widest">Status</span>
            <span className="text-[8px] font-mono text-teal-400 uppercase leading-none">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
