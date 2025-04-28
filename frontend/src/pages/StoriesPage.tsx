import React from 'react';

const StoriesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Stories & Testimonials</h1>
      <p className="mb-6">Read inspiring stories from the people we've helped and testimonials from our volunteers and donors.</p>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Story Card 1 */}
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div> {/* Placeholder for image */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Maria's Journey to Education</h3>
            <p className="text-gray-600 mb-4">Maria, a young girl from a rural village, shares how our education program changed her life and future prospects.</p>
            <button className="text-blue-600 hover:text-blue-800">Read Full Story →</button>
          </div>
        </div>

        {/* Story Card 2 */}
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div> {/* Placeholder for image */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Clean Water for Riverside Community</h3>
            <p className="text-gray-600 mb-4">How our clean water initiative transformed health outcomes for an entire community of 500 people.</p>
            <button className="text-blue-600 hover:text-blue-800">Read Full Story →</button>
          </div>
        </div>

        {/* Story Card 3 */}
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div> {/* Placeholder for image */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Building Homes After the Storm</h3>
            <p className="text-gray-600 mb-4">The recovery effort that helped rebuild 12 homes for families affected by the coastal flooding last year.</p>
            <button className="text-blue-600 hover:text-blue-800">Read Full Story →</button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Testimonial 1 */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div> {/* Placeholder for avatar */}
            <div>
              <h3 className="font-semibold">John Smith</h3>
              <p className="text-sm text-gray-600">Monthly Donor since 2023</p>
            </div>
          </div>
          <blockquote className="italic text-gray-700">
            "I've been supporting this NGO for years now, and I'm always impressed by the transparency and impact of their work. It's rewarding to see exactly how my donations are making a difference."
          </blockquote>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div> {/* Placeholder for avatar */}
            <div>
              <h3 className="font-semibold">Sarah Johnson</h3>
              <p className="text-sm text-gray-600">Volunteer</p>
            </div>
          </div>
          <blockquote className="italic text-gray-700">
            "Volunteering with this organization has been one of the most fulfilling experiences of my life. The team is dedicated and passionate, and I've seen firsthand the positive impact we're making in communities."
          </blockquote>
        </div>
      </div>

      {/* Submit Your Story Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>
        <p className="mb-4">Have you been impacted by our work? Are you a volunteer or donor with a story to share? We'd love to hear from you!</p>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Relationship to Us</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">Select an option</option>
              <option value="beneficiary">Program Beneficiary</option>
              <option value="volunteer">Volunteer</option>
              <option value="donor">Donor</option>
              <option value="partner">Partner Organization</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
            <textarea rows={5} className="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos (Optional)</label>
            <input type="file" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Submit Your Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoriesPage;
