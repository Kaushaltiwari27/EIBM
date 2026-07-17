import React, { useState, useEffect } from 'react';
import { Ship } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Easing progression simulation to feel organic/spring-like
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 800); // Wait for fade-out transition
          }, 400);
          return 100;
        }
        // Organic slowing down as it reaches the end
        const increment = Math.max(1, Math.floor((100 - prev) * 0.15));
        return Math.min(100, prev + increment);
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 w-full h-full bg-[#040B1A] z-[9999] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none blur-md' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle background particles / noise grain */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative flex flex-col items-center max-w-lg px-6 w-full text-center select-none">
        
        {/* 1. Pulsing Circular Logo Mark */}
        <div className="relative mb-8 animate-float-slow">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-eibm-sky via-eibm-royal to-transparent opacity-20 blur-md animate-pulse" />
          <img 
            src="/images/logo.png" 
            alt="EIBM Gujarat Logo" 
            className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-full border-2 border-white/10 shadow-2xl relative z-10"
          />
        </div>

        {/* 2. Drawing Trade Routes SVG Map */}
        <div className="w-full h-24 relative mb-6 overflow-hidden flex items-center justify-center">
          <svg className="w-64 h-20 opacity-30 text-white" viewBox="0 0 200 60" fill="none">
            {/* Dots representing world continents */}
            <circle cx="20" cy="15" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="50" cy="40" r="3" fill="currentColor" opacity="0.4" />
            <circle cx="80" cy="20" r="2" fill="currentColor" opacity="0.4" />
            {/* Gujarat / India anchor point */}
            <circle cx="100" cy="35" r="4" fill="#00AEEF" className="animate-ping" />
            <circle cx="100" cy="35" r="3" fill="#005BAA" />
            
            {/* Target Countries */}
            <circle cx="150" cy="15" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="170" cy="45" r="2.5" fill="currentColor" opacity="0.4" />
            
            {/* Drawing route paths linked to loading progress */}
            <path 
              d="M100 35 Q125 15 150 15" 
              stroke="#00AEEF" 
              strokeWidth="1.5" 
              strokeDasharray="100" 
              strokeDashoffset={100 - progress} 
              strokeLinecap="round"
            />
            <path 
              d="M100 35 Q135 45 170 45" 
              stroke="#005BAA" 
              strokeWidth="1.5" 
              strokeDasharray="100" 
              strokeDashoffset={100 - progress} 
              strokeLinecap="round"
            />
          </svg>

          {/* 3. Sailing Cargo Ship Silhouette */}
          <div 
            style={{ left: `${Math.min(90, progress * 0.9)}%` }}
            className="absolute bottom-2 text-eibm-sky/80 transition-all duration-300 ease-out flex items-center gap-1.5"
          >
            <Ship size={18} className="animate-bounce" />
            <span className="text-[7px] font-bold uppercase tracking-widest text-white/40">Surat Cargo</span>
          </div>
        </div>

        {/* 4. Progress Percentage Indicator */}
        <div className="space-y-2 w-48">
          <div className="flex justify-between items-baseline text-white">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Trade Hub</span>
            <span className="text-xl font-black font-serif text-eibm-sky tracking-tight">{progress}%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden border border-white/5">
            <div 
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-eibm-royal to-eibm-sky transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,174,239,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
