'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: 3,   suffix: '+', label: 'Years Experience',    icon: '🚀' },
  { value: 15,  suffix: '+', label: 'Projects Built',      icon: '💻' },
  { value: 8,   suffix: '+', label: 'Technologies',        icon: '⚡' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', icon: '🎯' },
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
    <section id="stats" ref={sectionRef} className="py-[60px] md:py-[100px] w-full overflow-hidden bg-transparent">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden p-[2px] rounded-3xl md:rounded-[2.5rem] transition-all duration-200 text-center hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(13,148,136,0.2)]"
            >
              {/* Spinning border layer */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,rgba(13,148,136,0.8)_100%)] animate-[spin_4s_linear_infinite] opacity-100 transition-opacity duration-200" />
              
              {/* Inner Card Background & Content */}
              <div className="relative z-10 w-full h-full p-6 md:p-10 bg-white dark:bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] md:rounded-[calc(2.5rem-2px)] flex flex-col items-center justify-center border border-transparent transition-colors duration-200">
                <div className="text-2xl md:text-3xl mb-4 md:mb-6 w-14 h-14 md:w-20 md:h-20 bg-teal-50 dark:bg-teal-500/5 flex items-center justify-center rounded-2xl md:rounded-3xl mx-auto border border-teal-100 dark:border-teal-500/10 transform group-hover:rotate-6 transition-transform duration-200">
                  {stat.icon}
                </div>
                <h3 className="text-2xl md:text-[clamp(2.5rem,4vw,3.5rem)] font-black text-gray-900 dark:text-white leading-none tracking-tighter mb-2 md:mb-3">
                  <CountUp target={stat.value} suffix={stat.suffix} started={started} />
                </h3>
                <p className="text-[7px] md:text-[9px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em] md:tracking-[0.4em]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
