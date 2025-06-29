import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  SiReact, SiTypescript, SiNodedotjs, SiPython, SiAmazon, SiDocker, SiKubernetes, SiGraphql, SiNextdotjs,
  SiRedux, SiHtml5, SiCss3, SiJavascript, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiJenkins, SiGit, SiFigma, SiJira, SiAngular, SiSass, SiGulp, SiFlask, SiDjango
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import Spinner from './Spinner';
import { getSectionData } from '@/lib/data';
import { useTheme } from '@/contexts/ThemeContext';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiNextdotjs,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiJenkins,
  SiGit,
  SiFigma,
  SiJira,
  SiAngular,
  SiSass,
  SiGulp,
  SiFlask,
  SiDjango,
  FaJava,
};

const MarqueeRow = ({ skills, direction = 'left' }: { skills: any[], direction?: 'left' | 'right' }) => {
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  const { theme } = useTheme();

  // Direct color mapping for React Icons
  const getIconColor = (skillName: string) => {
    const isDarkMode = theme === 'dark';
    
    const colorMap: { [key: string]: string } = {
      'React': '#61DAFB',
      'TypeScript': '#3178C6',
      'Node.js': '#339933',
      'Python': '#FFD43B',
      'Java': '#ED8B00',
      'AWS': '#FF9900',
      'Docker': '#2496ED',
      'Kubernetes': '#326CE5',
      'GraphQL': '#E10098',
      'Next.js': isDarkMode ? '#FFFFFF' : '#000000',
      'Redux': '#764ABC',
      'HTML5': '#E34F26',
      'CSS3': '#1572B6',
      'JavaScript': '#F7DF1E',
      'MongoDB': '#47A248',
      'PostgreSQL': '#336791',
      'MySQL': '#4479A1',
      'Redis': '#DC382D',
      'Jenkins': '#D33833',
      'Git': '#F05032',
      'Figma': '#F24E1E',
      'Jira': '#0052CC',
      'Angular': '#DD0031',
      'Sass': '#CC6699',
      'Gulp': '#CF4647',
      'Flask': isDarkMode ? '#FFFFFF' : '#000000',
      'Django': '#092E20'
    };
    return colorMap[skillName] || '#6B7280';
  };

  return (
    <div className={`flex ${animationClass} [animation-play-state:running] group-hover:[animation-play-state:paused]`}>
      {[...skills, ...skills].map((skill, index) => {
        const IconComponent = iconMap[skill.icon];
        const iconColor = getIconColor(skill.name);
        
        return (
          <div key={`${skill.name}-${index}`} className="flex-shrink-0 w-48 mx-4">
            <motion.div
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
              }}
              className="group/item relative p-6 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center space-x-4 cursor-pointer overflow-hidden h-24 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl transition-colors duration-300">
                <IconComponent style={{ color: iconColor, fill: iconColor }} />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground group-hover/item:text-primary transition-colors duration-300">
                {skill.name}
              </h3>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default function Skills() {
  const [isLoading, setIsLoading] = useState(true);
  const skillsData = getSectionData('skills');

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const firstRow = skillsData.items.slice(0, Math.ceil(skillsData.items.length / 2));
  const secondRow = skillsData.items.slice(Math.ceil(skillsData.items.length / 2));

  if (isLoading) {
    return (
      <section id="skills" className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {skillsData.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{skillsData.title.split(' ').slice(-1)[0]}</span>
          </h2>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {skillsData.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{skillsData.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {skillsData.subtitle}
          </p>
        </motion.div>
      </div>

      <div className="space-y-8 group">
        <div className="flex">
          <MarqueeRow skills={firstRow} direction="left" />
        </div>
        <div className="flex">
          <MarqueeRow skills={secondRow} direction="right" />
        </div>
      </div>
    </section>
  );
}
