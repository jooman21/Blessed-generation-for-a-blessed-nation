import React from 'react';
import InfoSection from '../pages/InfoSection'
import WhoWeAre from '../pages/WhoWeAre';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-16">
      <WhoWeAre />
      <InfoSection/>
    </div>
  );
};

export default AboutPage;

