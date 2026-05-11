'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const FlipLink = ({ children, href, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative block overflow-hidden px-6 py-4 text-[12px] font-black uppercase tracking-[3px] ${className}`}
    >
      <div className="relative h-[16px] overflow-hidden">
        <motion.div
          animate={{ y: isHovered ? -16 : 0 }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col"
        >
          {/* Front Side */}
          <span className="flex items-center justify-center h-[16px] text-gray-800 dark:text-gray-200 font-black">
            {children}
          </span>
          {/* Back Side */}
          <span className="flex items-center justify-center h-[16px] text-teal-600 dark:text-teal-400 font-black">
            {children}
          </span>
        </motion.div>
      </div>
      
      {/* Subtle Bottom Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="absolute bottom-2 left-6 right-6 h-[2px] bg-teal-600 origin-left"
      />
    </motion.a>
  );
};

export const FlipButton = ({ front, back, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`group relative perspective-1000 ${className}`}
    >
      <motion.div
        animate={{ rotateX: isHovered ? 90 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front Face */}
        <div 
          style={{ backfaceVisibility: 'hidden' }}
          className="bg-teal-600 text-white px-7 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-[0_10px_20px_rgba(13,148,136,0.2)]"
        >
          {front}
        </div>
        
        {/* Bottom/Back Face (Appears on Flip) */}
        <div 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateX(-90deg) translateZ(20px)'
          }}
          className="absolute inset-0 bg-teal-500 text-white px-7 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center justify-center border border-teal-400"
        >
          {back}
        </div>
      </motion.div>
    </motion.button>
  );
};
