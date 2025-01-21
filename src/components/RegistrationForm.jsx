import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import logo from "./logo.png" 

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'mkEL7Qrq7bDfgbdeO';
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_7l0c5ul';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_khlgzjl';

const RegistrationForm = () => {
  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const templateParams = {
        to_email: formData.email,
        from_name: 'FestivaSocial',
        to_name: formData.name,
        phone: formData.phone,
        message: 'Thank you for registering with Festiva!'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h1
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
           <img 
              src={logo} // Make sure to add your logo file to the public folder
              alt="Festiva Logo"
              className="h-12 mx-auto"
            />
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-gray-600"
          >
            Crafting Memorable Celebrations for Your Business
          </motion.p>
        </div>

        {/* Form Section */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-green-100 text-green-700 rounded-md"
            >
              Registration successful! Please check your email for confirmation.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-md"
            >
              Something went wrong. Please try again later.
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full bg-[#ff7b7b] text-white py-3 px-6 rounded-md 
                hover:bg-[#ff6b6b] transition duration-200 font-medium
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? 'Registering...' : 'Register Now'}
            </motion.button>
          </div>
        </motion.form>

        {/* Footer Text */}
        <motion.p 
          variants={fadeIn}
          className="text-center mt-4 text-sm text-gray-600"
        >
          Hassle Free. Beautiful.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;