import React, { useState } from 'react';

const tabs = ['News', 'Editorials', 'Events', 'Reports'];

const sampleCards = {
  News: [
    {
      title: 'Niger shuts down Red Cross humanitarian operations',
      date: 'Jun 10, 2025',
      image: '/firstlady/blind boarding school.jpg', // Placeholder image
    },
    {
      title: 'NDF report shows record climate finance results',
      date: 'Jun 10, 2025',
      image: '/firstlady/Community 1.jpg',
    },
    {
      title: 'Norwegian aid agency backs LGBTQ+ rights globally',
      date: 'Jun 10, 2025',
      image: '/firstlady/Education 1.jpg',
    },
    {
      title: 'Tourism recovery creates 1.7 million jobs in Kenya',
      date: 'Jun 10, 2025',
      image: '/firstlady/Education 2.jpg',
    },
    {
      title: 'Luxembourg joins $100 million fund for island climate action',
      date: 'Jun 10, 2025',
      image: '/firstlady/zinash achievement.jpg',
    },
    {
      title: 'Philippines launches new program for fishing worker rights',
      date: 'Jun 10, 2025',
      image: '/firstlady/Zinash Grand Hotel.jpg',
    },
  ],
  Editorials: [
    {
      title: 'The long shadow of colonialism in today\'s development discourse',
      date: 'Apr 29, 2025',
      image: '/firstlady/zinash helping.jpg',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: '/firstlady/Zinash Taya.jpg',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+E3',
    },
  ],
  Events: [
    {
      title: '2025 Global Climate Conference – Geneva',
      date: 'May 12, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+Ev1',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+Ev2',
    },
    {
      title: 'World Economic Forum Africa Edition – Kigali',
      date: 'June 5, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+Ev3',
    },
  ],
  Reports: [
    {
      title: 'UNICEF 2025 Annual Report on Child Nutrition in East Africa',
      date: 'Apr 15, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+R1',
    },
    {
      title: 'World Bank Infrastructure Investment Outlook 2025',
      date: 'Apr 10, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+R2',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Image+R3',
    },
  ],
};

function LatestNewsSection() {
  const [activeTab, setActiveTab] = useState('News');

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
        Latest development News & Events
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        We cover more than 150 news sources daily, keeping up with top headlines from major
        multilateral and bilateral financial institutions as well as UN and EC agencies.
      </p>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 mb-8 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium focus:outline-none transition-colors duration-300 ${activeTab === tab ? 'text-[#005073] border-b-2 border-[#005073]' : 'text-gray-600 hover:text-[#005073]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCards[activeTab]?.length ? (
          sampleCards[activeTab].map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                {card.video ? (
                  <iframe
                    className="w-full h-full"
                    src={card.video}
                    title={`Video ${index}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : card.image ? (
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No media available</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{card.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No items available in this category.</div>
        )}
      </div>
    </section>
  );
}

export default LatestNewsSection;
