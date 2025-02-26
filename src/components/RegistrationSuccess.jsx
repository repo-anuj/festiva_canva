import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from "./logo.png";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Return to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleReturnHome();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleReturnHome = () => {
    navigate('/'); // Navigate to the landing page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center px-4 py-12 font-['Inter']">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <img 
              src={logo}
              alt="Festiva Logo"
              className="h-16 mx-auto"
            />
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-['Playfair_Display']">Registration Successful!</h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for registering with Festiva. We'll be in touch with you shortly via WhatsApp.
          </p>
          
          <motion.button
            onClick={handleReturnHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ef4444] text-white py-3 px-8 rounded-full hover:bg-[#ef3333] transition duration-200 font-medium"
          >
            Return to Home
          </motion.button>
          
          <p className="text-sm text-gray-500 mt-4">
            Redirecting to home page in 5 seconds...
          </p>
        </div>
        
        <motion.p 
          className="text-center mt-4 text-sm text-gray-600"
        >
          Hassle Free. Beautiful. Memorable.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;