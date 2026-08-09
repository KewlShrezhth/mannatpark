import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '3 BHK Home',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 bg-white border-t border-emerald-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-emerald-50/50 border border-emerald-100 shadow-sm text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Contact Info */}
            <div className="md:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Direct Developer Sales
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
                Contact MAK Infra
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Interested in 3 BHK houses or residential plots at The Mannat Park, Dharampura Negiguda Road, Jagdalpur?
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a 
                  href={`tel:${MANNAT_PARK_INFO.phone}`}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-emerald-200 hover:border-emerald-500 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <div>
                    <div className="text-stone-500">Call Direct</div>
                    <div className="font-bold text-emerald-950">{MANNAT_PARK_INFO.phone}</div>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/919425250000?text=Hi%20MAK%20Infra,%20I%20am%20interested%20in%20The%20Mannat%20Park,%20Dharampura,%20Jagdalpur.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-100/80 border border-emerald-300 hover:border-emerald-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-800" />
                  <div>
                    <div className="text-emerald-900 font-medium">WhatsApp Inquiry</div>
                    <div className="font-bold text-emerald-950">Chat with Sales Team</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-emerald-100">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-base font-bold text-emerald-950 font-serif">Request Callback / Details</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Sahu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-emerald-50/40 border border-emerald-200 text-xs text-stone-900 outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 94252 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-emerald-50/40 border border-emerald-200 text-xs text-stone-900 outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Interested In</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-emerald-50/40 border border-emerald-200 text-xs text-stone-900 outline-none focus:border-emerald-600"
                    >
                      <option value="3 BHK Home">3 BHK Independent House</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="General Inquiry">General Site Visit Inquiry</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" /> Send Inquiry Request
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-950 font-serif">Thank You!</h4>
                  <p className="text-xs text-stone-600">
                    We have received your inquiry. Our sales representative will call you shortly at <strong className="text-stone-900">{formData.phone}</strong>.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
