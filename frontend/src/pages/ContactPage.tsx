import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">Have questions or want to get in touch? Fill out the form below or use the contact information provided. We look forward to hearing from you!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={5} className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information & FAQ */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-2"><strong>Address:</strong> 123 Charity Lane, Helping City, HC 12345</p>
            <p className="mb-2"><strong>Email:</strong> info@ngoname.org</p>
            <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
            {/* Add Map embed here if needed */}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-3">
            {/* FAQ Item 1 */}
            <div>
              <h3 className="font-medium">How can I donate?</h3>
              <p className="text-gray-600 text-sm">You can donate securely through our <a href="/donate" className="text-blue-600 hover:underline">Donate page</a> using various payment methods.</p>
            </div>
            {/* FAQ Item 2 */}
            <div>
              <h3 className="font-medium">How do I volunteer?</h3>
              <p className="text-gray-600 text-sm">Visit our <a href="/volunteer" className="text-blue-600 hover:underline">Volunteer page</a> to see current opportunities and sign up.</p>
            </div>
            {/* FAQ Item 3 */}
            <div>
              <h3 className="font-medium">Where does my donation go?</h3>
              <p className="text-gray-600 text-sm">We ensure that the majority of your donation goes directly to funding our projects and programs. You can find detailed financial information in our annual reports.</p>
            </div>
            {/* More FAQs can be added dynamically from the CMS */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

