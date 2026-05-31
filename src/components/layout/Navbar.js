'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FlipButton, FlipLink } from '../ui/FlipButton';

const NAV_LINKS = [
  { name: 'Home', href: '/#home', icon: '🏠' },
  { name: 'About', href: '/#about', icon: '👤' },
  { name: 'Skills', href: '/#skills', icon: '⚡' },
  { name: 'Projects', href: '/#projects', icon: '📁' },
  { name: 'Contact', href: '/#contact', icon: '📧' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef([]);
  const pathname = usePathname();
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Scroll Spy Logic
      const sectionElements = NAV_LINKS.map(link => document.getElementById(link.name.toLowerCase()));
      let currentIdx = 0;
      const threshold = 300; // Trigger when section is 300px from top
      
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentIdx = i;
          }
        }
      }

      // Check if user has scrolled to the absolute bottom
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        currentIdx = sectionElements.length - 1;
      }

      setActiveIndex(currentIdx);
    };
    
    // Check initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex;
    if (navRefs.current[targetIndex]) {
      const el = navRefs.current[targetIndex];
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  }, [activeIndex, hoverIndex]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  if (!isMounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[5000] flex justify-center pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          width: scrolled ? 'min(90%, 1100px)' : 'min(100%, 1600px)',
          padding: scrolled ? '8px 24px' : '24px 60px',
          borderRadius: scrolled ? '100px' : '0px',
          y: scrolled ? 15 : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 160, 
          damping: 22, 
          mass: 1 
        }}
        className={`pointer-events-auto flex items-center justify-between relative transition-all duration-500
          ${scrolled 
            ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200/50 dark:border-teal-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-white/95 dark:bg-[#030303]/95 border-b border-gray-100 dark:border-white/5 shadow-sm'
          }`}
      >
        {/* Animated Glow Overlay (Only when scrolled) */}
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-[1px] bg-gradient-to-r from-teal-600/10 via-transparent to-teal-600/10 rounded-[50px] z-[-1] blur-sm"
          />
        )}
        {/* Top Progress Bar (Fixed to Viewport) */}
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none">
          <motion.div className="h-full bg-teal-600 shadow-[0_0_10px_rgba(13,148,136,0.5)] origin-left" style={{ scaleX }} />
        </div>

        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group mr-4">
          <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            Dipanshu<span className="text-teal-600 animate-pulse">.</span>
          </span>
        </Link>

        {/* Center: Nav Links */}
        <div className={`hidden lg:flex items-center gap-1 relative p-1.5 rounded-full border transition-all duration-500 mx-6 ${
          scrolled 
            ? 'bg-gray-100/50 dark:bg-white/5 border-black/20 dark:border-white/20' 
            : 'bg-transparent border-black/10 dark:border-white/10'
        }`}>
          <motion.div
            className="absolute bg-teal-600 rounded-full h-[calc(100%-12px)] z-0 shadow-[0_8px_20px_rgba(13,148,136,0.4)]"
            animate={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          />

          {NAV_LINKS.map((link, idx) => (
            <div 
              key={link.name}
              ref={el => navRefs.current[idx] = el}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative z-10"
            >
              <FlipLink 
                href={link.href}
                className={`!px-6 !py-3.5 !text-[11px] !tracking-[3px] font-black uppercase transition-all duration-300 ${(hoverIndex !== null ? hoverIndex === idx : activeIndex === idx) ? '!text-white' : '!text-gray-500 dark:!text-gray-400 hover:!text-gray-900 dark:hover:!text-white'}`}
              >
                {link.name}
              </FlipLink>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0 mr-4">
          {/* Theme Toggle (Compact) */}
          <div className="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-full relative border border-gray-200 dark:border-white/10">
            <motion.div
              layout
              className="absolute top-1 bottom-1 w-8 bg-white dark:bg-teal-600 rounded-full shadow-lg z-0"
              animate={{ x: theme === 'light' ? 0 : 36 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <button onClick={() => toggleTheme('light')} className={`relative z-10 w-8 h-8 flex items-center justify-center text-sm ${theme === 'light' ? 'text-teal-600' : 'text-gray-400'}`}>☀️</button>
            <button onClick={() => toggleTheme('dark')} className={`relative z-10 w-8 h-8 flex items-center justify-center text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`}>🌙</button>
          </div>

          {/* Hire Button (Adaptive) */}
          <FlipButton 
            front="Hire Me" 
            back="Let's Talk 🚀" 
            onClick={() => router.push('/#contact')} 
            className={`hidden sm:flex transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}
            style={{ 
              backgroundColor: '#0d9488', // Solid Teal
              color: 'white'
            }}
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            <motion.span animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-gray-900 dark:bg-white block rounded-full" />
            <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-gray-900 dark:bg-white block rounded-full" />
            <motion.span animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-gray-900 dark:bg-white block rounded-full" />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-28 left-6 right-6 bg-white/95 dark:bg-black/95 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/20 dark:border-white/10 shadow-2xl lg:hidden flex flex-col gap-6 pointer-events-auto"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => {
                  setIsMenuOpen(false);
                  if (link.href.startsWith('/#')) {
                    const id = link.href.split('#')[1];
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="flex items-center gap-6 p-5 rounded-[2rem] hover:bg-teal-600/10 transition-all group"
              >
                <span className="text-2xl bg-teal-500/10 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors">{link.icon}</span>
                <span className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest">{link.name}</span>
                <span className="ml-auto text-teal-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
