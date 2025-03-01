import React from 'react';
import { motion } from 'framer-motion';
import logo from "./logo.png";

const RegistrationConfirmation = ({ formData, logoPreview, onConfirm, onEdit }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-white flex items-center justify-center px-4 py-12 font-['Inter']">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mb-2">
            <img 
              src={logo}
              alt="Festiva Logo"
              className="h-16 mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-dark)] mb-2 font-['Playfair_Display']">
            Confirm Your Details
          </h1>
          <p className="text-gray-600">
            Please review your information before final submission
          </p>
          <p className="text-red-500 mt-2 text-sm italic font-medium">
            Note: This information will be used in your designs, so please carefully verify all details.
          </p>
        </div>
        {/* Confirmation Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* Business Information */}
            <div>
              <h2 className="text-xl font-medium text-[var(--text-dark)] mb-4 font-['Playfair_Display'] border-b pb-2">
                Business Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">{formData.companyName || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Business Category</p>
                  <p className="font-medium">{formData.businessCategory || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Company Contact</p>
                  <p className="font-medium">{formData.companyContact || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="font-medium">{formData.website || '-'}</p>
                </div>
                
                {logoPreview && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Company Logo</p>
                    <div className="mt-1 h-16 w-16 overflow-hidden rounded-md">
                      <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Address Information */}
            <div>
              <h2 className="text-xl font-medium text-[var(--text-dark)] mb-4 font-['Playfair_Display'] border-b pb-2">
                Business Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Street/Locality</p>
                  <p className="font-medium">{formData.street || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium">{formData.city || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{formData.state || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">PIN Code</p>
                  <p className="font-medium">{formData.pincode || '-'}</p>
                </div>
              </div>
            </div>
            
            {/* Contact Person Information */}
            <div>
              <h2 className="text-xl font-medium text-[var(--text-dark)] mb-4 font-['Playfair_Display'] border-b pb-2">
                Contact Person Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Contact Person Name</p>
                  <p className="font-medium">{formData.contactPersonName || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">WhatsApp Number</p>
                  <p className="font-medium">{formData.contactPersonWhatsapp || '-'}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <motion.button
                onClick={onEdit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-full hover:bg-gray-300 transition duration-200 font-medium"
              >
                Edit Information
              </motion.button>
              
              <motion.button
                onClick={onConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#ef4444] text-white py-3 px-6 rounded-full hover:bg-[#ef3333] transition duration-200 font-medium"
              >
                Confirm & Submit
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Privacy Notice */}
        <motion.p className="text-center mt-4 text-sm text-gray-600">
          By submitting this form, you agree to our <a href="#" className="text-[var(--primary-color)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--primary-color)] hover:underline">Privacy Policy</a>.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationConfirmation;