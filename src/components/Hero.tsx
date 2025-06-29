import { motion, Variants } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { getSectionData } from '@/lib/data';

const iconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Mail: Mail,
};

export default function Hero() {
  const heroData = getSectionData('hero');

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="flex items-center gap-12">
        <motion.div 
          className="flex-col gap-6 hidden md:flex"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
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
              >
                <IconComponent size={28} />
              </a>
            );
          })}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {heroData.greeting}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">
              {heroData.name}
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-8 h-8 text-xl md:text-2xl text-muted-foreground">
            <span>{heroData.title} </span>
            <TypeAnimation
              sequence={heroData.roles.flatMap(role => [role, 2000])}
              wrapper="span"
              speed={50}
              className="text-primary font-semibold"
              repeat={Infinity}
            />
             <span
              style={{ borderColor: 'hsl(var(--primary))' }}
              className="inline-block w-1 h-6 ml-1 border-r-2 animate-blink"
            />
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0"
          >
            {heroData.description}
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
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
            >
              {heroData.buttons.primary}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))", color: "hsl(var(--primary))" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-all duration-300 text-foreground dark:text-primary"
            >
              {heroData.buttons.secondary}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
