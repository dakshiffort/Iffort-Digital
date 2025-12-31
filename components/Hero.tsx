import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-iffort-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-iffort-blue/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none"></div>
      
      {/* Decorative Grid - ADDED POINTER-EVENTS-NONE */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="max-w-4xl">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-iffort-blue/30 bg-iffort-blue/10">
            <span className="text-iffort-blue text-sm font-semibold tracking-wider uppercase">Your B2B Digital Partner</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8">
            Precision Execution.<br />
            <span className="accent-gradient-text">Real-World Results.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
            We build smart, cohesive marketing engines that transform ambitious B2B brands into market leaders. No fluff. Just growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-30">
            <a 
              href="#contact" 
              className="group bg-iffort-pink text-white text-lg font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:bg-pink-600 hover:shadow-[0_0_30px_rgba(255,46,99,0.4)] cursor-pointer"
            >
              Start the Conversation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#work" 
              className="group border border-white/20 hover:border-white/60 text-white text-lg font-semibold px-8 py-4 rounded-full flex items-center justify-center transition-all hover:bg-white/5 cursor-pointer"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 pointer-events-none">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;