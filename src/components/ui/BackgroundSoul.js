'use client';

// BackgroundSoul uses PURE CSS animations instead of framer-motion
// This removes ALL JavaScript from the main thread for background effects
// which was causing 22,550ms Total Blocking Time in Lighthouse
export default function BackgroundSoul() {
  return (
    <>
      <style>{`
        @keyframes orb1 {
          0%   { transform: translate(0%, 0%) scale(1); }
          25%  { transform: translate(20%, -20%) scale(1.2); }
          50%  { transform: translate(-20%, 10%) scale(0.9); }
          75%  { transform: translate(10%, -10%) scale(1.1); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
        @keyframes orb2 {
          0%   { transform: translate(0%, 0%) scale(1); }
          25%  { transform: translate(-30%, 30%) scale(1.1); }
          50%  { transform: translate(10%, -20%) scale(0.8); }
          75%  { transform: translate(-10%, 20%) scale(1.2); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
        @keyframes orb3 {
          0%   { transform: translate(0%, 0%) scale(1); }
          25%  { transform: translate(30%, -40%) scale(0.9); }
          50%  { transform: translate(-10%, 10%) scale(1.1); }
          75%  { transform: translate(20%, -20%) scale(0.8); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
        .soul-orb-1 {
          animation: orb1 25s ease-in-out infinite;
          will-change: transform;
        }
        .soul-orb-2 {
          animation: orb2 30s ease-in-out infinite 2s;
          will-change: transform;
        }
        .soul-orb-3 {
          animation: orb3 35s ease-in-out infinite 5s;
          will-change: transform;
        }
      `}</style>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
        <div className="relative w-full max-w-[1600px] h-full overflow-hidden bg-transparent">

          {/* Orb 1 - Teal */}
          <div
            className="soul-orb-1 absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full opacity-20 dark:opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(13,148,136,0.8) 0%, rgba(13,148,136,0) 70%)',
              filter: 'blur(100px)',
              top: '-10%',
              left: '-5%',
            }}
          />

          {/* Orb 2 - Blue */}
          <div
            className="soul-orb-2 absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-15 dark:opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(14,165,233,0.6) 0%, rgba(14,165,233,0) 70%)',
              filter: 'blur(120px)',
              top: '20%',
              right: '-10%',
            }}
          />

          {/* Orb 3 - Purple */}
          <div
            className="soul-orb-3 absolute w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full opacity-10 dark:opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)',
              filter: 'blur(140px)',
              bottom: '-10%',
              left: '15%',
            }}
          />

        </div>
      </div>
    </>
  );
}
