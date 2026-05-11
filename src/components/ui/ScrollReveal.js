'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — Adds 'active' class to `.reveal` elements when they enter viewport.
 * Also manages the navbar 'scrolled' class.
 * Renders nothing — pure side-effect component.
 */
export default function ScrollReveal() {
  useEffect(() => {
    // Reveal elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Navbar scroll state
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
