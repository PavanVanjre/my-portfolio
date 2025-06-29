import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface ChatBoxProps {
  onClose?: () => void;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(onClose ? true : false);

  return (
    <>
      {/* Only render chat window if open (for internal state), or always if using onClose */}
      {(onClose || isOpen) && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="w-full max-w-sm h-[32rem] flex flex-col bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-semibold text-sm">Chat Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                onClick={onClose ? onClose : () => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                  AI
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">AI Assistant</p>
                  <p className="text-sm text-muted-foreground">
                    👋 Hi there! I'm excited to help you with any questions about my work, 
                    collaboration opportunities, or just to say hello. 
                    <br /><br />
                    <span className="text-primary font-medium">
                      🚧 Chat feature coming soon! 
                    </span>
                    <br />
                    For now, feel free to reach out via email or LinkedIn.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Get in touch:</strong>
                </p>
                <div className="space-y-2 text-sm">
                  <p>📧 <a href="mailto:pavanvanjre@gmail.com" className="text-primary hover:underline">pavanvanjre@gmail.com</a></p>
                  <p>💼 <a href="https://linkedin.com/in/pavan-vanjre" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a></p>
                  <p>🐙 <a href="https://github.com/PavanVanjre" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a></p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border">
              <button
                onClick={onClose ? onClose : () => setIsOpen(false)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </motion.div>
        )}
    </>
  );
}
