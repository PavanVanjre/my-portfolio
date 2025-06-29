import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBoxProps {
  onClose?: () => void;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(onClose ? true : false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Alex. Feel free to ask me anything about my experience, skills, or projects!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const quickReplies = [
    "Tell me about your experience",
    "What technologies do you work with?",
    "Show me your projects",
    "How can I contact you?",
  ];

  const responses: { [key: string]: string } = {
    "Tell me about your experience": "I'm a recent Computer Science graduate with experience in full-stack development. I've worked with React, Node.js, Python, and various cloud technologies. I'm passionate about creating user-friendly applications and solving complex problems.",
    "What technologies do you work with?": "I'm proficient in React, TypeScript, Node.js, Python, Java, SQL, Git, and AWS. I'm always learning new technologies and staying up-to-date with industry trends!",
    "Show me your projects": "I've built several interesting projects including an e-commerce platform, task management app, weather dashboard, and social media analytics tool. You can check them out in the Projects section above!",
    "How can I contact you?": "You can reach me via email or connect with me on LinkedIn and GitHub. All my contact information is available in the Contact section. I'd love to hear from you!",
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate response
    setTimeout(() => {
      const responseText = responses[text] || "Thanks for your message! I appreciate your interest. Feel free to explore my portfolio to learn more about my work and experience.";
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

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
                <span className="font-semibold text-sm">Alex Smith</span>
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-muted-foreground rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies & Input */}
            <div className="p-3 border-t border-border">
              <div className="flex flex-wrap gap-2 mb-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs px-3 py-1 bg-background hover:bg-accent border border-border rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(currentMessage)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => handleSendMessage(currentMessage)}
                  className="w-8 h-8 flex-shrink-0 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 flex items-center justify-center"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
    </>
  );
}
