"use client";
import { motion } from "framer-motion";

/**
 * AuroraBackground — Animated aurora gradient wrapper for the Hero section.
 */
export const AuroraBackground = ({ className, children, ...props }) => {
  return (
    <main>
      <div
        className={`relative flex flex-col items-center justify-center text-[var(--text-primary)] transition-bg ${className}`}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`
              [--white-gradient:repeating-linear-gradient(100deg,transparent_0%,transparent_7%,transparent_10%,transparent_12%,transparent_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,transparent_0%,transparent_7%,transparent_10%,transparent_12%,transparent_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--accent-primary)_10%,var(--accent-secondary)_15%,#60a5fa_20%,#c084fc_25%,var(--accent-primary)_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              dark:[background-image:var(--dark-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px] invert-0
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
              after:dark:[background-image:var(--dark-gradient),var(--aurora)]
              after:[background-size:200%,_100%]
              after:animate-aurora-1 after:[background-attachment:fixed] after:mix-blend-difference
              pointer-events-none
              absolute -inset-[10px] opacity-30 will-change-transform
            `}
          />
        </div>
        {children}
      </div>
    </main>
  );
};
