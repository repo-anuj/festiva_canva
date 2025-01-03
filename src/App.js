import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import logo from "./components/logo.png" 
import FestiveLanding from './components/FestiveLanding';
import FestiveSteps from "./components/FestiveSteps";
import Footer from './components/Footer';
import HowItWorks from "./components/HowItWorks";

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-pink-50 to-red-100 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut" }
        }}
      >
        {/* Logo container with glow effect */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-red-300 blur-2xl rounded-full opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <img 
            src={logo}
            alt="Festiva Logo"
            className="h-32 md:h-40 relative z-10"
          />
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-2xl md:text-3xl font-serif text-gray-800 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.5, duration: 0.8 }
        }}
      >
        Creating Festive Impressions
      </motion.p>

      {/* Loading dots */}
      <motion.div 
        className="flex space-x-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-red-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app relative">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <FestiveLanding />
        <FestiveSteps />
        <HowItWorks />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;