import { motion, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Briefcase, Code } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { getSectionData } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';

const iconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Mail: Mail,
};

export default function Hero() {
  const heroData = getSectionData('hero');
  const aboutData = getSectionData('about');
  const isMobile = useIsMobile();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Mobile and Tablet layout (original)
  if (isMobile) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4" role="banner" aria-label="Hero section">
        <div className="flex items-center gap-12">
          <motion.div 
            className="flex-col gap-6 hidden md:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            role="navigation"
            aria-label="Social media links"
          >
            {heroData.socialLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={`Visit ${link.icon} profile`}
                  id={`social-link-${link.icon.toLowerCase()}`}
                >
                  <IconComponent size={28} aria-hidden="true" />
                </a>
              );
            })}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
            role="main"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium" role="status" aria-live="polite">
                {heroData.greeting}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              id="hero-name"
            >
              <span className="gradient-text">
                {heroData.name}
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-8 h-8 text-xl md:text-2xl text-muted-foreground" role="status" aria-live="polite">
              <span>{heroData.title} </span>
              <TypeAnimation
                sequence={heroData.roles.flatMap(role => [role, 2000])}
                wrapper="span"
                speed={50}
                className="text-primary font-semibold"
                repeat={Infinity}
                aria-label="Typing animation showing different roles"
              />
               <span
                style={{ borderColor: 'hsl(var(--primary))' }}
                className="inline-block w-1 h-6 ml-1 border-r-2 animate-blink"
                aria-hidden="true"
              />
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0"
              id="hero-description"
            >
              {heroData.description}
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              role="group"
              aria-label="Action buttons"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                id="contact-button"
                aria-label={`${heroData.buttons.primary} - navigate to contact section`}
              >
                {heroData.buttons.primary}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))", color: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-all duration-300 text-foreground dark:text-primary"
                id="resume-button"
                aria-label={heroData.buttons.secondary}
              >
                {heroData.buttons.secondary}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop/Tablet layout (combined Hero + About)
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4" role="banner" aria-label="Hero section">
      <div className="container mx-auto ">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left mb-12"
          role="main"
        >
          {/* Line 1: Hand icon and welcome message - left aligned */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium" role="status" aria-live="polite">
              {heroData.greeting}
            </span>
          </motion.div>

          {/* Line 2: Full name in one whole line - reduced size */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            id="hero-name-desktop"
          >
            <span className="gradient-text">
              {heroData.name}
            </span>
          </motion.h1>

          {/* Line 3: Hi, I'm a + typing animation - left aligned */}
          <motion.div variants={itemVariants} className="mb-12 h-8 text-xl md:text-2xl text-muted-foreground" role="status" aria-live="polite">
            <span>{heroData.title} </span>
            <TypeAnimation
              sequence={heroData.roles.flatMap(role => [role, 2000])}
              wrapper="span"
              speed={50}
              className="text-primary font-semibold"
              repeat={Infinity}
              aria-label="Typing animation showing different roles"
            />
             <span
              style={{ borderColor: 'hsl(var(--primary))' }}
              className="inline-block w-1 h-6 ml-1 border-r-2 animate-blink"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* Two columns layout - changed from grid to flex */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column - increased width */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8 flex-1 lg:flex-[3]"
            role="region"
            aria-label="About information"
          >
            {/* Experience chips - all in one line */}
            <div className="flex flex-wrap gap-3" role="list" aria-label="Experience highlights">
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

            {/* About content */}
            <div className="space-y-6" role="region" aria-label="About description">
              {aboutData.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed text-left" id={`about-paragraph-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* View Resume Button - moved to left column */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{ 
                backgroundColor: '#3b82f6', 
                color: '#ffffff',
                border: 'none'
              }}
              id="view-resume-button"
              aria-label="View resume"
            >
              View Resume
            </motion.button>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col items-center space-y-8 flex-1 lg:flex-[2]"
            role="complementary"
            aria-label="Profile image and social links"
          >
            {/* Profile Image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full rounded-full border-8 border-transparent animate-spin-slow bg-gradient-to-tr from-primary via-secondary to-accent blur-2xl opacity-100" style={{ zIndex: 1 }} aria-hidden="true"></div>
              <div className="absolute inset-2 w-[88%] h-[88%] rounded-full border-2 border-primary/30 animate-glow" aria-hidden="true"></div>
              <img
                src="src/assets/project images/profile-pic.png"
                alt="Profile picture of Pavan Vanjre Ravindranath"
                className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full border-4 shadow-2xl object-cover object-center aspect-square bg-background hover:scale-105 transition-transform duration-300"
                style={{ zIndex: 2 }}
                id="profile-image"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-6" role="navigation" aria-label="Social media links">
              {heroData.socialLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon as keyof typeof iconMap];
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Visit ${link.icon} profile`}
                    id={`desktop-social-link-${link.icon.toLowerCase()}`}
                  >
                    <IconComponent size={40} className="text-primary/80 hover:text-primary" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
