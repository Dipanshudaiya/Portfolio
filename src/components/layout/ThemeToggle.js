'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Initial body class for background transitions
    document.body.classList.toggle('light-mode', savedTheme === 'light');
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('light-mode', newTheme === 'light');
  };

  if (!mounted) return <div className="w-20 h-10" />;

  return (
    <div className="relative flex items-center bg-stats/50 backdrop-blur-md border border-glass-border p-1 rounded-full w-20 h-10 overflow-hidden">
      {/* Sliding Background Indicator */}
      <motion.div
        className="absolute h-8 w-8 bg-card rounded-full shadow-[0_2px_12px_rgba(45,212,191,0.2)] border border-accent-primary/20"
        initial={false}
        animate={{
          x: theme === 'light' ? 0 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />

      {/* Light Button */}
      <button
        onClick={() => toggleTheme('light')}
        className="relative z-10 w-8 h-8 flex items-center justify-center transition-colors duration-300"
        aria-label="Light Mode"
      >
        <motion.div
          animate={{
            scale: theme === 'light' ? 1 : 0.8,
            rotate: theme === 'light' ? 0 : -45
          }}
          style={{ color: theme === 'light' ? 'var(--accent-primary)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        </motion.div>
      </button>

      {/* Dark Button */}
      <button
        onClick={() => toggleTheme('dark')}
        className="relative z-10 w-8 h-8 ml-auto flex items-center justify-center transition-colors duration-300"
        aria-label="Dark Mode"
      >
        <motion.div
          animate={{
            scale: theme === 'dark' ? 1 : 0.8,
            rotate: theme === 'dark' ? 0 : 45
          }}
          style={{ color: theme === 'dark' ? 'var(--accent-primary)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </motion.div>
      </button>
    </div>
  );
}
