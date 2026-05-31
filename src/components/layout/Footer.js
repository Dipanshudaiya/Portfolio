'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-10 md:py-20 overflow-hidden bg-transparent">
      <div className="container">
        
        {/* Top Section: Cinematic CTA - Refined Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group bg-white dark:!bg-[#0a0a0a] border border-gray-100 dark:border-white/10 transition-all duration-200 hover:shadow-[0_20px_60px_rgba(13,148,136,0.15)] hover:border-teal-500/30 hover:-translate-y-1 cursor-pointer after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.15),_transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none">
            <div className="relative z-10">
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-black leading-[1.1] mb-6 md:mb-8 tracking-tighter text-gray-900 dark:text-white">
                Let's build something <br/>
                <span className="text-teal-600">legendary.</span>
              </h2>
              <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-[500px] font-medium mb-8 md:mb-12">
                Let's turn your vision into a digital masterpiece.
              </p>
              <div className="flex">
                <motion.a 
                  href="mailto:dipanshudaiya4@gmail.com" 
                  whileHover={{ y: -4, shadow: "0 20px 40px rgba(13,148,136,0.35)" }}
                  whileTap={{ scale: 0.96, backgroundColor: "#14b8a6" }}
                  className="relative group/btn w-full md:w-fit px-8 md:px-12 py-5 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl font-black text-[11px] md:text-[13px] uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap overflow-hidden transition-all duration-200 shadow-[0_10px_20px_rgba(13,148,136,0.2)] flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Start a Conversation</span>
                  <span className="relative z-10 text-lg md:text-xl group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  <div className="absolute inset-0 bg-teal-400 opacity-0 group-active:opacity-20 transition-opacity" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {/* Navigation Grid - Compact Bento Style */}
            <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex-grow bg-white dark:!bg-[#0a0a0a] border border-gray-100 dark:border-white/10 transition-all duration-200 hover:shadow-[0_20px_50px_rgba(13,148,136,0.1)] hover:-translate-y-1 group/master after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.1),_transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none">
              <div className="flex justify-center mb-6 md:mb-10">
                <div className="px-4 py-1.5 md:px-6 md:py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-3 md:gap-4">
                  <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-teal-500"></span>
                  </span>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-teal-600 dark:text-teal-400">Navigation</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
                {[
                  { name: 'Home', icon: '🏠' },
                  { name: 'About', icon: '👤' },
                  { name: 'Skills', icon: '⚡' },
                  { name: 'Projects', icon: '📁' },
                  { name: 'Contact', icon: '📧' }
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    href={`#${item.name.toLowerCase()}`} 
                    className="group/nav relative overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 transition-all duration-200 hover:-translate-y-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-teal-500 hover:shadow-[0_15px_30px_rgba(13,148,136,0.1)] active:scale-95"
                  >
                    <span className="text-xl md:text-2xl group-hover/nav:scale-110 transition-all duration-200">{item.icon}</span>
                    <span className="text-[9px] md:text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest group-hover/nav:text-teal-600 dark:group-hover/nav:text-teal-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Socials Bento - Compact */}
            <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 bg-white dark:!bg-[#0a0a0a] border border-gray-100 dark:border-white/10 transition-all duration-200 hover:shadow-[0_20px_50px_rgba(13,148,136,0.1)] hover:-translate-y-1 group after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.1),_transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none">
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="px-4 py-1.5 md:px-6 md:py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-3">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">Socials</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 md:gap-6 relative z-10">
                {[
                  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', href: 'https://github.com/Dipanshudaiya', label: 'GH' },
                  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', href: 'https://www.linkedin.com/in/dipanshu-daiya', label: 'LI' },
                  { icon: 'https://img.icons8.com/ios-filled/50/twitterx.png', href: 'https://x.com/dipanshudaiya96', label: 'TW' }
                ].map((social, i) => (
                  <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9, backgroundColor: "rgba(20, 184, 166, 0.1)" }} className="w-11 h-11 md:w-14 md:h-14 p-3 md:p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl md:rounded-2xl transition-all duration-200 flex items-center justify-center hover:border-teal-500">
                    <img src={social.icon} alt={social.label} className={`w-full h-full object-contain ${social.label === 'GH' || social.label === 'TW' ? 'dark:invert dark:brightness-200' : ''}`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Unified and Clean */}
        <div className="rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-10 py-4 md:py-6 flex flex-row justify-between items-center gap-4 bg-white dark:!bg-[#0a0a0a] border border-gray-100 dark:border-white/10 mt-4 md:mt-6 transition-all duration-200">
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
    </footer>
  );
}
