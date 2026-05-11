'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: 3,   suffix: '+', label: 'EXPERIENCE',      title: '3+ YEARS CODING', icon: '🚀' },
  { value: 20,  suffix: '+', label: 'SPECIALIST',      title: 'MERN STACK',     icon: '💻' },
  { value: 100, suffix: '%', label: 'MAINTAINABLE',    title: 'CLEAN CODE',     icon: '✨' },
  { value: 50,  suffix: '+', label: 'GLOBAL CLIENTS',  title: 'HAPPY SUCCESS',  icon: '🎯' },
];

function CountUp({ target, suffix, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);
  return <>{count}{suffix}</>;
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="pt-[40px] md:pt-[60px] pb-[40px] md:pb-[40px] w-full overflow-hidden bg-transparent">
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
      <div className="container px-4 md:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="relative group rounded-3xl md:rounded-[2.5rem] bg-gray-200 dark:bg-white/10 overflow-hidden transition-all duration-300 h-full p-[1.5px] min-h-[140px] md:min-h-[220px] tap-highlight-transparent"
            >
              {/* THE LASER BORDER - MASKED */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_40%,#14b8a6_50%,transparent_60%)] animate-[border-flow-teal_3s_linear_infinite]" />
                <div className="laser-mask rounded-3xl md:rounded-[2.5rem]" />
              </div>

              {/* Inner Card Box */}
              <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(1.5rem-1.5px)] md:rounded-[calc(2.5rem-1.5px)] overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 antialiased">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-teal-50 dark:bg-teal-500/5 flex items-center justify-center rounded-xl md:rounded-3xl border border-teal-100 dark:border-teal-500/10 mb-2 md:mb-4 transform group-hover:rotate-12 transition-transform duration-300 text-lg md:text-3xl">
                  {stat.icon}
                </div>
                <h3 className="text-[10px] md:text-lg font-black text-gray-900 dark:text-white tracking-tighter mb-0.5 md:mb-1 text-center leading-tight">
                  {stat.title}
                </h3>
                <p className="text-[6px] md:text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center opacity-70">
                  {stat.label}
                </p>
                <div className="mt-1 md:mt-3 text-[7px] md:text-[10px] font-bold text-gray-400">
                  <CountUp target={stat.value} suffix={stat.suffix} started={started} /> ACHIEVED
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
