import React from 'react';

const VolunteerPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Volunteer Opportunities</h1>
      <p className="mb-6">Find ways to get involved and make a difference. Browse our current volunteer needs and sign up for opportunities that match your skills and availability.</p>

      {/* Filters Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Work</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Types</option>
              <option value="event-support">Event Support</option>
              <option value="admin">Administrative</option>
              <option value="field-work">Field Work</option>
              <option value="fundraising">Fundraising</option>
              <option value="mentoring">Mentoring</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Locations</option>
              <option value="on-site">On-site</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Commitment</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">Any Commitment</option>
              <option value="short-term">Short-term (Days/Weeks)</option>
              <option value="long-term">Long-term (Months)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Volunteer Opportunities List - Placeholder */}
      <div className="space-y-6">
        {/* This will be populated with actual opportunity data from the backend */}
        <div className="border rounded-lg p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1">Event Staff for Annual Gala</h3>
            <p className="text-gray-600 mb-2">Help with setup, registration, and guest assistance at our major fundraising event.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <span>Type: Event Support</span>
              <span>Location: On-site (City Hall)</span>
              <span>Commitment: Short-term (1 day)</span>
              <span>Date: June 15, 2025</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">Sign Up</button>
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1">Social Media Assistant (Remote)</h3>
            <p className="text-gray-600 mb-2">Assist our communications team with creating and scheduling social media content.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <span>Type: Administrative</span>
              <span>Location: Remote</span>
              <span>Commitment: Long-term (3-5 hrs/week)</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">Sign Up</button>
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1">Community Garden Helper</h3>
            <p className="text-gray-600 mb-2">Help maintain our community garden, including planting, weeding, and harvesting.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <span>Type: Field Work</span>
              <span>Location: On-site (Community Center)</span>
              <span>Commitment: Flexible (Weekends)</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;

