import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import FestiveLanding from './components/FestiveLanding';
import FestiveSteps from './components/FestiveSteps';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <div className="app relative min-h-screen">
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isLoading && (
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                  >
                    <FestiveLanding />
                    <FestiveSteps />
                    <HowItWorks />
                    <Footer />
                  </motion.div>
                }
              />
              <Route path="/register" element={<RegistrationForm />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;