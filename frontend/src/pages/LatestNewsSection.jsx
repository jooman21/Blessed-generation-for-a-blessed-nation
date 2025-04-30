import React, { useState } from 'react';

const tabs = ['News', 'Editorials', 'Events', 'Reports'];

const sampleCards = {
  News: [
    {
      title: 'Plague of rats and insects provide latest challenge for war-shattered Gazans',
      date: 'Apr 30, 2025',
      video: 'https://www.youtube.com/embed/7eTLawS_eV8?si=Z69HHQDsJe6vNt8I',
    },
    {
      title: 'Antibiotics most responsible for drug resistance are overused – WHO report',
      date: 'Apr 30, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'Myanmar faces new challenges as monsoon season looms',
      date: 'Apr 30, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
  ],
  Editorials: [
    {
      title: 'The long shadow of colonialism in today’s development discourse',
      date: 'Apr 29, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
  ],
  Events: [
    {
      title: '2025 Global Climate Conference – Geneva',
      date: 'May 12, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'World Economic Forum Africa Edition – Kigali',
      date: 'June 5, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
  ],
  Reports: [
    {
      title: 'UNICEF 2025 Annual Report on Child Nutrition in East Africa',
      date: 'Apr 15, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'World Bank Infrastructure Investment Outlook 2025',
      date: 'Apr 10, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      title: 'Sustainable development requires more than just greenwashing',
      date: 'Apr 28, 2025',
      image: 'https://via.placeholder.com/400x300',
    },
  ],
};

function LatestNewsSection() {
  const [activeTab, setActiveTab] = useState('News');

  return (
    <section className="py-10 px-4 md:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-2 text-center text-black">
        Latest development News & Events
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        We cover more than 150 news sources daily, keeping up with top headlines from major
        multilateral and bilateral financial institutions as well as UN and EC agencies.
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCards[activeTab]?.length ? (
          sampleCards[activeTab].map((card, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
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
