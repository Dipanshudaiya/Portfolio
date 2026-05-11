'use client';
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

// Custom wrap function to replace @motionone/utils dependency
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller flex whitespace-nowrap" style={{ x }}>
        <span className="flex">{children} </span>
        <span className="flex">{children} </span>
        <span className="flex">{children} </span>
        <span className="flex">{children} </span>
      </motion.div>
    </div>
  );
}

const TEXTS = [
  "Building Digital Products",
  "Clean Code Advocate",
  "Available for Hire",
  "Full Stack Developer",
  "React & Node.js",
  "Open to Opportunities",
];

export default function ScrollVelocityBanner() {
  return (
    <section className="w-full py-6 overflow-hidden pointer-events-none">
      <div className="container overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-black backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-none">
        <div className="relative flex whitespace-nowrap py-6">
          <ParallaxText baseVelocity={-2}>
            {TEXTS.map((text, i) => (
              <span key={i} className="flex items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-white mx-10">{text}</span>
                {/* Flashing Golden Dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.8)]"></span>
                </span>
              </span>
            ))}
          </ParallaxText>
        </div>
      </div>
    </section>
  );
}
