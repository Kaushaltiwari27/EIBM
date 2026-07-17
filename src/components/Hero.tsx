import React from 'react';
import { ArrowRight, Download, PhoneCall, Check } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-slate-950 flex flex-col justify-center items-center overflow-hidden">
      {/* 1. Fullscreen Looping Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle Dark Overlay (15-20%) */}
        <div className="absolute inset-0 bg-slate-950/20 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60 z-0" />
      </div>

      {/* 2. Core Hero Content Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center justify-center">
        {/* Luxury Typography Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.08] select-none animate-fade-rise">
          Learn <span className="text-white/60">Global Trade.</span>
          <br className="hidden sm:inline" />
          Build an <span className="text-white/60">International Business.</span>
        </h1>

        {/* Cinematic Sub-Heading */}
        <p className="mt-8 text-sm md:text-base lg:text-lg text-white/80 font-sans font-light leading-relaxed max-w-3xl select-none animate-fade-rise-delay-1">
          Master the complete Export Import Business with India's leading practical training institute.
          Learn directly from industry experts through real Port Visits, Buyer Finding Strategies,
          Government Schemes, International Documentation, Business Setup, Live Case Studies, and Lifetime Mentorship.
        </p>

        {/* 3. CTA Button Group */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 animate-fade-rise-delay-2">
          {/* Enroll Now */}
          <a
            href="#contact"
            className="liquid-glass text-sm font-semibold px-8 py-4 rounded-full text-white btn-glow flex items-center gap-2 select-none shadow-2xl"
          >
            Enroll Now <ArrowRight size={16} className="text-eibm-sky" />
          </a>

          {/* Download Brochure */}
          <a
            href="#brochure"
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/35 backdrop-blur-md text-sm font-semibold text-white/95 transition-all duration-300 flex items-center gap-2 select-none"
          >
            <Download size={16} className="text-white/70" /> Download Brochure
          </a>

          {/* Book Counseling Link */}
          <a
            href="#counseling"
            className="group flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 relative py-1 select-none"
          >
            <PhoneCall size={16} className="text-eibm-sky" />
            <span>Book Free Counseling</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-eibm-sky transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* 4. Trust Indicators / Animated Badges */}
        <div className="mt-16 w-full max-w-4xl select-none animate-fade-rise-delay-2">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '5000+ Students Trained',
              '100+ Successful Export Businesses',
              'Practical Industry Training',
              'Lifetime Business Support',
              'Port & Factory Visits',
              'Government Export Guidance',
            ].map((badge) => (
              <div
                key={badge}
                className="liquid-glass px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase text-white/90 flex items-center gap-2 hover:border-white/30 transition-colors duration-300"
              >
                <Check size={12} className="text-eibm-sky stroke-[3]" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
