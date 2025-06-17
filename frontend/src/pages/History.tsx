import React from 'react';
import { motion } from 'framer-motion';

const historyTimeline = [
  {
    year: "2005",
    text: "Founded with a vision to uplift underrepresented communities.",
    icon: "🤝"
  },
  {
    year: "2010",
    text: "Launched major education and healthcare programs nationwide.",
    icon: "🏥"
  },
  {
    year: "2015",
    text: "Expanded to international partnerships and outreach.",
    icon: "🌍"
  },
  {
    year: "2020",
    text: "Initiated women empowerment and youth leadership projects.",
    icon: "👩‍🎓"
  },
  {
    year: "2024",
    text: "Redefined strategy with sustainability and innovation at the core.",
    icon: "🚀"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60 } }
};

const HistorySection = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-white to-blue-50">
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        Our Brief History
        <motion.div
          className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
        />
      </motion.h2>

      <motion.div
        className="relative border-l-4 border-blue-500 pl-6 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {historyTimeline.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="mb-12 relative group"
          >
            {/* Timeline Circle */}
            <div className="absolute -left-[42px] top-1 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            {/* Year and Text */}
            <h4 className="text-xl font-bold text-blue-700 group-hover:text-blue-900 transition-colors">
              {item.year}
            </h4>
            <p className="text-gray-700 mt-2 leading-relaxed group-hover:text-gray-900 transition-colors text-[1.05rem]">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HistorySection;
