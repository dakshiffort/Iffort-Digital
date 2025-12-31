import React from 'react';
import { SERVICES } from '../constants';
import * as LucideIcons from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Secret Sauce: <br />
            <span className="text-iffort-blue">A Recipe for Real Results</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl">
            Our power isn't in one service. It's how we blend four key ingredients into one cohesive strategy that drives measurable impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            // Dynamically get the icon component
            const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.Zap;
            
            return (
              <div 
                key={service.id} 
                className="group relative p-8 md:p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-iffort-blue/30 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Number Background */}
                <div className="absolute top-4 right-6 text-9xl font-black text-slate-100 select-none pointer-events-none group-hover:text-iffort-blue/5 transition-colors">
                  #{index + 1}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-iffort-blue/10 rounded-xl flex items-center justify-center text-iffort-blue mb-8 group-hover:bg-iffort-blue group-hover:text-white transition-colors duration-300 shadow-sm">
                    <IconComponent size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-iffort-blue transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>

                {/* Decorative Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-iffort-blue to-iffort-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;