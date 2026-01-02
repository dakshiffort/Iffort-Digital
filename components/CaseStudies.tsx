import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="work" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Results That Speak <br />
              <span className="text-iffort-pink">Louder Than Buzzwords</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Within just six months, our clients typically see transformative growth. Here is the proof.
            </p>
          </div>
          <div className="hidden md:block">
            {/* Animated Growth Chart */}
            <svg
              viewBox="0 0 96 96"
              className="w-24 h-24 chart-animation"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Grid (subtle) */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00C9FF" />
                  <stop offset="100%" stopColor="#FF2E63" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="24" x2="96" y2="24" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="48" x2="96" y2="48" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="72" x2="96" y2="72" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

              {/* Upward trend line - bezier curve */}
              <path
                d="M 12 76 Q 32 68, 48 48 T 84 20"
                fill="none"
                stroke="url(#chartGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chart-line"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200,
                  animation: 'drawChart 2s ease-out forwards, pulseGlow 3s ease-in-out infinite 2s'
                }}
              />

              {/* Data point dots */}
              <circle cx="12" cy="76" r="3" fill="#00C9FF" className="chart-dot" style={{ animation: 'fadeIn 0.5s ease-out 1.5s forwards', opacity: 0 }} />
              <circle cx="48" cy="48" r="3" fill="#00C9FF" className="chart-dot" style={{ animation: 'fadeIn 0.5s ease-out 1.8s forwards', opacity: 0 }} />
              <circle cx="84" cy="20" r="3" fill="#FF2E63" className="chart-dot" style={{ animation: 'fadeIn 0.5s ease-out 2.1s forwards', opacity: 0 }} />

              {/* White centers for depth */}
              <circle cx="12" cy="76" r="1.5" fill="white" style={{ animation: 'fadeIn 0.5s ease-out 1.5s forwards', opacity: 0 }} />
              <circle cx="48" cy="48" r="1.5" fill="white" style={{ animation: 'fadeIn 0.5s ease-out 1.8s forwards', opacity: 0 }} />
              <circle cx="84" cy="20" r="1.5" fill="white" style={{ animation: 'fadeIn 0.5s ease-out 2.1s forwards', opacity: 0 }} />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="group cursor-pointer bg-slate-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-iffort-pink/20 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
              onClick={() => navigate(`/${study.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-4 left-4 bg-white text-iffort-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {study.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-iffort-pink transition-colors">
                  {study.client}
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {study.title}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center">
                   <div className="flex gap-4">
                      {study.stats.slice(0, 1).map((stat, i) => (
                        <div key={i}>
                          <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                          <p className="text-xs text-slate-500 uppercase">{stat.label}</p>
                        </div>
                      ))}
                   </div>
                   <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-iffort-blue group-hover:text-white transition-all">
                      <ArrowUpRight size={20} />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;