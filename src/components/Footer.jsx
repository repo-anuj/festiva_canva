import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import logo from "./logo.png" 

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const socialLinks = [
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100/50">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="transition-transform duration-300"
          >
            <img 
              src={logo}
              alt="Festiva Logo" 
              className="h-16 md:h-20 object-contain"
            />
          </motion.div>
          
          {/* Contact Links */}
          <motion.div 
            className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8"
            variants={itemVariants}
          >
            <motion.a 
              href="mailto:Festivesocialgraphics@gmail.com" 
              className="flex items-center space-x-2 text-gray-700 hover:text-red-400 transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-5 h-5 group-hover:stroke-red-400" />
              <span>Festivesocialgraphics@gmail.com</span>
            </motion.a>
            
            <motion.a 
              href="tel:+1234567890" 
              className="flex items-center space-x-2 text-gray-700 hover:text-red-400 transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-5 h-5 group-hover:stroke-red-400" />
              <span>+1 (234) 567-890</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex space-x-6"
            variants={itemVariants}
          >
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="text-gray-600 hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="text-sm text-gray-500 text-center mt-8"
            variants={itemVariants}
          >
            <p>© {new Date().getFullYear()} Festiva. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;