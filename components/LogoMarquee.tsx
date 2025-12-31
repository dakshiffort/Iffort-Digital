import React from 'react';
import { CLIENTS } from '../constants';

const LogoMarquee: React.FC = () => {
  return (
    <section className="bg-iffort-dark py-24 border-y border-white/5 relative overflow-hidden">
      {/* Subtle Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <span className="inline-block px-3 py-1 rounded-full bg-iffort-blue/10 border border-iffort-blue/20 text-iffort-blue text-xs font-bold tracking-widest uppercase mb-4">
              Our Partners
           </span>
           <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
             Trusted by industry <span className="text-gray-500">leaders.</span>
           </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 bg-white/5 p-[1px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          {CLIENTS.map((client, index) => (
            <div 
              key={index} 
              className="group relative bg-iffort-dark/95 h-32 md:h-40 flex items-center justify-center p-6 hover:bg-iffort-dark transition-colors duration-300"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-iffort-blue/0 to-iffort-blue/0 group-hover:from-iffort-blue/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
              
              {/* Text Logo */}
              <span className="relative z-10 text-lg md:text-xl font-bold text-gray-600 group-hover:text-white transition-all duration-300 text-center leading-tight group-hover:scale-105">
                {client}
              </span>

              {/* Corner Markers (Technical feel) */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-iffort-blue/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-iffort-blue/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
            <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Powering next-gen B2B growth engines globally.
            </p>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;