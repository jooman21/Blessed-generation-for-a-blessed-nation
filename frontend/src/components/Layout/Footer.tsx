import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#005073] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Blessed generation for a blessed nation</h3>
            <p className="text-white font-bold">
            "Empowering a blessed generation to build a prosperous and purpose-driven nation."
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="grid grid-flow-col grid-rows-3 gap-x-6 gap-y-2">
              <li><a href="/" className="text-white font-bold hover:text-gray-300 transition duration-300">Home</a></li>
              <li><a href="/about" className="text-white font-bold hover:text-gray-300 transition duration-300">About Us</a></li>
              <li><a href="/projects" className="text-white font-bold hover:text-gray-300 transition duration-300">Projects</a></li>
              <li><a href="/volunteer" className="text-white font-bold hover:text-gray-300 transition duration-300">Volunteer</a></li>
              <li><a href="/stories" className="text-white font-bold hover:text-gray-300 transition duration-300">Stories</a></li>
              <li><a href="/news-events" className="text-white font-bold hover:text-gray-300 transition duration-300">News & Events</a></li>
              <li><a href="/donate" className="text-white font-bold hover:text-gray-300 transition duration-300">Donate</a></li>
              <li><a href="/contact" className="text-white font-bold hover:text-gray-300 transition duration-300">Contact</a></li>
              <li><a href="/login" className="text-white font-bold hover:text-gray-300 transition duration-300">Login</a></li>
            </ul>
          </div>
          
          {/* Contact Info & Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-white font-bold mb-2">123 Charity Lane, Helping City, HC 12345</p>
            <p className="text-white font-bold mb-4">Email: info@ngoname.org</p>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">FB</a>
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">TW</a>
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">IG</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-700">
          © {new Date().getFullYear()} NGO Name. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

