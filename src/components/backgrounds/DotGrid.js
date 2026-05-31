'use client';

import { useEffect, useState } from 'react';

/**
 * DotGrid — Subtle dot-grid background layer.
 * Sits behind all content via CSS (z-index: -1).
 */
export default function DotGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      <div aria-hidden="true" className="dot-grid-bg" />
      <div aria-hidden="true" className="dot-grid-vignette" />
    </>
  );
}
