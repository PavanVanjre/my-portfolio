import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import SpaceBackground from './SpaceBackground';
import { useTheme } from '@/contexts/ThemeContext';

const RocketLoader = () => {
  const [animationData, setAnimationData] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch('src/Animation - 1750634484642.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  if (!animationData) {
    return (
      <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-white' : ''}`}>
        {theme === 'light' ? <ParticleBackground /> : <SpaceBackground />}
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="w-64 h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Loading animation...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-white' : ''}`}>
      {theme === 'light' ? <ParticleBackground /> : <SpaceBackground />}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-64 h-64">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default RocketLoader; 