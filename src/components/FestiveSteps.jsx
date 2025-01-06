import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StepCard = ({ number, title, description, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: index * 0.2 + 0.3
      }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-pink-50 to-white rounded-xl p-[3rem] relative shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      {/* Number circle */}
      <motion.div 
        className="absolute -top-6 left-[42%] transform -translate-x-1/2"
        variants={numberVariants}
      >
        <div className="bg-red-400 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
          {number}
        </div>
      </motion.div>

      <div className="mt-10 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Connector arrow (hide on last card and mobile) */}
      {index < 2 && (
        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
          <ArrowRight className="w-8 h-8 text-red-400" />
        </div>
      )}
    </motion.div>
  );
};

const FestiveSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Sign up",
      description: "Upload your logo, share your business details."
    },
    {
      number: "2",
      title: "Receive",
      description: "6 personalized designs for every festival, directly on WhatsApp."
    },
    {
      number: "3",
      title: "Use",
      description: "Choose & stand out with your brand, all for just ₹40/design!"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-white py-16 md:py-24 overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
            <span className="block md:inline">Festiva gives you a practical</span>{' '}
            
            <span className="block">and easy solution in just 3 steps!</span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24 relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>

        {/* Sign up button */}
        <motion.div 
          className="text-center"
          variants={headerVariants}
        >
          <motion.button 
            className="bg-black text-white px-12 py-4 rounded-full text-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now!
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FestiveSteps;