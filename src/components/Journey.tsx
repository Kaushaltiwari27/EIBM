import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Flag } from 'lucide-react';

interface JourneyStepProps {
  day: string;
  title: string;
  description: string;
  index: number;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ day, title, description, index }) => {
  const [inView, setInView] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (stepRef.current) {
      observer.observe(stepRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={stepRef}
      className="relative w-full mb-12 md:mb-16 select-none"
    >
      {/* Central node glowing marker */}
      <div 
        className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 z-20 w-8 h-8 rounded-full border-4 border-slate-900 bg-eibm-sky flex items-center justify-center shadow-lg transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: `translate3d(-50%, ${inView ? '0' : '20px'}, 0) scale(${inView ? 1 : 0.5})`
        }}
      >
        {index === 11 ? (
          <Flag size={12} className="text-slate-950 font-extrabold" />
        ) : (
          <CheckCircle2 size={12} className="text-slate-950 font-extrabold" />
        )}
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full pl-12 md:pl-0">
        
        {/* Left Column */}
        <div 
          className={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(${isEven ? '-40px' : '40px'}, 0, 0)`,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isEven ? (
            <div className="w-full max-w-md">
              <div className="liquid-glass p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl hover:border-eibm-sky/35 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <span className="text-[10px] font-bold text-eibm-sky uppercase tracking-widest block mb-1">
                  {day}
                </span>
                <h4 className="text-lg md:text-xl font-bold font-serif text-white tracking-tight">
                  {title}
                </h4>
                <p className="mt-2 text-xs md:text-sm text-white/90 font-light leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ) : (
            /* Milestone text placeholder on opposite side */
            <div className="hidden md:flex h-full items-center justify-end w-full max-w-md pr-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-white select-none">
                {day} Launching Core
              </span>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div 
          className={`flex flex-col ${!isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(${!isEven ? '40px' : '-40px'}, 0, 0)`,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {!isEven ? (
            <div className="w-full max-w-md">
              <div className="liquid-glass p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl hover:border-eibm-sky/35 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <span className="text-[10px] font-bold text-eibm-sky uppercase tracking-widest block mb-1">
                  {day}
                </span>
                <h4 className="text-lg md:text-xl font-bold font-serif text-white tracking-tight">
                  {title}
                </h4>
                <p className="mt-2 text-xs md:text-sm text-white/90 font-light leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ) : (
            /* Milestone text placeholder on opposite side */
            <div className="hidden md:flex h-full items-center justify-start w-full max-w-md pl-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-white select-none">
                {day} Launching Core
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export const Journey: React.FC = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const scrolledPast = windowHeight / 2 - rect.top;
      
      let percentage = scrolledPast / totalHeight;
      if (percentage < 0) percentage = 0;
      if (percentage > 1) percentage = 1;
      
      setScrollHeight(percentage * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { day: 'Milestone 01', title: 'Export Import Fundamentals', description: 'Understand basic global trade terminology, import-export cycles, and local products opportunities.' },
    { day: 'Milestone 02', title: 'Business Registration', description: 'Configure proprietorships, partnerships, or LLPs, apply for IEC licenses, and register GST structures.' },
    { day: 'Milestone 03', title: 'Product Selection', description: 'Apply a structured statistical approach to identify high-margin textile, chemical, or agricultural goods.' },
    { day: 'Milestone 04', title: 'Supplier Selection', description: 'Source products directly from manufacturers and farms without inventory investment risks.' },
    { day: 'Milestone 05', title: 'Pricing & Costing', description: 'Master FOB, CFR, CIF pricing sheets, factoring in logistics, terminal fees, and incentives.' },
    { day: 'Milestone 06', title: 'Government Schemes', description: 'Unlock MEIS, RoDTEP, interest subsidies, and duty draw-back calculations to maximize revenue.' },
    { day: 'Milestone 07', title: 'Buyer Finding Strategies', description: 'Utilize Indian embassy registries, global B2B networks, and import stats directories to trace international buyers.' },
    { day: 'Milestone 08', title: 'Export Documentation', description: 'Write error-free customs drafts, bills of lading, packing lists, and certificates of origin.' },
    { day: 'Milestone 09', title: 'Banking & Payments', description: 'Structure Letters of Credit (LC), bank transfers (TT), and configure Swift clearances compliance.' },
    { day: 'Milestone 10', title: 'Incoterms 2020', description: 'Delineate risks, responsibilities, and transfer costs using ICC parameters.' },
    { day: 'Milestone 11', title: 'Risk Management', description: 'Insure export credits via ECGC, preventing buyer payment defaults.' },
    { day: 'Milestone 12', title: 'Business Launch', description: 'Finalize your shipment drafts, clear custom gates, and successfully launch your global business.' },
  ];

  return (
    <section 
      id="courses"
      className="relative w-full bg-[#040B1A] py-24 md:py-32 overflow-hidden border-b border-white/5 z-10"
    >
      {/* Fullscreen world map SVG watermark in background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
        <svg className="w-full h-full object-cover" viewBox="0 0 1000 500" fill="none" stroke="white" strokeWidth="1.5">
          {/* Rough dotted outlines of world map */}
          <path d="M150,150 Q180,120 220,130 T280,180 T320,240 T250,300 T180,260 Z" strokeDasharray="4 4" />
          <path d="M450,120 Q500,80 580,110 T650,150 T720,200 T600,280 T520,240 T460,180 Z" strokeDasharray="4 4" />
          <path d="M550,280 Q620,320 680,300 T750,350 T710,420 T620,400 T560,340 Z" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Course Journey Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mt-4 tracking-tight leading-none font-bold">
            Immersive Learning Journey
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Follow our structured daily pathway, clearing practical modules step-by-step to successfully launch your export business.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto mt-16 md:mt-24 pb-8">
          
          {/* Inactive central timeline path */}
          <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-1 h-[97%] rounded-full bg-slate-900 overflow-hidden shadow-inner" />
          
          {/* Active drawing glowing line (Linked to scroll height progress) */}
          <div 
            style={{ height: `${scrollHeight}%` }}
            className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-1 max-h-[97%] rounded-full bg-gradient-to-b from-eibm-royal via-eibm-sky to-eibm-sky shadow-[0_0_10px_rgba(0,174,239,0.6)] transition-all duration-150 ease-out" 
          />

          {/* Steps */}
          {steps.map((step, idx) => (
            <JourneyStep
              key={step.title}
              day={step.day}
              title={step.title}
              description={step.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
