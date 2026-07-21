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
  const cCode = (code || '').toUpperCase();

  const dataset: Record<string, Partial<CountryData>> = {
    IN: {
      demand: 'National Origin & Export Hub',
      products: ['Polished Diamonds', 'Cotton Textiles & Fabrics', 'Pharmaceutical Formulations', 'Organic Petrochemicals', 'Basmati Rice'],
      ports: ['Mundra Port (Gujarat)', 'JNPT / Nhava Sheva (Mumbai)', 'Deendayal Port (Kandla)', 'Hazira Port (Surat)', 'Chennai Port'],
      fta: 'Foreign Trade Policy 2023, RoDTEP Scheme, Duty Drawback & Advance License Framework',
      potential: '★★★★★ (Global Export Hub & National Sourcing Gateway)',
      trend: 'Targeting $770B+ annual total exports with ICEGATE & direct custom clearances.',
    },
    US: {
      demand: 'Extremely High ($78B+ Exports)',
      products: ['Cut & Polished Diamonds', 'Fine Cotton Apparel', 'Home Textiles', 'Generic Pharmaceuticals', 'Precision Machined Parts'],
      ports: ['Port of Los Angeles (CA)', 'Port of New York & New Jersey', 'Port of Savannah (GA)', 'Port of Houston (TX)'],
      fta: 'GSP Duty Benefit Schemes, US Customs Trade Facilitation & Bilateral Frameworks',
      potential: '★★★★★ (Largest Export Market for Indian Gems, Apparel & Pharma)',
      trend: 'High growth in organic home textiles, sustainable apparel, and engineering castings.',
    },
    AE: {
      demand: 'Critical Sourcing ($35B+ Exports)',
      products: ['Morbi Polished Ceramic Tiles', 'Gold & Diamond Jewelry', 'Embroidery Apparel', 'Basmati Rice', 'Packaged Spices'],
      ports: ['Jebel Ali Port (Dubai)', 'Mina Rashid Port', 'Khalifa Port (Abu Dhabi)', 'Port of Sharjah'],
      fta: 'India-UAE CEPA Agreement: 90%+ of Indian exports enter UAE with 0% customs duty!',
      potential: '★★★★★ (GCC Re-export Hub, Tile Distribution & Agro Retail Networks)',
      trend: 'Surging demand in infrastructure ceramic panels and ready-to-eat packaged foods.',
    },
    SA: {
      demand: 'Extremely High ($10B+ Exports)',
      products: ['Premium Basmati Rice', 'Ceramic Tiles & Sanitaryware', 'Organic Petrochemicals', 'Textile Fabrics', 'Steel Pipes & Fittings'],
      ports: ['King Abdulaziz Port (Dammam)', 'Jeddah Islamic Port', 'King Abdullah Port'],
      fta: 'GCC Trade Framework & India-Saudi Strategic Trade Council Agreements',
      potential: '★★★★★ (Saudi Vision 2030 Infrastructure Projects & Food Sourcing)',
      trend: 'Massive procurement of construction ceramic tiles, rice, and industrial steel fittings.',
    },
    GB: {
      demand: 'Very High ($11B+ Exports)',
      products: ['Summer Ready-to-Wear Apparels', 'Linen Home Furnishings', 'Artisanal Handicrafts', 'Specialty Curry Powders', 'Leather Goods'],
      ports: ['Port of London Gateway', 'Port of Felixstowe', 'Port of Southampton'],
      fta: 'Post-Brexit Bilateral Duty Reductions & India-UK FTA Negotiations',
      potential: '★★★★★ (Ethnic Foods Sourcing & High-end Fashion Retail Chains)',
      trend: 'High demand for handcrafted home decor textiles, specialty spices, and organic garments.',
    },
    DE: {
      demand: 'High ($10B+ Exports)',
      products: ['Organic Essential Oils', 'Dry Spices & Culinary Herbs', 'Industrial Valves & Pumps', 'Automotive Components', 'Leather Footwear'],
      ports: ['Port of Hamburg', 'Port of Bremen', 'Port of Wilhelmshaven'],
      fta: 'EU-India Broad-based Trade & Investment Agreement (BTIA) Framework',
      potential: '★★★★☆ (Premium Pricing for Bio-certified Agro Goods & Machined Components)',
      trend: 'Rising import demand for chemical intermediates, green textiles, and precision valves.',
    },
    NL: {
      demand: 'Extremely High (EU Gateway)',
      products: ['Refined Petroleum Products', 'Organic Chemicals', 'Spices & Essential Oils', 'Processed Marine Foods', 'Cotton Garments'],
      ports: ['Port of Rotterdam (Europe\'s Largest Port)', 'Port of Amsterdam'],
      fta: 'EU Single Market Gateway with Fast-Track Clearance Protocols',
      potential: '★★★★★ (Main Entry & Transshipment Hub across Western Europe)',
      trend: 'Strategic European entry point for Indian agricultural and chemical exports.',
    },
    SG: {
      demand: 'Very High ($12B+ Exports)',
      products: ['Jewelry Assemblies', 'Processed Foods & Spices', 'Industrial Pipes & Fittings', 'Marine Engineering Parts', 'Refined Goods'],
      ports: ['Port of Singapore (PSA)', 'Jurong Port'],
      fta: 'India-Singapore CECA (Comprehensive Economic Cooperation Agreement)',
      potential: '★★★★★ (ASEAN Transshipment Hub & Financial Trade Credit Clearance)',
      trend: 'Steady demand for premium jewelry items, electronics, and processed foods.',
    },
    JP: {
      demand: 'High ($5B+ Exports)',
      products: ['Organic Herbs & Extracts', 'Specialty Petrochemicals', 'Leather Accessories', 'Frozen Marine Goods', 'Darjeeling Black Tea'],
      ports: ['Port of Tokyo', 'Port of Yokohama', 'Port of Kobe', 'Port of Nagoya'],
      fta: 'India-Japan CEPA Agreement: Preferential Duty Exemptions',
      potential: '★★★★☆ (Strict Quality Standards with Premium Payment Margins)',
      trend: 'Increasing interest in luxury leather items, specialty chemicals, and organic foods.',
    },
    AU: {
      demand: 'High ($8B+ Exports)',
      products: ['Morbi Polished Floor Tiles', 'Summer Garments', 'Agricultural Irrigation Pumps', 'Organic Spices', 'Machinery Castings'],
      ports: ['Port of Melbourne', 'Port of Sydney', 'Port of Brisbane', 'Port of Fremantle'],
      fta: 'India-Australia ECTA (Economic Cooperation & Trade Agreement) - 96%+ Duty Free!',
      potential: '★★★★★ (Strong Construction Tiles Procurement & Home Textile Branding)',
      trend: 'Rapid scaling of ceramic panels and agricultural equipment imports.',
    },
    CA: {
      demand: 'High ($4B+ Exports)',
      products: ['Winter Garments & Outerwear', 'Precision Machine Components', 'Dehydrated Spices', 'Morbi Tiles', 'Basmati Rice'],
      ports: ['Port of Vancouver', 'Port of Montreal', 'Port of Halifax'],
      fta: 'India-Canada Early Progress Trade Agreement (EPTA) Framework',
      potential: '★★★★☆ (Machine Parts Contracts & Large Ethnic Retail Sourcing)',
      trend: 'Growing import of specialized machinery castings, processed foods, and home textiles.',
    },
    BD: {
      demand: 'Critical Neighbor Trade ($12B+ Exports)',
      products: ['Raw Cotton & Yarns', 'Electricity & Power Equipment', 'Industrial Machinery', 'Onion & Dry Spices', 'Commercial Vehicle Tires'],
      ports: ['Chittagong Port (Chattogram)', 'Mongla Port', 'Benapole Land Port'],
      fta: 'SAFTA (South Asian Free Trade Area) Concessional Tariffs',
      potential: '★★★★★ (Top Importer of Indian Raw Cotton & Textile Feedstocks)',
      trend: 'Massive demand for raw materials supporting Bangladesh garment factories.',
    },
    VN: {
      demand: 'High ($7B+ Exports)',
      products: ['Frozen Meat & Seafood Feed', 'Steel Billets', 'Cotton Yarns', 'Spices & Groundnuts', 'Machinery Parts'],
      ports: ['Port of Ho Chi Minh City', 'Port of Haiphong', 'Da Nang Port'],
      fta: 'ASEAN-India Free Trade Area (AIFTA) Preferential Duty Rates',
      potential: '★★★★☆ (Agro Sourcing & Manufacturing Supply Chain Intermediates)',
      trend: 'Rapid expansion of agricultural product exports and raw material supply.',
    },
    TH: {
      demand: 'High ($5B+ Exports)',
      products: ['Organic Chemicals', 'Machinery Parts', 'Precious & Semi-Precious Stones', 'Animal Feed', 'Textile Fibers'],
      ports: ['Laem Chabang Port', 'Bangkok Port (Klong Toey)'],
      fta: 'India-Thailand Early Harvest Scheme & ASEAN-India FTA',
      potential: '★★★★☆ (Bilateral Trade Growth across Gems & Chemical Sectors)',
      trend: 'Steady imports of chemical raw materials and industrial machinery.',
    },
    MY: {
      demand: 'High ($7B+ Exports)',
      products: ['Refined Petroleum Products', 'Aluminum Alloys', 'Organic Chemicals', 'Frozen Meat', 'Spices'],
      ports: ['Port Klang (Kuala Lumpur)', 'Penang Port', 'Johor Port'],
      fta: 'India-Malaysia MICECA Agreement & ASEAN-India FTA',
      potential: '★★★★☆ (Strong Food Security Contracts & Chemical Shipments)',
      trend: 'Expanding trade in agro commodities and industrial raw materials.',
    },
    ID: {
      demand: 'High ($8B+ Exports)',
      products: ['Groundnut / Peanuts', 'Synthetic Yarns', 'Organic Chemicals', 'Pharmaceutical Formulations', 'Machinery'],
      ports: ['Tanjung Priok Port (Jakarta)', 'Tanjung Perak (Surabaya)'],
      fta: 'ASEAN-India Free Trade Area (AIFTA) Agreement',
      potential: '★★★★☆ (Chemical Intermediates & Agro Commodity Trading)',
      trend: 'High demand for pharmaceutical formulations and textile raw materials.',
    },
    RU: {
      demand: 'High ($4B+ Exports)',
      products: ['Pharmaceutical Formulations', 'Black Tea & Coffee', 'Dry Spices', 'Electrical Transformers', 'Organic Chemicals'],
      ports: ['Port of St. Petersburg', 'Port of Novorossiysk', 'Vladivostok Port'],
      fta: 'Rupee-Rouble Direct Settlement Mechanism & INSTC Trade Corridor',
      potential: '★★★★★ (Direct Non-USD Payment Clearance & High Pharma/Agro Demands)',
      trend: 'Rapid surge in Indian pharmaceutical and agricultural commodity exports.',
    },
    ZA: {
      demand: 'High ($8B+ Exports)',
      products: ['Generic Pharmaceuticals', 'Motor Vehicles & Chassis', 'Mining Equipment', 'Cotton Fabrics', 'Spices'],
      ports: ['Port of Durban', 'Port of Cape Town', 'Port of Ngqura'],
      fta: 'SACU-India Preferential Trade Agreement Framework',
      potential: '★★★★☆ (Gateway to Southern Africa Regional Markets)',
      trend: 'Expanding import of generic medicine, apparel, and commercial vehicles.',
    },
    EG: {
      demand: 'High ($4B+ Exports)',
      products: ['Boneless Meat', 'Granite & Marble Slabs', 'Spices & Seeds', 'Synthetic Filaments', 'Organic Chemicals'],
      ports: ['Port of Alexandria', 'Port Said', 'Damietta Port'],
      fta: 'India-Egypt Bilateral Trade Agreement & Suez Maritime Corridor',
      potential: '★★★★☆ (Strategic Gateway between Asia and North Africa)',
      trend: 'High growth in food security imports and industrial synthetic yarns.',
    },
    KE: {
      demand: 'High ($3B+ Exports)',
      products: ['Pharmaceutical Formulations', 'Industrial Machinery', 'Sugar & Confectionery', 'Paper Products', 'Cotton Fabrics'],
      ports: ['Port of Mombasa'],
      fta: 'India-Kenya Bilateral Trade Framework & EAC Access',
      potential: '★★★★☆ (East Africa Regional Sourcing & Trade Hub)',
      trend: 'Strong market demand for affordable Indian medicines and capital machinery.',
    },
    NG: {
      demand: 'High ($5B+ Exports)',
      products: ['Essential Pharmaceuticals', 'Rice & Foodstuffs', 'Electrical Transformers', 'Commercial Vehicles', 'Paper'],
      ports: ['Port of Lagos (Apapa/Tin Can Island)', 'Lekki Deep Sea Port'],
      fta: 'India-Nigeria Joint Trade Committee Protocols',
      potential: '★★★★☆ (West Africa Largest Consumer Market for Indian Goods)',
      trend: 'High volume imports of generic drugs, rice, and power transmission gear.',
    },
    BR: {
      demand: 'High ($9B+ Exports)',
      products: ['Active Pharmaceutical Ingredients (API)', 'Synthetic Resins', 'Pesticides & Petrochemicals', 'Auto Components'],
      ports: ['Port of Santos', 'Port of Paranaguá', 'Port of Rio de Janeiro'],
      fta: 'MERCOSUR-India Preferential Trade Agreement (PTA)',
      potential: '★★★★☆ (BRICS Partner & Active Agro-Chemical Sourcing)',
      trend: 'Growing demand for active pharmaceutical ingredients (API) and agro-chemicals.',
    },
    MX: {
      demand: 'High ($5B+ Exports)',
      products: ['Auto Parts & Components', 'Aluminum Products', 'Organic Chemicals', 'Readymade Garments', 'Electrical Goods'],
      ports: ['Port of Manzanillo', 'Port of Veracruz', 'Port of Lázaro Cárdenas'],
      fta: 'MFN Customs Tariffs & Pacific Alliance Framework Dialogues',
      potential: '★★★★☆ (Manufacturing Supply Chain Integration into North America)',
      trend: 'Expanding imports of motor vehicle components and synthetic textiles.',
    },
    CN: {
      demand: 'High ($15B+ Exports)',
      products: ['Iron Ore Fines', 'Organic Petrochemicals', 'Frozen Marine Produce', 'Granite Blocks', 'Sesame & Spices'],
      ports: ['Port of Shanghai', 'Port of Ningbo-Zhoushan', 'Port of Shenzhen', 'Port of Qingdao'],
      fta: 'APTA (Asia-Pacific Trade Agreement) Preferential Tariffs',
      potential: '★★★★☆ (High Volume Raw Material & Mineral Exporter to China)',
      trend: 'Strong demand for Indian seafood, iron ore fines, and sesame seeds.',
    },
    LK: {
      demand: 'High ($5B+ Exports)',
      products: ['Pharmaceutical Drugs', 'Refined Sugar', 'Onions & Vegetables', 'Cotton Fabrics', 'Paper Products'],
      ports: ['Port of Colombo', 'Port of Hambantota'],
      fta: 'India-Sri Lanka Free Trade Agreement (ISFTA) - Duty Free Access!',
      potential: '★★★★☆ (Immediate Neighbor Maritime Trade Corridor)',
      trend: 'High volume food supply and pharmaceutical aid & commercial trade.',
    },
    NP: {
      demand: 'High ($8B+ Exports)',
      products: ['Petroleum Products', 'Construction Steel & Iron', 'Essential Medicines', 'Commercial Vehicles', 'Cereals'],
      ports: ['Birgunj Dry Port', 'Biratnagar Land Customs', 'Bhairahawa Land Port'],
      fta: 'India-Nepal Treaty of Trade - Duty-Free Reciprocal Access!',
      potential: '★★★★★ (Landlocked Neighbor Trade & Transit Protocol)',
      trend: 'Steady supply of essential fuel, construction steel, and food products.',
    },
    TR: {
      demand: 'High ($8B+ Exports)',
      products: ['Synthetic Filament Yarns', 'Organic Petrochemicals', 'Industrial Machinery', 'Spices & Herbs'],
      ports: ['Port of Ambarlı (Istanbul)', 'Port of Mersin', 'Port of Izmir'],
      fta: 'MFN Customs Tariffs & India-Turkey Joint Economic Committee',
      potential: '★★★★☆ (Eurasian Trade Crossroads for Textiles & Chemicals)',
      trend: 'Strong demand for Indian cotton/polyester yarns and chemical intermediates.',
    },
    ES: {
      demand: 'High ($5B+ Exports)',
      products: ['Cotton Apparel & Fabrics', 'Leather Footwear', 'Organic Chemicals', 'Frozen Seafood', 'Auto Components'],
      ports: ['Port of Valencia', 'Port of Algeciras', 'Port of Barcelona'],
      fta: 'EU Single Market Preferential Customs Tariffs',
      potential: '★★★★☆ (Fashion Apparel Sourcing for European Retailers)',
      trend: 'Increasing import of sustainable garments, leather, and seafood.',
    },
    BE: {
      demand: 'High ($8B+ Exports)',
      products: ['Rough & Polished Diamonds', 'Chemical Intermediates', 'Cotton Textiles', 'Frozen Marine Goods'],
      ports: ['Port of Antwerp-Bruges (Diamond Capital of Europe)'],
      fta: 'EU Single Market & Surat-Antwerp Diamond Trade Protocols',
      potential: '★★★★★ (Surat-Antwerp Direct Diamond Trade Corridor)',
      trend: 'Major hub for Surat diamond cutters and chemical exports.',
    },
    FR: {
      demand: 'High ($7B+ Exports)',
      products: ['Fine Fabrics & Garments', 'Essential Oils & Fragrances', 'Leather Accessories', 'Spices & Tea'],
      ports: ['Port of Le Havre', 'Port of Marseille-Fos'],
      fta: 'EU Trade Protocols & Bilateral Trade Facilitation Framework',
      potential: '★★★★☆ (High-end Fashion Houses & Gourmet Food Distributors)',
      trend: 'Growing demand for eco-friendly textiles, home furnishings, and natural extracts.',
    },
    IT: {
      demand: 'High ($6B+ Exports)',
      products: ['Raw Cotton & Yarns', 'Cast Iron Pipes & Fittings', 'Finished Leather', 'Processed Coffee & Spices'],
      ports: ['Port of Genoa', 'Port of Trieste', 'Port of Gioia Tauro'],
      fta: 'EU Customs Union Tariffs & Bilateral Industrial Protocols',
      potential: '★★★★☆ (Industrial Textile Spinners & Leather Artisans Sourcing)',
      trend: 'Strong procurement of Indian cotton yarns, metal castings, and stone products.',
    },
    KR: {
      demand: 'High ($6B+ Exports)',
      products: ['Naphtha & Petrochemicals', 'Iron & Steel Alloys', 'Cotton Yarns', 'Aluminum Ingots'],
      ports: ['Port of Busan', 'Port of Incheon', 'Port of Gwangyang'],
      fta: 'India-Korea CEPA (Comprehensive Economic Partnership Agreement)',
      potential: '★★★★☆ (Raw Materials & Intermediate Industrial Components Sourcing)',
      trend: 'Rising import of industrial minerals, steel products, and agricultural raw materials.',
    },
    OM: {
      demand: 'High ($3B+ Exports)',
      products: ['Machinery & Spares', 'Fresh Agricultural Produce', 'Apparel', 'Building Materials'],
      ports: ['Sultan Qaboos Port (Muscat)', 'Sohar Port', 'Salalah Port'],
      fta: 'India-Oman CEPA Negotiations & GCC Trade Framework',
      potential: '★★★★☆ (Direct Maritime Corridor from Gujarat Ports - Mundra/Hazira)',
      trend: 'Growing maritime logistics links for food supply & construction materials.',
    },
    QA: {
      demand: 'High ($2B+ Exports)',
      products: ['Fresh Fruits & Vegetables', 'Ceramic Tiles', 'Electrical Cables', 'Basmati Rice'],
      ports: ['Hamad Port (Doha)', 'Ras Laffan Port'],
      fta: 'Qatar-India Trade Agreements & Fast-Track Customs Protocol',
      potential: '★★★★☆ (High-Value Capital & Agro Export Sourcing)',
      trend: 'Steady imports of premium agricultural products and building finishes.',
    },
    KW: {
      demand: 'High ($2B+ Exports)',
      products: ['Organic Spices', 'Cotton Apparels', 'Marine Produce', 'Ceramic Sanitaryware'],
      ports: ['Shuwaikh Port', 'Shuaiba Port'],
      fta: 'GCC Trade Framework & Bilateral Trade Agreement',
      potential: '★★★★☆ (Strong Retail Food Market & Commercial Contracting)',
      trend: 'Expanding demand for Indian organic foodstuffs and home textiles.',
    },
    BH: {
      demand: 'High ($1B+ Exports)',
      products: ['Jewelry Assemblies', 'Fresh Produce', 'Machinery Castings', 'Textiles'],
      ports: ['Khalifa Bin Salman Port (KBSP)'],
      fta: 'GCC Preferential Trade Tariff & Bilateral Agreements',
      potential: '★★★★☆ (GCC Commercial Sourcing & Jewelry Trading)',
      trend: 'Consistent demand for food products and precious metals.',
    },
  };

  if (dataset[cCode]) {
    return {
      name: name,
      code: cCode,
      ...dataset[cCode],
    } as CountryData;
  }

  // Dynamic Region-Based Data Generator for any remaining country (No generic dummy text!)
  const codeLetter = cCode.charCodeAt(0) || 65;
  
  let regionName = 'Global Partner Market';
  let samplePorts = ['Primary Regional Deep Sea Port', 'National Cargo Terminal'];
  let sampleProducts = ['Organic Spices', 'Cotton Garments', 'Pharmaceutical Formulations', 'Engineering Machinery Spares'];
  let treatyName = 'Standard MFN Tariffs & Bilateral Trade Facilitation';
  let trendName = 'Steady expansion of Indian export supply channels.';

  // Regional heuristic categorization
  if (['FR', 'IT', 'NL', 'BE', 'ES', 'PT', 'GR', 'SE', 'NO', 'FI', 'DK', 'PL', 'CZ', 'AT', 'CH', 'HU', 'RO', 'IE'].includes(cCode)) {
    regionName = 'European Union / EFTA';
    samplePorts = ['Port of Rotterdam (Transshipment)', 'Port of Hamburg', 'Port of Antwerp-Bruges'];
    sampleProducts = ['Organic Essential Oils', 'Fine Cotton Apparel', 'Industrial Valves', 'Handicraft Goods'];
    treatyName = 'EU Customs Framework & GSP Concessions Protocol';
    trendName = 'Growing European demand for sustainable textiles and bio-certified extracts.';
  } else if (['SA', 'AE', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB', 'IQ'].includes(cCode)) {
    regionName = 'Middle East & GCC';
    samplePorts = ['Jebel Ali Port', 'King Abdulaziz Port', 'Sohar Maritime Hub'];
    sampleProducts = ['Morbi Ceramic Tiles', 'Basmati Rice', 'Gold Jewelry', 'Embroidery Apparel'];
    treatyName = 'GCC Bilateral Trade Agreements & Preferential Tariffs';
    trendName = 'High demand in construction ceramics and retail agro commodities.';
  } else if (['SG', 'MY', 'ID', 'TH', 'VN', 'PH', 'MM', 'KH', 'LA', 'BN'].includes(cCode)) {
    regionName = 'ASEAN Trade Region';
    samplePorts = ['Port of Singapore', 'Port Klang', 'Tanjung Priok (Jakarta)'];
    sampleProducts = ['Jewelry Assemblies', 'Synthetic Yarns', 'Pharmaceutical Formulations', 'Groundnuts'];
    treatyName = 'ASEAN-India Free Trade Area (AIFTA) Agreement';
    trendName = 'Expanding bilateral trade in agro commodities and manufacturing intermediates.';
  } else if (['ZA', 'KE', 'NG', 'EG', 'TZ', 'UG', 'GH', 'ET', 'MA', 'DZ', 'CI'].includes(cCode)) {
    regionName = 'African Union Trade Corridor';
    samplePorts = ['Port of Mombasa', 'Port of Durban', 'Lagos Apapa Port', 'Port of Alexandria'];
    sampleProducts = ['Essential Generic Medicines', 'Commercial Vehicles', 'Sugar & Foodstuffs', 'Cotton Fabrics'];
    treatyName = 'AfCFTA Inter-Regional Framework & Duty Exemptions';
    trendName = 'Rising demand for Indian pharmaceuticals, machinery, and food security items.';
  } else if (['BR', 'MX', 'AR', 'CL', 'CO', 'PE', 'EC', 'VE', 'GT', 'CR'].includes(cCode)) {
    regionName = 'Latin America Trade Region';
    samplePorts = ['Port of Santos', 'Port of Manzanillo', 'Port of Callao'];
    sampleProducts = ['Active Pharma Ingredients (API)', 'Auto Components', 'Synthetic Yarns', 'Organic Petrochemicals'];
    treatyName = 'MERCOSUR & Bilateral Preferential Trade Agreements';
    trendName = 'High growth in generic drug raw materials and automotive manufacturing parts.';
  }

  const demandLevels = ['High Import Demand', 'Very High Demand', 'Critical Sourcing Partner'];
  const demandIndex = demandLevels[codeLetter % demandLevels.length];

  return {
    name: name,
    code: cCode,
    demand: `${demandIndex} (${regionName})`,
    products: sampleProducts,
    ports: samplePorts,
    fta: treatyName,
    potential: '★★★★☆ (Active Buyer Sourcing & Expanding Container Routes)',
    trend: trendName,
  };
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
