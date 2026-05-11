'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const STATUS_TEXTS = [
  'BOOTING KERNEL',
  'LOADING MODULES',
  'SYNCING DATA',
  'COMPILING UI',
  'INITIALIZING CORE',
  'LAUNCHING...',
];

export const PageLoader = ({ isVisible, onComplete, projectName }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [matrixChars, setMatrixChars] = useState([]);

  // Generate matrix chars on client only
  useEffect(() => {
    setMatrixChars(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${(i / 30) * 100}%`,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        opacity: 0.05 + Math.random() * 0.15,
      }))
    );
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    setProgress(0);
    setStatusIdx(0);
    setGlitch(false);
    setExiting(false);

    const duration = 2200;
    const interval = 16;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);
        // Update status text based on progress
        setStatusIdx(Math.floor((next / 100) * (STATUS_TEXTS.length - 1)));
        if (next >= 100) {
          clearInterval(timer);
          // Glitch flash before exit
          setGlitch(true);
          setTimeout(() => setGlitch(false), 300);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 700);
          }, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, onComplete]);

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#010409] overflow-hidden"
      style={glitch ? { filter: 'hue-rotate(180deg) brightness(1.3)', transition: 'none' } : {}}
    >
      {/* ── Aurora Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.4, 1], x: ['-5%', '10%', '-5%'], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-teal-500 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: ['8%', '-8%', '8%'], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-indigo-600 blur-[150px]"
        />

        {/* Animated Grid */}
        <motion.div
          animate={{ opacity: [0.02, 0.07, 0.02] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(20,184,166,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Scan Line */}
        <motion.div
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent pointer-events-none"
        />

        {/* Matrix Rain */}
        {matrixChars.map((col) => (
          <motion.div
            key={col.id}
            initial={{ y: '-10%', opacity: 0 }}
            animate={{ y: '110%', opacity: [0, col.opacity, col.opacity, 0] }}
            transition={{ duration: col.duration, repeat: Infinity, delay: col.delay, ease: 'linear' }}
            className="absolute top-0 text-teal-400 text-xs font-mono pointer-events-none select-none"
            style={{ left: col.left }}
          >
            {col.char}
          </motion.div>
        ))}

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`p-${i}`}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [0, 0.6, 0], y: -300, x: i % 2 === 0 ? 80 : -80, scale: [0, 1, 0] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: (i * 0.3) % 4, ease: 'easeOut' }}
            className="absolute w-1 h-1 bg-teal-400 rounded-full"
            style={{ left: `${5 + (i / 20) * 90}%`, bottom: '5%' }}
          />
        ))}
      </div>

      {/* ── Central Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-10">

        {/* SVG Circular Progress Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center">

          {/* Outer glow ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-teal-500/20 shadow-[0_0_60px_rgba(20,184,166,0.3)]"
          />

          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-dashed border-teal-500/10"
          />

          {/* SVG Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* Track */}
            <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="rgba(20,184,166,0.08)" strokeWidth="4" />
            {/* Progress */}
            <motion.circle
              cx="100" cy="100" r={RADIUS}
              fill="none"
              stroke="url(#tealGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.05s linear', filter: 'drop-shadow(0 0 8px rgba(20,184,166,0.8))' }}
            />
            <defs>
              <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
          </svg>

          {/* Orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(20,184,166,1)]" />
          </motion.div>

          {/* Inner content */}
          <div className="relative flex flex-col items-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={Math.floor(progress)}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="text-7xl font-black text-white tabular-nums tracking-tighter"
                style={{ textShadow: '0 0 30px rgba(20,184,166,0.6)' }}
              >
                {Math.round(progress)}
              </motion.span>
            </AnimatePresence>
            <span className="text-teal-400 text-xl font-bold -mt-1">%</span>
          </div>
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIdx}
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-black text-teal-400 uppercase tracking-[0.5em]"
            >
              {STATUS_TEXTS[statusIdx]}
            </motion.div>
          </AnimatePresence>

          {/* Project Name with glitch */}
          <motion.h2
            className="text-[clamp(1.8rem,5vw,3rem)] font-black text-white tracking-[0.1em] uppercase"
            animate={glitch ? {
              x: [-4, 4, -2, 2, 0],
              skewX: [-5, 5, -2, 2, 0],
              color: ['#ffffff', '#14b8a6', '#ffffff'],
            } : {}}
            transition={{ duration: 0.3 }}
            style={{ textShadow: '0 0 40px rgba(20,184,166,0.4)' }}
          >
            {projectName || 'Dipanshu'}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-teal-500"
            >_</motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] text-white font-bold uppercase tracking-[1em]"
          >
            Developing Excellence
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-72 md:w-96">
          <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #0d9488, #14b8a6, #5eead4)',
                boxShadow: '0 0 10px rgba(20,184,166,0.8)',
                transition: 'width 0.05s linear',
              }}
            />
          </div>

          {/* Tick marks */}
          <div className="flex justify-between mt-2 px-0.5">
            {[0, 25, 50, 75, 100].map((tick) => (
              <motion.span
                key={tick}
                className="text-[7px] font-black uppercase tracking-widest"
                animate={{ color: progress >= tick ? '#14b8a6' : 'rgba(255,255,255,0.15)' }}
                transition={{ duration: 0.3 }}
              >
                {tick}%
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Exit Wipe Animation ── */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.86, 0, 0.07, 1] }}
            className="absolute inset-0 bg-[#010409] z-20"
          />
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(1,4,9,0.9)_100%)]" />
    </motion.div>
  );
};
