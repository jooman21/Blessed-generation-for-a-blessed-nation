import React from 'react';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Donations</h2>
          <p className="text-3xl font-bold text-blue-600">$125,670</p>
          <p className="text-sm text-gray-500">+5% from last month</p>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Volunteers</h2>
          <p className="text-3xl font-bold text-green-600">85</p>
          <p className="text-sm text-gray-500">+10 new this month</p>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Ongoing Projects</h2>
          <p className="text-3xl font-bold text-yellow-600">12</p>
          <p className="text-sm text-gray-500">3 completed last quarter</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Content Management</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Manage website content such as projects, news, events, team members, and more.</p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Manage Projects</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Manage News & Events</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Manage Volunteers</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Manage Donations</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Manage Team Members</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Manage FAQs</button>
        </div>
      </div>
      {/* More admin functionalities like user management, settings etc. can be added here */}
    </div>
  );
};

export default AdminDashboardPage;

