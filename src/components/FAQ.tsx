import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Do I need an MBA or trade background to join EIBM?',
      answer: 'No. Over 70% of our alumni come from non-business backgrounds like engineering, IT, retail, agriculture, or are students. We teach international trade protocols from the absolute ground up.',
    },
    {
      id: 'faq-2',
      question: 'What is the minimum capital required to start an export shipment?',
      answer: 'You can start merchant exports with very low capital by sourcing on back-to-back credit or focusing on high-margin low-volume cargo (like spices, handcrafted items, or essential oils). We show you how to trade with minimal purchasing budgets.',
    },
    {
      id: 'faq-3',
      question: 'How long does it take to get an IEC (Import Export Code) license?',
      answer: 'Under EIBM mentors guidance, you can apply online on the DGFT government portal. Clearance and allocation typically take only 24 to 48 hours once documentation matches.',
    },
    {
      id: 'faq-4',
      question: 'Does EIBM assist in finding foreign buyers directly?',
      answer: 'Yes. We teach 15 online and offline buyer finding methodologies. You get practical exercises on compiling export datasets, cold pitching to verified buyers, and using Indian embassy trade registries.',
    },
    {
      id: 'faq-5',
      question: 'How do I ensure secure payments from foreign buyers?',
      answer: 'We cover secure banking channels in depth. You will learn to verify Letters of Credit (LCs), utilize Advance TT transfers, and run credit ratings on foreign firms before signing contracts.',
    },
    {
      id: 'faq-6',
      question: 'What role does ECGC play in risk management?',
      answer: 'The Export Credit Guarantee Corporation of India (ECGC) provides credit insurance that covers up to 90% of your shipping values in case a foreign buyer defaults or goes bankrut. We teach how to file ECGC policies.',
    },
    {
      id: 'faq-7',
      question: 'When and where are the seaport visits arranged?',
      answer: 'Seaport visits are conducted on weekends after classroom sessions finish. We arrange comfortable transport to Hazira (Surat) or Mundra (Kutch) container terminals to witness live customs clearings.',
    },
    {
      id: 'faq-8',
      question: 'Are the morning and evening batch syllabi identical?',
      answer: 'Yes, the 15-day syllabus is identical in both batches. The morning batch runs 10:00 AM - 1:00 PM and the evening batch runs 6:00 PM - 9:00 PM for working professionals.',
    },
    {
      id: 'faq-9',
      question: 'Does EIBM teach import procedures as well?',
      answer: 'Yes. The syllabus covers import clearance processes, customs duties, bill of entry filings, and sourcing manufacturers from China/Europe.',
    },
    {
      id: 'faq-10',
      question: 'What is the difference between FOB and CIF costing?',
      answer: 'FOB (Free on Board) means you are only responsible for delivery up to the Indian seaport. CIF (Cost, Insurance & Freight) requires you to cover ocean freight and insurance to the buyer\'s home port. We teach pricing matrices for both.',
    },
    {
      id: 'faq-11',
      question: 'Can I start an export business as a side hustle?',
      answer: 'Yes. Many graduates keep their day jobs while setting up merchant exports, acting as sourcing facilitators between local factories and international buyers.',
    },
    {
      id: 'faq-12',
      question: 'Can housewives or college students apply for export setups?',
      answer: 'Absolutely. Anyone with an Indian PAN card and current bank account can register a proprietorship or LLP company and apply for an IEC code.',
    },
    {
      id: 'faq-13',
      question: 'How does EIBM\'s lifetime support help alumni?',
      answer: 'Even years after graduating, you can bring your live export invoices, supplier MoUs, or customs queries to EIBM mentors for verification before shipping cargo.',
    },
    {
      id: 'faq-14',
      question: 'What are the top export items shipped from Gujarat?',
      answer: 'Gujarat leads India in exporting textiles, ceramics (Morbi tiles), chemicals, pharmaceutical drugs, agricultural crops (onions, peanuts, spices), and engineering machine parts.',
    },
    {
      id: 'faq-15',
      question: 'What documentation is required for custom clearances?',
      answer: 'The core paper trail includes a Commercial Invoice, Packing List, Shipping Bill, Bill of Lading, Certificate of Origin, and EPC declarations. We teach you how to fill these.',
    },
    {
      id: 'faq-16',
      question: 'How do I claim government duty drawback incentives?',
      answer: 'When filing your shipping bill through your custom agent (CHA), you mention the drawback credentials. The customs server auto-credits refunds into your bank account.',
    },
    {
      id: 'faq-17',
      question: 'Is the EIBM certificate recognized globally?',
      answer: 'Yes, you receive a corporate graduation certificate validation confirming you completed EIBM\'s accredited practical business curriculum.',
    },
    {
      id: 'faq-18',
      question: 'How can I verify if a buyer is genuine?',
      answer: 'You can request credit reports from ECGC, check buyer registries via Indian embassy commissions, and verify buyer activity via trade databases.',
    },
    {
      id: 'faq-19',
      question: 'Do you help in product packaging specifications?',
      answer: 'Yes. We teach specialized agricultural packing parameters, cold temperature monitoring, and ceramic bulk cargo packing requirements.',
    },
    {
      id: 'faq-20',
      question: 'Is a Letter of Credit (LC) completely safe?',
      answer: 'Yes, an irrevocable Letter of Credit (LC) is a bank-guaranteed payment method. The buyer\'s bank is legally obligated to release funds to your bank once shipping documents match.',
    },
  ];

  return (
    <section 
      id="faq"
      className="relative w-full bg-slate-50 py-24 md:py-32 overflow-hidden border-b border-slate-200/60 z-10"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Faq Panel
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-eibm-navy mt-4 tracking-tight leading-none font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about batches, support, licensing, or imports? Explore our comprehensive answers below.
          </p>
        </div>

        {/* 20 FAQs Grid Layout - 2 Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Column 1 (Left 10 FAQs) */}
          <div className="space-y-4">
            {faqs.slice(0, 10).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="liquid-glass border border-slate-200/50 rounded-2xl bg-white/70 backdrop-blur-md hover:border-eibm-sky/35 transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none select-none cursor-pointer"
                  >
                    <span className="text-sm md:text-base font-bold text-eibm-navy font-serif tracking-tight pr-4">
                      {faq.question}
                    </span>
                    <div className="text-eibm-sky shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100">
                      <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 (Right 10 FAQs) */}
          <div className="space-y-4">
            {faqs.slice(10, 20).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="liquid-glass border border-slate-200/50 rounded-2xl bg-white/70 backdrop-blur-md hover:border-eibm-sky/35 transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none select-none cursor-pointer"
                  >
                    <span className="text-sm md:text-base font-bold text-eibm-navy font-serif tracking-tight pr-4">
                      {faq.question}
                    </span>
                    <div className="text-eibm-sky shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100">
                      <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
