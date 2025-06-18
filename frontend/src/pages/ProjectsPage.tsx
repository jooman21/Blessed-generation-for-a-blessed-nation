import React from 'react';
import { motion } from 'framer-motion';
import FeaturedProjects from './featuredProjects';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ProjectsPage: React.FC = () => {
  return (
    <motion.div
      className="pt-32"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <FeaturedProjects />

      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4 text-center"
        variants={fadeInUp}
      >
        Our Projects
        <div className="w-24 h-1 bg-blue-500 mt-2 mx-auto"></div>
      </motion.h1>

      <motion.div className="bg-gray-100 p-4 rounded-lg mb-6" variants={fadeInUp}>
        <h2 className="text-xl font-semibold mb-2">Filter Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Category', 'Location', 'Status'].map((label, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <select className="w-full p-2 border border-gray-300 rounded">
                {label === 'Category' && (
                  <>
                    <option value="">All Categories</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="environment">Environment</option>
                    <option value="community">Community Development</option>
                  </>
                )}
                {label === 'Location' && (
                  <>
                    <option value="">All Locations</option>
                    <option value="urban">Urban</option>
                    <option value="rural">Rural</option>
                    <option value="international">International</option>
                  </>
                )}
                {label === 'Status' && (
                  <>
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
      >
        {[
          {
            status: 'Active',
            title: 'Clean Water Initiative',
            desc: 'Providing clean water access to rural communities through well construction and water purification systems.',
            location: 'Rural Areas',
            image: '/projects/water.jpg',
            tagColor: 'green',
          },
          {
            status: 'Upcoming',
            title: 'Education for All',
            desc: 'Building schools and providing educational resources for underprivileged children in urban areas.',
            location: 'Urban Centers',
            image: '/projects/edu.jpg',
            tagColor: 'yellow',
          },
          {
            status: 'Completed',
            title: 'Community Garden',
            desc: 'Created sustainable community gardens to promote food security and environmental awareness.',
            location: 'Suburban Areas',
            image: '/projects/garden.jpg',
            tagColor: 'gray',
          },
        ].map((project, idx) => (
          <motion.div
            key={idx}
            className="border rounded-lg overflow-hidden shadow-md"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-48 w-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <span
                className={`inline-block bg-${project.tagColor}-100 text-${project.tagColor}-800 text-xs px-2 py-1 rounded-full mb-2`}
              >
                {project.status}
              </span>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Location: {project.location}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-8 text-center" variants={fadeInUp}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
        >
          Switch to Map View
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage;