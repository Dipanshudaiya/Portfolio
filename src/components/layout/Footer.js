'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const EXPERTISE = ['Full Stack', 'UI/UX Design', 'Next.js', 'Performance'];

  const SOCIAL_LINKS = [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', href: 'https://github.com/Dipanshudaiya', label: 'GH' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', href: 'https://www.linkedin.com/in/dipanshu-daiya-3064163b2', label: 'LI' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg', href: 'https://x.com/dipanshudaiya96', label: 'TW' }
  ];

  const NAV_ITEMS = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: '👤' },
    { name: 'Projects', icon: '📁' },
    { name: 'Skills', icon: '⚡' },
    { name: 'Contact', icon: '📧' }
  ];

  const SocialsList = ({ compact = false, wide = false }) => (
    <div className={`flex items-center ${wide ? 'gap-10 justify-center' : 'gap-4'} ${compact ? 'justify-start' : 'justify-center'}`}>
      {SOCIAL_LINKS.map((social, i) => (
        <motion.a 
          key={i} 
          href={social.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ y: -3, scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="relative group/social w-10 h-10 md:w-11 md:h-11 p-[1.5px] bg-gray-200 dark:bg-white/10 rounded-xl overflow-hidden transition-all duration-200 flex items-center justify-center"
        >
           <div className="laser-border-container">
             <div className="rotating-gradient" style={{ animationDuration: '3s' }} />
           </div>
           <div className="relative z-20 w-full h-full bg-white dark:bg-[#0a0a0a] rounded-[calc(0.75rem-1.5px)] flex items-center justify-center p-2.5 group-hover/social:bg-teal-500/5 transition-colors">
              <img src={social.icon} alt={social.label} className="w-full h-full object-contain antialiased opacity-70 group-hover:opacity-100 transition-opacity" />
           </div>
        </motion.a>
      ))}
    </div>
  );

  return (
    <footer className="relative z-10 py-10 md:py-16 overflow-hidden bg-transparent antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes border-flow-teal {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .laser-border-container {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          background: transparent;
          border-radius: inherit;
          padding: 2.2px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .rotating-gradient {
          position: absolute;
          inset: -200%;
          background: conic-gradient(from 0deg, transparent 30%, #14b8a6 50%, transparent 70%);
          animation: border-flow-teal 4s linear infinite;
        }
      `}} />
      <div className="container px-4 md:px-0">
        
        {/* Top Section: Cinematic CTA & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Main CTA Card - OPTIMIZED FOR MOBILE */}
          <div className="relative group rounded-[2rem] md:rounded-[2.5rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] tap-highlight-transparent flex-grow">
            <div className="laser-border-container md:block hidden">
               <div className="rotating-gradient" />
            </div>

            <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-1px)] p-6 md:p-8 lg:p-10 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 md:mb-5 py-1 md:py-1.5 px-3 bg-teal-500/10 border border-teal-500/20 rounded-full w-fit mx-auto md:mx-0">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Available</span>
                </div>

                <h2 className="text-[clamp(1.5rem,4.5vw,3rem)] font-black leading-[1.1] mb-4 md:mb-5 tracking-tighter text-gray-900 dark:text-white text-center md:text-left">
                  Ready to start a <br className="md:hidden" /> <span className="text-teal-600">new project?</span>
                </h2>
                
                <p className="text-xs md:text-base text-gray-500 dark:text-gray-400 max-w-[500px] font-medium mb-6 md:mb-6 leading-relaxed text-center md:text-left hidden md:block">
                  Have a groundbreaking idea? Let's turn your vision into a high-performance digital masterpiece.
                </p>

                <div className="flex mb-2 md:mb-8 justify-center md:justify-start">
                  <motion.a 
                    href="mailto:dipanshudaiya4@gmail.com" 
                    whileHover={typeof window !== 'undefined' && window.innerWidth >= 768 ? { y: -4, shadow: "0 20px 40px rgba(13,148,136,0.35)" } : {}}
                    whileTap={{ scale: 0.96 }}
                    className="relative group/btn w-full md:w-fit px-8 md:px-10 py-3.5 md:py-4 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Get in Touch</span>
                    <span className="relative z-10 text-xl group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </motion.a>
                </div>
              </div>

              {/* Integrated Socials - Only for Web View */}
              <div className="hidden lg:flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="flex gap-2">
                  {EXPERTISE.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg text-[7px] font-black uppercase tracking-widest text-gray-400">
                      {skill}
                    </span>
                  ))}
                </div>
                <SocialsList compact={true} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {/* Navigation Grid Bento - HIDDEN ON MOBILE FOR COMPACTNESS */}
            <div className="relative group rounded-[2rem] md:rounded-[2.5rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] flex-grow hidden md:block">
              <div className="laser-border-container">
                <div className="rotating-gradient" />
              </div>

              <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-1px)] p-6 md:p-8 flex flex-col justify-center">
                <div className="flex justify-center mb-5 md:mb-8">
                  <div className="px-4 py-1.5 md:px-6 md:py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-3 md:gap-4">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-teal-500"></span>
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-teal-600 dark:text-teal-400">Navigation</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 flex-grow">
                  {NAV_ITEMS.map((item, index) => (
                    <Link 
                      key={item.name} 
                      href={`#${item.name.toLowerCase()}`} 
                      className={`relative group/nav rounded-xl md:rounded-2xl bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] transition-all duration-200 hover:-translate-y-1 active:scale-95 ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                    >
                      <div className="laser-border-container">
                        <div className="rotating-gradient" />
                      </div>
                      <div className="relative z-10 w-full h-full bg-white dark:bg-[#0a0a0a] rounded-[calc(0.75rem-1px)] md:rounded-[calc(1.5rem-1px)] p-3 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 group-hover/nav:bg-teal-500/5 transition-colors">
                        <span className="text-xl md:text-2xl group-hover/nav:scale-110 transition-all duration-200">{item.icon}</span>
                        <span className="text-[8px] md:text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest group-hover/nav:text-teal-600 dark:group-hover/nav:text-teal-400 transition-colors">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Socials Bento - COMPACT FOR MOBILE */}
            <div className="relative group rounded-[1.8rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] lg:hidden">
              <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(1.8rem-1px)] py-4 px-6 flex flex-row items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Socials</span>
                <SocialsList wide={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative group rounded-[1.5rem] md:rounded-[2rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] mt-4 md:mt-6">
          <div className="laser-border-container">
             <div className="rotating-gradient" style={{ animationDuration: '8s' }} />
          </div>
          <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] md:rounded-[calc(2rem-1px)] px-6 md:px-10 py-4 md:py-6 flex flex-row justify-between items-center gap-4">
            <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-gray-400">
              © {currentYear} Dipanshu Daiya
            </p>
            <div className="flex items-center gap-4 md:gap-8">
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 hidden xs:block">
                Built with Next.js
              </span>
              <button 
                onClick={scrollToTop}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:bg-teal-600 hover:text-white transition-all duration-200 hover:-translate-y-1 shadow-sm active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
