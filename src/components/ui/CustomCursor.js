'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth spring config
  const springConfig = { damping: 40, stiffness: 400, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Outer circle follow with slight lag for premium feel
  const outerX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.8 });
  const outerY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, [data-cursor="hover"], .cursor-pointer');
      const text = target.getAttribute('data-cursor-text');
      
      if (isClickable) {
        setIsHovered(true);
        if (text) setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring - Follows with organic lag */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2 border-indigo-600/30 dark:border-white/20"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 80 : 35,
          height: isHovered ? 80 : 35,
        }}
        animate={{
          backgroundColor: isHovered ? 'rgba(79, 70, 229, 0.05)' : 'rgba(79, 70, 229, 0)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />

      {/* Main Dot - Precise and Fast */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-indigo-600 dark:bg-white rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
        }}
      />
      
      {/* Floating Label for Cursor */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden md:block fixed pointer-events-none z-[10001] px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '20px',
            translateY: '-30px',
          }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
}
