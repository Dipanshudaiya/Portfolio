'use client';
import { useEffect, useRef } from 'react';

export const HexagonBackground = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const activeCells = useRef(new Map()); // Stores { key: opacity }
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Hexagon Grid Settings (Big Blocks)
    const size = 32; // Side length
    const h = size * 2;
    const w = Math.sqrt(3) * size;
    const vertDist = h * 0.75;
    const horizDist = w;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    const drawHexagon = (x, y, opacity, isBase = false) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';

      if (isBase) {
        ctx.strokeStyle = isDark 
          ? 'rgba(148, 163, 184, 0.08)' 
          : 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Use Indigo or Gray based on theme
        const accent = isDark ? '#64748b' : '#4f46e5'; 
        ctx.fillStyle = accent;
        ctx.globalAlpha = opacity * 0.25;
        ctx.fill();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Find Current Cell from Mouse
      const cx = Math.floor(mousePos.current.x / horizDist);
      const cy = Math.floor(mousePos.current.y / vertDist);
      const isOdd = cy % 2 !== 0;
      const xOffset = isOdd ? horizDist / 2 : 0;
      
      const key = `${cx}-${cy}-${isOdd}`;
      activeCells.current.set(key, 1.0); // Reset/Set to full brightness

      // 2. Draw Base Grid (Static)
      const cols = Math.ceil(canvas.width / horizDist) + 1;
      const rows = Math.ceil(canvas.height / vertDist) + 1;

      for (let r = 0; r < rows; r++) {
        const rowOffset = (r % 2 !== 0) ? horizDist / 2 : 0;
        for (let c = 0; c < cols; c++) {
          const x = c * horizDist + rowOffset;
          const y = r * vertDist;
          drawHexagon(x, y, 0, true);
        }
      }

      // 3. Update and Draw Active Cells (Fade Effect)
      activeCells.current.forEach((opacity, key, map) => {
        const [c, r, odd] = key.split('-').map(v => v === 'true' ? true : v === 'false' ? false : parseInt(v));
        const rowOffset = odd ? horizDist / 2 : 0;
        const x = c * horizDist + rowOffset;
        const y = r * vertDist;

        drawHexagon(x, y, opacity);

        // Fade out
        const nextOpacity = opacity - 0.02; // Change this to control fade speed
        if (nextOpacity <= 0) {
          map.delete(key);
        } else {
          map.set(key, nextOpacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none -z-10 bg-transparent ${className}`}
    />
  );
};
