'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FlipButton, FlipLink } from '../ui/FlipButton';

const NAV_LINKS = [
  { name: 'Home', href: '/#home', id: 'home', icon: '🏠' },
  { name: 'About', href: '/#about', id: 'about', icon: '👤' },
  { name: 'Projects', href: '/#projects', id: 'projects', icon: '📁' },
  { name: 'Skills', href: '/#skills', id: 'skills', icon: '⚡' },
  { name: 'Contact', href: '/#contact', id: 'contact', icon: '📧' },
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    // Efficient Scroll detection for background only
    const handleScroll = () => {
      if (window.scrollY > 20 && !scrolled) setScrolled(true);
      else if (window.scrollY <= 20 && scrolled) setScrolled(false);
    };

    // Use IntersectionObserver for Active Section Detection (No Layout Thrashing)
    const observerOptions = { rootMargin: '-40% 0px -40% 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = NAV_LINKS.findIndex(link => link.id === entry.target.id);
          if (index !== -1) setActiveIndex(index);
        }
      });
    }, observerOptions);

    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [scrolled]);

  useEffect(() => {
    const targetIdx = hoverIndex !== null ? hoverIndex : activeIndex;
    if (navRefs.current[targetIdx]) {
      const el = navRefs.current[targetIdx];
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
    <nav className="fixed top-0 left-0 right-0 z-[5000] flex justify-center antialiased pointer-events-none">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none">
        <motion.div className="h-full bg-teal-600 shadow-[0_0_10px_rgba(13,148,136,0.5)] origin-left" style={{ scaleX }} />
      </div>

      <motion.div
        animate={{
          width: scrolled ? 'min(94%, 1100px)' : 'min(100%, 1536px)',
          y: scrolled ? 12 : 0,
          borderRadius: scrolled ? '100px' : '0px',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={`pointer-events-auto relative transition-colors duration-500 shadow-xl overflow-hidden
          ${scrolled 
            ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-teal-500/20 px-6 md:px-12 py-2 md:py-2.5' 
            : 'bg-white dark:bg-[#030303] border-b border-gray-100 dark:border-white/10 px-5 md:px-10 py-3 md:py-4'
          }`}
      >
        <div className={`mx-auto flex items-center justify-between ${scrolled ? 'w-full' : 'max-w-[1400px]'}`}>
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group mr-2 md:mr-4">
            <span className="text-lg md:text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
              Dipanshu<span className="text-teal-600">.</span>
            </span>
          </Link>

          {/* Center: Nav Links */}
          <div 
            className="hidden lg:flex items-center gap-1 relative p-1 rounded-full border bg-gray-100/50 dark:bg-white/5 border-black/5 dark:border-white/5 mx-6"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <motion.div
              className="absolute bg-teal-600 rounded-full h-[calc(100%-8px)] z-0 shadow-[0_8px_20px_rgba(13,148,136,0.4)]"
              animate={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            />

            {NAV_LINKS.map((link, idx) => {
              const isTarget = hoverIndex !== null ? hoverIndex === idx : activeIndex === idx;
              return (
                <div 
                  key={link.name}
                  ref={el => navRefs.current[idx] = el}
                  onMouseEnter={() => setHoverIndex(idx)}
                  className="relative z-10"
                >
                  <FlipLink 
                    href={link.href}
                    className={`!px-6 !py-3.5 !text-[11px] !tracking-[3px] font-black uppercase transition-all duration-300 ${isTarget ? '!text-white' : '!text-gray-500 dark:!text-gray-400 hover:!text-gray-900 dark:hover:!text-white'}`}
                  >
                    {link.name}
                  </FlipLink>
                </div>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className={`flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-full relative border border-gray-200 dark:border-white/10 ${theme === 'light' ? 'justify-start' : 'justify-end'}`}>
              <motion.div
                layout
                className="absolute w-6 md:w-8 h-6 md:h-8 bg-white dark:bg-teal-600 rounded-full shadow-md z-0"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              <button onClick={() => toggleTheme('light')} className={`relative z-10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[10px] md:text-sm transition-colors duration-300 ${theme === 'light' ? 'text-teal-600' : 'text-gray-400'}`}>☀️</button>
              <button onClick={() => toggleTheme('dark')} className={`relative z-10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[10px] md:text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`}>🌙</button>
            </div>

            <FlipButton 
              front="Hire" 
              back="Talk" 
              onClick={() => {
                 const el = document.getElementById('contact');
                 if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hidden sm:flex"
              style={{ 
                backgroundColor: '#0d9488',
                color: 'white'
              }}
            />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-8 h-8 md:w-10 md:h-10 flex flex-col items-center justify-center gap-1 md:gap-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              <motion.span animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-4 md:w-5 h-0.5 bg-gray-900 dark:bg-white block rounded-full" />
              <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 md:w-5 h-0.5 bg-gray-900 dark:bg-white block rounded-full" />
              <motion.span animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-4 md:w-5 h-0.5 bg-gray-900 dark:bg-white block rounded-full" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-4 right-4 bg-white/95 dark:bg-black/95 backdrop-blur-3xl rounded-[2.5rem] p-4 border border-white/20 dark:border-white/10 shadow-2xl lg:hidden grid grid-cols-2 gap-3 z-[6000] pointer-events-auto"
          >
            {NAV_LINKS.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-[1.8rem] bg-gray-50/50 dark:bg-white/5 border border-black/5 dark:border-white/5 transition-all group active:scale-95 ${idx === 4 ? 'col-span-2 py-4 flex-row' : ''}`}
              >
                <span className={`text-xl ${idx === 4 ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center rounded-xl bg-teal-500/10 group-hover:bg-teal-600 group-hover:text-white transition-colors`}>{link.icon}</span>
                <span className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">{link.name}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
