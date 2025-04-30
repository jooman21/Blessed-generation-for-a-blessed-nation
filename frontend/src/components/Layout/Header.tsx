import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl  text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Blessed generation for a blessed nation</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Home</Link>
            <Link to="/about" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">About Us</Link>
            <Link to="/projects" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Projects</Link>
            <Link to="/news-events" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">News & Events</Link>
            <Link to="/volunteer" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Volunteer</Link>
            <Link to="/donate" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-4 rounded-full transition duration-300">
                Donate
              </button>
            </Link>
            <Link to="/stories" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Stories</Link>
            <Link to="/contact" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Contact</Link>
            <Link to="/login" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300">Login</Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/projects" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              <Link to="/news-events" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>News & Events</Link>
              <Link to="/volunteer" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Volunteer</Link>
              <Link to="/stories" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Stories</Link>
              <Link to="/contact" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/login" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/donate" className="text-yellow-500 font-bold hover:text-yellow-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-4 rounded-full transition duration-300 w-full">
                  Donate
                </button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
