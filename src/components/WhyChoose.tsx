import React, { useEffect, useState, useRef } from 'react';
import { 
  BookOpen, Ship, Snowflake, Landmark, 
  Search, FileText, Settings, Award 
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
      className="liquid-glass p-8 rounded-[2rem] border border-eibm-sky/15 bg-slate-900/40 backdrop-blur-xl hover:scale-[1.03] hover:border-eibm-sky/40 transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,174,239,0.25)] flex flex-col items-start text-left select-none group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-eibm-sky/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
      
      {/* Icon Frame */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-eibm-sky mb-6 group-hover:bg-eibm-sky group-hover:text-white transition-all duration-500 shadow-md">
        {icon}
      </div>

      <h3 className="text-xl font-bold font-serif text-white tracking-tight relative z-10">
        {title}
      </h3>
      <p className="mt-3 text-xs md:text-sm text-slate-400 font-light leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
};

export const WhyChoose: React.FC = () => {
  const features = [
    {
      title: 'Practical Industry Training',
      description: 'Ditch mock setups. Study authentic custom files, letter of credits, shipping invoices, and commercial packaging lists under guidance.',
      icon: <BookOpen size={24} />,
    },
    {
      title: 'Port Visits',
      description: 'Exclusive access trips to operational seaports. Inspect containers packing, check-ins, custom house clearings, and ship loading.',
      icon: <Ship size={24} />,
    },
    {
      title: 'Cold Storage Visits',
      description: 'Understand cold logistics, temperature parameters, and preservation procedures for fresh agro exports.',
      icon: <Snowflake size={24} />,
    },
    {
      title: 'Government Scheme Guidance',
      description: 'Unlock subsidies, incentives, duty exemptions, and drawback refunds (MEIS, RoDTEP) directly from export promotion cells.',
      icon: <Landmark size={24} />,
    },
    {
      title: 'Buyer Finding Blueprint',
      description: 'Explore online/offline data-driven search patterns to locate and contact foreign business clients confidently.',
      icon: <Search size={24} />,
    },
    {
      title: 'Export Documentation',
      description: 'Write error-free customs drafts, bills of lading, phytosanitary applications, and certificates of origin for direct clearances.',
      icon: <FileText size={24} />,
    },
    {
      title: 'Business Setup Support',
      description: 'Step-by-step guidance to launch your firm (LLP, DSC, IEC registrations, export-current bank accounts setup).',
      icon: <Settings size={24} />,
    },
    {
      title: 'Lifetime Mentorship',
      description: 'Direct call/classroom assistance to verify your export contracts, calculate shipping rates, and support active cargo deals.',
      icon: <Award size={24} />,
    },
  ];

  return (
    <section 
      id="why-choose"
      className="relative w-full bg-[#060F24] py-24 md:py-32 overflow-hidden border-b border-white/5 z-10"
    >
      {/* Decorative gradient glowing circles */}
      <div className="absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-eibm-sky/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-eibm-royal/5 blur-[150px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest leading-none select-none">
          Institute Features
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mt-4 tracking-tight leading-none font-bold">
          Why Thousands Choose EIBM
        </h2>
        <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          EIBM stands as Gujarat's premier institute, providing a complete practical ecosystem to build and scale your international venture.
        </p>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-20">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
