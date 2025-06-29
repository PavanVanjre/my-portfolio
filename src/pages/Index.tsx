import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import FloatingElements from '@/components/FloatingElements';
import ParticleBackground from '@/components/ParticleBackground';
import SpaceBackground from '@/components/SpaceBackground';
import Navigation from '@/components/Navigation';
import FloatingActions from '@/components/FloatingActions';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-white' : ''}`}>
   
      <div id="home" className="relative z-10">
        <Hero />
      </div>
      {/* Show About section on mobile and tablet since they use the same layout */}
      {isMobile && (
        <div id="about" className="relative z-10">
          <About />
        </div>
      )}
      <div id="skills" className="relative z-10">
        <Skills />
      </div>
      <div id="experience" className="relative z-10">
        <Experience />
      </div>
      <div id="education" className="relative z-10">
        <Education />
      </div>
      <div id="certifications" className="relative z-10">
        <Certifications />
      </div>
      <div id="projects" className="relative z-10">
        <Projects />
      </div>
      <div id="contact" className="relative z-10">
        <Contact />
      </div>
      <CustomCursor />
      {theme === 'light' ? <ParticleBackground /> : <SpaceBackground />}
      <FloatingElements />
      <Navigation />
      <FloatingActions />
      
      <footer className="py-8 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 text-center relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">
            © 2024 Pavan Vanjre Ravindranath. Built with React, Tailwind CSS, Three.js and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
