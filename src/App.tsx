import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RocketLoader from './components/RocketLoader';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [flyAway, setFlyAway] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlyAway(true);
      // After fly-away animation, hide loader
      setTimeout(() => setLoading(false), 800); // match animation duration
    }, 2500); // Show loader for 2.5s, then fly away
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            {loading ? (
              <motion.div key="loader">
                <RocketLoader flyAway={flyAway} />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
