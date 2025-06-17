import React, { useState, useEffect } from 'react';

const GlobalConnections: React.FC = () => {
  // Placeholder image paths for two sets of logos
  const logoSets = [
    [
      '/path/to/logo1.png',
      '/path/to/logo2.png',
      '/path/to/logo3.png',
      '/path/to/logo4.png',
      '/path/to/logo5.png',
      '/path/to/logo6.png',
      '/path/to/logo7.png',
    ],
    [
      '/path/to/logo8.png',
      '/path/to/logo9.png',
      '/path/to/logo10.png',
      '/path/to/logo11.png',
      '/path/to/logo12.png',
      '/path/to/logo13.png',
      '/path/to/logo14.png',
    ],
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 1) % logoSets.length);
    }, 30000); // Rotate every 30 seconds

    return () => clearInterval(interval);
  }, [logoSets.length]);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Global connections
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {logoSets[currentSetIndex].map((logo, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img src={logo} alt={`Partner Logo ${index + 1}`} className="max-h-16 w-auto object-contain transition-opacity duration-1000 ease-in-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalConnections; 