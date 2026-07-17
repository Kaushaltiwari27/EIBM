import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { Globe as GlobeIcon, X, Check, ArrowUpRight, TrendingUp, Ship, Plane } from 'lucide-react';

interface CountryData {
  name: string;
  code: string;
  demand: string;
  products: string[];
  ports: string[];
  fta: string;
  potential: string;
  trend: string;
}

const getCountryDetails = (code: string, name: string): CountryData => {
  const dataset: Record<string, Partial<CountryData>> = {
    US: {
      demand: 'Extremely High',
      products: ['Polished Diamonds', 'Fine Cotton Apparel', 'Handloom Textiles', 'Engineering Casting Spares'],
      ports: ['Port of Los Angeles', 'Port of New York & New Jersey', 'Port of Savannah'],
      fta: 'Customs duty exceptions on handloom handicrafts; standard GSP tags.',
      potential: '★★★★★ (High margin diamond contracts & premium apparel fashion houses)',
      trend: 'Expanding demand for organic apparel and sustainable linen garments.',
    },
    DE: {
      demand: 'High',
      products: ['Organic Essential Oils', 'Dry Spices & Herbs', 'Industrial Valves', 'Handicraft Artifacts'],
      ports: ['Port of Hamburg', 'Port of Bremen', 'Port of Wilhelmshaven'],
      fta: 'EU Organic equivalency certificates; standard import duty limits.',
      potential: '★★★★☆ (Premium pricing models for bio-certified agro goods & valves)',
      trend: 'Rising import demands for chemical intermediates and engineering spares.',
    },
    AE: {
      demand: 'Critical Sourcing',
      products: ['Embroidery Garments', 'Morbi Glazed Tiles', 'Basmati Rice', 'Processed Saffron'],
      ports: ['Jebel Ali Port (Dubai)', 'Mina Rashid', 'Port of Sharjah'],
      fta: 'India-UAE CEPA: 90% of Indian exports enter UAE with 0% customs duty!',
      potential: '★★★★★ (Morbi tiles direct distribution networks & agro retail chains)',
      trend: 'Surging demand in infrastructure ceramic panels and ready-to-eat packaged spices.',
    },
    AU: {
      demand: 'High',
      products: ['Morbi Polished Tiles', 'Summer Garments', 'Agricultural Pumps', 'Spices'],
      ports: ['Port of Melbourne', 'Port of Sydney', 'Port of Brisbane'],
      fta: 'India-Australia ECTA: Instant tariff elimination on over 96% of Indian goods!',
      potential: '★★★★☆ (Strong construction tiles procurement & home textile branding)',
      trend: 'Rapid scaling of ceramic panels imports for new housing cohorts.',
    },
    SG: {
      demand: 'Very High',
      products: ['Jewelry Assemblies', 'Processed Spices', 'Pipes & Fittings', 'Marine Engineering Parts'],
      ports: ['Port of Singapore', 'Jurong Port'],
      fta: 'India-Singapore CECA: Customs duty waivers and simplified cargo clearances.',
      potential: '★★★★☆ (Financial trade credit backing for high-value metal shipments)',
      trend: 'Steady demand for premium jewelry items and processed ready-to-eat products.',
    },
    JP: {
      demand: 'High',
      products: ['Organic Herbs', 'Specialty Petrochemicals', 'Leather Accessories', 'Frozen Marine Foods'],
      ports: ['Port of Tokyo', 'Port of Yokohama', 'Port of Kobe'],
      fta: 'India-Japan CEPA: Duty exemptions on leather goods and agricultural herbs.',
      potential: '★★★★☆ (Strict quality compliance but highest premium payments margins)',
      trend: 'Increasing interest in luxury leather artifacts and specialty chemicals.',
    },
    GB: {
      demand: 'Very High',
      products: ['Summer Apparels', 'Linen Textiles', 'Handicraft Souvenirs', 'Curry Powders'],
      ports: ['Port of London', 'Port of Felixstowe', 'Port of Southampton'],
      fta: 'Post-Brexit Bilateral fast-clearance tags; GSP duty reductions active.',
      potential: '★★★★☆ (Direct chains supply for ethnic foods and summer cotton lines)',
      trend: 'High growth in home decor fabrics and artisanal handicraft products.',
    },
    CA: {
      demand: 'High',
      products: ['Winter Garments', 'Precision Machine Parts', 'Dehydrated Spices', 'Ceramics'],
      ports: ['Port of Vancouver', 'Port of Montreal', 'Port of Halifax'],
      fta: 'Most Favoured Nation (MFN) tariff limits; simplified customs checks.',
      potential: '★★★★☆ (Machine parts contracts for industrial manufacturers)',
      trend: 'Growing import of specialized machinery castings and processed foods.',
    },
  };

  const defaultDetails: CountryData = {
    name: name,
    code: code,
    demand: 'Moderate',
    products: ['Garments & Apparels', 'Spices & Condiments', 'Handicraft Goods'],
    ports: ['Primary National Sea Port'],
    fta: 'Standard MFN Customs Tariffs apply.',
    potential: '★★★☆☆ (Stable base market with direct buyer acquisition models)',
    trend: 'Gradual expansion of bilateral trade pipelines.',
  };

  return (dataset[code] as CountryData) || { ...defaultDetails, name: name, code: code };
};

export const LogisticsGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let myGlobe: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let rotationTimeout: any = null;

    // Load local GeoJSON dataset
    fetch('/images/countries.geojson')
      .then((res) => res.json())
      .then((countriesGeo) => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight || 550;

        // Initialize Globe.gl WebGL Canvas
        myGlobe = new Globe(mountRef.current)
          .width(width)
          .height(height)
          .globeImageUrl('/images/earth.jpg')
          .backgroundColor('rgba(0,0,0,0)') // Seamless background blending
          .showAtmosphere(true)
          .atmosphereColor('#00AEEF')
          .atmosphereAltitude(0.12)
          
          // Render Country Polygons
          .polygonsData(countriesGeo.features)
          .polygonCapColor(() => 'rgba(0, 91, 170, 0.12)')
          .polygonSideColor(() => 'rgba(0, 174, 239, 0.05)')
          .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.12)')
          .polygonLabel(({ properties: d }: any) => `
            <div style="background: rgba(4, 11, 26, 0.95); border: 1px solid rgba(0, 174, 239, 0.4); padding: 12px; border-radius: 12px; font-family: sans-serif; font-size: 11px; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.5); backdrop-filter: blur(8px); min-width: 180px;">
              <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 16px;">🌐</span> ${d.ADMIN} (${d.ISO_A2})
              </div>
              <div style="margin-bottom: 3px;"><b>Import Demand:</b> <span style="color: #00AEEF;">${getCountryDetails(d.ISO_A2, d.ADMIN).demand}</span></div>
              <div style="margin-bottom: 3px;"><b>Top Sourced:</b> ${getCountryDetails(d.ISO_A2, d.ADMIN).products[0]}</div>
              <div><b>Market potential:</b> ${getCountryDetails(d.ISO_A2, d.ADMIN).potential.split(' ')[0]}</div>
              <div style="margin-top: 6px; font-size: 9px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px;">Click country for details panel</div>
            </div>
          `)
          .onPolygonHover((hoverD: any) => myGlobe
            .polygonCapColor((d: any) => d === hoverD ? 'rgba(0, 174, 239, 0.35)' : 'rgba(0, 91, 170, 0.12)')
            .polygonStrokeColor((d: any) => d === hoverD ? 'rgba(0, 174, 239, 0.9)' : 'rgba(255, 255, 255, 0.12)')
          )
          .onPolygonClick(({ properties: d }: any) => {
            const details = getCountryDetails(d.ISO_A2, d.ADMIN);
            setSelectedCountry(details);
            
            // Pan camera to clicked country focus
            myGlobe.pointOfView({ lat: d.LABEL_Y || 20, lng: d.LABEL_X || 0, altitude: 2.0 }, 1000);
          });

        // 2. Logistics Shipping & Flight paths (Dual Altitudes & Speeds)
        const pathsData = [
          // Shipping lines (low altitude, slow dash)
          { startLat: 21.17, startLng: 72.83, endLat: 25.20, endLng: 55.27, color: 'rgba(0, 174, 239, 0.35)', alt: 0.12, time: 3200 }, // Dubai
          { startLat: 21.17, startLng: 72.83, endLat: 1.35, endLng: 103.82, color: 'rgba(0, 174, 239, 0.35)', alt: 0.12, time: 3500 }, // Singapore
          { startLat: 21.17, startLng: 72.83, endLat: 35.67, endLng: 139.65, color: 'rgba(0, 174, 239, 0.35)', alt: 0.12, time: 4200 }, // Japan
          
          // Flight paths (high altitude, fast dash)
          { startLat: 21.17, startLng: 72.83, endLat: 40.71, endLng: -74.00, color: 'rgba(255, 255, 255, 0.75)', alt: 0.38, time: 1300 }, // USA
          { startLat: 21.17, startLng: 72.83, endLat: 53.55, endLng: 9.99, color: 'rgba(255, 255, 255, 0.75)', alt: 0.35, time: 1500 }, // Germany
          { startLat: 21.17, startLng: 72.83, endLat: -33.86, endLng: 151.20, color: 'rgba(255, 255, 255, 0.75)', alt: 0.38, time: 1900 }, // Australia
          { startLat: 21.17, startLng: 72.83, endLat: 43.65, endLng: -79.38, color: 'rgba(255, 255, 255, 0.75)', alt: 0.36, time: 1400 }, // Canada
          { startLat: 21.17, startLng: 72.83, endLat: 51.5074, endLng: -0.1278, color: 'rgba(255, 255, 255, 0.75)', alt: 0.35, time: 1600 } // UK
        ];

        myGlobe
          .arcsData(pathsData)
          .arcColor('color')
          .arcDashLength(0.35)
          .arcDashGap(3)
          .arcDashAnimateTime('time')
          .arcStroke(1.2)
          .arcAltitude('alt');

        // 3. Glowing ripple rings for active Port hubs
        const portsData = [
          { name: 'Mundra Port', lat: 22.84, lng: 69.70 },
          { name: 'Nhava Sheva (Mumbai)', lat: 18.95, lng: 72.95 },
          { name: 'Surat Sourcing Hub', lat: 21.17, lng: 72.83 },
          { name: 'Port of Dubai', lat: 25.26, lng: 55.29 },
          { name: 'Port of Singapore', lat: 1.26, lng: 103.84 },
          { name: 'Port of Los Angeles', lat: 33.74, lng: -118.26 },
          { name: 'Port of Hamburg', lat: 53.54, lng: 9.96 },
          { name: 'Port of Tokyo', lat: 35.63, lng: 139.79 },
          { name: 'Port of Sydney', lat: -33.85, lng: 151.21 }
        ];

        myGlobe
          .ringsData(portsData)
          .ringColor(() => '#00AEEF')
          .ringMaxRadius(2.2)
          .ringPropagationSpeed(1.2)
          .ringRepeatNum(2);

        // Center initially on India / Surat Sourcing area
        myGlobe.pointOfView({ lat: 20, lng: 75, altitude: 2.1 });

        // 4. Configure controls auto-rotation parameters
        const controls = myGlobe.controls();
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.7;

        // Auto-rotation pause on interaction & resume after 5 seconds
        controls.addEventListener('start', () => {
          controls.autoRotate = false;
          if (rotationTimeout) clearTimeout(rotationTimeout);
        });

        controls.addEventListener('end', () => {
          rotationTimeout = setTimeout(() => {
            controls.autoRotate = true;
          }, 5000);
        });

        // 5. Watch for container width changes to resize canvas responsively
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width: w, height: h } = entry.contentRect;
            myGlobe.width(w).height(h || 550);
          }
        });
        resizeObserver.observe(mountRef.current);
      });

    // Cleanup
    return () => {
      if (rotationTimeout) clearTimeout(rotationTimeout);
      if (resizeObserver) resizeObserver.disconnect();
      if (myGlobe) {
        // Dispose WebGL instance
        const container = mountRef.current;
        if (container) {
          container.innerHTML = '';
        }
      }
    };
  }, []);

  return (
    <section className="relative w-full bg-[#030914] py-24 border-b border-white/5 overflow-hidden z-10 select-none">
      {/* Background glow meshes */}
      <div className="absolute top-[15%] left-[-15%] w-[45rem] h-[45rem] rounded-full bg-eibm-sky/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[45rem] h-[45rem] rounded-full bg-eibm-royal/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Heading details and quick legends */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest block mb-1">
                Logistics Visualizer
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
                Interactive 3D Trade Globe
              </h2>
              <p className="mt-4 text-slate-400 font-light text-sm md:text-base leading-relaxed">
                Click on any country polygon on the interactive globe to unlock import demands, recommended products list, and CEPA/FTA tariff details.
              </p>

              {/* Trade line key/legends */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-eibm-sky shrink-0">
                    <Ship size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sea Sourcing Routes</h4>
                    <p className="text-xs text-slate-500 font-light mt-1">Cyan dashed paths show continuous container shipments traversing global sea channels.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Plane size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Air Cargo Pathways</h4>
                    <p className="text-xs text-slate-500 font-light mt-1">Bright white curved arcs represent high-altitude express flight freight trails.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Badge */}
            <div className="mt-8 lg:mt-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02] max-w-sm">
              <GlobeIcon size={16} className="text-eibm-sky animate-spin-slow" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Drag to rotate globe • Scroll to zoom
              </span>
            </div>
          </div>

          {/* Right Block: 3D Globe Visualizer Frame and Details Panel */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[550px] w-full rounded-[2.5rem] bg-white/[0.01] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl">
            
            {/* 3D Canvas Mount container */}
            <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Glowing rim atmospheric overlay shadow ring */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none shadow-[inset_0_0_80px_rgba(0,91,170,0.12)]" />

            {/* Apple-style floating Glass Information Panel (displays on country click) */}
            {selectedCountry && (
              <div className="absolute inset-y-6 right-6 w-[calc(100%-3rem)] md:w-80 rounded-3xl border border-white/15 bg-slate-950/85 backdrop-blur-2xl shadow-2xl p-6 flex flex-col justify-between z-20 animate-fade-left overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://flagcdn.com/w80/${selectedCountry.code.toLowerCase()}.png`} 
                        alt={`${selectedCountry.name} Flag`}
                        className="w-10 h-7 object-cover rounded-lg border border-white/10 shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold font-serif text-white leading-tight">{selectedCountry.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{selectedCountry.code} Market</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedCountry(null)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                      aria-label="Close panel"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Metadata Cards */}
                  <div className="space-y-4 text-xs font-light leading-relaxed">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Import Demand Index</span>
                      <span className="px-2.5 py-1 rounded-md bg-eibm-sky/10 border border-eibm-sky/20 text-eibm-sky font-semibold text-[11px]">
                        {selectedCountry.demand}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Recommended Products</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {selectedCountry.products.map((prod) => (
                          <span key={prod} className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-350 text-[10px] flex items-center gap-1 font-medium">
                            <Check size={10} className="text-green-500 shrink-0" /> {prod}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Bilateral Trade Treaty</span>
                      <p className="text-slate-400 text-[11px] font-normal leading-normal">{selectedCountry.fta}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Bilateral Entry Ports</span>
                      <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-1 font-medium">
                        {selectedCountry.ports.map((port) => (
                          <li key={port}>{port}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Market Trend</span>
                      <span className="text-slate-400 text-[11px] font-normal flex items-start gap-1">
                        <TrendingUp size={12} className="text-eibm-sky shrink-0 mt-0.5" />
                        {selectedCountry.trend}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <a
                    href="#contact"
                    className="w-full text-center py-3 rounded-xl bg-eibm-royal hover:bg-eibm-sky text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors btn-glow select-none"
                  >
                    Unlock Market Sourcing Study <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
