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
      // Limit width to 1600px to ensure it shrinks on zoom out
      const maxWidth = 1600;
      canvas.width = Math.min(window.innerWidth, maxWidth);
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains('dark');
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);

      // 1. Draw Subtle Base Grid
      ctx.lineWidth = 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize + gap / 2;
          const y = j * cellSize + gap / 2;
          ctx.strokeStyle = isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(13, 148, 136, 0.08)';
          ctx.strokeRect(x, y, boxSize, boxSize);
        }
      }

      // 2. Track Mouse - Relative to Canvas position
      const rect = canvas.getBoundingClientRect();
      const relativeX = mousePos.current.x - rect.left;
      const relativeY = mousePos.current.y - rect.top;
      
      const hoverX = Math.floor(relativeX / cellSize);
      const hoverY = Math.floor(relativeY / cellSize);
      
      if (hoverX >= 0 && hoverX < cols && hoverY >= 0 && hoverY < rows) {
        gridCells.current.set(`${hoverX}-${hoverY}`, 1.0);
      }

      // 3. Render Glowing Cells
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
      <canvas
        ref={canvasRef}
        className="w-full max-w-[1600px] h-full bg-transparent border-x border-teal-500/5 dark:border-white/5"
      />
    </div>
  );
}
