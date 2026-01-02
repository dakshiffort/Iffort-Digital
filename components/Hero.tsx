import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        if (videoRef.current && videoRef.current.currentTime >= 4) {
          videoRef.current.pause();
        }
      });
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Video Background - Desktop Only */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onPlay={handleVideoPlay}
        className={`hidden md:block absolute inset-0 w-full h-full object-cover z-0 hero-video transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/assets/6ce4173f-8c31-483c-8c2b-d3bc8f036d8b.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-iffort-dark/80 via-iffort-dark/50 to-iffort-dark/80 z-5 pointer-events-none"></div>

      {/* Fallback Background Gradients (Mobile + Video Loading State) */}
      <div className="md:hidden absolute top-0 right-0 w-[800px] h-[800px] bg-iffort-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
      <div className="md:hidden absolute bottom-0 left-0 w-[600px] h-[600px] bg-iffort-blue/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none"></div>

      {/* Grainy Noise Texture - Now at z-10 */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="max-w-4xl">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-iffort-blue/30 bg-iffort-blue/10">
            <span className="text-iffort-blue text-sm font-semibold tracking-wider uppercase">Your B2B Digital Partner</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
            Precision Execution.<br />
            <span className="accent-gradient-text">Real-World Results.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
            We build smart, cohesive marketing engines that transform ambitious B2B brands into market leaders. No fluff. Just growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-30">
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="group bg-iffort-pink text-white text-lg font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:bg-pink-600 hover:shadow-[0_0_30px_rgba(255,46,99,0.4)] cursor-pointer"
            >
              Start the Conversation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#work" 
              onClick={(e) => handleScrollTo(e, 'work')}
              className="group border border-white/20 hover:border-white/60 text-white text-lg font-semibold px-8 py-4 rounded-full flex items-center justify-center transition-all hover:bg-white/5 cursor-pointer"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => handleScrollTo(e as any, 'work')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 hover:text-white transition-colors cursor-pointer z-30 bg-transparent border-none p-2"
        aria-label="Scroll to work section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;