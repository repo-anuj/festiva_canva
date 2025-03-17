import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import logo from "./logo.png";
import RegistrationSuccess from './RegistrationSuccess';
import RegistrationConfirmation from './RegistrationConfirmation';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'mkEL7Qrq7bDfgbdeO';
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_7l0c5ul';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_khlgzjl';

// Business category options
const BUSINESS_CATEGORIES = [
  "IT & Software Services",
  "Retail & E-commerce",
  "Manufacturing",
  "Healthcare & Pharmaceuticals",
  "Education & Training",
  "Food & Beverage",
  "Real Estate & Construction",
  "Financial Services",
  "Travel & Hospitality",
  "Media & Entertainment",
  "Other"
];

// Indian states
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Puducherry", "Lakshadweep", "Chandigarh", "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu"
];

const RegistrationForm = () => {
  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    companyName: '',
    companyContact: '',
    website: '',
    businessCategory: '',
    logo: null,
    street: '',
    city: '',
    state: '',
    pincode: '',
    contactPersonName: '',
    contactPersonWhatsapp: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // If confirmation is shown
  // if (showConfirmation) {
  //   return (
  //     <RegistrationConfirmation 
  //       formData={formData} 
  //       logoPreview={logoPreview} 
  //       onConfirm={handleConfirmSubmit} 
  //       onEdit={() => setShowConfirmation(false)}
  //     />
  //   );
  // }

  // If registration is successful, show success screen
  if (submitStatus === 'success') {
    return <RegistrationSuccess />;
  }

  const validateForm = () => {
    const newErrors = {};

    // Company name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    // Company contact validation
    if (!formData.companyContact.trim()) {
      newErrors.companyContact = "Company contact number is required";
    } else if (!/^[0-9]{10,12}$|^\+?[0-9]{1,3}-[0-9]{10}$|^[0-9]{3,5}-[0-9]{6,8}$/.test(formData.companyContact.replace(/\s/g, ''))) {
      newErrors.companyContact = "Please enter a valid Indian phone number";
    }

    // Website validation (optional field)
    if (formData.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(\/.*)?$/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL";
    }

    // Business category validation
    if (!formData.businessCategory) {
      newErrors.businessCategory = "Please select a business category";
    }

    // Address validation
    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
      newErrors.city = "City should contain only letters";
    }

    if (!formData.state) {
      newErrors.state = "Please select a state";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits and start with a non-zero digit";
    }

    // Contact person validation
    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required";
    }

    if (!formData.contactPersonWhatsapp.trim()) {
      newErrors.contactPersonWhatsapp = "WhatsApp number is required";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.contactPersonWhatsapp)) {
      newErrors.contactPersonWhatsapp = "Please enter a valid 10-digit Indian mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Show confirmation screen instead of submitting directly
    setShowConfirmation(true);
  };

  // New function to handle final submission after confirmation
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // In a real implementation, you would handle file upload separately
      // For now, we'll just simulate the process

      const templateParams = {
        to_email: formData.contactPersonWhatsapp + '@c.us', // WhatsApp email gateway format
        from_name: 'FestivaSocial',
        to_name: formData.contactPersonName,
        company_name: formData.companyName,
        company_contact: formData.companyContact,
        address: `${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        message: 'Thank you for registering with Festiva! We will be in touch shortly.'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        // Form reset moved to success component
      } else {
        setSubmitStatus('error');
        setShowConfirmation(false);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setShowConfirmation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If confirmation is shown
  if (showConfirmation) {
    return (
      <RegistrationConfirmation
        formData={formData}
        logoPreview={logoPreview}
        onConfirm={handleConfirmSubmit}
        onEdit={() => setShowConfirmation(false)}
      />
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          logo: 'Please upload a PNG image only',
        });
        setLogoPreview(null);
        return;
      }

      if (file.size > maxSize) {
        setErrors({
          ...errors,
          logo: 'File size should be less than 5MB',
        });
        setLogoPreview(null);
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result;
        setLogoPreview(reader.result);
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let hasTransparency = false;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 255) {
            hasTransparency = true;
            break;
          }
        }

        if (!hasTransparency) {
          setErrors({
            ...errors,
            logo: 'Please upload a PNG image with a transparent background',
          });
          setLogoPreview(null);
          return;
        }

        setFormData((prevData) => ({
          ...prevData,
          logo: file,
        }));

        if (errors.logo) {
          setErrors({
            ...errors,
            logo: '',
          });
        }
      };

      img.onerror = () => {
        setErrors({
          ...errors,
          logo: 'Error loading image. Please try again.',
        });
        setLogoPreview(null);
      };

      reader.readAsDataURL(file);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-white flex items-center justify-center px-4 py-12 font-['Inter']">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        {/* Header Section */}
        <div className="text-center mb-8 animate-slide-up">
          <motion.div
            variants={fadeIn}
            className="mb-2"
          >
            <img
              src={logo}
              alt="Festiva Logo"
              className="h-16 mx-auto"
            />
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-2xl font-bold text-[var(--text-dark)] mb-2 font-['Playfair_Display']"
          >
            Business Registration
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-gray-600"
          >
            Crafting Memorable Celebrations for Your Business
          </motion.p>
          <motion.p
            variants={fadeIn}
            className="text-black-600 mt-2 text-sm italic"
          >
            Note: This information will be used in your designs, please enter accurate details.
          </motion.p>
        </div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 animate-fade-in"
        >
          {/* Error Message */}
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
            <h2 className="text-xl font-medium text-[var(--text-dark)] mb-4 font-['Playfair_Display']">Business Information</h2>

            {/* Company Name Field */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name<span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-black-600 mt-1">Enter your company name (this will be used in your design)</p>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-500 error-message">{errors.companyName}</p>}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Contact Field */}
              <div>
                <label
                  htmlFor="companyContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Contact Number<span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-black-600 mt-1">e.g., 022-27856789 (will be used in design)</p>
                <input
                  type="tel"
                  id="companyContact"
                  name="companyContact"
                  value={formData.companyContact}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.companyContact ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                  
                />
                {errors.companyContact && <p className="mt-1 text-sm text-red-500 error-message">{errors.companyContact}</p>}
              </div>

              {/* Website Field */}
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Website
                </label>
                <p className="text-xs text-black-600 mt-1">e.g., www.yourcompany.com (will be used in design)</p>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.website ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                  
                />
                {errors.website && <p className="mt-1 text-sm text-red-500 error-message">{errors.website}</p>}
              </div>
            </div>

            {/* Business Category Field */}
            <div>
              <label
                htmlFor="businessCategory"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Category<span className="text-red-500">*</span>
              </label>
              <select
                id="businessCategory"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${errors.businessCategory ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
              >
                <option value="" disabled>Select your business category</option>
                {BUSINESS_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.businessCategory && <p className="mt-1 text-sm text-red-500 error-message">{errors.businessCategory}</p>}
            </div>

            {/* Logo Upload Field */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo (PNG with transparent background required)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]"
                >
                  Upload Logo
                </label>
                {logoPreview && (
                  <div className="ml-4 h-12 w-12 overflow-hidden rounded-md">
                    <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              {errors.logo && <p className="mt-1 text-sm text-red-500 error-message">{errors.logo}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Note: Please upload a PNG image with a transparent background. This logo will be featured in your designs.
                <a href="https://www.remove.bg/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)] hover:underline ml-1">
                  If there is no logo, <span className="text-pink-500 ml-2">click here to make one.</span>
                </a>
              </p>
            </div>

            {/* Address Section */}
            <h2 className="text-xl font-medium text-[var(--text-dark)] mt-6 mb-4 font-['Playfair_Display']">Business Address</h2>

            {/* Street Field */}
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Street/Locality<span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-black-600 mt-1">e.g., 123, Sector 5, Vashi (will be used in your design)</p>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                
              />
              {errors.street && <p className="mt-1 text-sm text-red-500 error-message">{errors.street}</p>}
            </div>

            {/* City, State, and Pincode in a row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City Field */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City<span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mt-1">e.g., Mumbai</p>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                  
                />
                {errors.city && <p className="mt-1 text-sm text-red-500 error-message">{errors.city}</p>}
              </div>

              {/* State Field */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State<span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                >
                  <option value="" disabled>Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-500 error-message">{errors.state}</p>}
              </div>

              {/* Pincode Field */}
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PIN Code<span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mt-1">e.g., 400703</p>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  maxLength="6"
                  className={`w-full px-4 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                  
                />
                {errors.pincode && <p className="mt-1 text-sm text-red-500 error-message">{errors.pincode}</p>}
              </div>
            </div>

            {/* Contact Person Section */}
            <h2 className="text-xl font-medium text-[var(--text-dark)] mt-6 mb-4 font-['Playfair_Display']">Contact Person Details</h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Person Name Field */}
              <div>
                <label
                  htmlFor="contactPersonName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Person Name<span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-black-600 mt-1">e.g., Rajesh Sharma (will be used in design)</p>
                <input
                  type="text"
                  id="contactPersonName"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.contactPersonName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                  
                />
                {errors.contactPersonName && <p className="mt-1 text-sm text-red-500 error-message">{errors.contactPersonName}</p>}
              </div>

              {/* Contact Person WhatsApp Field */}
              <div>
                <label
                  htmlFor="contactPersonWhatsapp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Person WhatsApp Number<span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mt-1">e.g., 9876543210</p>
                <input
                  type="tel"
                  id="contactPersonWhatsapp"
                  name="contactPersonWhatsapp"
                  value={formData.contactPersonWhatsapp}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  className={`w-full px-4 py-2 border ${errors.contactPersonWhatsapp ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition`}
                  
                />
                {errors.contactPersonWhatsapp && <p className="mt-1 text-sm text-red-500 error-message">{errors.contactPersonWhatsapp}</p>}
                <p className="mt-1 text-xs text-gray-500">
                  We'll connect with you via WhatsApp for faster communication.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full bg-[#ef4444] text-white py-3 px-6 rounded-full hover:bg-[#ef3333]
                transition duration-200 font-medium mt-6 
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? 'Registering...' : 'Continue to Confirm Details'}
            </motion.button>
          </div>
        </motion.form>

        {/* Footer Text */}
        <motion.p
          variants={fadeIn}
          className="text-center mt-4 text-sm text-gray-600 animate-fade-in"
        >
          Hassle Free. Beautiful. Memorable.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
