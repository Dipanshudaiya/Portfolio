"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../app/projects/[id]/ProjectDetails.module.css';

export default function HeroImageSlider({ images: rawImages, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize images to always be an array
  const images = Array.isArray(rawImages) 
    ? rawImages 
    : rawImages && typeof rawImages === 'object' 
      ? Object.values(rawImages)[0] 
      : [];

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.heroSlider} style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - View ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeInOut"
          }}
          className={styles.heroSlideImage}
        />
      </AnimatePresence>

      {/* Slide indicator dots */}
      <div className={styles.heroSlideDots}>
        {images.map((_, i) => (
          <motion.span
            key={i}
            animate={{ 
              scale: i === currentIndex ? 1.2 : 1,
              backgroundColor: i === currentIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)'
            }}
            className={styles.heroSlideDot}
          />
        ))}
      </div>
    </div>
  );
}
