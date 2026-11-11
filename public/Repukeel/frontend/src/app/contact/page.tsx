/* eslint-disable */
'use client';
import React, { useState } from 'react';
import BlueCtaBand from '../components/BlueCtaBand';
import { categories } from '@/data/services';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.reason || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_form',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          reason: formData.reason,
          message: formData.message
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', reason: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ================= HERO (Photo & Glassmorphism) ================= */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        {/* Background Photo & Tint Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-blue-950 opacity-80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[var(--bg-navy)] opacity-60"></div>
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Heading */}
          <div>
            <div className="pill-badge dark-var mb-6 border-blue-400">
              <span className="text-[var(--gold)]">👋</span> We're here to help
            </div>
            <h1 className="text-5xl md:text-6xl font-[900] tracking-tight mb-6 text-white">
              Get In Touch
            </h1>
            <p className="text-[18px] text-blue-100 max-w-lg mb-8 leading-relaxed">
              Facing a content emergency? Need a custom brand protection plan? Our team of legal and technical experts is standing by.
            </p>
          </div>

          {/* Right: Glassmorphism Panel */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
              <h3 className="text-[22px] font-[800] mb-6 flex items-center gap-2 text-white">
                <span className="text-[var(--gold)]">⚡</span> Quick Connect
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5" aria-hidden="true" focusable="false">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider font-[600] text-blue-200 mb-1">Phone / WhatsApp (24/7)</p>
                    <a href="https://wa.me/923087525510" target="_blank" rel="noopener noreferrer" className="text-[16px] font-[700] hover:text-[var(--gold)] transition-colors">+92 308 752 5510</a>
                  </div>
                </div>

                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider font-[600] text-blue-200 mb-1">Email</p>
                    <a href="mailto:Legal@Repukeel.com" className="text-[16px] font-[700] hover:text-[var(--gold)] transition-colors">Legal@Repukeel.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider font-[600] text-blue-200 mb-1">Headquarters</p>
                    <p className="text-[15px] font-[500] leading-snug">P33H+GVV, G-7/4<br/>Islamabad, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    ⏰
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-wider font-[600] text-blue-200 mb-1">Business Hours</p>
                    <p className="text-[15px] font-[500] leading-snug">Mon-Fri: 9am - 6pm EST<br/><span className="text-[var(--gold)]">Emergency Support: 24/7</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORM & SIDE PANEL ================= */}
      <section className="w-full bg-white py-24">
        <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left: Form (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-[800] mb-2">Send us a message</h2>
            <p className="text-[15px] text-[var(--text-body)] mb-8">Fill out the form below and an account manager will be in touch within 24 hours.</p>
            
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center flex flex-col items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 className="text-[20px] font-[800] text-green-800 mb-2">Message Sent Successfully!</h3>
                <p className="text-[15px] text-green-700">Thank you for reaching out. An account manager will review your inquiry and get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 text-[14px] font-[600] text-green-700 hover:text-green-800 underline">Send another message</button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] font-[700] text-[var(--text-heading)] mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-shadow bg-[var(--bg-soft)]" required />
                </div>
                <div>
                  <label className="block text-[14px] font-[700] text-[var(--text-heading)] mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-shadow bg-[var(--bg-soft)]" required />
                </div>
              </div>
              
              <div>
                <label className="block text-[14px] font-[700] text-[var(--text-heading)] mb-2">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-shadow bg-[var(--bg-soft)]" required />
              </div>

              <div>
                <label className="block text-[14px] font-[700] text-[var(--text-heading)] mb-2">Reason for Inquiry *</label>
                <select name="reason" value={formData.reason} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-shadow bg-[var(--bg-soft)] text-gray-900" required>
                  <option value="" disabled className="text-gray-500">Select an option</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[14px] font-[700] text-[var(--text-heading)] mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-shadow bg-[var(--bg-soft)] resize-none" placeholder="Provide details about your case or inquiry..." required></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-navy-solid w-max text-[16px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
            )}
          </div>

          {/* Right: Side Panel (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col h-full bg-[var(--bg-soft)] rounded-2xl p-8 border border-[var(--border-light)]">
            <h3 className="text-[20px] font-[800] text-[var(--text-heading)] mb-6">Why Contact Us?</h3>
            
            <ul className="flex flex-col gap-5 mb-10">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgba(217,165,43,0.2)] text-[var(--gold)] flex items-center justify-center flex-shrink-0 mt-0.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg></div>
                <div>
                  <p className="font-[700] text-[14px] text-[var(--text-heading)]">Free Initial Case Review</p>
                  <p className="text-[13px] text-[var(--text-body)] mt-1">We'll assess your situation at no cost.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgba(217,165,43,0.2)] text-[var(--gold)] flex items-center justify-center flex-shrink-0 mt-0.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg></div>
                <div>
                  <p className="font-[700] text-[14px] text-[var(--text-heading)]">Rapid Response</p>
                  <p className="text-[13px] text-[var(--text-body)] mt-1">Action taken within 24 hours on all urgent matters.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgba(217,165,43,0.2)] text-[var(--gold)] flex items-center justify-center flex-shrink-0 mt-0.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg></div>
                <div>
                  <p className="font-[700] text-[14px] text-[var(--text-heading)]">Dedicated Support</p>
                  <p className="text-[13px] text-[var(--text-body)] mt-1">Direct access to your assigned legal case manager.</p>
                </div>
              </li>
            </ul>

            <div className="mt-auto bg-white border border-[var(--border-light)] rounded-xl p-5 relative shadow-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[var(--gold)] opacity-20 absolute top-4 right-4"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <p className="text-[13px] italic text-[var(--text-body)] mb-4 relative z-10">
                "I sent an inquiry on a Sunday evening and had a response and action plan by Monday morning. Truly exceptional service."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-navy)] flex items-center justify-center text-white text-[12px] font-bold">JD</div>
                <p className="text-[12px] font-[700] text-[var(--text-heading)]">Jason D., Content Creator</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BLUE CTA ================= */}
      <BlueCtaBand 
        headingWhite="Need immediate"
        headingGold="assistance?"
        subtext="Our emergency response team is available 24/7 to handle critical content leaks and severe copyright infringements."
        primaryBtnText="Call Emergency Line"
        primaryBtnLink="https://wa.me/923087525510"
        secondaryBtnText="Submit Urgent Case"
        secondaryBtnLink="/protection"
      />
      
    </div>
  );
}
