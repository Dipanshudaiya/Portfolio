"use client";
import { useState, useEffect } from 'react';
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

  const getIndex = (index) => {
    if (index < 0) return currentGallery.length - 1;
    if (index >= currentGallery.length) return 0;
    return index;
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev === currentGallery.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? currentGallery.length - 1 : prev - 1));

  // Reset index when category changes
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
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`${styles.galleryTab} ${activeCategory === cat ? styles.galleryTabActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className={styles.screenshotsContainer}>
        <button onClick={prevSlide} className={styles.galleryBtn}>&lt;</button>

        <div className={styles.galleryInner}>
          {currentGallery.length > 1 && (
            <div className={styles.galleryImageWrapper} onClick={prevSlide} style={{ cursor: 'pointer' }}>
              <img src={currentGallery[getIndex(currentIndex - 1)]} alt="Previous Screenshot" className={styles.galleryImage} />
            </div>
          )}

          <div className={`${styles.galleryImageWrapper} ${styles.galleryImageActive}`}>
            <img src={currentGallery[currentIndex]} alt="Current Screenshot" className={styles.galleryImage} />
          </div>

          {currentGallery.length > 2 && (
            <div className={styles.galleryImageWrapper} onClick={nextSlide} style={{ cursor: 'pointer' }}>
              <img src={currentGallery[getIndex(currentIndex + 1)]} alt="Next Screenshot" className={styles.galleryImage} />
            </div>
          )}
        </div>

        <button onClick={nextSlide} className={styles.galleryBtn}>&gt;</button>
      </div>

      {/* Dot indicators */}
      <div className={styles.galleryDots}>
        {currentGallery.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
