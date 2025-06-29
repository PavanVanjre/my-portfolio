import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Use a royalty-free ambient music URL or local file
  const musicUrl = "src/assets/BackgroundMusic/calm-space-music-312291.mp3"; 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.1; // Very low volume for background

    // Auto-play after user interaction
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (isPlaying) {
          audio.play().catch(console.error);
        }
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isPlaying, hasInteracted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (hasInteracted) {
        audio.play().catch(console.error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src={musicUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-3 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        animate={{
          rotate: isPlaying ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isPlaying ? Infinity : 0,
        }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.button>
    </>
  );
}
