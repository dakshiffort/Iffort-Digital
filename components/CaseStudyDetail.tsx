import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyDetailProps {
  study: CaseStudy;
  onClose: () => void;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ study, onClose }) => {
  useEffect(() => {
    // Lock body scroll when component mounts
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    // Allow state update to propagate before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = contactSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-[110] px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tighter cursor-pointer" onClick={onClose}>
          iffort<span className="text-iffort-pink">.</span>
          <span className="text-gray-400 font-medium text-sm ml-2 hidden md:inline-block border-l border-gray-300 pl-3">Case Study</span>
        </div>
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-iffort-pink transition-colors uppercase tracking-widest"
        >
          Close Project
          <span className="bg-slate-100 p-2 rounded-full group-hover:bg-iffort-pink/10 group-hover:text-iffort-pink transition-colors">
            <X size={20} />
          </span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden mt-0">
        <img 
          src={study.image} 
          alt={study.client} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 max-w-7xl mx-auto">
          <div className="animate-in slide-in-from-bottom-8 duration-700 delay-100 max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
               <span className="inline-block px-4 py-1.5 bg-iffort-pink text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                {study.category}
              </span>
              {study.tags.map((tag, i) => (
                  <span key={i} className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    {tag}
                  </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {study.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sidebar Info - Left Col */}
          <aside className="lg:col-span-4 space-y-12 order-2 lg:order-1">
            <div className="sticky top-32">
                <div className="mb-12">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Client</h3>
                  <p className="text-3xl font-bold text-slate-900">{study.client}</p>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Impact at a Glance</h3>
                  <div className="space-y-8">
                    {study.stats.map((stat, idx) => (
                      <div key={idx} className="">
                        <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-iffort-blue to-purple-600 mb-1">{stat.value}</div>
                        <div className="text-sm font-bold text-slate-700 uppercase tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </aside>

          {/* Narrative - Right Col */}
          <article className="lg:col-span-8 space-y-20 order-1 lg:order-2">
            
            {/* Challenge */}
            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-iffort-pink font-bold text-xl border border-red-100 group-hover:scale-110 transition-transform">1</div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Challenge</h2>
              </div>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed pl-16 border-l-2 border-slate-100">
                {study.content.challenge}
              </p>
            </section>

            {/* Approach */}
            <section className="group">
               <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-iffort-blue font-bold text-xl border border-blue-100 group-hover:scale-110 transition-transform">2</div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Strategy</h2>
              </div>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed pl-16 border-l-2 border-slate-100">
                {study.content.approach}
              </p>
            </section>

            {/* Quote */}
            {study.content.quote && (
              <blockquote className="relative p-10 md:p-16 bg-iffort-navy rounded-[2rem] overflow-hidden my-12 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                   <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                </div>
                <p className="relative z-10 text-2xl md:text-3xl font-medium text-white leading-relaxed text-center">
                  "{study.content.quote}"
                </p>
                <div className="relative z-10 mt-8 flex flex-col items-center">
                   <div className="w-12 h-1 bg-iffort-pink mb-4"></div>
                   <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{study.client}</span>
                </div>
              </blockquote>
            )}

            {/* Result */}
            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 font-bold text-xl border border-green-100 group-hover:scale-110 transition-transform">3</div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Impact</h2>
              </div>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 pl-16 border-l-2 border-slate-100">
                {study.content.result}
              </p>
              
              <div className="ml-0 md:ml-16 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                    <CheckCircle2 size={32} />
                 </div>
                 <div className="text-center md:text-left">
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Bottom Line</h4>
                    <p className="text-slate-600">{study.description}</p>
                 </div>
              </div>
            </section>

          </article>
        </div>
      </main>

      {/* CTA Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-24 mt-12">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to replicate these results?</h2>
            <p className="text-slate-500 mb-10 text-xl max-w-2xl mx-auto">
               We don't use templates. We build custom engines. Let's discuss how we can engineer a growth model for {study.client === 'Reckitt Benckiser' ? 'your brand' : 'you'}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#contact" 
                onClick={handleContactClick}
                className="bg-iffort-pink text-white text-lg px-10 py-4 rounded-full font-bold hover:bg-pink-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Start a Project <ArrowRight size={20} />
              </a>
              <button 
                onClick={onClose}
                className="px-10 py-4 rounded-full font-bold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
              >
                View More Work
              </button>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default CaseStudyDetail;