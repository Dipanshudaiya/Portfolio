'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * AnimatedGrid — A premium, subtle animated grid background.
 * Features a moving spotlight effect that interacts with the theme.
 */
export default function AnimatedGrid() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="animated-grid-container"
      aria-hidden="true"
    >
      {/* The actual grid lines */}
      <div className="grid-lines" />
      
      {/* The moving spotlight / glow */}
      <div className="grid-spotlight" />
      
      {/* Subtle vignette for depth */}
      <div className="grid-vignette" />
      
      <style jsx>{`
        .animated-grid-container {
          display: none !important;
        }

        /* Minimalist Obsidian Grid Layer */
        .grid-lines {
          position: absolute;
          inset: -10%;
          width: 120%;
          height: 120%;
          background-image: 
            url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3%3Ccircle cx='40' cy='40' r='1' fill='%232dd4bf' fill-opacity='0.15'/%3%3Cpath d='M40 0 L40 80 M0 40 L80 40' stroke='%232dd4bf' stroke-width='0.3' stroke-opacity='0.05'/%3%3C/svg%3"),
            url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3%3Cpath d='M0 0 L160 160 M160 0 L0 160' stroke='%232dd4bf' stroke-width='0.2' stroke-opacity='0.03'/%3%3C/svg%3");
          background-size: 80px 80px, 160px 160px;
          animation: network-drift 50s linear infinite;
        }

        @keyframes network-drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-1%, -1%) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* Pulsating Cyan Nodes Overlay */
        .animated-grid-container::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(45, 212, 191, 0.15) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: nodes-pulse 5s ease-in-out infinite alternate;
        }

        @keyframes nodes-pulse {
          0% { opacity: 0.1; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(1.05); }
        }

        .grid-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            1200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(45, 212, 191, 0.12),
            transparent 75%
          );
          z-index: 1;
        }

        /* Floating Cyan Particles */
        .animated-grid-container::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(rgba(45, 212, 191, 0.3) 1px, transparent 1px),
            radial-gradient(white 0.5px, transparent 0.5px);
          background-size: 200px 200px, 150px 150px;
          opacity: 0.15;
          animation: particles-float 25s linear infinite;
        }

        @keyframes particles-float {
          from { background-position: 0 0; }
          to { background-position: 200px 400px; }
        }

        .grid-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, #09090b 100%);
          z-index: 2;
          opacity: 0.9;
        }

        :global([data-theme='light']) .animated-grid-container {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
    </div>
  );
}
