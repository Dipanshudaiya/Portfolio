"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../app/projects/[id]/ProjectDetails.module.css';

export default function ProjectGallery({ gallery }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize category if gallery is an object
  const isCategorized = gallery && !Array.isArray(gallery);
  const categories = isCategorized ? Object.keys(gallery) : [];

  useEffect(() => {
    if (isCategorized && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [isCategorized, categories, activeCategory]);

  const currentGallery = isCategorized ? gallery[activeCategory] || [] : gallery || [];

  if (!currentGallery || currentGallery.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev === currentGallery.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? currentGallery.length - 1 : prev - 1));

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <div className={styles.galleryWrapper}>
      {/* Category Tabs */}
      {isCategorized && (
        <div className={styles.galleryTabs}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(cat)}
              className={`${styles.galleryTab} ${activeCategory === cat ? styles.galleryTabActive : ''}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      )}

      <div className={styles.screenshotsContainer}>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          onClick={prevSlide} 
          className={styles.galleryBtn}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>

        <div className={styles.galleryInner}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${currentIndex}`}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`${styles.galleryImageWrapper} ${styles.galleryImageActive}`}
            >
              <Image 
                src={currentGallery[currentIndex]} 
                alt="Project Screenshot" 
                className={styles.galleryImage} 
                width={1200}
                height={750}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          onClick={nextSlide} 
          className={styles.galleryBtn}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className={styles.galleryDots}>
        {currentGallery.map((_, i) => (
          <motion.span
            key={i}
            animate={{ 
              width: i === currentIndex ? 24 : 8,
              backgroundColor: i === currentIndex ? 'var(--theme-color)' : 'rgba(255, 255, 255, 0.2)'
            }}
            onClick={() => setCurrentIndex(i)}
            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            style={{ borderRadius: '4px' }}
          />
        ))}
      </div>
    </div>
  );
}
