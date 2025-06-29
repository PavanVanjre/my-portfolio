import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import { motion } from 'framer-motion';

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded", container);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: {
          quantity: 80,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#FFD700", "#FFA500", "#87CEEB", "#FF69B4", "#32CD32", "#FF6347", "#9370DB", "#FF1493", "#00CED1", "#98FB98", "#FFB6C1", "#DDA0DD", "#F0E68C", "#20B2AA", "#FFA07A"],
      },
      links: {
        enable: true,
        distance: 200,
        color: "#FFD700",
        opacity: 0.6,
        width: 2,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: true,
        speed: 1.2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 600,
        },
        value: 120,
      },
      opacity: {
        value: 0.9,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.6,
        },
      },
      shape: {
        type: ["circle", "star", "triangle", "square", "polygon"],
        options: {
          star: {
            sides: 5,
          },
          polygon: {
            sides: 6,
          },
        },
      },
      size: {
        value: { min: 6, max: 15 },
        random: true,
        animation: {
          enable: true,
          speed: 4,
          minimumValue: 4,
        },
      },
    },
    detectRetina: true,
  };

  // Random positions for floating elements
  const largeCirclePositions = [
    { left: '8%', top: '15%' },
    { left: '75%', top: '25%' },
    { left: '45%', top: '65%' },
    { left: '85%', top: '70%' },
    { left: '20%', top: '80%' },
  ];

  const starPositions = [
    { left: '12%', top: '22%' },
    { left: '68%', top: '18%' },
    { left: '88%', top: '45%' },
    { left: '35%', top: '75%' },
    { left: '78%', top: '85%' },
    { left: '15%', top: '60%' },
    { left: '55%', top: '35%' },
    { left: '92%', top: '15%' },
  ];

  return (
    <>
    <Particles
      id="tsparticles"
        options={particlesConfig}
      className="absolute inset-0 pointer-events-none z-0"
    />
      
      {/* Large floating circles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`large-circle-${i}`}
            className="absolute rounded-full opacity-30"
            style={{
              width: 120 + i * 40,
              height: 120 + i * 40,
              left: largeCirclePositions[i].left,
              top: largeCirclePositions[i].top,
              background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
        
        {/* Floating stars */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-5xl opacity-80"
            style={{
              left: starPositions[i].left,
              top: starPositions[i].top,
              color: i % 2 === 0 ? '#FFD700' : '#FFA500',
              filter: 'drop-shadow(0 0 8px currentColor) brightness(1.2)',
              textShadow: '0 0 15px currentColor',
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>
    </>
  );
}
