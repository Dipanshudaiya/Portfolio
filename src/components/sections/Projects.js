'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { projectsData } from '../../data/projectsData';
import PageLoader from '../ui/PageLoader';

export default function Projects() {
  const router = useRouter();
  const [loadingProject, setLoadingProject] = useState(null);

  const handleProjectClick = (e, project) => {
    e.preventDefault();
    setLoadingProject(project);
    // Start navigation immediately to overlap with loader animation
    router.push(`/projects/${project.id}`);
  };

  const handleLoadingComplete = () => {
    // Animation finished
  };

  const renderProjectCard = (project, index, isMobile = false) => (
    <motion.div
      key={project.id}
      initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative glass-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_30px_60px_rgba(13,148,136,0.15)] 
        ${isMobile && index === 4 ? 'col-span-2' : ''}
      `}
    >
      {/* Project Image */}
      <div className="relative h-44 md:h-56 w-full overflow-hidden cursor-pointer bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5" onClick={(e) => handleProjectClick(e, project)}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      {/* Project Content */}
      <div className="p-4 md:p-8 flex flex-col flex-grow">
        {/* Title & Icon Row */}
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 cursor-center" onClick={(e) => handleProjectClick(e, project)}>
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-[10px] md:text-[14px] shadow-sm border border-teal-100 dark:border-teal-500/20 group-hover:scale-110 transition-transform">
            {project.featureTags?.[0]?.icon || '🚀'}
          </div>
          <h3 className="text-sm md:text-xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed font-medium">
          {project.shortDescription || project.description}
        </p>

        {/* Tech Stack Tags (Hidden on mobile grid for cleaner look) */}
        <div className="hidden md:flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400 border border-teal-100 dark:border-teal-500/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-auto flex justify-center">
          <button
            onClick={(e) => handleProjectClick(e, project)}
            style={{ 
              background: `linear-gradient(135deg, ${project.themeColorDark}, color-mix(in srgb, ${project.themeColorDark}, black 15%))`,
              boxShadow: `0 8px 16px -8px color-mix(in srgb, ${project.themeColorDark}, transparent 40%)`
            }}
            className="w-full md:w-fit px-4 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl text-white font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="hidden md:inline">Details</span>
            <span className="md:hidden">View</span>
            <span className="text-sm md:text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-12 md:py-16 w-full bg-transparent overflow-hidden">
      <AnimatePresence>
        {loadingProject && (
          <PageLoader 
            isVisible={true} 
            projectName={loadingProject.title} 
            onComplete={handleLoadingComplete} 
          />
        )}
      </AnimatePresence>

      <div className="container px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <div className="px-4 py-1.5 md:px-6 md:py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-3 md:gap-4 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-teal-600 dark:text-teal-400">Portfolio</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter text-gray-900 dark:text-white">
            Selected Works
          </h2>
        </div>

        {/* Mobile Swipe Hint */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex md:hidden items-center justify-center gap-3 mb-8"
        >
          <div className="px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full flex items-center gap-3 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Swipe projects</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-teal-500"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Project Grid: Responsive System */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-x-visible pb-10 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {projectsData.map((project, index) => (
            <div key={project.id} className="min-w-[85vw] md:min-w-0 snap-center md:contents">
              <div className="md:hidden contents">
                 {renderProjectCard(project, index, true)}
              </div>
              <div className="hidden md:contents">
                 {renderProjectCard(project, index, false)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
