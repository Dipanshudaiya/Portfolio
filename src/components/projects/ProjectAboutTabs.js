'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectAboutTabs({ problem, solution, impact }) {
  const [activeTab, setActiveTab] = useState('problem');

  const tabs = [
    { id: 'problem', label: 'Problem', icon: '🚨', color: '#ef4444' },
    { id: 'solution', label: 'Solution', icon: '✅', color: '#10b981' },
    { id: 'impact', label: 'Impact', icon: '🌍', color: '#3b82f6' }
  ];

  const content = {
    problem: problem,
    solution: solution,
    impact: impact
  };

  return (
    <div className="w-full">
      {/* Tab Buttons - Mobile Style */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl mb-6 md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all duration-200 relative ${
              activeTab === tab.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="text-sm relative z-10">{tab.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-wider relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop Grid View / Mobile Tab Content */}
      <div className="hidden md:grid grid-cols-3 gap-10">
        {tabs.map((tab) => (
          <div key={tab.id}>
            <h3 className="flex items-center gap-3 font-bold mb-4" style={{ color: tab.color }}>
              <span>{tab.icon}</span> {tab.label}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              {content[tab.id]}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Content Display */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-teal-500/5 dark:bg-white/5 border border-teal-500/10 dark:border-white/10 p-6 rounded-[1.5rem]"
          >
            <h3 className="flex items-center gap-3 font-black text-sm uppercase tracking-widest mb-4" style={{ color: tabs.find(t => t.id === activeTab).color }}>
              <span>{tabs.find(t => t.id === activeTab).icon}</span> {tabs.find(t => t.id === activeTab).label}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[0.92rem]">
              {content[activeTab]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
