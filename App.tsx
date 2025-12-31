import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import Services from './components/Services';
import ProprietaryFramework from './components/ProprietaryFramework';
import CaseStudies from './components/CaseStudies';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-iffort-dark text-white selection:bg-iffort-pink selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <Services />
        <ProprietaryFramework />
        <CaseStudies />
      </main>
      <Footer />
    </div>
  );
};

export default App;