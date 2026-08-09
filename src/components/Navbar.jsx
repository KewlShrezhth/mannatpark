import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck, UserPlus, Camera } from 'lucide-react';
import Logo from './Logo';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function Navbar({ onOpenVisitModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:opacity-90 transition-opacity py-0.5">
            <Logo />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-stone-700">
          <a href="#properties" className="hover:text-[#185226] transition-colors py-1">Plots & Homes</a>
          <a href="#tour" className="hover:text-[#185226] transition-colors py-1 text-[#185226] flex items-center gap-1 font-extrabold">
            <Camera className="w-3.5 h-3.5" /> Project Tour
          </a>
          <a href="#community" className="hover:text-[#185226] transition-colors py-1">Neighbors Map</a>
          <a href="#amenities" className="hover:text-[#185226] transition-colors py-1">Park & Amenities</a>
          <a href="#locality" className="hover:text-[#185226] transition-colors py-1">Location</a>
          <a href="#contact" className="hover:text-[#185226] transition-colors py-1">Contact Developer</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href={`tel:${MANNAT_PARK_INFO.phone}`}
            className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-200"
          >
            <Phone className="w-3.5 h-3.5 text-[#185226]" />
            {MANNAT_PARK_INFO.phone}
          </a>

          <button
            onClick={onOpenVisitModal}
            className="px-4 py-2 rounded-lg bg-[#185226] hover:bg-emerald-900 text-white text-xs font-bold shadow-md shadow-emerald-950/10 transition-all transform hover:-translate-y-0.5"
          >
            Schedule Site Visit
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3 text-center text-xs font-bold uppercase text-stone-800">
          <a href="#properties" onClick={() => setMobileMenuOpen(false)} className="block py-1">Plots & Homes</a>
          <a href="#tour" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#185226]">Project Tour</a>
          <a href="#community" onClick={() => setMobileMenuOpen(false)} className="block py-1">Neighbors Map</a>
          <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="block py-1">Park & Amenities</a>
          <a href="#locality" onClick={() => setMobileMenuOpen(false)} className="block py-1">Location Details</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">Contact Developer</a>
          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVisitModal(); }}
              className="w-full py-2.5 rounded-lg bg-[#185226] text-white font-bold text-xs"
            >
              Schedule Site Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
