import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Green Legacy",
    image: "/projects/garden.jpg",
  },
  {
    title: "Shelter For all",
    image: "/projects/shelter.jpg",
  },
  {
    title: "Food for  All",
    image: "/projects/food.jpg",
  },
  {
    title: "Clean Water for All",
    image: "/projects/water.jpg",
  },
  {
    title: "Education for All",
    image: "/projects/edu.jpg",
  },
  {
    title: "Vacination  for All Child",
    image: "/projects/vacination.jpg",
  },
  {
    title: "Medication  for All",
    image: "/projects/med.jpg",
  },
  {
    title: "Farming for All",
    image: "/projects/farming for all.jpg",
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

const FeaturedProjects: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => {
        const nextOffset = prevOffset - 1;
        return Math.abs(nextOffset) >= projects.length ? 0 : nextOffset;
      });
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="py-24 bg-neutral-50 text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="mb-8">
        <div className="flex justify-center items-center mb-2">
          <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold">FEATURED Projects</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max animate-slide whitespace-nowrap"
          style={{ transform: `translateX(${offset * 320}px)`, transition: "transform 1s ease-in-out" }}
        >
          {[...projects, ...projects].map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] h-[280px] flex items-center justify-center px-4"
            >
              <motion.div
                className="w-full h-full rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg shadow-md bg-[#005073] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="z-10 uppercase text-center text-sm md:text-base">
                  {project.title}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedProjects;
