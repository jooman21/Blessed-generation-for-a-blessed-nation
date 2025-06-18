import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OurImpactSection from '../pages/OurImpactSection';
import ImpactStats from '../pages/ImpactStats';
import LatestNewsSection from '../pages/LatestNewsSection';
import GlobalConnections from './GlobalConnections';

const HomePage: React.FC = () => {
  const images = [
    '/firstlady/zinash helping.jpg',
    '/firstlady/zinash achievement.jpg',
    '/firstlady/Charity work.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <motion.div
        className="absolute top-20 left-0 w-full h-[700px] md:h-[70vh] z-1"
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="absolute top-20 left-0 w-full h-[700px] md:h-[70vh] bg-blue-900 bg-opacity-50 z-0" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] md:min-h-[70vh] flex items-center justify-center overflow-hidden p-0 m-0">
        <motion.div
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full py-12 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Left */}
          <motion.div
            className="flex flex-col justify-center text-white md:pr-8 pl-10"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Empowering the Next Generation to Uplift the Nation
            </h2>
            <p className="mb-8 text-lg md:pr-8">
              We empower communities by investing in the next generation through education and sustainable development. From building schools and strengthening local infrastructure to providing access to clean water, healthcare, and vocational training — our mission is to uplift underserved areas and create lasting change.
            </p>
            <a href="#" className="text-white font-semibold underline hover:text-yellow-400 transition-colors duration-300">
              Learn more about us &rarr;
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex justify-end pr-4 md:pr-16"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 w-full max-w-md backdrop-blur-md">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Register for free</h3>
              <p className="text-center text-gray-600 mb-6 text-sm">
                Get started by selecting one of the options below
              </p>
              <div className="space-y-4">
                <motion.button whileHover={{ scale: 1.05 }} className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-4 text-blue-500 font-semibold text-lg hover:bg-blue-50 transition">
                  Organization
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-4 text-blue-500 font-semibold text-lg hover:bg-blue-50 transition">
                  Funding agency
                </motion.button>
              </div>
              <p className="text-center text-gray-600 mt-6 text-sm">
                Already have an account? <a href="#" className="text-blue-500 underline">Sign in</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Other sections */}
      <section className="bg-white py-8 mt-auto">
        <OurImpactSection />
      </section>

      <section className="bg-white py-8 mt-auto">
        <ImpactStats />
      </section>

      <div>
        <GlobalConnections />
      </div>

      <div>
        <LatestNewsSection />
      </div>
    </div>
  );
};

export default HomePage;