import React, { useState } from 'react';
import { Phone, MapPin, CheckCircle, MessageSquare } from 'lucide-react';

interface FormState {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    course: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate submission success
      setSubmitted(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  return (
    <section 
      id="contact"
      className="relative w-full bg-[#060F24] py-24 md:py-32 overflow-hidden border-b border-white/5 z-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-bold text-eibm-sky uppercase tracking-widest">
            Campuses & Contacts
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 tracking-tight leading-none font-bold">
            Begin Your Global Venture Today
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Fill out the inquiry form, visit our campuses, or direct call our student help desk.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Inquiry Form (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="liquid-glass p-8 md:p-10 rounded-[2rem] border border-white/10 bg-slate-950/40 backdrop-blur-xl shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                    Request Free Counseling
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                    Submit your details and our export advisory team will contact you within 24 hours.
                  </p>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white outline-none focus:border-eibm-sky focus:ring-4 focus:ring-eibm-sky/10 transition-all duration-300 text-sm ${
                        errors.name ? 'border-red-500 bg-red-500/5' : 'border-white/15'
                      }`}
                    />
                    {errors.name && <span className="text-xs text-red-500 block mt-1">{errors.name}</span>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="98765 43210"
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white outline-none focus:border-eibm-sky focus:ring-4 focus:ring-eibm-sky/10 transition-all duration-300 text-sm ${
                        errors.phone ? 'border-red-500 bg-red-500/5' : 'border-white/15'
                      }`}
                    />
                    {errors.phone && <span className="text-xs text-red-500 block mt-1">{errors.phone}</span>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white outline-none focus:border-eibm-sky focus:ring-4 focus:ring-eibm-sky/10 transition-all duration-300 text-sm ${
                        errors.email ? 'border-red-500 bg-red-500/5' : 'border-white/15'
                      }`}
                    />
                    {errors.email && <span className="text-xs text-red-500 block mt-1">{errors.email}</span>}
                  </div>

                  {/* Course dropdown */}
                  <div className="space-y-1">
                    <label htmlFor="course" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Primary Course Interest
                    </label>
                    <select
                      id="course"
                      value={form.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/15 rounded-xl text-white outline-none focus:border-eibm-sky focus:ring-4 focus:ring-eibm-sky/10 transition-all duration-300 text-sm"
                    >
                      <option value="general">Export-Import Business Program</option>
                      <option value="documentation">Logistics & CHA Program</option>
                      <option value="buyer">Buyer Sourcing Masterclass</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Message / Business Details (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you launch your business?"
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white outline-none focus:border-eibm-sky focus:ring-4 focus:ring-eibm-sky/10 transition-all duration-300 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full liquid-glass py-4 rounded-full text-white text-sm font-semibold btn-glow cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 flex flex-col items-center justify-center animate-fade-rise">
                  <CheckCircle size={56} className="text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold font-serif text-white tracking-tight">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="mt-3 text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
                    Thank you, {form.name}. Our senior export trade counselor will call you on{' '}
                    <span className="text-eibm-sky font-semibold">{form.phone}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: '', phone: '', email: '', course: 'general', message: '' });
                      setSubmitted(false);
                    }}
                    className="mt-8 px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-xs text-white/80 transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Branches & Contacts (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold text-eibm-sky uppercase tracking-wider mb-2 select-none">
              EIBM Campuses & Hubs
            </h3>

            {/* Branch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Surat Campus', addr: '402 Golden Trade Center, Majura Gate, Surat', phone: '+91 98765 43210' },
                { name: 'Ahmedabad Campus', addr: '708 Synergy Business Park, SG Highway, Ahmedabad', phone: '+91 98765 43211' },
                { name: 'Rajkot Campus', addr: '302 Royal Commerce Hub, Yagnik Road, Rajkot', phone: '+91 98765 43212' },
              ].map((b) => (
                <div key={b.name} className="liquid-glass p-5 rounded-2xl border border-white/10 bg-slate-950/20">
                  <h4 className="text-sm font-bold text-white font-serif tracking-tight">{b.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-2 font-light leading-relaxed flex items-start gap-1">
                    <MapPin size={12} className="text-eibm-sky shrink-0 mt-0.5" />
                    <span>{b.addr}</span>
                  </p>
                  <p className="text-[11px] text-eibm-sky mt-2 font-semibold flex items-center gap-1">
                    <Phone size={10} />
                    <span>{b.phone}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Contacts & Quick actions */}
            <div className="liquid-glass p-6 rounded-3xl border border-white/10 bg-slate-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-eibm-sky">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Instant Support</span>
                  <span className="text-sm font-semibold text-white block">Ask your questions on WhatsApp</span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <a
                  href="https://wa.me/919876543210"
                  className="flex-1 md:flex-initial text-center px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:opacity-90 shadow-md select-none"
                >
                  WhatsApp Now
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex-1 md:flex-initial text-center px-6 py-3 rounded-full bg-eibm-sky text-white text-xs font-semibold hover:opacity-90 shadow-md select-none"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Interactive Map Iframe wrapper */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 h-64 shadow-2xl select-none">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14879.790906297312!2d72.82522770857317!3d21.19422894541577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e6c3820c78b%3A0xc48c08ecb8fa5ee8!2sMajura%20Gate%2C%20Surat%2C%20Gujarat%20395002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="EIBM Surat Location">
              </iframe>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
