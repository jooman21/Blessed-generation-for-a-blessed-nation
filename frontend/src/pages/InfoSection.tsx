import React from 'react';
import { Link } from 'react-router-dom';

const infoCards = [
  {
    title: 'ABOUT',
    to: '/about',
    image: '/firstlady/Charity work.jpg',
    content:
      'First Lady Zinash Tayachew was born on January 13, 1978, in the historic and royal city of Gondar, Ethiopia. After completing her studies, she served in the military where she met her husband, Prime Minister Abiy Ahmed Ali.',
  },
  {
    title: 'WHAT WE DO',
    to: '/what-we-do',
    image: '/firstlady/zinash meet.jpg',
    content:
      'The Office of the First Lady leads charitable initiatives—from education and healthcare to women and child empowerment—building a more inclusive future in collaboration with partners.',
  },
  {
    title: 'PROJECTS',
    to: '/projects',
    image: '/firstlady/blind boarding school.jpg',
    content: (
      <ul className="list-disc pl-4 text-sm text-gray-600 space-y-2">
        <li>
          <strong>Education for All:</strong> Building and supporting schools in under-served communities.
        </li>
        <li>
          <strong>Charity Outreach Programs:</strong> Distributing essentials to families in need.
        </li>
        <li>
          <strong>Community Development:</strong> Launching clean water and rural support projects.
        </li>
      </ul>
    ),
  },
];

const InfoSection = () => {
  return (
    <section className="pt-24 pb-10 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Who We Are & What We Do</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        Explore the vision, mission, and transformative projects led by the Office of the First Lady.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoCards.map((card, index) => (
          <Link
            to={card.to}
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 block"
          >
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              {typeof card.content === 'string' ? (
                <p className="text-sm text-gray-600 mt-2">{card.content}</p>
              ) : (
                <div className="mt-2">{card.content}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
