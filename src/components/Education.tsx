import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { getSectionData } from '@/lib/data';

export default function Education() {
  const educationData = getSectionData('education');

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
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
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">{educationData.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {educationData.subtitle}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
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
            />
            
            {educationData.items.map((edu, index) => (
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
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        {edu.year}
                      </span>
                      <span className="text-sm text-muted-foreground">{edu.period}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 gradient-text">{edu.degree}</h3>
                    <p className="text-muted-foreground font-medium mb-1">{edu.school}</p>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{edu.location}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-primary">Relevant Courses:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-medium border border-primary/30 hover:from-primary/30 hover:to-secondary/30 transition-all duration-200"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                  />
                </div>

                {/* Empty space for alignment */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {educationData.items.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {edu.year}
                  </span>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 gradient-text">{edu.degree}</h3>
                <p className="text-muted-foreground font-medium mb-1">{edu.school}</p>
                <p className="text-muted-foreground text-sm mb-4">{edu.location}</p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary">Relevant Courses:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, courseIndex) => (
                      <span
                        key={courseIndex}
                        className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-medium border border-primary/30 hover:from-primary/30 hover:to-secondary/30 transition-all duration-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
