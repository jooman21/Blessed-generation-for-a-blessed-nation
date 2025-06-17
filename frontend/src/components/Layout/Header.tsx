import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleProjectsDropdown = () => {
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
    setIsAboutUsDropdownOpen(false); // Close other dropdowns
  };

  const toggleAboutUsDropdown = () => {
    setIsAboutUsDropdownOpen(!isAboutUsDropdownOpen);
    setIsProjectsDropdownOpen(false); // Close other dropdowns
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-transparent shadow-none' : 'bg-[#005073] shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-black text-2xl font-bold hover:text-gray-300 transition duration-300">Blessed generation for a blessed nation</Link>
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
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-black font-bold hover:text-gray-300 transition duration-300">Home</Link>

            <div className="relative">
              <button onClick={toggleProjectsDropdown} className="text-black font-bold hover:text-gray-300 transition duration-300 focus:outline-none">
                Projects
                <svg className="ml-1 inline-block h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </button>
              {isProjectsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[#005073] rounded-md shadow-lg py-1 z-20">
                  <Link to="/projects" className="block px-4 py-2 text-black hover:bg-[#006d9e] transition duration-300" onClick={toggleProjectsDropdown}>Projects</Link>
                  <Link to="/volunteer" className="block px-4 py-2 text-black hover:bg-[#006d9e] transition duration-300" onClick={toggleProjectsDropdown}>Volunteer</Link>
                  <Link to="/stories" className="block px-4 py-2 text-black hover:bg-[#006d9e] transition duration-300" onClick={toggleProjectsDropdown}>Stories</Link>
                </div>
              )}
            </div>

            <Link to="/donate" className="text-black font-bold hover:text-gray-300 transition duration-300">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                Donate
              </button>
            </Link>
            
            <div className="relative">
              <button onClick={toggleAboutUsDropdown} className="text-black font-bold hover:text-gray-300 transition duration-300 focus:outline-none">
                About Us
                <svg className="ml-1 inline-block h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </button>
              {isAboutUsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[#005073] rounded-md shadow-lg py-1 z-20">
                  <Link to="/about" className="block px-4 py-2 text-black hover:bg-[#006d9e] transition duration-300" onClick={toggleAboutUsDropdown}>About Us</Link>
                  <Link to="/news-events" className="block px-4 py-2 text-black hover:bg-[#006d9e] transition duration-300" onClick={toggleAboutUsDropdown}>News & Events</Link>
                  <Link to="/contact" className="block px-4 py-2 text-black hover:bg-[#006d9e] transition duration-300" onClick={toggleAboutUsDropdown}>Contact</Link>
                </div>
              )}
            </div>

            <Link to="/login" className="text-black font-bold hover:text-gray-300 transition duration-300">Login</Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
              
              <button onClick={toggleProjectsDropdown} className="text-black font-bold hover:text-gray-300 transition duration-300 focus:outline-none text-left w-full">
                Projects
                <svg className="ml-1 inline-block h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </button>
              {isProjectsDropdownOpen && (
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/projects" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => { setIsMenuOpen(false); toggleProjectsDropdown(); }}>Projects</Link>
                  <Link to="/volunteer" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => { setIsMenuOpen(false); toggleProjectsDropdown(); }}>Volunteer</Link>
                  <Link to="/stories" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => { setIsMenuOpen(false); toggleProjectsDropdown(); }}>Stories</Link>
                </div>
              )}

              <Link to="/donate" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 w-full">
                  Donate
                </button>
              </Link>
              
              <button onClick={toggleAboutUsDropdown} className="text-black font-bold hover:text-gray-300 transition duration-300 focus:outline-none text-left w-full">
                About Us
                <svg className="ml-1 inline-block h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </button>
              {isAboutUsDropdownOpen && (
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/about" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => { setIsMenuOpen(false); toggleAboutUsDropdown(); }}>About Us</Link>
                  <Link to="/news-events" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => { setIsMenuOpen(false); toggleAboutUsDropdown(); }}>News & Events</Link>
                  <Link to="/contact" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => { setIsMenuOpen(false); toggleAboutUsDropdown(); }}>Contact</Link>
                </div>
              )}

              <Link to="/login" className="text-black font-bold hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
