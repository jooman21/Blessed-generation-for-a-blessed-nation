import React, { useState } from 'react';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data - will be fetched from backend in real implementation
  const userData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA',
    role: 'Donor',
    joinDate: 'January 15, 2024',
    donations: [
      { id: 1, date: 'April 10, 2025', amount: '$100.00', project: 'Clean Water Initiative', status: 'Completed' },
      { id: 2, date: 'March 5, 2025', amount: '$75.00', project: 'Education for All', status: 'Completed' },
      { id: 3, date: 'February 20, 2025', amount: '$50.00', project: 'Community Garden', status: 'Completed' }
    ],
    volunteering: [
      { id: 1, date: 'April 15, 2025', event: 'Community Cleanup', hours: 3, status: 'Completed' },
      { id: 2, date: 'May 10, 2025', event: 'Fundraising Gala', hours: 4, status: 'Upcoming' }
    ]
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div>
          <h2 className="text-2xl font-semibold">{userData.firstName} {userData.lastName}</h2>
          <p className="text-gray-600">{userData.role} since {userData.joinDate}</p>
          <div className="mt-4 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Edit Profile</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">Change Password</button>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b mb-6">
        <nav className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile Information
          </button>
          <button 
            onClick={() => setActiveTab('donations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'donations' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Donation History
          </button>
          <button 
            onClick={() => setActiveTab('volunteering')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'volunteering' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Volunteer Activities
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Profile Information Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p>{userData.firstName} {userData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{userData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>{userData.address}</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-4">Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="email-updates" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                <label htmlFor="email-updates" className="ml-2 block text-gray-700">
                  Receive email updates about our projects
                </label>
              </div>
              <div className="flex items-center">
                <input id="newsletter" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                <label htmlFor="newsletter" className="ml-2 block text-gray-700">
                  Subscribe to monthly newsletter
                </label>
              </div>
              <div className="flex items-center">
                <input id="volunteer-opportunities" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="volunteer-opportunities" className="ml-2 block text-gray-700">
                  Notify me about volunteer opportunities
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Donation History Tab */}
        {activeTab === 'donations' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Donation History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.donations.map(donation => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donation.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.project}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                        <a href="#">Download</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Make a New Donation</button>
            </div>
          </div>
        )}
        
        {/* Volunteer Activities Tab */}
        {activeTab === 'volunteering' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Volunteer Activities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.volunteering.map(activity => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.event}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.hours}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Find Volunteer Opportunities</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
