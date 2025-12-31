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
      { threshold: 0.3 } // Trigger when 30% visible
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
      className="py-28 bg-iffort-dark overflow-hidden relative"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-iffort-pink/5 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-iffort-blue font-mono text-sm tracking-widest uppercase">Our Methodology</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Iffort <span className="text-iffort-pink">Growth Model</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
             Marketing shouldn't be a black box. We use a proven, cyclical framework to align strategy with revenue goals, ensuring every dollar spent drives measurable business impact.
          </p>
        </div>

        {/* The Engine Graphic */}
        <div className="relative max-w-5xl mx-auto aspect-square md:aspect-[16/8] flex items-center justify-center">
          
          {/* Connector Lines (Animated) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* Top Left Line */}
             <div className="absolute top-1/2 left-1/2 w-[40%] h-[1px] -translate-y-1/2 origin-left -rotate-[155deg] md:-rotate-[155deg] z-0">
               <div className={`h-full bg-gradient-to-r from-iffort-blue to-transparent transition-all duration-1000 delay-500 ease-out ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
             </div>
             {/* Top Right Line */}
             <div className="absolute top-1/2 left-1/2 w-[40%] h-[1px] -translate-y-1/2 origin-left -rotate-[25deg] md:-rotate-[25deg] z-0">
                <div className={`h-full bg-gradient-to-r from-iffort-pink to-transparent transition-all duration-1000 delay-700 ease-out ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
             </div>
             {/* Bottom Left Line */}
             <div className="absolute top-1/2 left-1/2 w-[40%] h-[1px] -translate-y-1/2 origin-left rotate-[155deg] md:rotate-[155deg] z-0">
                <div className={`h-full bg-gradient-to-r from-purple-500 to-transparent transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
             </div>
             {/* Bottom Right Line */}
             <div className="absolute top-1/2 left-1/2 w-[40%] h-[1px] -translate-y-1/2 origin-left rotate-[25deg] md:rotate-[25deg] z-0">
                <div className={`h-full bg-gradient-to-r from-green-500 to-transparent transition-all duration-1000 delay-1200 ease-out ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
             </div>
          </div>

          {/* Central Nucleus */}
          <div className={`relative z-20 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-iffort-navy to-iffort-dark rounded-full flex flex-col items-center justify-center text-center p-2 border border-white/10 shadow-[0_0_80px_rgba(0,201,255,0.15)] group hover:scale-105 transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
             <div className="absolute inset-0 rounded-full border border-iffort-blue/30 animate-[spin_10s_linear_infinite]"></div>
             <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-[spin_15s_linear_infinite_reverse]"></div>
             
             <div className="z-10">
               <span className="text-3xl md:text-5xl font-black text-white tracking-tighter">GROWTH</span>
               <div className="h-0.5 w-12 bg-iffort-pink mx-auto my-2"></div>
               <span className="text-[10px] md:text-xs font-mono text-iffort-blue uppercase tracking-[0.2em]">Predictable</span>
             </div>
          </div>

          {/* Node 1: Top Left - Strategy */}
          <div className={`absolute top-0 md:top-10 left-4 md:left-20 w-64 md:w-80 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
             <div className="flex flex-col items-end text-right group cursor-default">
                <div className="bg-iffort-navy border border-iffort-blue/20 p-6 rounded-2xl shadow-2xl relative mb-4 transition-all duration-300 hover:scale-105 hover:border-iffort-blue hover:shadow-[0_0_40px_rgba(0,201,255,0.3)]">
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-iffort-blue rounded-full shadow-[0_0_10px_#00C9FF]"></div>
                  <div className="w-10 h-10 bg-iffort-blue/10 rounded-lg flex items-center justify-center text-iffort-blue mb-3 ml-auto">
                    <Compass size={20} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1 transition-transform duration-300 origin-right group-hover:scale-110">1. Strategic Intelligence</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We don't guess. We analyze your market position, audit your data, and define the KPIs that actually matter to your boardroom.
                  </p>
                </div>
             </div>
          </div>

          {/* Node 2: Top Right - Creative/Content */}
          <div className={`absolute top-0 md:top-10 right-4 md:right-20 w-64 md:w-80 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
             <div className="flex flex-col items-start text-left group cursor-default">
                <div className="bg-iffort-navy border border-iffort-pink/20 p-6 rounded-2xl shadow-2xl relative mb-4 transition-all duration-300 hover:scale-105 hover:border-iffort-pink hover:shadow-[0_0_40px_rgba(255,46,99,0.3)]">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-iffort-pink rounded-full shadow-[0_0_10px_#FF2E63]"></div>
                  <div className="w-10 h-10 bg-iffort-pink/10 rounded-lg flex items-center justify-center text-iffort-pink mb-3 mr-auto">
                    <Target size={20} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1 transition-transform duration-300 origin-left group-hover:scale-110">2. Brand Authority</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Differentiation is key. We build the "Content Engine"—narratives, videos, and assets that position you as the industry leader.
                  </p>
                </div>
             </div>
          </div>

          {/* Node 3: Bottom Right - Activation */}
          <div className={`absolute bottom-0 md:bottom-10 right-4 md:right-20 w-64 md:w-80 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
             <div className="flex flex-col items-start text-left group cursor-default">
                <div className="bg-iffort-navy border border-green-500/20 p-6 rounded-2xl shadow-2xl relative mt-4 transition-all duration-300 hover:scale-105 hover:border-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 mb-3 mr-auto">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1 transition-transform duration-300 origin-left group-hover:scale-110">3. Precision Activation</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Meeting your buyers where they are. We deploy multi-channel campaigns (LinkedIn, Search, ABM) to reach decision-makers at scale.
                  </p>
                </div>
             </div>
          </div>

          {/* Node 4: Bottom Left - Optimization */}
          <div className={`absolute bottom-0 md:bottom-10 left-4 md:left-20 w-64 md:w-80 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
             <div className="flex flex-col items-end text-right group cursor-default">
                <div className="bg-iffort-navy border border-purple-500/20 p-6 rounded-2xl shadow-2xl relative mt-4 transition-all duration-300 hover:scale-105 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-3 ml-auto">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1 transition-transform duration-300 origin-right group-hover:scale-110">4. Revenue Optimization</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The loop never closes. We continuously monitor ROI, attributing revenue to campaigns and optimizing for lower CAC and higher LTV.
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProprietaryFramework;