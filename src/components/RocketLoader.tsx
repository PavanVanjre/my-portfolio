import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import SpaceBackground from './SpaceBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const RocketLoader = ({ flyAway = false, onFlyAwayComplete }: { flyAway?: boolean, onFlyAwayComplete?: () => void }) => {
  const [animationData, setAnimationData] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch('/animations/loader-animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Animation variants for framer-motion
  const rocketVariants = {
    initial: { y: 0, opacity: 1, scale: 1 },
    fly: {
      y: -500,
      opacity: 0,
      scale: 0.7,
      transition: { duration: 0.8 }
    }
  };

  if (!animationData) {
    return (
      <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-white' : ''}`}>
        {theme === 'light' ? <ParticleBackground /> : <SpaceBackground />}
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="w-64 h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-white' : ''}`}>
      {theme === 'light' ? <ParticleBackground /> : <SpaceBackground />}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          className="w-64 h-64"
          variants={rocketVariants}
          initial="initial"
          animate={flyAway ? 'fly' : 'initial'}
          onAnimationComplete={() => {
            if (flyAway && onFlyAwayComplete) onFlyAwayComplete();
          }}
        >
          <Lottie
            animationData={animationData}
            loop={!flyAway}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RocketLoader; 