import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { getSectionData } from '@/lib/data';

export default function Certifications() {
  const certificationsData = getSectionData('certifications');

  return (
    <section id="certifications" className="py-20 bg-gradient-to-r from-accent/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/5 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary/30 rounded-full blur-lg animate-float"></div>
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
            <span className="gradient-text">{certificationsData.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {certificationsData.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certificationsData.items.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
              className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                initial={false}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4"
                    >
                      <Award className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold gradient-text mb-1">{cert.title}</h3>
                      <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <motion.a
                    href={cert.link}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </motion.a>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{cert.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-xs">ID: {cert.credentialId}</span>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-medium border border-primary/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
