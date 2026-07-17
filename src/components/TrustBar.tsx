import React, { useEffect, useState, useRef } from 'react';
import { 
  Briefcase, Landmark, Globe, Ship, 
  Settings, Headset, MapPin, Snowflake, FileText,
  Users, Award, Calendar, Infinity
} from 'lucide-react';

interface MarqueeCardProps {
  label: string;
  icon: React.ReactNode;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ label, icon }) => {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-eibm-sky/20 bg-slate-950/5 backdrop-blur-md shadow-sm hover:-translate-y-1 hover:border-eibm-sky/40 hover:shadow-md transition-all duration-300 select-none cursor-pointer">
      <div className="text-eibm-sky">{icon}</div>
      <span className="text-sm font-semibold text-slate-800 tracking-wide">{label}</span>
    </div>
  );
};

export const TrustBar: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const marqueeItems = [
    { label: 'Practical Training', icon: <Briefcase size={18} /> },
    { label: 'Government Schemes', icon: <Landmark size={18} /> },
    { label: 'International Trade', icon: <Globe size={18} /> },
    { label: 'Import Export', icon: <Ship size={18} /> },
    { label: 'Buyer Finding', icon: <Briefcase size={18} /> },
    { label: 'Business Setup', icon: <Settings size={18} /> },
    { label: 'Lifetime Support', icon: <Headset size={18} /> },
    { label: 'Port Visit', icon: <MapPin size={18} /> },
    { label: 'Cold Storage Visit', icon: <Snowflake size={18} /> },
    { label: 'Export Documentation', icon: <FileText size={18} /> },
  ];

  const stats = [
    { value: '5000+', label: 'Students trained', icon: <Users className="text-eibm-sky" size={28} /> },
    { value: '100+', label: 'Ventures started', icon: <Award className="text-eibm-sky" size={28} /> },
    { value: '15 Days', label: 'Practical course', icon: <Calendar className="text-eibm-sky" size={28} /> },
    { value: 'Lifetime', label: 'Business support', icon: <Infinity className="text-eibm-sky" size={28} /> },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-b border-slate-100 z-10"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest leading-none select-none">
          Social Proof & Authority
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-eibm-navy mt-4 tracking-tight leading-none font-bold">
          Trusted by Thousands of Future Exporters
        </h2>
        <p className="mt-4 text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          Join India's leading Export-Import Business Management Institute and turn local products into global brands.
        </p>

        {/* Infinite Marquee Animation Container */}
        <div className="relative mt-16 w-full flex overflow-hidden mask-image-horizontal select-none">
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {marqueeItems.map((item, idx) => (
              <MarqueeCard key={`mar-1-${idx}`} label={item.label} icon={item.icon} />
            ))}
          </div>
          {/* Duplicate for seamless looping slider */}
          <div className="flex gap-6 animate-marquee whitespace-nowrap" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <MarqueeCard key={`mar-2-${idx}`} label={item.label} icon={item.icon} />
            ))}
          </div>
        </div>

        {/* Stats counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-24">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0px)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s`,
              }}
              className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-3xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-eibm-sky/35"
            >
              <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mb-4">
                {stat.icon}
              </div>
              <span className="text-3xl md:text-4xl font-bold font-serif text-eibm-navy tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
