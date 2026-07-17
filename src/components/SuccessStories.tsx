import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply expo.out easing
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easedProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, value, duration]);

  return (
    <span ref={elementRef} className="font-serif">
      {count}
      {suffix}
    </span>
  );
};

export const SuccessStories: React.FC = () => {

  return (
    <section 
      id="success-stories"
      className="relative w-full bg-[#040B1A] py-24 md:py-32 overflow-hidden border-b border-white/5 z-10"
    >
      <div className="absolute top-[20%] right-[-15%] w-[45rem] h-[45rem] rounded-full bg-eibm-sky/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[40rem] h-[40rem] rounded-full bg-eibm-royal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Alumni Ventures
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 tracking-tight leading-none font-bold">
            Real Alumni Success Stories
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            See how our graduates transitioned from zero knowledge to active international trade shipping.
          </p>
        </div>

        {/* Pinterest-like Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Before/After Case Studies (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-eibm-sky uppercase tracking-wider mb-2 select-none">
              Before & After Journey
            </h3>
            
            {/* Case Study 1 */}
            <div className="liquid-glass p-8 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-eibm-sky/35 transition-all duration-300">
              <span className="text-[10px] font-bold text-eibm-sky uppercase tracking-wider block mb-1">
                Agro Export Case Study
              </span>
              <h4 className="text-xl font-bold font-serif text-white tracking-tight">
                Patel Agri Exports — Dubai Onion Shipment
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b border-white/5 py-4 my-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Before EIBM</span>
                  <span className="text-sm font-semibold text-slate-400 mt-1 block">Local onion farm broker dependency, zero global reach.</span>
                </div>
                <div className="border-l border-white/5 pl-4">
                  <span className="text-xs text-eibm-sky uppercase tracking-wider block">After EIBM</span>
                  <span className="text-sm font-bold text-white mt-1 block">4 Containers of fresh red onions exported directly to Dubai.</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                "We bypassed intermediaries, registered our IEC under EIBM guidance, and found Dubai importers using Trademap data. Profit margins rose by 35%."
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="liquid-glass p-8 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-eibm-sky/35 transition-all duration-300">
              <span className="text-[10px] font-bold text-eibm-sky tracking-wider uppercase block mb-1">
                Ceramics Case Study
              </span>
              <h4 className="text-xl font-bold font-serif text-white tracking-tight">
                Horizon Ceramics — Europe Direct Trade
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b border-white/5 py-4 my-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Before EIBM</span>
                  <span className="text-sm font-semibold text-slate-400 mt-1 block">Relying on trading agencies, thin margins.</span>
                </div>
                <div className="border-l border-white/5 pl-4">
                  <span className="text-xs text-eibm-sky uppercase tracking-wider block">After EIBM</span>
                  <span className="text-sm font-bold text-white mt-1 block">Direct ceramics container exports to Poland and Italy.</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                "EIBM's banking LC checklist saved us. We negotiated payment terms directly with Polish buyers, securing 22% higher net returns."
              </p>
            </div>
          </div>

          {/* Right Column: Google Reviews & Success Counters (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-lg font-bold text-eibm-sky uppercase tracking-wider mb-2 select-none">
              Global Performance Metrics
            </h3>

            {/* Counter dashboard block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Counter 1 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/20 text-center">
                <span className="text-4xl md:text-5xl font-extrabold text-eibm-sky tracking-tight block">
                  <AnimatedCounter value={5000} suffix="+" />
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">
                  Alumni Network
                </span>
              </div>
              {/* Counter 2 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/20 text-center">
                <span className="text-4xl md:text-5xl font-extrabold text-eibm-sky tracking-tight block">
                  <AnimatedCounter value={100} suffix="+" />
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">
                  Active Ventures
                </span>
              </div>
              {/* Counter 3 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/20 text-center">
                <span className="text-4xl md:text-5xl font-extrabold text-eibm-sky tracking-tight block">
                  ₹<AnimatedCounter value={15} suffix="Cr+" />
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">
                  Trade Value
                </span>
              </div>
            </div>

            {/* Google Reviews/Student Testaments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Review 1 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-eibm-sky/35 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-sm font-bold text-white font-serif">Amit Patel</h5>
                    <span className="text-[10px] text-slate-500 block">Surat Alumni</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  "The port visit was eye-opening. Seeing cargo checks live helped clear my doubts. EIBM's student support group resolved my custom-draft clearance within a day."
                </p>
              </div>

              {/* Review 2 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-eibm-sky/35 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-sm font-bold text-white font-serif">Kajal Desai</h5>
                    <span className="text-[10px] text-slate-500 block">Rajkot Alumni</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  "As a female entrepreneur, I felt welcome. EIBM's business setup modules walked me through LLPs, banks current accounts, and product classifications clearly."
                </p>
              </div>

              {/* Review 3 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-eibm-sky/35 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-sm font-bold text-white font-serif">Manish Shah</h5>
                    <span className="text-[10px] text-slate-500 block">Ahmedabad Alumni</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  "Negotiating bulk exports with foreign buyers was my main hurdle. EIBM taught us structured cold-email drafting patterns and how to verify buyers credits."
                </p>
              </div>

              {/* Review 4 */}
              <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/40 hover:border-eibm-sky/35 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-sm font-bold text-white font-serif">Dr. R. Patel</h5>
                    <span className="text-[10px] text-slate-500 block">Corporate Member</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  "We enrolled our logistics management staff in EIBM's documentation courses. The accuracy of their shipping bill calculations is stellar."
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
