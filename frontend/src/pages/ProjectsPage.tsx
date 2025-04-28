import React from 'react';

const ProjectsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Our Projects</h1>
      <p className="mb-4">Browse our active, upcoming, and completed projects. Use the filters below to find projects by category, location, or impact.</p>
      
      {/* Filters Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Categories</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="environment">Environment</option>
              <option value="community">Community Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Locations</option>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
              <option value="international">International</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Projects Grid - Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* This will be populated with actual project data from the backend */}
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">Active</span>
            <h3 className="text-xl font-semibold mb-2">Clean Water Initiative</h3>
            <p className="text-gray-600 mb-4">Providing clean water access to rural communities through well construction and water purification systems.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Location: Rural Areas</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">View Details</button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">Upcoming</span>
            <h3 className="text-xl font-semibold mb-2">Education for All</h3>
            <p className="text-gray-600 mb-4">Building schools and providing educational resources for underprivileged children in urban areas.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Location: Urban Centers</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">View Details</button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">Completed</span>
            <h3 className="text-xl font-semibold mb-2">Community Garden</h3>
            <p className="text-gray-600 mb-4">Created sustainable community gardens to promote food security and environmental awareness.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Location: Suburban Areas</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">View Details</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map View Toggle - Placeholder */}
      <div className="mt-8 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
          Switch to Map View
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage;
