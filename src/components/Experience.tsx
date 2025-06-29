import { motion } from 'framer-motion';
import { Building, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { getSectionData } from '@/lib/data';

export default function Experience() {
  const [isLoading, setIsLoading] = useState(true);
  const experienceData = getSectionData('experience');

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden" id="experience" role="region" aria-label="Experience section">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6" id="experience-title">
              <span className="gradient-text">{experienceData.title}</span>
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-[400px]" role="status" aria-live="polite">
            <Spinner size="lg" aria-label="Loading experience section content" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden" id="experience" role="region" aria-label="Experience section">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-accent/40 rounded-full blur-md animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6" id="experience-title-loaded">
            <span className="gradient-text">{experienceData.title}</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block" role="main" aria-label="Work experience timeline">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"
              animate={{
                boxShadow: [
                  "0 0 5px hsl(var(--primary))",
                  "0 0 20px hsl(var(--primary))",
                  "0 0 5px hsl(var(--primary))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
            
            {experienceData.items.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`mb-16 flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                role="article"
                aria-labelledby={`exp-title-${index}`}
                id={`experience-item-${index}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                    }}
                    className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium" id={`exp-year-${index}`}>
                        {exp.year}
                      </span>
                      <span className="text-sm text-muted-foreground" id={`exp-period-${index}`}>{exp.period}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 gradient-text" id={`exp-title-${index}`}>{exp.title}</h3>
                    <div className="flex items-center text-muted-foreground font-medium mb-3">
                      <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span id={`exp-company-${index}`}>{exp.company}</span>
                    </div>
                    
                    <ul className="space-y-2 mb-4" role="list" aria-label="Job responsibilities">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-muted-foreground text-sm leading-relaxed flex items-start" role="listitem">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-medium border border-primary/30"
                          role="listitem"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                    aria-hidden="true"
                  />
                </div>

                {/* Empty space for alignment */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6" role="main" aria-label="Work experience list">
            {experienceData.items.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-lg"
                role="article"
                aria-labelledby={`mobile-exp-title-${index}`}
                id={`mobile-experience-item-${index}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium" id={`mobile-exp-year-${index}`}>
                    {exp.year}
                  </span>
                  <span className="text-sm text-muted-foreground" id={`mobile-exp-period-${index}`}>{exp.period}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 gradient-text" id={`mobile-exp-title-${index}`}>{exp.title}</h3>
                <div className="flex items-center text-muted-foreground font-medium mb-3">
                  <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span id={`mobile-exp-company-${index}`}>{exp.company}</span>
                </div>
                
                <ul className="space-y-2 mb-4" role="list" aria-label="Job responsibilities">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-muted-foreground text-sm leading-relaxed flex items-start" role="listitem">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></span>
                      {desc}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-medium border border-primary/30"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
