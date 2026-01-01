import React from 'react';
import Hero from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import Services from '../components/Services';
import ProprietaryFramework from '../components/ProprietaryFramework';
import CaseStudies from '../components/CaseStudies';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <ProprietaryFramework />
      <CaseStudies />
    </>
  );
};

export default HomePage;
