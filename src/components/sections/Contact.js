'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sendStatus, setSendStatus] = useState('idle'); // idle | sending | sent
  const [ripple, setRipple] = useState(null);
  const btnRef = useRef(null);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Trigger ripple
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setRipple({ x: rect.width / 2, y: rect.height / 2 });
      setTimeout(() => setRipple(null), 700);
    }

    setSendStatus('sending');
    
    // Simulate send (fallback: open mailto)
    setTimeout(() => {
      window.location.href = `mailto:dipanshudaiya4@gmail.com?subject=Message from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
      setSendStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSendStatus('idle'), 4000);
    }, 1500);
  };

  const CONTACT_INFO = [
    { 
      label: 'EMAIL', 
      value: 'dipanshudaiya4@gmail.com', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      color: 'from-blue-600 to-indigo-700',
      href: 'mailto:dipanshudaiya4@gmail.com'
    },
    { 
      label: 'PHONE', 
      value: '+91 6378409862', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ), 
      color: 'from-pink-600 to-rose-700',
      href: 'tel:+916378409862'
    },
    { 
      label: 'LOCATION', 
      value: 'Jodhpur, India', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      color: 'from-emerald-600 to-teal-700',
      href: 'https://maps.google.com/?q=Jodhpur'
    },
    { 
      label: 'STATUS', 
      value: 'Open for Freelance', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'from-green-600 to-emerald-700',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-[40px] md:py-[60px] relative overflow-hidden bg-transparent antialiased">
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
          animation: border-flow-teal 8s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}} />

      <div className="container relative z-10">
        
        {/* Section Header with Badge */}
        <div className="flex flex-col items-center mb-8 md:mb-16 text-center px-4">
          <div className="px-6 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-4 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-600 dark:text-teal-400">Connect</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
            Let's Start a <br className="md:hidden"/> <span className="text-teal-500">Conversation.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 md:gap-10 items-stretch">
          
          {/* Left: Contact Info Cards - 2x2 Grid on Mobile */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3 md:gap-5 px-4 md:px-0">
            {CONTACT_INFO.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.label === 'LOCATION' ? '_blank' : '_self'}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group rounded-[1.2rem] md:rounded-[2rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] tap-highlight-transparent flex flex-col"
              >
                <div className="laser-border-container">
                  <div className="rotating-gradient" />
                </div>

                <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(1.2rem-1px)] md:rounded-[calc(2rem-1px)] p-4 md:p-6 lg:p-7 flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-5 text-center md:text-left">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300 relative overflow-hidden flex-shrink-0`}>
                    <span className="relative z-10">{item.icon}</span>
                  </div>
                  
                  <div className="flex flex-col overflow-hidden w-full">
                    <span className="text-[7px] md:text-[9px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 opacity-80">
                      {item.label}
                    </span>
                    <span className="text-[10px] md:text-base font-black text-gray-900 dark:text-white tracking-tight leading-tight truncate">
                      {item.value}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right: Modern Message Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group rounded-[2rem] md:rounded-[2.8rem] bg-gray-200 dark:bg-white/10 overflow-hidden p-[1px] tap-highlight-transparent h-full mx-4 md:mx-0"
          >
             <div className="laser-border-container">
               <div className="rotating-gradient" style={{ animationDuration: '6s' }} />
             </div>

             <div className="relative z-20 h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[calc(2rem-1px)] md:rounded-[calc(2.8rem-1px)] p-6 md:p-10 lg:p-12">
                <div className="mb-6 md:mb-8">
                  <h3 className="text-xl md:text-3xl font-black tracking-tighter text-gray-900 dark:text-white mb-2">
                    Send a Message
                  </h3>
                  <p className="text-xs md:text-base text-gray-500 dark:text-gray-400 font-medium">
                    I'll get back to you as soon as possible.
                  </p>
                </div>

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 ml-1">Full Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 outline-none focus:border-teal-500/50 transition-all font-medium text-xs md:text-base"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 ml-1">Email Address</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 outline-none focus:border-teal-500/50 transition-all font-medium text-xs md:text-base"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 ml-1">Your Message</label>
                    <textarea 
                      rows="3"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      required
                      className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl md:rounded-[1.5rem] px-4 py-4 md:py-5 outline-none focus:border-teal-500/50 transition-all font-medium text-xs md:text-base resize-none"
                    ></textarea>
                  </div>

                  {/* Animated Send Button */}
                  <motion.button
                    ref={btnRef}
                    type="submit"
                    disabled={sendStatus !== 'idle'}
                    whileHover={sendStatus === 'idle' ? { y: -3, boxShadow: '0 20px 40px rgba(13,148,136,0.35)' } : {}}
                    whileTap={sendStatus === 'idle' ? { scale: 0.97 } : {}}
                    className={`relative w-full py-4 md:py-5 rounded-xl md:rounded-[1.2rem] font-black text-[10px] md:text-[12px] uppercase tracking-[0.3em] shadow-lg transition-all overflow-hidden text-white
                      ${sendStatus === 'sent' 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-teal-600 to-teal-700'}`}
                  >
                    {/* Ripple Effect */}
                    <AnimatePresence>
                      {ripple && (
                        <motion.span
                          key="ripple"
                          className="absolute rounded-full bg-white/30 pointer-events-none"
                          style={{ left: ripple.x, top: ripple.y, translateX: '-50%', translateY: '-50%' }}
                          initial={{ width: 0, height: 0, opacity: 0.6 }}
                          animate={{ width: 400, height: 400, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Button Content */}
                    <AnimatePresence mode="wait">
                      {sendStatus === 'idle' && (
                        <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </motion.span>
                      )}
                      {sendStatus === 'sending' && (
                        <motion.span key="sending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </motion.span>
                      )}
                      {sendStatus === 'sent' && (
                        <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {/* Desktop: full text, Mobile: short text */}
                          <span className="hidden md:inline">Sent Successfully</span>
                          <span className="md:hidden">Sent</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>

             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
