import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function SiteVisitModal({ isOpen, onClose, selectedProperty }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden text-stone-900">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Schedule Site Visit
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <p className="text-xs text-stone-600">
                Book a visit to inspect The Mannat Park campus at Dharampura, Jagdalpur.
              </p>

              {selectedProperty && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                  Property: {selectedProperty.title}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sahu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 94252 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20"
              >
                Confirm Site Visit
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-stone-900 font-serif">Visit Confirmed!</h4>
              <p className="text-xs text-stone-600">
                Thank you <strong className="text-stone-900">{name}</strong>. Our team will contact you at {phone} for your visit on {date}.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
