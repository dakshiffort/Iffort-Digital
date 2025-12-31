import React, { useEffect, useRef, useState } from 'react';
import { Target, Compass, Zap, BarChart3 } from 'lucide-react';

const ProprietaryFramework: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      id="framework" 
      ref={sectionRef}
      className="py-32 bg-iffort-dark overflow-hidden relative"
    >
      {/* Subtle Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-iffort-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-iffort-blue font-mono text-sm tracking-widest uppercase">The Methodology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Growth <span className="text-iffort-pink">Engine</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
             A cyclical, engineered approach to revenue. We don't just execute campaigns; we build systems that compound value over time.
          </p>
        </div>

        {/* The X-Grid Layout */}
        <div className="relative max-w-6xl mx-auto min-h-[600px] flex items-center justify-center">
          
          {/* Connector Lines (The "X") */}
          <div className="absolute inset-0 hidden md:block pointer-events-none">
             {/* Diagonal 1 (Top Left to Bottom Right) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-iffort-blue/20 to-transparent rotate-45 transform"></div>
             {/* Diagonal 2 (Top Right to Bottom Left) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-iffort-pink/20 to-transparent -rotate-45 transform"></div>
          </div>

          {/* Central Nucleus (The Hub) */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-64 h-64 flex flex-col items-center justify-center bg-iffort-dark border border-white/10 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
             <div className="absolute inset-2 border border-white/5 rounded-full"></div>
             <div className="text-center px-4">
               <span className="block text-xs font-bold text-iffort-blue tracking-[0.3em] uppercase mb-3">Predictable</span>
               <span className="block text-4xl font-bold text-white tracking-tight leading-none mb-1">GROWTH</span>
               <span className="block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tight leading-none">MODEL</span>
             </div>
          </div>

          {/* The Grid of Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 md:gap-y-32 w-full h-full relative z-10">
            
            {/* Node 1: Top Left */}
            <div className={`flex flex-col md:items-end md:text-right transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
               <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                  <div className="w-12 h-12 bg-iffort-blue/10 border border-iffort-blue/20 rounded-xl flex items-center justify-center text-iffort-blue">
                    <Compass size={24} />
                  </div>
                  <span className="text-sm font-mono text-gray-500">01</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Strategic Intelligence</h3>
               <p className="text-gray-400 leading-relaxed max-w-sm">
                 Market position analysis, data auditing, and KPI definition. We map the terrain before moving a single pixel.
               </p>
            </div>

            {/* Node 2: Top Right */}
            <div className={`flex flex-col md:items-start md:text-left transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-iffort-pink/10 border border-iffort-pink/20 rounded-xl flex items-center justify-center text-iffort-pink">
                    <Target size={24} />
                  </div>
                  <span className="text-sm font-mono text-gray-500">02</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Brand Authority</h3>
               <p className="text-gray-400 leading-relaxed max-w-sm">
                 Crafting the "Content Engine." We develop high-value narratives that position you as the definitive choice.
               </p>
            </div>

             {/* Node 4: Bottom Left (Swapped Logic for Visual Balance, Logical Flow follows Clockwise) */}
             <div className={`flex flex-col md:items-end md:text-right transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
               <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                    <BarChart3 size={24} />
                  </div>
                  <span className="text-sm font-mono text-gray-500">04</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Revenue Optimization</h3>
               <p className="text-gray-400 leading-relaxed max-w-sm">
                 Continuous ROI monitoring. We attribute revenue to touchpoints and optimize for lower CAC and higher LTV.
               </p>
            </div>

            {/* Node 3: Bottom Right */}
            <div className={`flex flex-col md:items-start md:text-left transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                    <Zap size={24} />
                  </div>
                  <span className="text-sm font-mono text-gray-500">03</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Precision Activation</h3>
               <p className="text-gray-400 leading-relaxed max-w-sm">
                 Multi-channel deployment (ABM, LinkedIn, Search) ensuring your message reaches decision-makers at the right time.
               </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProprietaryFramework;