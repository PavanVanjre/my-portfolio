import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function FloatingElements() {
  const { theme } = useTheme();

  const shapes = [
    // More triangles
    { type: 'triangle', size: 40, x: 10, y: 20, duration: 15, color: 'primary' },
    { type: 'triangle', size: 60, x: 80, y: 60, duration: 20, color: 'secondary' },
    { type: 'triangle', size: 30, x: 70, y: 10, duration: 18, color: 'accent' },
    { type: 'triangle', size: 45, x: 25, y: 40, duration: 22, color: 'primary' },
    { type: 'triangle', size: 35, x: 85, y: 85, duration: 16, color: 'secondary' },
    
    // More squares
    { type: 'square', size: 25, x: 20, y: 80, duration: 12, color: 'primary' },
    { type: 'square', size: 45, x: 90, y: 30, duration: 16, color: 'secondary' },
    { type: 'square', size: 35, x: 5, y: 50, duration: 14, color: 'accent' },
    { type: 'square', size: 30, x: 50, y: 5, duration: 18, color: 'primary' },
    { type: 'square', size: 40, x: 95, y: 70, duration: 20, color: 'secondary' },
    
    // More circles
    { type: 'circle', size: 20, x: 85, y: 15, duration: 13, color: 'primary' },
    { type: 'circle', size: 35, x: 15, y: 70, duration: 17, color: 'secondary' },
    { type: 'circle', size: 28, x: 60, y: 85, duration: 19, color: 'accent' },
    { type: 'circle', size: 32, x: 40, y: 60, duration: 15, color: 'primary' },
    { type: 'circle', size: 25, x: 75, y: 35, duration: 21, color: 'secondary' },
    
    // More diamonds
    { type: 'diamond', size: 30, x: 40, y: 25, duration: 16, color: 'primary' },
    { type: 'diamond', size: 40, x: 75, y: 75, duration: 21, color: 'secondary' },
    { type: 'diamond', size: 35, x: 12, y: 12, duration: 19, color: 'accent' },
    { type: 'diamond', size: 28, x: 88, y: 50, duration: 17, color: 'primary' },
    
    // New hexagon shapes
    { type: 'hexagon', size: 30, x: 30, y: 30, duration: 14, color: 'accent' },
    { type: 'hexagon', size: 25, x: 65, y: 20, duration: 18, color: 'primary' },
    { type: 'hexagon', size: 35, x: 55, y: 70, duration: 16, color: 'secondary' },
  ];

  const getColorValue = (color: string) => {
    switch (color) {
      case 'primary': return 'hsl(var(--primary))';
      case 'secondary': return 'hsl(var(--secondary))';
      case 'accent': return 'hsl(var(--accent))';
      default: return 'hsl(var(--primary))';
    }
  };

  const renderShape = (shape: any, index: number) => {
    const baseClasses = theme === 'light' ? "absolute opacity-80" : "absolute opacity-60";
    const color = getColorValue(shape.color);
    
    switch (shape.type) {
      case 'triangle':
        return (
          <div
            className={baseClasses}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${color}`,
            }}
          />
        );
      
      case 'square':
        return (
          <div
            className={`${baseClasses} border-2 rotate-45`}
            style={{
              width: shape.size,
              height: shape.size,
              borderColor: color,
            }}
          />
        );

      case 'circle':
        return (
          <div
            className={`${baseClasses} rounded-full border-2`}
            style={{
              width: shape.size,
              height: shape.size,
              borderColor: color,
            }}
          />
        );

      case 'diamond':
        return (
          <div
            className={baseClasses}
            style={{
              width: shape.size,
              height: shape.size,
              background: color,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
        );

      case 'hexagon':
        return (
          <div
            className={baseClasses}
            style={{
              width: shape.size,
              height: shape.size,
              background: color,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
            opacity: theme === 'light' ? [0.6, 0.9, 0.6] : [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 1,
          }}
        >
          {renderShape(shape, index)}
        </motion.div>
      ))}
      
      {/* More gradient orbs without blur */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full ${theme === 'light' ? 'opacity-60' : 'opacity-40'}`}
          style={{
            width: 80 + i * 15,
            height: 80 + i * 15,
            left: `${20 + i * 11}%`,
            top: `${14 + i * 11}%`,
            background: i % 3 === 0 
              ? `radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, transparent 90%)` 
              : i % 3 === 1
              ? `radial-gradient(circle, hsl(var(--secondary)) 0%, hsl(var(--accent)) 50%, transparent 90%)`
              : `radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--primary)) 50%, transparent 90%)`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: theme === 'light' ? [0.5, 0.8, 0.5] : [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}
