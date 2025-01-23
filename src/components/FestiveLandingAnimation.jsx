import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import image1 from "./img1.png" 
import image2 from "./img2.png"


const FestiveLandingAnimation = () => {
    const [swapped, setSwapped] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSwapped((prev) => !prev);
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <>
        {/* Card 1 - Background card */}
        <motion.div
          className={`absolute right-0 top-0 w-[80%] md:w-[25rem] h-[90%] md:h-[26rem] transform ${
            swapped
              ? 'translate-x-4 md:translate-x-8'
              : 'translate-x-0 md:translate-x-4'
          }`}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={image1}
            alt="Festival Card 2"
            className="w-full h-full object-contain rounded-lg"
          />
        </motion.div>
  
        {/* Card 2 - Foreground card */}
        <motion.div
          className={`absolute left-0 bottom-0 w-[80%] md:w-[25rem] h-[90%] md:h-[26rem] transform ${
            swapped
              ? '-translate-x-2 md:-translate-x-4'
              : '-translate-x-0 md:-translate-x-0'
          }`}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img
            src={image2}
            alt="Festival Card 1"
            className="w-full h-full object-contain rounded-lg"
          />
        </motion.div>
      </>
    );
  };
  
  export default FestiveLandingAnimation;