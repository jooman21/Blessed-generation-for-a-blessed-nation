import React from 'react';
import OurImpactSection from '../pages/OurImpactSection'
import ImpactStats from '../pages/ImpactStats'



const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image and overlay: covers header + hero */}
      <div
        className="absolute top-0 left-0 w-full h-[700px] md:h-[70vh] z-1"
        style={{
          backgroundImage: "url('/firstlady/zinash helping.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[700px] md:h-[70vh] bg-blue-900 bg-opacity-60 z-0"></div>

      {/* Transparent Header overlays the image */}
   
      {/* Hero Section: Full width, no white space */}
      <section className="relative w-full min-h-[600px] md:min-h-[70vh] flex items-center justify-center overflow-hidden p-0 m-0">
        {/* Foreground content */}
        <div className="relative z-10 flex flex-col md:flex-row w-full px-8 py-12">
          {/* Left: Description */}
          <div className="flex-1 flex flex-col justify-center text-white md:pr-16 mb-8 md:mb-0">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
            Empowering the Next Generation to Uplift the Nation
            </h2>
            <p className="mb-8 text-lg">
            We empower communities by investing in the next generation through education and sustainable development. From building schools and strengthening local infrastructure to providing access to clean water, healthcare, and vocational training — our mission is to uplift underserved areas and create lasting change. By equipping youth and communities with the resources they need, we’re laying the foundation for a truly blessed nation.
            </p>
            <a href="#" className="text-white font-semibold underline hover:text-yellow-400">
              Learn more about us &rarr;
            </a>
          </div>

          {/* Right: Registration Form Card */}
          <div className="flex-1 flex justify-center">
            <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Register for free</h3>
              <p className="text-center text-gray-600 mb-6 text-sm">
                Get started by selecting one of the options below
              </p>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-4 text-blue-500 font-semibold text-lg hover:bg-blue-50 transition">
                  Individual
                </button>
                <button className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-4 text-blue-500 font-semibold text-lg hover:bg-blue-50 transition">
                  Organization
                </button>
                <button className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-4 text-blue-500 font-semibold text-lg hover:bg-blue-50 transition">
                  Funding agency
                </button>
              </div>
              <p className="text-center text-gray-600 mt-6 text-sm">
                Already have an account? <a href="#" className="text-blue-500 underline">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections/components can go here */}  
      <section className="bg-white text-white py-8 mt-auto">
        <OurImpactSection />
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-lg text-gray-700">
           
          </p>
        </div>
      </section>
      <section className="bg-white text-white py-8 mt-auto">
        {/* <LatestNewsSection/> */}
        <ImpactStats />
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-lg text-gray-700">
           
          </p>
        </div>
      </section>
  
    </div>
  );
};

export default HomePage;