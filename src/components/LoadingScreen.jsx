import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo.png';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [showText, setShowText] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Sequence timing
    const textTimer = setTimeout(() => {
      setShowText(false);
      setShowLogo(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {showText && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              className="text-3xl md:text-4xl font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {["Creating", "Festive", "Moments"].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="inline-block mx-2 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-blue-600 to-red-600"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
        {showLogo && (
          <motion.div
            key="logo"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div className="relative">
              <img
                src={logo}
                alt="Festiva Logo"
                className="h-32 md:h-40 relative z-10"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-600 to-red-600 blur-2xl rounded-full opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
