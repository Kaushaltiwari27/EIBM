import React, { useEffect, useState, useRef } from 'react';
import { Ship, Snowflake, FileSpreadsheet, Key, Factory, Handshake } from 'lucide-react';

interface ExposureItem {
  title: string;
  category: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

export const PracticalExposure: React.FC = () => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const exposures: ExposureItem[] = [
    {
      title: 'Sea Port Logistics Visit',
      category: 'Field Experience',
      description: 'Observe container loading, custom gates checks, shipping documentation clearances, and massive cargo vessel movements at Hazira or Mundra ports.',
      image: '/images/port.png',
      icon: <Ship size={20} />,
    },
    {
      title: 'Agro Cold Storage Depot',
      category: 'Field Experience',
      description: 'Study temperature parameters, preservation procedures, and customs inspection gates setups for shipping perishable fresh fruits and vegetables.',
      image: '/images/cargo_ship.png',
      icon: <Snowflake size={20} />,
    },
    {
      title: 'Live Pricing & Document Workshop',
      category: 'Lab Simulation',
      description: 'Draft actual commercial invoices, packing lists, letter of credits bank reviews, and calculate shipping cost spreadsheets.',
      image: '/images/seminar.png',
      icon: <FileSpreadsheet size={20} />,
    },
    {
      title: 'CHA Gate-Clearance Simulation',
      category: 'Lab Simulation',
      description: 'Participate in mock Custom House Agent clearing cases. Handle customs queries and shipping bill clearances.',
      image: '/images/port.png',
      icon: <Key size={20} />,
    },
    {
      title: 'Factory Sourcing Meetups',
      category: 'Field Experience',
      description: 'Visit manufacturing and ceramic production floors in Rajkot/Morbi to understand export quality sorting and wholesale deal negotiations.',
      image: '/images/cargo_ship.png',
      icon: <Factory size={20} />,
    },
    {
      title: 'Export Club Networking Forums',
      category: 'Networking',
      description: 'Interact with experienced exporters, customs brokers, and shipping agents to exchange trade leads and establish business collaborations.',
      image: '/images/seminar.png',
      icon: <Handshake size={20} />,
    },
  ];

  return (
    <section 
      id="exposure"
      ref={sectionRef}
      className="relative w-full bg-[#060F24] py-24 md:py-32 overflow-hidden border-b border-white/5 z-10"
    >
      <div className="absolute top-[30%] left-[-15%] w-[45rem] h-[45rem] rounded-full bg-eibm-sky/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-eibm-royal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Practical Exposure
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 tracking-tight leading-none font-bold">
            Real Industry Exposure
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            We don't limit training to classrooms. EIBM takes you to active seaports, cold storage facilities, and factory floors.
          </p>
        </div>

        {/* Cinematic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exposures.map((item, idx) => (
            <div
              key={item.title}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 50px, 0)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s`,
              }}
              className="relative rounded-[2rem] border border-white/10 overflow-hidden bg-slate-900/60 backdrop-blur-xl group hover:border-eibm-sky/30 hover:shadow-[0_0_35px_rgba(0,174,239,0.2)] transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Image Frame */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 z-10 transition-colors duration-500" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Floating category pill */}
                <div className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full bg-slate-950/60 border border-white/10 text-[10px] font-bold text-eibm-sky uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Text details */}
              <div className="p-8 flex flex-col flex-grow relative z-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-eibm-sky/10 border border-eibm-sky/20 rounded-xl text-eibm-sky">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white tracking-tight leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
