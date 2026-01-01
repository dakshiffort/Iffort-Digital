import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Sticky header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-iffort-navy/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="text-3xl font-bold tracking-tighter text-white">
            iffort<span className="text-iffort-pink">.</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-white hover:text-iffort-pink transition-colors uppercase tracking-widest cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-iffort-pink hover:bg-pink-600 text-white px-6 py-2.5 rounded-full font-semibold transition-transform hover:scale-105 cursor-pointer"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-iffort-navy border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl h-screen">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-white"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-iffort-pink text-center py-3 rounded-lg font-bold text-white"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Talk
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;