import React from 'react';
import { motion } from 'framer-motion';
import History from './History'; // Assuming History.tsx is in the same directory
import OurValues from './ourValues';

const WhoWeAre: React.FC = () => {
  

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* About Us Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-24">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              About Us
              <div className="w-24 h-1 bg-blue-500 mt-2"></div>
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              DevelopmentAid is the world's premier information service provider for
              international development aid and economic and humanitarian assistance
              stakeholders.
            </p>
            <p className="text-gray-700 text-lg">
              Our mission is to provide up-to-date and critically relevant information for
              donors, agencies, consultancies, non-government agencies, and individuals
              working in the international development sector.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/firstlady/Zinash Taya.jpg" // Placeholder image path
              alt="Building"
              className="w-full max-w-lg h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Our Brief History Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <History />
        </motion.div>
        <div>
        < OurValues/>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre; 