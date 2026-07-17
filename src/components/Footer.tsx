import { Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
    alert(`Thank you! ${input.value} is subscribed to EIBM Trade Alerts.`);
    input.value = '';
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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
    <footer className="relative w-full bg-[#040B1A] pt-20 pb-10 overflow-hidden border-t border-white/10 z-10 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand Bio (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center select-none group">
              <img 
                src="/images/logo.png" 
                alt="EIBM Gujarat Logo" 
                className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-full border border-white/10 group-hover:border-eibm-sky group-hover:scale-105 transition-all duration-300 shadow-lg"
              />
            </a>
            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              India's leading practical business management institute specializing in end-to-end export-import training, buyer finding frameworks, and lifetime alumni mentorship support.
            </p>
            
            {/* Social Icons with glows */}
            <div className="flex gap-4">
              {[
                { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087-1.841-.497-9.411-.497-9.411-.497s-7.571 0-9.411.497c-1.016.272-1.815 1.071-2.087 2.087-.497 1.841-.497 5.679-.497 5.679s0 3.839.497 5.679c.272 1.016 1.071 1.815 2.087 2.087 1.84 1.841 9.411.497 9.411.497s7.571 0 9.411-.497c1.016-.272 1.815-1.071 2.087-2.087.497-1.84.497-5.679.497-5.679s0-3.839-.497-5.679zm-14.12 9.243v-6.81l6.19 3.41-6.19 3.4z"/></svg>, href: 'https://youtube.com', label: 'YouTube' },
                { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>, href: 'https://facebook.com', label: 'Facebook' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-eibm-sky hover:bg-eibm-sky/10 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Courses', href: '#courses' },
                { name: 'Curriculum', href: '#curriculum' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-400 hover:text-eibm-sky transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Modules (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Core Training
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {[
                'Practical Costs & Costing',
                'Government Schemes MEIS/RoDTEP',
                'Buyer Finding Masterclass',
                'Custom Clearings (CHA) Protocols',
                'Agro & Textiles Exporting Guides',
              ].map((program) => (
                <li key={program}>
                  <a
                    href="#curriculum"
                    onClick={(e) => handleNavClick(e, '#curriculum')}
                    className="text-slate-400 hover:text-eibm-sky transition-colors duration-200 block py-1"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Trade Newsletters
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Subscribe to get weekly updates on Indian export customs tariffs and global trade opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="flex border border-white/10 rounded-xl overflow-hidden bg-white/5 focus-within:border-eibm-sky focus-within:ring-4 focus-within:ring-eibm-sky/10 transition-all duration-300">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="flex-grow px-4 py-2.5 bg-transparent border-none text-white text-xs outline-none font-sans font-light"
              />
              <button
                type="submit"
                className="px-4 bg-eibm-royal text-white hover:bg-eibm-sky transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom copyright area */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-slate-500 gap-4 text-center md:text-left">
          <p>
            &copy; 2026 EIBM Gujarat. All Rights Reserved. Designed by Elite Brand Agency.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-eibm-sky transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-eibm-sky transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-eibm-sky transition-colors">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
