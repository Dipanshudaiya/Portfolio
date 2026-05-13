'use client';

export default function BackgroundSoul() {
  return (
    <>
      <style>{`
        @keyframes orb1 {
          0%   { transform: translate3d(0%, 0%, 0) scale(1); }
          25%  { transform: translate3d(20%, -20%, 0) scale(1.2); }
          50%  { transform: translate3d(-20%, 10%, 0) scale(0.9); }
          75%  { transform: translate3d(10%, -10%, 0) scale(1.1); }
          100% { transform: translate3d(0%, 0%, 0) scale(1); }
        }
        @keyframes orb2 {
          0%   { transform: translate3d(0%, 0%, 0) scale(1); }
          25%  { transform: translate3d(-30%, 30%, 0) scale(1.1); }
          50%  { transform: translate3d(10%, -20%, 0) scale(0.8); }
          75%  { transform: translate3d(-10%, 20%, 0) scale(1.2); }
          100% { transform: translate3d(0%, 0%, 0) scale(1); }
        }
        @keyframes orb3 {
          0%   { transform: translate3d(0%, 0%, 0) scale(1); }
          25%  { transform: translate3d(30%, -40%, 0) scale(0.9); }
          50%  { transform: translate3d(-10%, 10%, 0) scale(1.1); }
          75%  { transform: translate3d(20%, -20%, 0) scale(0.8); }
          100% { transform: translate3d(0%, 0%, 0) scale(1); }
        }
        .soul-orb {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full overflow-hidden bg-transparent">

          {/* Orb 1 - Teal (Optimized without CSS Filter) */}
          <div
            className="soul-orb animate-[orb1_25s_ease-in-out_infinite] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-20 dark:opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(13,148,136,0.6) 0%, rgba(13,148,136,0.2) 40%, transparent 75%)',
              top: '-15%',
              left: '-10%',
            }}
          />

          {/* Orb 2 - Blue */}
          <div
            className="soul-orb animate-[orb2_30s_ease-in-out_infinite_2s] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] opacity-15 dark:opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, rgba(14,165,233,0.1) 45%, transparent 75%)',
              top: '10%',
              right: '-15%',
            }}
          />

          {/* Orb 3 - Purple */}
          <div
            className="soul-orb animate-[orb3_35s_ease-in-out_infinite_5s] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] opacity-10 dark:opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.1) 50%, transparent 75%)',
              bottom: '-15%',
              left: '5%',
            }}
          />

        </div>
      </div>
    </>
  );
}
