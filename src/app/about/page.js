'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function SpotlightCard({ children, className = '' }) {
  const boundingRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  
  // 3D Tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setMousePosition({ x: localX, y: localY });
    
    const xPct = localX / rect.width - 0.5;
    const yPct = localY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 });
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={boundingRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group rounded-[30px] border border-glass-border bg-[var(--glass-bg)] overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] ${className}`}
    >
      {/* Background Soft Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 40%)`
        }}
      />
      
      {/* Animated Border Glow */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-[30px] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          padding: '1px', 
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-border), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      {/* Inner Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: `
        .about-main {
          --glass-bg: #FFFFFF;
          --glass-border: rgba(0,0,0,0.06);
          --spotlight-color: rgba(79, 70, 229, 0.05);
          --spotlight-border: rgba(79, 70, 229, 0.15);
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --hover-lift: -5px;
          --theme-accent: #4f46e5;
          --accent-primary: #4f46e5;
        }
        [data-theme='dark'] .about-main {
          --glass-bg: #0a0a0a;
          --glass-border: rgba(255,255,255,0.08);
          --spotlight-color: rgba(139, 92, 246, 0.08);
          --spotlight-border: rgba(139, 92, 246, 0.2);
          --text-primary: #ededed;
          --text-secondary: #999;
          --theme-accent: #8B5CF6;
          --accent-primary: #8B5CF6;
        }
        .hover-card {
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .hover-card:hover {
          transform: translateY(var(--hover-lift));
          border-color: var(--theme-accent);
          box-shadow: 0 20px 40px -10px color-mix(in srgb, var(--theme-accent) 20%, transparent);
        }
        /* Style for sub-cards like education and certifications */
        .sub-card {
          transition: all 0.2s ease;
        }
        .sub-card:hover {
          transform: translateY(-3px);
          background: color-mix(in srgb, var(--theme-accent) 5%, var(--glass-bg));
          border-color: var(--theme-accent);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
        }
      `}} />
      <main className="about-main pt-[140px] pb-[80px] relative z-10">
        <div className="container max-w-[1200px]">
          {/* Back Button - Stylish Upgrade */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              className="group inline-flex items-center gap-4 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all mb-12 font-black text-[13px] uppercase tracking-[0.2em] bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 px-8 py-4 rounded-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(13,148,136,0.15)] hover:border-teal-500/40 active:scale-95"
            >
              <span className="text-xl group-hover:-translate-x-2 transition-transform duration-300">←</span> 
              Back to Portfolio
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-8">
            {/* ── LEFT COLUMN: Fixed Profile Sidebar ── */}
            <div className="lg:sticky lg:top-[120px] h-fit flex flex-col gap-6">
              <SpotlightCard className="p-8 text-center hover-card relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
                 {/* Decorative background glow for Light Mode */}
                 <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-[rgba(139,92,246,0.15)] pointer-events-none transition-colors duration-500"></div>
                 
                 {/* Profile Image with Neon Frame System */}
                 <div className="relative w-52 h-52 mx-auto mb-8 group/profile">
                    {/* 1. Pulse Glow (Background) */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500 rounded-full blur-[25px] opacity-10 dark:opacity-20 group-hover/profile:opacity-30 transition-opacity duration-1000 animate-pulse" />

                    {/* 2. Rotating Neon Border */}
                    <div className="absolute inset-0 rounded-full p-[2px] overflow-hidden">
                      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent,rgba(79,70,229,0.8),transparent,rgba(139,92,246,0.8),transparent)] animate-[spin_4s_linear_infinite]" />
                      <div className="absolute inset-[2px] bg-white dark:bg-[#0a0a0a] rounded-full z-10" />
                    </div>

                    {/* 3. The Image Container */}
                    <div className="absolute inset-[8px] rounded-full overflow-hidden z-20 border border-indigo-100 dark:border-white/10 shadow-2xl">
                      <Image 
                        src="/profile.jpeg" 
                        alt="Dipanshu" 
                        fill 
                        priority
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover/profile:scale-110" 
                      />
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover/profile:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* 4. Secondary Offset Ring for Depth */}
                    <div className="absolute inset-0 border border-indigo-600/10 dark:border-accent-primary/20 rounded-full translate-x-2 translate-y-2 -z-10 group-hover/profile:translate-x-1 group-hover/profile:translate-y-1 transition-transform duration-500" />
                 </div>
                 
                 <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1 transition-colors">Dipanshu Daiya</h1>
                 <p className="text-indigo-600 dark:text-accent-primary font-bold text-sm tracking-widest uppercase mb-6">Full Stack Developer</p>
                 
                 <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {['React', 'Node.js', 'Next.js', 'MySQL', 'Tailwind'].map(tech => (
                      <span key={tech} className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-wider transition-all hover:scale-105">
                        {tech}
                      </span>
                    ))}
                 </div>

                 <a 
                   href="/Dipanshu_Daiya_Resume.pdf" 
                   download="Dipanshu_Daiya_Resume.pdf" 
                   className="w-full block bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95 shadow-md text-center"
                 >
                   Download Resume 📥
                 </a>
              </SpotlightCard>

              {/* Quick Contact Info */}
              <SpotlightCard className="p-6 hover-card">
                <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
                <div className="flex flex-col gap-3">
                  <a href="mailto:dipanshudaiya4@gmail.com" className="flex items-center gap-3 text-secondary hover:text-accent-primary transition-colors text-sm">
                    <span className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-glass-border">✉</span>
                    dipanshudaiya4@gmail.com
                  </a>
                  <a href="tel:+916378409862" className="flex items-center gap-3 text-secondary hover:text-accent-primary transition-colors text-sm">
                    <span className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-glass-border">📞</span>
                    +91 6378409862
                  </a>
                  <div className="flex items-center gap-3 text-secondary text-sm">
                    <span className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-glass-border">📍</span>
                    Rajasthan, India
                  </div>
                </div>
              </SpotlightCard>
            </div>

            {/* ── RIGHT COLUMN: Scrollable Details ── */}
            <div className="flex flex-col gap-8">
               
               {/* Bio Section */}
               <SpotlightCard className="p-8 lg:p-10 hover-card">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent-primary opacity-10 blur-[50px] rounded-full pointer-events-none"></div>
                 <h2 className="text-3xl font-black text-primary mb-4">About Me</h2>
                 <p className="text-[var(--text-secondary)] leading-relaxed text-[1.05rem]">
                   Hello! I'm a passionate Full Stack Developer focused on creating clean, user-friendly, and highly performant web applications. I enjoy bridging the gap between engineering and design—combining my technical knowledge with a keen eye for design to create beautiful products.
                   <br/><br/>
                   My journey in web development started with a curiosity about how things work on the internet, which quickly turned into a full-time passion. Today, I specialize in the MERN stack and Next.js, continuously pushing the boundaries of what's possible on the web.
                 </p>
               </SpotlightCard>

               {/* Education Timeline */}
               <SpotlightCard className="p-8 lg:p-10 hover-card">
                 <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                   <span className="text-accent-primary">🎓</span> Education Journey
                 </h2>
                 <div className="relative pl-6 border-l-2 border-[rgba(139,92,246,0.2)] flex flex-col gap-10">
                   
                   {/* 12th */}
                   <div className="relative group">
                     <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent-primary shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-125 transition-transform duration-300"></span>
                     <h3 className="text-xl font-bold text-primary">12th </h3>
                     <p className="text-secondary text-sm mb-3 mt-1">Sbvm • 2023</p>
                     <div className="bg-stats border border-glass-border p-4 rounded-xl inline-block transition-colors group-hover:border-[rgba(139,92,246,0.3)] sub-card">
                        <p className="text-[var(--text-primary)] font-medium text-sm">Academic Performance</p>
                        <p className="text-2xl font-black gradient-text">79.20% </p>
                     </div>
                   </div>

                   {/* BCA */}
                   <div className="relative group">
                     <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-background border-2 border-[rgba(139,92,246,0.5)] group-hover:scale-125 group-hover:border-accent-primary transition-all duration-300"></span>
                     <h3 className="text-xl font-bold text-primary">Bachelor of Computer Applications (BCA)</h3>
                     <p className="text-secondary text-sm mb-3 mt-1">MGSU • 2023 - Current</p>
                     <div className="bg-stats border border-glass-border p-4 rounded-xl inline-block transition-colors group-hover:border-[rgba(139,92,246,0.3)] sub-card">
                        <p className="text-[var(--text-primary)] font-medium text-sm">Academic Performance</p>
                        <p className="text-2xl font-black text-[#8B5CF6]">7.90 CGPA</p>
                     </div>
                   </div>

                 </div>
               </SpotlightCard>

               {/* Bento Grid: Certifications & Interests */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Certifications */}
                  <SpotlightCard className="p-8 hover-card">
                    <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                      <span className="text-accent-primary">🏆</span> Certifications
                    </h2>
                    <div className="flex flex-col gap-4">
                      {/* <div className="p-5 bg-stats border border-[color:var(--theme-accent)] rounded-2xl transition-colors group sub-card shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-primary group-hover:text-accent-primary transition-colors">Advanced Java Programming</h4>
                          <span className="text-xs bg-[rgba(139,92,246,0.1)] text-[#8B5CF6] px-2 py-1 rounded">2024</span>
                        </div>
                        <p className="text-sm text-secondary">Coursera</p>
                      </div> */}
                      <div className="p-5 bg-stats border border-[color:var(--theme-accent)] rounded-2xl transition-colors group sub-card shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-primary group-hover:text-accent-primary transition-colors">Web Development</h4>
                          <span className="text-xs bg-[rgba(139,92,246,0.1)] text-[#8B5CF6] px-2 py-1 rounded">2026</span>
                        </div>
                        <p className="text-sm text-secondary">Axixa Technologies</p>
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Personal Interests */}
                  <SpotlightCard className="p-8 hover-card">
                    <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                      <span className="text-accent-primary">⚡</span> Off-Screen
                    </h2>
                    <p className="text-sm text-secondary mb-6">
                      I believe a creative mind needs inspiration from the real world. Here is what I enjoy doing when I'm away from the keyboard.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-stats border border-[color:var(--theme-accent)] rounded-xl text-center flex flex-col items-center justify-center gap-2 transition-colors sub-card shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <span className="text-2xl">🎵</span>
                        <span className="text-[0.65rem] font-bold text-primary uppercase tracking-widest">Music</span>
                      </div>
                      <div className="p-4 bg-stats border border-[color:var(--theme-accent)] rounded-xl text-center flex flex-col items-center justify-center gap-2 transition-colors sub-card shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <span className="text-2xl">📚</span>
                        <span className="text-[0.65rem] font-bold text-primary uppercase tracking-widest">Reading</span>
                      </div>
                      <div className="p-4 bg-stats border border-[color:var(--theme-accent)] rounded-xl text-center flex flex-col items-center justify-center gap-2 transition-colors sub-card shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <span className="text-2xl">☕</span>
                        <span className="text-[0.65rem] font-bold text-primary uppercase tracking-widest">Coffee</span>
                      </div>
                      <div className="p-4 bg-stats border border-[color:var(--theme-accent)] rounded-xl text-center flex flex-col items-center justify-center gap-2 transition-colors sub-card shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <span className="text-2xl">✈️</span>
                        <span className="text-[0.65rem] font-bold text-primary uppercase tracking-widest">Travel</span>
                      </div>
                    </div>
                  </SpotlightCard>
               </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
