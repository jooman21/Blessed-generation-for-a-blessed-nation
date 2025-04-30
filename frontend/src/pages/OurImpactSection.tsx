import { FaBriefcase, FaUser, FaUniversity, FaHandshake, FaFileAlt } from "react-icons/fa";

const impactData = [
  {
    icon: <FaBriefcase className="text-orange-400" size={32} />,
    bg: "bg-orange-100",
    title: "Short-Long-term projects",
    items: [
      "School Construction",
      "Health Centers",
      "Water Access"
    ]
  },
  {
    icon: <FaUser className="text-blue-400" size={32} />,
    bg: "bg-blue-100",
    title: "Individual Consultants",
    items: [
      "CV Databases",
      "Expert Fee Rates",
      "Sanctioned Individuals"
    ]
  },
  {
    icon: <FaUniversity className="text-green-400" size={32} />,
    bg: "bg-green-100",
    title: "Funding Agencies",
    items: [
      "Country Strategy Papers",
      "Procurement Guidelines",
      "Advertising Tools"
    ]
  },
  {
    icon: <FaHandshake className="text-pink-400" size={32} />,
    bg: "bg-pink-100",
    title: "Potential Partners",
    items: [
      "Ethio Telecom",
      "Prime Minster Office",
      "Competitor's analysis"
    ]
  },
  {
    icon: <FaFileAlt className="text-slate-400" size={32} />,
    bg: "bg-slate-100",
    title: "Tenders and Grants",
    items: [
      "Procurement of Goods, works and services",
      "Market and Landscape Analysis"
    ]
  }
];

const OurImpactSection = () => (
  <section className="bg-gray-50 py-12 w-full">
    <div className="w-full px-0 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 px-8">
        Bringing together the international development community
      </h2>
      <div className="w-24 h-1 bg-blue-400 rounded mb-4 ml-8"></div>
      <p className="text-gray-500 mb-12 text-lg px-8">
        Business solutions at every stage of the bidding process
      </p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-8">
        {impactData.map((col, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className={`rounded-full ${col.bg} w-16 h-16 flex items-center justify-center mb-4`}>
              {col.icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-black">{col.title}</h3>
            <ul className="text-gray-700 text-left list-disc list-inside space-y-1">
              {col.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OurImpactSection;
