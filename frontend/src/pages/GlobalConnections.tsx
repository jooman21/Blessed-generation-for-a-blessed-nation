import React from 'react';

const GlobalConnections: React.FC = () => {
  const allLogos = [
    '/logo/CBE.jpg',
    '/logo/pmo.jpg',
    '/logo/telebirr.png',
    '/logo/un-womwn.png',
    '/logo/PSEA.png',
    '/logo/unicef.png',
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 overflow-hidden">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Partner
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>

        {/* Marquee wrapper with gradient fades */}
        <div className="relative w-full overflow-hidden">
          {/* Left gradient fade */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          {/* Right gradient fade */}
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="flex animate-marquee whitespace-nowrap">
            {allLogos.concat(allLogos).map((logo, index) => (
              <div key={index} className="flex-shrink-0 px-8">
                <img
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalConnections;
