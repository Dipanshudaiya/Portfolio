'use client';
import { useState } from 'react';

export default function AboutProjectTabs({ project, styles }) {
  const [activeTab, setActiveTab] = useState('problem');

  const tabs = [
    { id: 'problem', label: 'Problem', icon: '🚨', color: '#ef4444', text: project.problem },
    { id: 'solution', label: 'Solution', icon: '✅', color: '#10b981', text: project.solution },
    { id: 'impact', label: 'Impact', icon: '🌍', color: '#3b82f6', text: project.realWorldImpact }
  ];

  const activeContent = tabs.find(t => t.id === activeTab);

  return (
    <div className="flex flex-col gap-6 w-full -mt-2">
      {/* Tabs Header - Fit inside box */ }
      <div className="flex w-full bg-gray-100 dark:bg-[#121212] rounded-xl p-1 shadow-inner border border-gray-200 dark:border-white/5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-1 text-center text-[11px] xs:text-xs font-bold rounded-lg transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-[#222222] shadow-sm text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className={styles.aboutCard}>
        <h3 className={styles.cardTitle} style={{ color: activeContent.color }}>
          <span className={styles.cardIcon}>{activeContent.icon}</span> {activeContent.label}
        </h3>
        <p className={styles.cardText}>{activeContent.text}</p>
      </div>
    </div>
  );
}
