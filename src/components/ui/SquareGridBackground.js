'use client';
import { useEffect, useRef } from 'react';

export default function SquareGridBackground() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -2000, y: -2000 });
  const gridCells = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    const cellSize = 60; 
    const gap = 6; 
    const boxSize = cellSize - gap;

    const resize = () => {
      const maxWidth = 1600;
      canvas.width = Math.min(window.innerWidth, maxWidth);
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      // Clear only the areas that were previously drawn or the whole canvas for simplicity
      // but we don't draw the static grid here anymore.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);

      // Track Mouse - Relative to Canvas position
      const rect = canvas.getBoundingClientRect();
      const relativeX = mousePos.current.x - rect.left;
      const relativeY = mousePos.current.y - rect.top;
      
      const hoverX = Math.floor(relativeX / cellSize);
      const hoverY = Math.floor(relativeY / cellSize);
      
      if (hoverX >= 0 && hoverX < cols && hoverY >= 0 && hoverY < rows) {
        gridCells.current.set(`${hoverX}-${hoverY}`, 1.0);
      }

      // Render ONLY Glowing Cells (The interactive part)
      if (gridCells.current.size > 0) {
        gridCells.current.forEach((opacity, key, map) => {
          const [xIdx, yIdx] = key.split('-').map(Number);
          const x = xIdx * cellSize + gap / 2;
          const y = yIdx * cellSize + gap / 2;
          
          const r = 20, g = 184, b = 166; 
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.25})`;
          ctx.fillRect(x, y, boxSize, boxSize);
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x, y, boxSize, boxSize);

          const newOpacity = opacity - 0.02; 
          if (newOpacity <= 0) {
            map.delete(key);
          } else {
            map.set(key, newOpacity);
          }
        });
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
      {/* The Static Grid is now handled by this CSS background div - 100x faster than Canvas loops */}
      <div 
        className="absolute inset-0 max-w-[1600px] w-full h-full opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #14b8a6 1px, transparent 1px),
            linear-gradient(to bottom, #14b8a6 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full max-w-[1600px] h-full bg-transparent border-x border-teal-500/5 dark:border-white/5"
      />
    </div>
  );
}
