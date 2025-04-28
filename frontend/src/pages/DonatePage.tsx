import React from 'react';

const DonatePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Donate</h1>
      <p className="mb-6">Your generous donations help us continue our mission and make a real difference in the communities we serve.</p>

      {/* Donation Progress Tracker */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Current Fundraising Goal</h2>
        <p className="mb-4">Help us reach our goal of $50,000 for the Clean Water Initiative</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>$32,500 raised</span>
          <span>$50,000 goal</span>
        </div>
        
        <p className="text-sm text-gray-600">Last updated: April 28, 2025</p>
      </div>

      {/* Donation Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Make a Donation</h2>
          <form className="space-y-4">
            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <button type="button" className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded">$25</button>
                <button type="button" className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded">$50</button>
                <button type="button" className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded">$100</button>
                <button type="button" className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded">$250</button>
                <button type="button" className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded">$500</button>
                <button type="button" className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded">Other</button>
              </div>
              <input type="text" placeholder="Custom Amount" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            
            {/* Donation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="donationType" className="mr-2" defaultChecked />
                  <span>One-time</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="donationType" className="mr-2" />
                  <span>Monthly</span>
                </label>
              </div>
            </div>
            
            {/* Donor Information */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input type="tel" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>
            
            {/* Payment Information - Placeholder */}
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Payment Information</h3>
              <p className="text-sm text-gray-600 mb-2">Secure payment processing will be integrated here.</p>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                <div className="w-8 h-5 bg-gray-300 rounded"></div>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded font-medium">
              Complete Donation
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              Your donation is tax-deductible to the extent allowed by law. You will receive a receipt for your records.
            </p>
          </form>
        </div>
        
        {/* Impact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Impact</h2>
          
          {/* Impact Calculator */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-3">Impact Calculator</h3>
            <p className="text-sm text-gray-600 mb-3">See how your donation makes a difference:</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Donation</label>
                <input type="number" defaultValue="100" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium mb-2">Your $100 donation can provide:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Clean water for 20 people for one month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Educational materials for 5 children</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Medical supplies for a rural clinic for one week</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Why Others Donate</h3>
            <blockquote className="italic text-gray-700 mb-3">
              "I've been donating monthly for two years now. It's amazing to see the direct impact my contributions have on communities in need."
            </blockquote>
            <p className="text-sm font-medium">- Sarah Johnson, Monthly Donor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
