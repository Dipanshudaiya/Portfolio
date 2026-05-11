'use client';
import { motion } from 'framer-motion';

export default function BackgroundSoul() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
      <div className="relative w-full max-w-[1600px] h-full overflow-hidden bg-transparent">
        
        {/* Random Floating Orb 1 */}
        <motion.div
          className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] md:blur-[140px] opacity-20 md:opacity-30 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.8) 0%, rgba(13,148,136,0) 70%)' }}
          animate={{
            x: ['0%', '20%', '-20%', '10%', '0%'],
            y: ['0%', '-20%', '10%', '-10%', '0%'],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Random Floating Orb 2 */}
        <motion.div
          className="absolute right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] md:blur-[150px] opacity-15 md:opacity-20 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.6) 0%, rgba(14,165,233,0) 70%)' }}
          animate={{
            x: ['0%', '-30%', '10%', '-10%', '0%'],
            y: ['0%', '30%', '-20%', '20%', '0%'],
            scale: [1, 1.1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Random Floating Orb 3 */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] md:blur-[160px] opacity-10 md:opacity-15 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)' }}
          animate={{
            x: ['0%', '30%', '-10%', '20%', '0%'],
            y: ['0%', '-40%', '10%', '-20%', '0%'],
            scale: [1, 0.9, 1.1, 0.8, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />

      </div>
    </div>
  );
}
