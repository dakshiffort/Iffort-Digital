import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { SERVICES } from '../constants';

const Footer: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0].title,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Success
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: SERVICES[0].title,
        message: ''
      });

    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Form submission error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <footer id="contact" className="bg-iffort-navy pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="text-iffort-pink">Scale?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl md:mx-auto">
              Fill out the form below, and let's start building your growth engine.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Form */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 order-2 lg:order-1">
            {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-8 text-iffort-pink hover:text-white transition-colors">Send another message</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-400 text-sm font-medium">{error}</p>
                            <button
                                type="button"
                                onClick={() => setError(null)}
                                className="text-red-300 hover:text-red-200 text-xs mt-2 underline"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formState.name}
                                onChange={handleChange}
                                className="w-full bg-iffort-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-iffort-pink focus:ring-1 focus:ring-iffort-pink transition-all placeholder:text-gray-600"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                className="w-full bg-iffort-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-iffort-pink focus:ring-1 focus:ring-iffort-pink transition-all placeholder:text-gray-600"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full bg-iffort-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-iffort-pink focus:ring-1 focus:ring-iffort-pink transition-all placeholder:text-gray-600"
                            placeholder="john@company.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-medium text-gray-300">I'm interested in...</label>
                        <div className="relative">
                            <select
                                id="service"
                                name="service"
                                value={formState.service}
                                onChange={handleChange}
                                className="w-full bg-iffort-dark border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-iffort-pink focus:ring-1 focus:ring-iffort-pink transition-all"
                            >
                                {SERVICES.map(service => (
                                    <option key={service.id} value={service.title}>{service.title}</option>
                                ))}
                                <option value="other">Other / General Inquiry</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={formState.message}
                            onChange={handleChange}
                            className="w-full bg-iffort-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-iffort-pink focus:ring-1 focus:ring-iffort-pink transition-all resize-none placeholder:text-gray-600"
                            placeholder="Tell us about your goals..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-iffort-pink hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-12 order-1 lg:order-2">
            <div>
                 <h3 className="text-2xl font-bold text-white mb-6">Let's talk business</h3>
                 <p className="text-gray-400 mb-8 leading-relaxed">
                   Skip the sales pitch. We are consultants, not salespeople. Reach out to discuss your digital challenges directly with our leadership.
                 </p>
                 <div className="flex flex-col gap-4">
                  <a href="mailto:kushan.shekhar@iffort.com" className="flex items-center gap-4 text-gray-300 hover:text-iffort-blue transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-iffort-blue/10 flex items-center justify-center transition-colors">
                      <Mail size={20} className="group-hover:text-iffort-blue" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Strategy & Growth</p>
                        <span className="text-lg">kushan.shekhar@iffort.com</span>
                    </div>
                  </a>
                  <a href="mailto:daksh.sharma@iffort.com" className="flex items-center gap-4 text-gray-300 hover:text-iffort-blue transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-iffort-blue/10 flex items-center justify-center transition-colors">
                      <Mail size={20} className="group-hover:text-iffort-blue" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Operations & Tech</p>
                        <span className="text-lg">daksh.sharma@iffort.com</span>
                    </div>
                  </a>
                </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/5">
              <h3 className="text-xl font-bold text-white">Global Offices</h3>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-iffort-blue">
                       <MapPin size={16} />
                       <h4 className="font-bold uppercase tracking-wider text-sm">UAE</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-1">
                      Business Centre, Publishing City Free Zone, Sharjah
                    </p>
                    <p className="text-white text-sm font-medium">+971 54 545 7770</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2 text-iffort-blue">
                       <MapPin size={16} />
                       <h4 className="font-bold uppercase tracking-wider text-sm">India</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-1">
                      C-56, A/13, 8th Floor, Sector 62, Noida, Uttar Pradesh
                    </p>
                    <p className="text-white text-sm font-medium">+91 98917 00977</p>
                  </div>

                   <div>
                    <div className="flex items-center gap-2 mb-2 text-iffort-blue">
                       <MapPin size={16} />
                       <h4 className="font-bold uppercase tracking-wider text-sm">Canada</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-1">
                      2316 Pilgrim Square, Oshawa, ON L1L 0C2
                    </p>
                    <p className="text-white text-sm font-medium">+1 437 987-7424</p>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Iffort. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://www.iffort.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://www.iffort.com/terms-conditions/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="https://linkedin.com/company/iffort" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;