import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from "./logo.png"
import img1 from "./img1.png"
import img2 from "./img2.png"

const FestiveLanding = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwapped(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Adjusted card positions for closer proximity
  const card1Positions = {
    initial: {
      left: "5%",
      bottom: "0%",
      translateX: "0%",
      zIndex: 1
    },
    swapped: {
      left: "50%",
      top: "0%",
      translateX: "0%",
      zIndex: 2
    }
  };

  const card2Positions = {
    initial: {
      left: "50%",
      top: "0%",
      translateX: "0%",
      zIndex: 2
    },
    swapped: {
      left: "5%",
      bottom: "0%",
      translateX: "0%",
      zIndex: 1
    }
  };

  // Enhanced card animations with swapping
  const cardAnimationBase = {
    y: [0, -10, 0],
    rotate: [-1, 1, -1],
    transition: {
      y: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      },
      rotate: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-pink-50 min-h-screen overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-8 relative"
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        {/* Logo section */}
        <motion.div 
          className="mb-0 md:mb-0"
          variants={fadeIn}
        >
          <img
            src={logo}
            alt="Festiva Logo"
            className="h-22 md:h-20 object-contain"
          />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left content */}
          <motion.div 
            className="space-y-6 md:space-y-8"
            variants={containerAnimation}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-gray-800"
              variants={fadeIn}
            >
              <span className="block">Creating Festive</span>
              <span className="block">Impressions For</span>
              <span className="block">Your Business</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600"
              variants={fadeIn}
            >
              Hassle Free. Beautiful.
            </motion.p>
            
            <motion.button 
              className="bg-red-400 text-white px-8 py-3 rounded-full hover:bg-red-500 transition-all duration-300 transform hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeIn}
            >
              <Link to="/register">
                I'm interested 
              </Link>
            </motion.button>
          </motion.div>

          {/* Right content - Festival cards with closer positioning */}
          <div className="relative h-[400px] md:h-[400px] lg:h-[600px] right-[44px]">
            <AnimatePresence>
              {/* Card 1 */}
              <motion.div 
                className="absolute w-[70%] md:w-[20rem] h-[90%] md:h-[26rem]"
                initial={card1Positions.initial}
                animate={{
                  ...(!isSwapped ? card1Positions.initial : card1Positions.swapped),
                  ...cardAnimationBase
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 1
                }}
                style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))' }}
              >
                <motion.img
                  src={img1}
                  alt="Festival Card 1"
                  className="w-full h-full object-contain rounded-lg"
                  animate={{ opacity: [0.8, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                className="absolute w-[70%] md:w-[20rem] h-[90%] md:h-[26rem]"
                initial={card2Positions.initial}
                animate={{
                  ...(!isSwapped ? card2Positions.initial : card2Positions.swapped),
                  ...cardAnimationBase
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 1
                }}
                style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))' }}
              >
                <motion.img
                  src={img2}
                  alt="Festival Card 2"
                  className="w-full h-full object-contain rounded-lg"
                  animate={{ opacity: [0.8, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom text section */}
        <motion.div 
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl rounded-lg font-serif py-6 px-4">
            Struggling to get <span className="font-bold text-red-400">perfect</span> festival
            <br className="hidden md:block" /> graphics made for your brand?
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FestiveLanding;