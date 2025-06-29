import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getSectionData } from '@/lib/data';
import { useState } from 'react';

// Reusable GitHub Button Component
const GitHubButton = ({ href, className = "" }: { href: string; className?: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center space-x-2 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group/btn ${className}`}
    aria-label="View project on GitHub"
  >
    <Github className="w-4 h-4 text-primary group-hover/btn:text-primary/80" aria-hidden="true" />
    <span className="text-primary text-sm font-medium">View on GitHub</span>
  </motion.a>
);

export default function Projects() {
  const projectsData = getSectionData('projects');
  const [expandedTech, setExpandedTech] = useState<Set<number>>(new Set());

  const toggleTechExpansion = (index: number) => {
    setExpandedTech(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!projectsData) {
    return (
      <section className="py-20" id="projects" role="region" aria-label="Projects section">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Projects</h2>
            <p className="text-xl text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30" id="projects" role="region" aria-label="Projects section">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" id="projects-title">
            {projectsData.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{projectsData.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" id="projects-subtitle">
            {projectsData.subtitle}
          </p>
        </motion.div>
      </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={5}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 16 },
            768: { slidesPerView: 2.1, spaceBetween: 24 },
            1024: { slidesPerView: 2.8, spaceBetween: 32 },
            1440: { slidesPerView: 4.1, spaceBetween: 40 },
          }}
          className="!overflow-visible projects-swiper"
          style={{ paddingLeft: 0, paddingRight: 0 }}
          role="region"
          aria-label="Projects carousel"
        >
          {projectsData.items.map((project, index) => {
            const showAllTech = expandedTech.has(index);
            const techToShow = showAllTech ? project.tech : project.tech.slice(0, 6);
            const hasMoreTech = project.tech.length > 6;

            return (
              <SwiperSlide key={project.title} className="flex justify-center" role="group" aria-label={`Project: ${project.title}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                  }}
                  className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group min-w-[300px] max-w-xs sm:min-w-[360px] sm:max-w-sm h-[520px] flex flex-col"
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`project-title-${index}`}
                  id={`project-card-${index}`}
                >
                  <div className="aspect-video bg-muted overflow-hidden flex-shrink-0">
                    <picture>
                      <source srcSet={project.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title} project`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        onError={(e) => {
                          const target = e.currentTarget;
                          // First try PNG fallback if WebP fails
                          if (target.src.includes('.webp')) {
                            target.src = target.src.replace('.webp', '.png');
                          } else if (target.src.includes('.png')) {
                            // If PNG also fails, show placeholder
                            target.src = "/placeholder.svg";
                          } else {
                            // Final fallback to placeholder
                            target.src = "/placeholder.svg";
                          }
                          target.onerror = null; // Prevent infinite loop
                        }}
                      />
                    </picture>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1" id={`project-title-${index}`}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-2 text-sm leading-relaxed line-clamp-3 flex-1" id={`project-description-${index}`}>
                      {project.description}
                    </p>
                    <div className="mb-4 flex-shrink-0">
                      <div className="flex flex-wrap gap-1 mb-2" role="list" aria-label="Technologies used">
                        {techToShow.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            role="listitem"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {hasMoreTech && (
                        <button
                          onClick={() => toggleTechExpansion(index)}
                          className="text-primary text-xs hover:text-primary/80 transition-colors flex items-center gap-1"
                          aria-expanded={showAllTech}
                          aria-controls={`tech-list-${index}`}
                          aria-label={showAllTech ? "Show fewer technologies" : `Show ${project.tech.length - 6} more technologies`}
                        >
                          {showAllTech ? (
                            <>
                              <ChevronUp className="w-3 h-3" aria-hidden="true" />
                              Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" aria-hidden="true" />
                              Show more ({project.tech.length - 6} more)
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between flex-shrink-0" role="group" aria-label="Project links">
                      {project.live && project.github ? (
                        // Both live and GitHub exist - corners
                        <>
                          <GitHubButton href={project.github} />
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group/btn"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink className="w-4 h-4 text-primary group-hover/btn:text-primary/80" aria-hidden="true" />
                            <span className="text-primary text-sm font-medium">Live</span>
                          </motion.a>
                        </>
                      ) : project.github ? (
                        // Only GitHub exists - center it
                        <div className="flex justify-center w-full">
                          <GitHubButton href={project.github} />
                        </div>
                      ) : project.live ? (
                        // Only live link exists - center it
                        <div className="flex justify-center w-full">
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group/btn"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink className="w-4 h-4 text-primary group-hover/btn:text-primary/80" aria-hidden="true" />
                            <span className="text-primary text-sm font-medium">Live</span>
                          </motion.a>
                        </div>
                      ) : (
                        // No links exist - display nothing
                        <div></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

    </section>
  );
}

/* Add this to your global CSS (e.g., index.css) if you don't have the Tailwind scrollbar plugin: */
/*
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/


// project json Sampler 
// [ {
//   "title": "Weather Dashboard",
//   "description": "Responsive weather dashboard with beautiful data visualizations.",
//   "tech": ["React", "TypeScript", "Chart.js", "OpenWeather API"],
//   "image": "/placeholder.svg",
//   "github": "#",
//   "live": null
// },
// {
//   "title": "Social Media Analytics",
//   "description": "Data analysis tool with interactive charts and automated reporting.",
//   "tech": ["Python", "Django", "React", "D3.js"],
//   "image": "/placeholder.svg",
//   "github": "#",
//   "live": null
// },
// {
//   "title": "E-Commerce Platform",
//   "description": "A full-stack e-commerce solution with React, Node.js, and PostgreSQL.",
//   "tech": ["React", "Node.js", "PostgreSQL", "Stripe"],
//   "image": "/placeholder.svg",
//   "github": "https://github.com/PavanVanjre",
//   "live": null
// },
// {
//   "title": "Portfolio Website",
//   "description": "Personal portfolio with 3D animations and modern design.",
//   "tech": ["React", "Three.js", "Framer Motion", "Tailwind"],
//   "image": "/placeholder.svg",
//   "github": "#",
//   "live": null
// },
// {
//   "title": "Chat Application",
//   "description": "Real-time chat app with voice/video calling capabilities.",
//   "tech": ["React", "WebRTC", "Socket.io", "Express"],
//   "image": "/placeholder.svg",
//   "github": "#",
//   "live": null
// }]