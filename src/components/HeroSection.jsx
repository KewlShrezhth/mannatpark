import React from 'react';
import { MapPin, ShieldCheck, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function HeroSection({ onOpenVisitModal, onExploreClick }) {
  return (
    <section className="relative bg-stone-100/70 py-16 sm:py-24 border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Developer & RERA Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-semibold">
              <span className="font-bold">MAK Infra</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                CG RERA Approved: {MANNAT_PARK_INFO.reraNo}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 font-serif leading-tight">
              Welcome to <br />
              <span className="text-amber-700">The Mannat Park</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-stone-600 max-w-2xl font-normal leading-relaxed">
              Premier residential township offering ready-to-build <strong className="text-stone-900 font-semibold">Residential Plots & Independent 3 BHK Luxury Homes</strong> in Dharampura, Jagdalpur.
            </p>

            {/* Address Banner */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start space-x-3 max-w-xl">
              <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-stone-900">Project Address</div>
                <div className="text-stone-600 mt-0.5 font-medium">{MANNAT_PARK_INFO.address}</div>
                <div className="text-stone-500 text-[11px] mt-0.5">{MANNAT_PARK_INFO.landmark}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenVisitModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-all"
              >
                Schedule Site Visit
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-300 shadow-sm transition-all"
              >
                View Available Homes & Plots
              </button>
            </div>

            {/* Simple Trust Tags */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-stone-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Vastu Compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Gated Campus & Security</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Swimming Pool & Park</span>
            </div>

          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src="/images/villa4bhk.png" 
                alt="The Mannat Park Homes" 
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 text-left shadow-lg">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Residential Plotted & 3 BHK Township</div>
                <div className="text-base font-bold text-stone-900 font-serif mt-0.5">Starting ₹25 Lakhs (Plots) • ₹58 Lakhs (3 BHK)</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
