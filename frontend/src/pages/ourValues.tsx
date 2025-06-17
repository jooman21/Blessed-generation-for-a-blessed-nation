import React from 'react';
import { motion } from 'framer-motion';

interface ValueItem {
  number: string;
  emoji: string;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    number: '01',
    emoji: '🤝',
    title: 'Customers Come First',
    description:
      'We are constantly working to improve our products and services for the people who matter most – our customers and partners.'
  },
  {
    number: '02',
    emoji: '🚀',
    title: 'Raise the Bar',
    description:
      'Whether it is designing apps to help donors track and maintain their projects or creating tools to help agencies and companies match with qualified candidates, we never stop looking for new ways to benefit our customers and partners.'
  },
  {
    number: '03',
    emoji: '🌍',
    title: 'Think Big',
    description:
      'We simply do not believe in resting on our laurels. That is why we are ceaselessly working to push the boundaries of what is possible to develop the next generation of products and services.'
  },
  {
    number: '04',
    emoji: '🧠',
    title: 'Be Open-Minded',
    description:
      'Diversity is more than a slogan for us. It is our way of ensuring that we get pushed out of our comfort zones to better connect with and understand our customers and partners.'
  },
  {
    number: '05',
    emoji: '📚',
    title: 'Never Stop Learning',
    description:
      'We believe that setbacks and mistakes are valuable components of the learning process. Analyzing where we have been and what we have learned along the way is part of our mission to deliver a world-class experience.'
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const OurValues: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-900 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Our values
      </motion.h2>

      <motion.div
        className="w-20 h-1 bg-blue-500 mx-auto mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      />

      <motion.p
        className="max-w-2xl mx-auto text-gray-600 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        The values that we live by every single day include:
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-left"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 bg-blue-50"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl font-bold text-blue-600 mr-2">{value.number}</span>
              <span className="text-2xl">{value.emoji}</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{value.title}</h3>
            <p className="text-gray-700 text-sm">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OurValues;
