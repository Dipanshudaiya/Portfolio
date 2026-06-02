'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PageLoader } from '../ui/PageLoader';

export default function Contact() {
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        
        const formData = new FormData(e.target);
        formData.append("access_key", "b87d5275-d058-47f1-b39e-c69344f677ec");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setFormStatus('success');
                e.target.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                console.error("Error submitting form", data);
                setFormStatus('idle');
            }
        } catch (error) {
            console.error("Form submission error", error);
            setFormStatus('idle');
        }
    };

    return (
        <section id="contact" className="bg-transparent py-[60px] md:py-[100px] w-full overflow-hidden">
            <div className="container">
                <div className="flex flex-col items-center gap-4 mb-10 md:mb-16 text-center">
                    <div className="px-6 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-4 mb-4 md:mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-600 dark:text-teal-400">Contact</span>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                    </div>
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
                        Let's Start a <span className="text-teal-600">Conversation.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 md:gap-12 items-start">
                    {/* Left Column: Contact Cards in Bento Grid for Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                        {[
                            { 
                                label: 'Email', 
                                value: 'dipanshudaiya4@gmail.com', 
                                icon: (
                                    <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                ), 
                                gradient: 'from-cyan-400 to-teal-600', 
                                shadow: 'shadow-teal-500/30',
                                fullWidth: false
                            },
                            { 
                                label: 'Phone', 
                                value: '+91 6378409862', 
                                icon: (
                                    <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                ), 
                                gradient: 'from-pink-400 to-rose-600', 
                                shadow: 'shadow-pink-500/30',
                                fullWidth: false
                            },
                            { 
                                label: 'Location', 
                                value: 'Bikaner, Rajasthan, India', 
                                icon: (
                                    <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ), 
                                gradient: 'from-emerald-400 to-teal-600', 
                                shadow: 'shadow-emerald-500/30',
                                fullWidth: false
                            },
                            { 
                                label: 'Status', 
                                value: 'Open for Freelance', 
                                icon: (
                                    <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ), 
                                gradient: 'from-green-400 to-emerald-600', 
                                shadow: 'shadow-green-500/30',
                                fullWidth: false
                            },
                        ].map((item, idx) => (
                            <div 
                                key={item.label} 
                                className="group relative overflow-hidden p-[2px] rounded-[2rem] md:rounded-[2.5rem] shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] cursor-pointer col-span-1"
                            >
                                {/* Spinning border layer */}
                                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,rgba(13,148,136,0.8)_100%)] animate-[spin_4s_linear_infinite] opacity-100 transition-opacity duration-200" />
                                
                                <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 p-5 md:p-6 rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-1px)] bg-white dark:!bg-[#0a0a0a] border border-transparent transition-colors duration-200 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.15),_transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none">
                                    <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} ${item.shadow} text-white shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-200`}>
                                        {item.icon}
                                    </div>
                                    <div className="relative z-10 text-center md:text-left">
                                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                        <p className="text-xs md:text-lg font-black text-gray-900 dark:text-white tracking-tight break-all">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="relative bg-white dark:!bg-[#0a0a0a] hover:shadow-[0_0_50px_rgba(13,148,136,0.15)] hover:border-teal-300 dark:hover:border-teal-500/30 transition-all duration-200 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 overflow-hidden">
                        <AnimatePresence mode="wait">
                            {formStatus === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center text-center py-10"
                                >
                                    <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-2xl shadow-green-500/20">✓</div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-4">Message Sent!</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Thank you for reaching out. <br/> I'll get back to you shortly.</p>
                                </motion.div>
                            ) : (
                                <form className="relative z-10 space-y-6 md:space-y-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                        <div className="space-y-2 md:space-y-3 group/input">
                                            <label className="text-[10px] md:text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] group-focus-within/input:text-teal-600 transition-colors">Your Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                name="name"
                                                placeholder="Enter your name"
                                                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2 md:space-y-3 group/input">
                                            <label className="text-[10px] md:text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] group-focus-within/input:text-teal-600 transition-colors">Your Email</label>
                                            <input 
                                                required
                                                type="email" 
                                                name="email"
                                                placeholder="example@mail.com"
                                                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 md:space-y-3 group/input pt-2 md:pt-4">
                                        <label className="text-[10px] md:text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] group-focus-within/input:text-teal-600 transition-colors">Your Message</label>
                                        <textarea 
                                            required
                                            name="message"
                                            rows="3"
                                            placeholder="Tell me about your project or just say hi..."
                                            className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none resize-none"
                                        />
                                    </div>
                                    
                                    <div className="pt-4 md:pt-6">
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full py-5 md:py-6 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(13,148,136,0.3)] transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4 group/btn"
                                        >
                                            {formStatus === 'sending' ? (
                                                <>
                                                    SENDING...
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                </>
                                            ) : (
                                                <>
                                                    SEND MESSAGE 
                                                    <span className="text-lg md:text-xl group-hover/btn:translate-x-2 transition-transform duration-300">🚀</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
  );
}
