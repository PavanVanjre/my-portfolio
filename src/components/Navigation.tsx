import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, User, Briefcase, Star, FolderGit2, Send, X, LayoutGrid, Award, GraduationCap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { name: 'Home', href: '#home', icon: <Home size={24} /> },
  { name: 'About', href: '#about', icon: <User size={24} /> },
  { name: 'Skills', href: '#skills', icon: <Star size={24} /> },
  { name: 'Experience', href: '#experience', icon: <Briefcase size={24} /> },
  { name: 'Education', href: '#education', icon: <GraduationCap size={24} /> },
  { name: 'Certifications', href: '#certifications', icon: <Award size={24} /> },
  { name: 'Projects', href: '#projects', icon: <FolderGit2 size={24} /> },
  { name: 'Contact', href: '#contact', icon: <Send size={24} /> },
];

const MenuOverlay = ({ onClose }: { onClose: () => void }) => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };
  
  const variants: Variants = {
      hidden: { y: '100%' },
      visible: { y: '0%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
      exit: { y: '100%', transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 h-[35vh] bg-background/90 backdrop-blur-lg rounded-t-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
      >
          <div className="relative h-full">
              <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground">
                  <X size={24}/>
              </button>
              <div className="grid grid-cols-3 gap-y-8 p-8 pt-12">
                  {navItems.map((item) => (
                      <motion.button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className="flex flex-col items-center justify-center gap-2 text-foreground"
                          whileHover={{ scale: 1.1, color: 'hsl(var(--primary))' }}
                          whileTap={{ scale: 0.95 }}
                      >
                          {item.icon}
                          <span className="text-sm font-medium">{item.name}</span>
                      </motion.button>
                  ))}
              </div>
          </div>
      </motion.div>
    </div>
  );
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme } = useTheme();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're at the bottom of the page (contact section)
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // Check each section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      // If at the very top, clear active section
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
          className={`w-full max-w-4xl transition-all duration-300 rounded-full shadow-lg border border-border/20 backdrop-blur-xl ${
          theme === 'dark' 
            ? 'bg-white/10' 
              : 'bg-white/30'
        }`}
      >
          <div className="flex items-center justify-end md:justify-center h-12 px-2">
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                    className={`relative text-xl font-medium transition-colors ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    }`}
                >
                  {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                </motion.button>
                );
              })}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <LayoutGrid size={24} className="text-foreground" />
            </motion.button>
          </div>
        </motion.nav>
        </div>

      <AnimatePresence>
        {isMenuOpen && <MenuOverlay onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}