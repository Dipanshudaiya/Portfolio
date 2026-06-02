import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '../../../data/projectsData';
import ProjectGallery from '../../../components/projects/ProjectGallery';
import HeroImageSlider from '../../../components/hero/HeroImageSlider';
import ThemeToggle from '../../../components/layout/ThemeToggle';
import AboutProjectTabs from '../../../components/projects/AboutProjectTabs';
import styles from './ProjectDetails.module.css';

const PROJECT_ICONS = {
  'tailor-shop':    '✂️',
  'task-management':'📋',
  'e-commerce':     '🛒',
};

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  if (projectIndex === -1) notFound();

  const project = projectsData[projectIndex];
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;
  const icon = PROJECT_ICONS[project.id] || '💼';

  return (
    <main className={styles.main} style={{
      '--theme-color-dark': project.themeColorDark,
      '--theme-color-light': project.themeColorLight,
    }}>
      <div className="container">

        {/* Navigation */}
        <nav className={styles.navigation}>
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`} className={styles.navLink}>
              ← <span className={styles.navText}>Prev</span>
            </Link>
          ) : (
            <Link href="/#projects" className={styles.navLink}>
              ← <span className={styles.navText}>Back</span>
            </Link>
          )}

          <div className="theme-toggle-wrapper">
            <ThemeToggle />
          </div>

          {nextProject ? (
            <Link href={`/projects/${nextProject.id}`} className={styles.navLinkRight}>
              <span className={styles.navText}>Next</span> →
            </Link>
          ) : (
            <Link href="/#projects" className={styles.navLinkRight}>
              <span className={styles.navText}>Home</span> →
            </Link>
          )}
        </nav>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroLeft}>
            {project.featured && (
              <div className={styles.featuredBadge}>
                <span className={styles.starIcon}>★</span> FEATURED PROJECT
              </div>
            )}
            <h1 className={styles.title}>
              {project.title} <span className={styles.titleIcon}>{icon}</span>
            </h1>
            <p className={styles.shortDescription}>{project.shortDescription}</p>
            <div className={styles.featureTags}>
              {project.featureTags.map((tag, i) => (
                <div key={i} className={styles.featureTag}>
                  <span className={styles.tagIcon} style={{ color: tag.color }}>{tag.icon}</span>
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroRight}>
            <HeroImageSlider images={project.gallery} alt={project.title} />
          </div>
        </section>

        {/* About The Project */}
        <section className={styles.aboutSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📄</span>
            <h2 className={styles.sectionTitle}>About The Project</h2>
          </div>
          <div className="hidden md:block">
            <div className={styles.aboutGrid}>
              <div className={styles.aboutCard}>
                <h3 className={styles.cardTitle} style={{ color: '#ef4444' }}>
                  <span className={styles.cardIcon}>🚨</span> Problem
                </h3>
                <p className={styles.cardText}>{project.problem}</p>
              </div>
              <div className={styles.aboutCard}>
                <h3 className={styles.cardTitle} style={{ color: '#10b981' }}>
                  <span className={styles.cardIcon}>✅</span> Solution
                </h3>
                <p className={styles.cardText}>{project.solution}</p>
              </div>
              <div className={styles.aboutCard}>
                <h3 className={styles.cardTitle} style={{ color: '#3b82f6' }}>
                  <span className={styles.cardIcon}>🌍</span> Real World Impact
                </h3>
                <p className={styles.cardText}>{project.realWorldImpact}</p>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <AboutProjectTabs project={project} styles={styles} />
          </div>
        </section>

        {/* Features & Tech Stack */}
        <div className={styles.featuresTechGrid}>
          <section className={styles.featuresSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>⭐</span>
              <h2 className={styles.sectionTitle}>Key Features</h2>
            </div>
            <ul className={styles.featuresList}>
              {project.keyFeatures.map((feature, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.techStackSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>&lt;/&gt;</span>
              <h2 className={styles.sectionTitle}>Tech Stack</h2>
            </div>
            <div className={styles.techGrid}>
              {project.techStackDetails.map((tech, i) => (
                <div key={i} className={styles.techCard}>
                  <img src={tech.icon} alt={tech.name} className={styles.techIcon} />
                  <div className={styles.techInfo}>
                    <h4 className={styles.techName}>{tech.name}</h4>
                    <p className={styles.techRole}>{tech.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Project Screenshots */}
        <section className={styles.screenshotsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🖼️</span>
            <h2 className={styles.sectionTitle}>Project Screenshots</h2>
          </div>
          <ProjectGallery gallery={project.gallery} />
        </section>

        {/* Action Footer */}
        <section className={styles.actionFooter}>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.actionCard}>
            <span className={styles.actionIcon}>↗️</span>
            <div className={styles.actionInfo}>
              <h3 className={styles.actionTitle}>Live Demo</h3>
              <p className={styles.actionSubtitle}>View Live Project</p>
            </div>
          </a>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.actionCard}>
            <span className={styles.actionIcon}>💻</span>
            <div className={styles.actionInfo}>
              <h3 className={styles.actionTitle}>GitHub Repository</h3>
              <p className={styles.actionSubtitle}>View Source Code</p>
            </div>
          </a>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.actionCardResume}>
            <span className={styles.actionIcon}>📥</span>
            <div className={styles.actionInfo}>
              <h3 className={styles.actionTitle}>Download Resume</h3>
              <p className={styles.actionSubtitle}>Dipanshu_Daiya_Resume.pdf</p>
            </div>
          </a>
        </section>

        {/* Footer note */}
        <div className={styles.footerNote}>
          <p>💡 This project is built with passion and best practices <span style={{ color: 'var(--theme-color)' }}>💜</span></p>
        </div>

      </div>

      {/* Sticky Mobile Bar */}
      <div className={styles.stickyMobileBar}>
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${styles.stickyBtn} ${styles.stickyBtnPrimary}`}>
          ↗️ Live Demo
        </a>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${styles.stickyBtn} ${styles.stickyBtnSecondary}`}>
          💻 GitHub
        </a>
      </div>
    </main>
  );
}
