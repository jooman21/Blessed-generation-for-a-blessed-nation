import React from 'react';

const InfoSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-6 bg-white">
      {/* ABOUT Section */}
      <div className="flex-1 max-w-sm bg-yellow-400 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="h-64 bg-gray-200"><img src="public\firstlady\Charity work.jpg" alt="" /></div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">ABOUT</h2>
          <p className="text-sm mb-6">
            First Lady Zinash Tayachew was born on January 13, 1978, in the historic and royal city of Gondar, Ethiopia. 
            Upon graduation from Fasiledes Secondary School in Gondar, Zinash Tayachew joined military service where she would meet her future husband, 
            the current Prime Minister of Ethiopia, Abiy Ahmed Ali. Prior to her role as the First Lady, Zinash Tayachew lived in exile with their three daughters in Denver, Colorado.
          </p>
          <button className="bg-white text-purple-500 px-4 py-2 rounded shadow hover:bg-purple-100 transition w-full">
            ➝ GO TO PAGE
          </button>
        </div>
      </div>

      {/* WHAT WE DO Section */}
      <div className="flex-1 max-w-sm bg-yellow-400 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="h-64 bg-gray-200"><img src="public\firstlady\zinash meet.jpg" alt="" /></div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">WHAT WE DO</h2>
          <p className="text-sm mb-6">
            Guided by compassion and a commitment to uplift communities, the Office of the First Lady leads a range of charitable and philanthropic initiatives 
            that touch lives and inspire change. From supporting education and healthcare to empowering women and children, 
            we work hand in hand with local and global partners to build a brighter, more inclusive future for all.
          </p>
          <button className="bg-white text-sky-500 px-4 py-2 rounded shadow hover:bg-sky-100 transition w-full">
            ➝ GO TO PAGE
          </button>
        </div>
      </div>

      {/* PROJECTS Section */}
      <div className="flex-1 max-w-sm bg-yellow-400 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="h-64 bg-gray-200"><img src="public\firstlady\blind boarding school.jpg" alt=""  /></div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">PROJECTS</h2>
          <ul className="text-sm list-none space-y-2 mb-6">
            <li>
              📚 <strong>Education for All</strong><br />
              Building and supporting schools in under-served communities to ensure every child has access to quality education.
            </li>
            <li>
              💖 <strong>Charity Outreach Programs</strong><br />
              Providing food, clothing, and essential supplies to families in need through regular charitable drives.
            </li>
            <li>
              🌿 <strong>Community Development</strong><br />
              Launching clean water projects, sanitation improvements, and infrastructure support for rural communities.
            </li>
          </ul>
          <button className="bg-white text-green-600 px-4 py-2 rounded shadow hover:bg-green-100 transition w-full">
            ➝ GO TO PAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
