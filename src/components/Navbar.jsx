import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function Navbar({ onOpenVisitModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Developer */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-amber-600/20">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">
                THE MANNAT PARK
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                Jagdalpur
              </span>
            </div>
            <p className="text-[11px] text-stone-500 flex items-center gap-1">
              <span>By {MANNAT_PARK_INFO.developer}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                RERA: {MANNAT_PARK_INFO.reraNo}
              </span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700">
          <a href="#properties" className="hover:text-amber-700 transition-colors">3 BHK Homes & Plots</a>
          <a href="#amenities" className="hover:text-amber-700 transition-colors">Park & Amenities</a>
          <a href="#locality" className="hover:text-amber-700 transition-colors">Location</a>
          <a href="#contact" className="hover:text-amber-700 transition-colors">Contact Developer</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href={`tel:${MANNAT_PARK_INFO.phone}`}
            className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-300"
          >
            <Phone className="w-3.5 h-3.5 text-amber-700" />
            {MANNAT_PARK_INFO.phone}
          </a>

          <button
            onClick={onOpenVisitModal}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
          >
            Schedule Site Visit
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3 text-center text-sm font-medium text-stone-800">
          <a href="#properties" onClick={() => setMobileMenuOpen(false)} className="block py-1">3 BHK Homes & Plots</a>
          <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="block py-1">Amenities</a>
          <a href="#locality" onClick={() => setMobileMenuOpen(false)} className="block py-1">Location & Landmarks</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">Contact Us</a>
          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVisitModal(); }}
              className="w-full py-2.5 rounded-lg bg-amber-600 text-white font-bold text-xs"
            >
              Schedule Site Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
