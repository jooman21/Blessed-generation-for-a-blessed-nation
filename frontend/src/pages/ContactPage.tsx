import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 px-4 md:px-10 bg-gradient-to-tr from-white via-blue-50 to-blue-100 min-h-screen">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-4"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        Contact Us
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        initial="hidden"
        animate="show"
        custom={2}
        variants={fadeInUp}
      >
        Have questions or want to get in touch? Fill out the form below or use the contact information provided. We look forward to hearing from you!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg"
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Send Us a Message 💬</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Your message topic"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              🚀 Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info + FAQ */}
        <motion.div
          className="text-gray-700 space-y-10"
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeInUp}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">📍 Contact Information</h2>
            <p className="mb-2"><strong>Address:</strong> 123 Charity Lane, Helping City, HC 12345</p>
            <p className="mb-2"><strong>Email:</strong> info@ngoname.org</p>
            <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">❓ FAQs</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800">💰 How can I donate?</h3>
                <p className="text-gray-600">Visit our <a href="/donate" className="text-blue-600 underline">Donate page</a> to contribute securely.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🤝 How do I volunteer?</h3>
                <p className="text-gray-600">Go to the <a href="/volunteer" className="text-blue-600 underline">Volunteer page</a> for opportunities.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">📊 Where does my donation go?</h3>
                <p className="text-gray-600">We prioritize transparency. Check our annual report for full details.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
