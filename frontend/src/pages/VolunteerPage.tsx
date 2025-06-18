import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const VolunteerPage: React.FC = () => {
  return (
    <motion.div
      className="pt-32 px-4 max-w-7xl mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
        Volunteer Opportunities
        <div className="w-24 h-1 bg-blue-500 mt-2 mx-auto"></div>
      </h1>

      {/* Filters Section */}
      <motion.div 
        className="bg-gray-100 p-6 rounded-xl shadow-lg mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Filter Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Type of Work', options: ['All Types', 'Event Support', 'Administrative', 'Field Work', 'Fundraising', 'Mentoring'] },
            { label: 'Location', options: ['All Locations', 'On-site', 'Remote'] },
            { label: 'Time Commitment', options: ['Any Commitment', 'Short-term (Days/Weeks)', 'Long-term (Months)', 'Flexible'] },
          ].map((filter, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>
              <select className="w-full p-3 border border-gray-300 rounded-md shadow-sm">
                {filter.options.map((option, i) => (
                  <option key={i} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Volunteer Opportunities List */}
      <div className="space-y-10">
        {[{
          title: 'Event Staff for Annual Gala',
          desc: 'Help with setup, registration, and guest assistance at our major fundraising event.',
          details: ['Type: Event Support', 'Location: On-site (City Hall)', 'Commitment: Short-term (1 day)', 'Date: June 15, 2025'],
        }, {
          title: 'Social Media Assistant (Remote)',
          desc: 'Assist our communications team with creating and scheduling social media content.',
          details: ['Type: Administrative', 'Location: Remote', 'Commitment: Long-term (3-5 hrs/week)'],
        }, {
          title: 'Community Garden Helper',
          desc: 'Help maintain our community garden, including planting, weeding, and harvesting.',
          details: ['Type: Field Work', 'Location: On-site (Community Center)', 'Commitment: Flexible (Weekends)'],
        }].map((opportunity, idx) => (
          <motion.div
            key={idx}
            className="border rounded-xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center bg-white hover:shadow-xl transition-shadow duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">{opportunity.title}</h3>
              <p className="text-gray-600 mb-3 max-w-2xl">{opportunity.desc}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                {opportunity.details.map((detail, i) => (
                  <span key={i}>{detail}</span>
                ))}
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:ml-4">
              <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-2 rounded-full shadow-md">Sign Up</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VolunteerPage;