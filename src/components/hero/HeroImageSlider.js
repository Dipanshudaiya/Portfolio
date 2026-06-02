"use client";
import { useState, useEffect } from 'react';
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
    }, 6000); // Increased interval to 6 seconds so it doesn't change too fast

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.heroSlider} style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
      {images.map((imgSrc, i) => (
        <img
          key={i}
          src={imgSrc}
          alt={`${alt} - View ${i + 1}`}
          className={`${styles.heroSlideImage} ${i === currentIndex ? styles.heroSlideActive : styles.heroSlideOut}`}
          decoding="async"
        />
      ))}

      {/* Slide indicator dots */}
      <div className={styles.heroSlideDots}>
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{ cursor: 'pointer' }}
            className={`${styles.heroSlideDot} ${i === currentIndex ? styles.heroSlideDotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
