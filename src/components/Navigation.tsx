import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 animate-fade-down ${
        scrolled
          ? 'bg-slate-950/45 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Brand Group */}
        <a href="#" className="flex items-center select-none group">
          <img 
            src="/images/logo.png" 
            alt="EIBM Gujarat Logo" 
            className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-full border border-white/10 group-hover:border-eibm-sky group-hover:scale-105 transition-all duration-300 shadow-lg"
          />
        </a>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: 'Home', href: '#' },
            { name: 'About', href: '#about' },
            { name: 'Courses', href: '#courses' },
            { name: 'Curriculum', href: '#curriculum' },
            { name: 'Success Stories', href: '#success-stories' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href === '#' ? 'body' : item.href)}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-eibm-sky transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Apply Now Glass Button */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="liquid-glass text-xs font-semibold px-6 py-2.5 rounded-full text-white transition-all duration-300 btn-glow select-none"
          >
            Apply Now
          </a>
        </div>

        {/* Burger menu trigger (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/80 hover:text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 animate-fade-rise">
          {[
            { name: 'Home', href: '#' },
            { name: 'About', href: '#about' },
            { name: 'Courses', href: '#courses' },
            { name: 'Curriculum', href: '#curriculum' },
            { name: 'Success Stories', href: '#success-stories' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href === '#' ? 'body' : item.href)}
              className="text-base font-semibold text-white/80 hover:text-white transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              const contactEl = document.getElementById('contact');
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="liquid-glass text-center text-sm font-semibold py-3 rounded-full text-white btn-glow"
          >
            Apply Now
          </a>
        </div>
      )}
    </header>
  );
};
