'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Loaded client-side only (no SSR) — it uses WebGL
const ColorBends = dynamic(() => import('../backgrounds/ColorBends'), { ssr: false });

export default function ProjectBackground({ themeColorDark }) {
  const [isDark, setIsDark] = useState(true); // default dark to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute('data-theme');
    setIsDark(current !== 'light');

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  if (!mounted || !isDark) return null;

  const accent = themeColorDark || '#8B5CF6';

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <ColorBends
        colors={[accent, '#3b0764', '#1e1b4b', accent, '#0f172a', '#7c3aed']}
        speed={0.22}
        rotation={45}
        autoRotate={2}
        scale={0.9}
        frequency={1.1}
        warpStrength={1.2}
        mouseInfluence={0.8}
        parallax={0.4}
        noise={0.06}
        iterations={3}
        intensity={1.8}
        bandWidth={7}
        transparent={false}
      />
    </div>
  );
}
