'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { projectsData } from '../../data/projectsData';
import { PageLoader } from '../ui/PageLoader';

export default function Projects() {
  const router = useRouter();
  const [loadingProject, setLoadingProject] = useState(null);

  const handleProjectClick = (e, project) => {
    e.preventDefault();
    setLoadingProject(project);
  };

  const handleLoadingComplete = () => {
    if (loadingProject) {
      router.push(`/projects/${loadingProject.id}`);
    }
  };

  return (
    <section id="projects" className="py-[100px] w-full bg-transparent">
      <AnimatePresence>
        {loadingProject && (
          <PageLoader 
            isVisible={true} 
            projectName={loadingProject.title} 
            onComplete={handleLoadingComplete} 
          />
        )}
      </AnimatePresence>

      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="px-6 py-2 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full shadow-sm flex items-center gap-4 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-600 dark:text-teal-400">Portfolio</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tighter text-gray-900 dark:text-white">
            Selected Works
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative glass-card rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_30px_60px_rgba(13,148,136,0.15)]"
            >
              {/* Project Image */}
              <div className="relative h-56 w-full overflow-hidden cursor-pointer bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5" onClick={(e) => handleProjectClick(e, project)}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Title & Icon Row */}
                <div className="flex items-center gap-3 mb-3 cursor-center" onClick={(e) => handleProjectClick(e, project)}>
                  <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-[14px] shadow-sm border border-teal-100 dark:border-teal-500/20 group-hover:scale-110 transition-transform">
                    {project.featureTags?.[0]?.icon || '🚀'}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {project.shortDescription || project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400 border border-teal-100 dark:border-teal-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Centered Button */}
                <div className="mt-auto flex justify-center">
                  <button
                    onClick={(e) => handleProjectClick(e, project)}
                    style={{ 
                      background: `linear-gradient(135deg, ${project.themeColorDark}, color-mix(in srgb, ${project.themeColorDark}, black 15%))`,
                      boxShadow: `0 12px 24px -10px color-mix(in srgb, ${project.themeColorDark}, transparent 40%)`
                    }}
                    className="px-8 py-3 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                  >
                    View Details <span className="text-lg leading-none">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
