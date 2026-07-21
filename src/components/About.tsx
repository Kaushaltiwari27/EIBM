import React, { useEffect, useState, useRef } from 'react';

interface TimelineNodeProps {
  year: string;
  title: string;
  description: string;
  align: 'left' | 'right';
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ year, title, description, align }) => {
  const [inView, setInView] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isLeft = align === 'left';

  return (
    <div
      ref={nodeRef}
      className="relative w-full mb-12 md:mb-16 select-none"
    >
      {/* Center node bullet (Desktop/Mobile) */}
      <div 
        className="absolute left-[16px] md:left-1/2 transform -translate-x-1/2 z-10 w-6 h-6 rounded-full border-4 border-white bg-eibm-royal shadow-lg flex items-center justify-center transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: `translate3d(-50%, ${inView ? '0' : '20px'}, 0) scale(${inView ? 1 : 0.5})`
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-eibm-sky animate-ping absolute opacity-75" />
        <div className="w-2 h-2 rounded-full bg-white relative z-10" />
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full pl-10 md:pl-0">
        
        {/* Left Column (Desktop Left side of timeline) */}
        <div 
          className="flex flex-col md:items-end md:text-right"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(${isLeft ? '-40px' : '40px'}, 0, 0)`,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isLeft ? (
            <div className="w-full max-w-md">
              <div className="liquid-glass p-6 md:p-8 rounded-3xl border border-eibm-sky/15 bg-white/75 backdrop-blur-md hover:border-eibm-sky/35 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <span className="text-xs font-bold text-eibm-sky mb-1 block select-none md:hidden">{year}</span>
                <h4 className="text-xl font-bold text-eibm-navy font-serif tracking-tight">{title}</h4>
                <p className="mt-2 text-sm text-slate-500 font-light leading-relaxed">{description}</p>
              </div>
            </div>
          ) : (
            /* Year flag for Right-aligned node (placed on the left side) */
            <div className="hidden md:flex h-full items-center justify-end w-full max-w-md pr-8">
              <span className="text-5xl lg:text-6xl font-serif font-black text-slate-200 hover:text-eibm-sky/30 transition-colors duration-300 select-none">
                {year}
              </span>
            </div>
          )}
        </div>

        {/* Right Column (Desktop Right side of timeline) */}
        <div 
          className="flex flex-col md:items-start md:text-left"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(${!isLeft ? '40px' : '-40px'}, 0, 0)`,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {!isLeft ? (
            <div className="w-full max-w-md">
              <div className="liquid-glass p-6 md:p-8 rounded-3xl border border-eibm-sky/15 bg-white/75 backdrop-blur-md hover:border-eibm-sky/35 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <span className="text-xs font-bold text-eibm-sky mb-1 block select-none md:hidden">{year}</span>
                <h4 className="text-xl font-bold text-eibm-navy font-serif tracking-tight">{title}</h4>
                <p className="mt-2 text-sm text-slate-500 font-light leading-relaxed">{description}</p>
              </div>
            </div>
          ) : (
            /* Year flag for Left-aligned node (placed on the right side) */
            <div className="hidden md:flex h-full items-center justify-start w-full max-w-md pl-8">
              <span className="text-5xl lg:text-6xl font-serif font-black text-slate-200 hover:text-eibm-sky/30 transition-colors duration-300 select-none">
                {year}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // State for scroll-linked timeline line progress drawing animation
  const [scrollHeight, setScrollHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalHeight = rect.height;
            const scrolledPast = windowHeight / 2 - rect.top;
            
            let percentage = scrolledPast / totalHeight;
            if (percentage < 0) percentage = 0;
            if (percentage > 1) percentage = 1;
            
            setScrollHeight(percentage * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    { year: '2016', title: 'Started Journey', description: 'Satish Hirpara embarked on his international trade venture with a small local team in Surat, testing logistics pipelines.', align: 'left' as const },
    { year: '2018', title: 'Built Export Company', description: 'Established a commercial export house shipping textiles and agricultural goods directly from ports across Gujarat.', align: 'right' as const },
    { year: '2020', title: 'International Business', description: 'Scaled cargo trade contracts to 12+ European and Middle-Eastern countries, securing direct banking trade credit.', align: 'left' as const },
    { year: '2022', title: '5000+ Students', description: 'Launched EIBM to share practical frameworks, helping over 5,000 students escape textbook theories.', align: 'right' as const },
    { year: '2024', title: 'Business Expansion', description: 'Expanded corporate headquarters in Surat, forging strategic alliances with global trade networks & shipping lines.', align: 'left' as const },
    { year: '2026', title: 'Lifetime Mentorship', description: 'Pioneered India\'s first active Export Club program, supporting alumni ventures through direct custom clearances.', align: 'right' as const },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white via-slate-50 to-white py-24 md:py-32 overflow-hidden z-10"
    >
      {/* Background radial elements */}
      <div className="absolute top-[20%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-eibm-sky/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-eibm-royal/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Glass Framed Portrait */}
          <div 
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(-40px, 0, 0)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-sm w-full">
              {/* Outer light glow border */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-eibm-sky via-eibm-royal to-transparent opacity-30 blur-lg group-hover:opacity-50 transition duration-500" />
              
              <div className="relative liquid-glass p-3 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl overflow-hidden">
                <img 
                  src="/images/ceo.png" 
                  alt="Satish Hirpara - CEO & Founder" 
                  className="rounded-[2rem] w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio Details */}
          <div 
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(40px, 0, 0)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '150ms',
            }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest block">
              Founder Profile
            </span>
            
            <h2 className="text-4xl md:text-5xl font-serif text-eibm-navy font-bold tracking-tight">
              Satish Hirpara
            </h2>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">
              Founder & CEO, EIBM Gujarat
            </h3>

            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              Starting with zero capital and deep curiosity, Satish built a thriving multi-million rupee trade network across textile, tiles, and agricultural segments. Realizing that textbooks failed to address port delays, dynamic customs tariffs, and real buyer interactions, he established EIBM to provide hands-on practical training.
            </p>

            <blockquote className="border-l-4 border-eibm-sky pl-4 text-xs md:text-sm italic text-slate-600 font-medium">
              "We don't teach trade theories. We take you to the seaports, introduce you to custom clearing agents, teach you how to write contracts, and stand by you until your first container leaves India."
            </blockquote>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <span className="text-3xl md:text-4xl font-extrabold font-serif text-eibm-royal">10+ Years</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mt-1">Active Industry Trading</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-extrabold font-serif text-eibm-royal">5000+</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mt-1">Entrepreneurs Trained</span>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline roadmap header */}
        <div className="text-center mt-28 mb-16 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Corporate Journey Timeline
          </span>
          <h3 className="text-3xl md:text-4xl font-serif text-eibm-navy font-bold mt-2">
            EIBM Milestone Timeline
          </h3>
        </div>

        {/* Vertical Timeline container */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto pb-8">
          
          {/* Static Inactive Timeline Line (light grey/blue) */}
          <div className="absolute left-[16px] md:left-1/2 transform -translate-x-1/2 w-0.5 h-[96%] bg-slate-200/80 rounded-full" />
          
          {/* Scroll-Linked Drawing Glowing Active Line */}
          <div 
            style={{ height: `${scrollHeight}%` }}
            className="absolute left-[16px] md:left-1/2 transform -translate-x-1/2 w-0.5 max-h-[96%] bg-gradient-to-b from-eibm-royal via-eibm-sky to-eibm-sky shadow-[0_0_8px_rgba(0,174,239,0.6)] rounded-full transition-all duration-150 ease-out" 
          />
          
          {timelineEvents.map((evt, idx) => (
            <TimelineNode 
              key={evt.title}
              year={evt.year}
              title={evt.title}
              description={evt.description}
              align={idx % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
