import React, { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';

interface ModuleItem {
  id: string;
  num: string;
  title: string;
  details: string;
  highlights: string[];
}

export const Curriculum: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  const modules: ModuleItem[] = [
    {
      id: 'mod-1',
      num: '01',
      title: 'Introduction to Export-Import Business',
      details: 'Analyze direct global trade structures, local opportunities, key terms, and standard business models for export startups.',
      highlights: ['Current trade balances of India', 'H.S. Codes identification basics', 'Import cycles vs Export cycles'],
    },
    {
      id: 'mod-2',
      num: '02',
      title: 'Business Setup & Legal Structures',
      details: 'Configure legal business entities (LLPs, Proprietorships, DSC configurations) and set up export bank accounts.',
      highlights: ['Partnership vs LLP vs Pvt Ltd setup', 'Applying for commercial PAN accounts', 'Export bank accounts structures'],
    },
    {
      id: 'mod-3',
      num: '03',
      title: 'IEC License & Government Registrations',
      details: 'Step-by-step tutorial to register your Import Export Code (IEC) directly from the DGFT government portal.',
      highlights: ['Filing application for IEC code', 'DGFT portal profiling setup', 'GST integration for exporters'],
    },
    {
      id: 'mod-4',
      num: '04',
      title: 'RCMC & Export Promotion Councils',
      details: 'Identify and register with the correct Export Promotion Councils (APEDA, FIEO, EEPC, Spice Board) and get your RCMC certificate.',
      highlights: ['Choosing the right EPC council', 'RCMC benefit schemes', 'Filing applications details'],
    },
    {
      id: 'mod-5',
      num: '05',
      title: 'Product Selection Strategies',
      details: 'Deploy data-driven methodologies to select high-profit products based on margins, durability, and overseas demands.',
      highlights: ['Agro vs textile vs engineering feasibility', 'Product standard certifications', 'Shelf-life & shipping stability analysis'],
    },
    {
      id: 'mod-6',
      num: '06',
      title: 'Sourcing & Manufacturer Deals',
      details: 'How to negotiate trade agreements with manufacturers and farmers without capital purchasing risk.',
      highlights: ['Manufacturer verification checks', 'Supplier MoU contract drafts', 'Sourcing local products zero-risk'],
    },
    {
      id: 'mod-7',
      num: '07',
      title: 'Export Pricing & Costing Cost-Matrix',
      details: 'Master costing spreadsheets including ocean freights, local forwarder charges, CHA clearings, and duty incentives.',
      highlights: ['FOB, CFR, CIF costing sheets', 'Duty drawback deductions', 'Ocean freight estimates'],
    },
    {
      id: 'mod-8',
      num: '08',
      title: 'Target Market Research',
      details: 'Locate top importing nations for your products using database directories like Trademap.org.',
      highlights: ['Trademap.org dashboard operations', 'Tariffs & import duties calculations', 'Competitor exports tracking'],
    },
    {
      id: 'mod-9',
      num: '09',
      title: 'International Buyer Finding Methods',
      details: 'Unlock EIBM\'s premium 15 online/offline strategies to identify and establish contact with global business buyers.',
      highlights: ['Embassy trade registries matching', 'LinkedIn & B2B optimization pitches', 'Cold email templates that convert'],
    },
    {
      id: 'mod-10',
      num: '10',
      title: 'Government Subsidies & Benefits',
      details: 'Verify incentives schemes (RoDTEP, Interest Equalization, MAI) to boost operational trade margins.',
      highlights: ['RoDTEP rates applications', 'Duty exemption benefits', 'Interest subsidies details'],
    },
    {
      id: 'mod-11',
      num: '11',
      title: 'Risk Management & ECGC Credit Insurance',
      details: 'Prevent buyer defaults. Cover shipping values through Export Credit Guarantee Corporation policies.',
      highlights: ['ECGC credit checks on buyers', 'Credit insurance plans details', 'Transit insurance verification'],
    },
    {
      id: 'mod-12',
      num: '12',
      title: 'International Payment Methods',
      details: 'Master secure payments channels, bank negotiations, and Letters of Credit (L/C) document checks.',
      highlights: ['Letter of Credit (LC) anatomy', 'Telegraphic Transfers (TT) cycles', 'FEMA guidelines compliance'],
    },
    {
      id: 'mod-13',
      num: '13',
      title: 'Incoterms 2020 Rules',
      details: 'Study responsibilities, insurance obligations, and transfer locations for each commercial term (FOB, CIF, DDP).',
      highlights: ['EXW, FOB, CIF, DDP differences', 'Point of risk-transfers details', 'Freight liabilities mapping'],
    },
    {
      id: 'mod-14',
      num: '14',
      title: 'Import-Export Documentation Complete Suite',
      details: 'Hands-on practice completing pre-shipment and post-shipment forms (Invoices, Packing Lists, Shipping Bills).',
      highlights: ['Drafting Proforma & Commercial Invoices', 'Bill of Lading verification checks', 'Phytosanitary certification filings'],
    },
    {
      id: 'mod-15',
      num: '15',
      title: 'Custom House Agent (CHA) Gate-Clearings',
      details: 'Hire custom agents (CHAs), coordinate sea/air port check-ins, custom evaluations, and container tracking.',
      highlights: ['Shipping bill filings parameters', 'Port gate-in checkpoints procedures', 'Custom agent fee models'],
    },
  ];

  return (
    <section 
      id="curriculum"
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-b border-slate-100 z-10"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Syllabus Blueprint
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-eibm-navy mt-4 tracking-tight leading-none font-bold">
            Complete Practical Curriculum
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Click on any module below to inspect the deep syllabus points that we teach step-by-step.
          </p>
        </div>

        {/* 15 Modules Accordion Grid */}
        <div className="space-y-4">
          {modules.map((mod) => {
            const isOpen = openModuleId === mod.id;
            return (
              <div 
                key={mod.id}
                className="liquid-glass border border-slate-100 rounded-3xl bg-slate-50/50 backdrop-blur-md hover:border-eibm-sky/30 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleModule(mod.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none select-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-serif font-extrabold text-eibm-sky/70">
                      {mod.num}
                    </span>
                    <span className="text-base md:text-lg font-bold text-eibm-navy font-serif tracking-tight">
                      {mod.title}
                    </span>
                  </div>
                  <div className="text-eibm-sky p-2 rounded-xl bg-white border border-slate-100 shadow-sm">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                {/* Accordion Expansion Container */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[300px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-14">
                    <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed mb-4">
                      {mod.details}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-slate-200/50 pt-4">
                      {mod.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check size={14} className="text-eibm-sky stroke-[3] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
