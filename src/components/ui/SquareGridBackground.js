'use client';
import { useEffect, useRef } from 'react';

export default function SquareGridBackground() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -2000, y: -2000 });
  const gridCells = useRef(new Map());
  const canvasRect = useRef({ left: 0, top: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Performance Optimization: Disable interactive grid on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 768;
    
    if (isTouchDevice || isMobile) {
      // Hide canvas on mobile to save resources
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    const cellSize = 60; 
    const gap = 6; 
    const boxSize = cellSize - gap;

    const updateRect = () => {
      const maxWidth = 1600;
      canvas.width = Math.min(window.innerWidth, maxWidth);
      canvas.height = window.innerHeight;
      canvasRect.current = canvas.getBoundingClientRect();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);

      // Use cached rect instead of calling getBoundingClientRect() in the loop
      const relativeX = mousePos.current.x - canvasRect.current.left;
      const relativeY = mousePos.current.y - canvasRect.current.top;
      
      const hoverX = Math.floor(relativeX / cellSize);
      const hoverY = Math.floor(relativeY / cellSize);
      
      if (hoverX >= 0 && hoverX < cols && hoverY >= 0 && hoverY < rows) {
        gridCells.current.set(`${hoverX}-${hoverY}`, 1.0);
      }

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

    window.addEventListener('resize', updateRect);
    window.addEventListener('mousemove', handleMouseMove);

    updateRect();
    drawGrid();

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
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
