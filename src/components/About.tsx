import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { getSectionData } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';
import { Award, Briefcase, Code } from 'lucide-react';

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const aboutData = getSectionData('about');
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-muted/30" role="region" aria-label="About section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" id="about-title">
              {aboutData.title.split(' ')[0]} <span className="gradient-text">{aboutData.title.split(' ')[1]}</span>
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-[400px]" role="status" aria-live="polite">
            <Spinner size="lg" aria-label="Loading about section content" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted/30" role="region" aria-label="About section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            whileInView={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            id="about-title-loaded"
          >
            {aboutData.title.split(' ')[0]} <span className="gradient-text">{aboutData.title.split(' ')[1]}</span>
          </motion.h2>
          {/* Info Cards Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-6 items-center" role="list" aria-label="Experience highlights">
            <div className="flex items-center border border-primary/30 bg-transparent rounded-full px-4 py-2" role="listitem">
              <Award className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">3+ Years Working Experience</span>
            </div>
            <div className="flex items-center border border-primary/30 bg-transparent rounded-full px-4 py-2" role="listitem">
              <Briefcase className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">20+ Projects Completed</span>
            </div>
            <div className="flex items-center border border-primary/30 bg-transparent rounded-full px-4 py-2" role="listitem">
              <Code className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">15+ Technologies Skillset</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 mx-auto max-w-6xl">
          {/* About Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl w-full lg:h-72 lg:flex lg:items-center text-left"
            role="main"
            aria-label="About description"
          >
            <div className="space-y-6 w-full">
              {aboutData.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed" id={`about-content-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
          {/* Profile Photo */}
          <div className="flex flex-col items-center lg:items-end h-full justify-center" role="complementary" aria-label="Profile image">
            <div className="relative mb-8 lg:mb-0 flex items-center justify-center">
              {/* Animated Gradient Ring */}
              <div className="absolute inset-0 w-full h-full rounded-full border-8 border-transparent animate-spin-slow bg-gradient-to-tr from-primary via-secondary to-accent blur-2xl opacity-100" style={{ zIndex: 1 }} aria-hidden="true"></div>
              <div className="absolute inset-2 w-[88%] h-[88%] rounded-full border-2 border-primary/30 animate-glow" aria-hidden="true"></div>
              <img
                src="src/assets/project images/profile-pic.png"
                alt="Profile picture of Pavan Vanjre Ravindranath"
                className="relative w-56 h-56 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full border-4 c shadow-2xl object-cover object-center aspect-square bg-background hover:scale-105 transition-transform duration-300"
                style={{ zIndex: 2 }}
                id="about-profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
