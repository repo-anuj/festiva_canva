import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const bulbVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: {
      scale: 1,
      rotate: 10,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-pink-50/30 py-16 md:py-24">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div 
          className="bg-gradient-to-r from-pink-50 to-pink-100/80 rounded-t-2xl p-8 md:p-10 shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center">
            How it <span className="font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">works</span>?
          </h2>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="bg-white p-8 md:p-12 shadow-xl rounded-b-2xl relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.p 
              className="text-lg md:text-xl text-center leading-relaxed text-gray-700"
              variants={itemVariants}
            >
              Our team of talented people have worked hard to analyze and innovate
              on the fundamentals of designing.
            </motion.p>

            <motion.p 
              className="text-lg md:text-xl text-center leading-relaxed text-gray-700"
              variants={itemVariants}
            >
              Our efforts have led us to a breakthrough in the designing process
              that enables us to create beautiful, trendy, and unique festival
              graphics for <span className="font-bold text-red-400">YOU</span>—on a large scale, unlike anything else.
            </motion.p>
          </div>

          {/* Animated light bulb */}
          <motion.div 
            className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4"
            initial="initial"
            animate="animate"
            variants={bulbVariants}
          >
            <motion.div
              className="relative"
              variants={glowVariants}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-200 blur-2xl opacity-30 rounded-full" />
              <Lightbulb 
                size={64} 
                className="text-red-400 relative z-10 transform rotate-12"
              />
            </motion.div>
          </motion.div>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-4 left-4 w-32 h-32 border-2 border-red-400 rounded-full" />
            <div className="absolute bottom-12 left-12 w-16 h-16 bg-pink-200 rounded-lg transform rotate-45" />
            <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-pink-300 rounded-lg transform -rotate-12" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;