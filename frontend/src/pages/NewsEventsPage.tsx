import React from 'react';

const NewsEventsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">News & Events</h1>
      <p className="mb-6">Stay updated with the latest news from our NGO and find information about upcoming events like fundraisers and volunteer activities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* News Feed Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Latest News</h2>
          {/* Placeholder for News Articles - will be fetched dynamically */}
          <div className="space-y-4">
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-1">NGO Launches New Literacy Program</h3>
              <p className="text-sm text-gray-500 mb-2">April 25, 2025</p>
              <p className="text-gray-700">Read about our latest initiative aimed at improving literacy rates in underserved communities...</p>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Read More</a>
            </div>
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-1">Successful Fundraising Gala</h3>
              <p className="text-sm text-gray-500 mb-2">April 15, 2025</p>
              <p className="text-gray-700">Our annual gala raised significant funds for upcoming projects. Thank you to all our donors!</p>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Read More</a>
            </div>
          </div>
        </div>

        {/* Events Calendar Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Upcoming Events</h2>
          {/* Placeholder for Event Calendar/List - will be fetched dynamically */}
          <div className="space-y-4">
            <div className="border p-4 rounded-lg shadow-sm bg-blue-50">
              <h3 className="text-xl font-semibold mb-1">Community Cleanup Drive</h3>
              <p className="text-sm text-gray-500 mb-2">May 10, 2025 | 9:00 AM - 12:00 PM</p>
              <p className="text-gray-700">Join us for a community cleanup event at Central Park. Volunteers needed!</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2">Register</button>
            </div>
            <div className="border p-4 rounded-lg shadow-sm bg-blue-50">
              <h3 className="text-xl font-semibold mb-1">Online Workshop: Sustainable Living</h3>
              <p className="text-sm text-gray-500 mb-2">May 20, 2025 | 6:00 PM - 7:30 PM</p>
              <p className="text-gray-700">Learn practical tips for a more sustainable lifestyle in our interactive online workshop.</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2">Register</button>
            </div>
          </div>
          {/* Filters for events (category, date) can be added here */}
        </div>
      </div>
    </div>
  );
};

export default NewsEventsPage;

