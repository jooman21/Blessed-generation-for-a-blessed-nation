import React from 'react';
import { motion } from 'framer-motion';

const DonatePage: React.FC = () => {
  return (
    <motion.div
      className="pt-32 px-4 md:px-16 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Donate
      </motion.h1>
      <p className="mb-8 text-center text-gray-600 max-w-2xl mx-auto">
        Your generous donations help us continue our mission and make a real difference in the communities we serve.
      </p>

      {/* Donation Progress Tracker */}
      <motion.div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-3">Current Fundraising Goal</h2>
        <p className="mb-4">Help us reach our goal of $50,000 for the Clean Water Initiative</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <motion.div className="bg-blue-600 h-4 rounded-full" style={{ width: '65%' }} initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5 }} />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>$32,500 raised</span>
          <span>$50,000 goal</span>
        </div>
        <p className="text-sm text-gray-600">Last updated: April 28, 2025</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Donation Form */}
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-semibold mb-4">Make a Donation</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
              <div className="grid grid-cols-3 gap-3 mb-2">
                {[25, 50, 100, 250, 500, 'Other'].map((val) => (
                  <button type="button" key={val} className="border border-blue-300 bg-blue-50 hover:bg-blue-100 py-2 rounded text-sm">
                    {typeof val === 'number' ? `$${val}` : val}
                  </button>
                ))}
              </div>
              <input type="text" placeholder="Custom Amount" className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input type="radio" name="donationType" className="mr-2" defaultChecked /> One-time
                </label>
                <label className="flex items-center">
                  <input type="radio" name="donationType" className="mr-2" /> Monthly
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded" />
              <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
              <select className="w-full p-2 border border-gray-300 rounded">
                <option value="">-- Select a project --</option>
                <option value="project1">School Project</option>
                <option value="project2">Water Project</option>
                <option value="project3">Green LEGACY</option>
              </select>
              <input type="tel" placeholder="Phone (Optional)" className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Payment Information</h3>
              <p className="text-sm text-gray-600 mb-2">Secure payment processing will be integrated here.</p>
              <div className="flex space-x-3">
                <img src="/logo/telebirr.png" alt="Telebirr" className="w-24 h-12 object-contain rounded" />
                <img src="/logo/CBE.jpg" alt="CBE" className="w-24 h-12 object-contain rounded" />
              </div>
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded font-medium">
              Complete Donation
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your donation is tax-deductible to the extent allowed by law. You will receive a receipt for your records.
            </p>
          </form>
        </motion.div>

        {/* Your Impact */}
        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <h2 className="text-2xl font-semibold mb-4">Your Impact</h2>

          <div className="border rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-3">Impact Calculator</h3>
            <p className="text-sm text-gray-600 mb-3">See how your donation makes a difference:</p>

            <div className="space-y-4">
              <input type="number" defaultValue={100} className="w-full p-2 border border-gray-300 rounded" />

              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium mb-2">Your $100 donation can provide:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Clean water for 20 people for one month</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Educational materials for 5 children</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Medical supplies for a rural clinic for one week</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Why Others Donate</h3>
            <blockquote className="italic text-gray-700 mb-3">
              "I've been donating monthly for two years now. It's amazing to see the direct impact my contributions have on communities in need."
            </blockquote>
            <p className="text-sm font-medium">- Sarah Johnson, Monthly Donor</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DonatePage;
