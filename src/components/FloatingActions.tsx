import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import BackgroundMusic from './BackgroundMusic';
import ChatBox from './ChatBox';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Floating row of actions */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        <ThemeToggle className="w-12 h-12 p-0 rounded-full shadow bg-background border" />
        <BackgroundMusic className="w-12 h-12 p-0 rounded-full shadow bg-background border" />
        <motion.button
          onClick={() => setChatOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-12 h-12 p-0 rounded-full shadow bg-primary text-primary-foreground flex items-center justify-center transition-opacity ${
            chatOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <MessageCircle size={28} />
        </motion.button>
      </div>
      {/* ChatBox window, shown above the row when open */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <ChatBox onClose={() => setChatOpen(false)} />
        </div>
      )}
    </>
  );
} 