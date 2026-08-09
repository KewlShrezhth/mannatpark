import React from 'react';
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, Trees, Building2, Compass, Layers } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function HeroSection({ onOpenVisitModal, onExploreClick }) {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50/60 via-stone-50/80 to-white py-14 sm:py-20 border-b border-stone-200/80 text-stone-900 overflow-hidden">
      
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/50 text-emerald-950 text-xs font-semibold shadow-xs">
              <Trees className="w-4 h-4 text-[#185226]" />
              <span>Signature Plots & 3 BHK Township</span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-emerald-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                CG RERA: {MANNAT_PARK_INFO.reraNo}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 font-serif leading-[1.15] tracking-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-[#185226] via-emerald-800 to-emerald-700 bg-clip-text text-transparent">
                The Mannat Park
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Dharampura's premier residential township featuring <strong className="text-stone-900 font-semibold">Signature Plots & Independent 3 BHK Luxury Homes</strong> in Jagdalpur, Chhattisgarh.
            </p>

            {/* Address Location Card */}
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200 shadow-sm flex items-start space-x-3.5 max-w-xl hover:border-emerald-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#185226] flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-stone-900 uppercase tracking-wide text-[10px] text-emerald-800">Site Location Address (99acres Verified)</div>
                <div className="text-stone-800 mt-0.5 font-bold">{MANNAT_PARK_INFO.address}</div>
                <div className="text-stone-500 text-[11px] mt-0.5">{MANNAT_PARK_INFO.landmark}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                onClick={onOpenVisitModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                Schedule Site Visit
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-300 shadow-xs transition-all"
              >
                View Available Signature Plots
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#185226]" /> 100% Vastu Compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#185226]" /> Swimming Pool & Park</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#185226]" /> Badminton Court</span>
            </div>

          </div>

          {/* Right Architectural Blueprint Card (No AI Generated Photos) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40 p-8 text-left space-y-6 min-h-[420px] flex flex-col justify-between">
              
              {/* Architectural Pattern Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1852260d_1px,transparent_1px),linear-gradient(to_bottom,#1852260d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#185226] text-white text-[10px] font-bold uppercase tracking-wider">
                    Official RERA Layout Plan
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded border border-emerald-200">
                    PCGRERA110624001781
                  </span>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-[#185226] shadow-sm">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-950 font-serif">
                    Demarcated Residential Plotted Township
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Featuring wide 40ft internal concrete roads, street lights, underground electricity & drainage, central park, and swimming pool.
                  </p>
                </div>
              </div>

              {/* Specification Pills */}
              <div className="relative z-10 grid grid-cols-2 gap-2 text-xs pt-4 border-t border-emerald-200/80">
                <div className="p-3 rounded-xl bg-white/90 border border-emerald-100">
                  <div className="text-[10px] text-stone-500 font-semibold uppercase">Plot Sizes</div>
                  <div className="font-bold text-[#185226] text-sm mt-0.5">1,200 – 2,500 sq.ft</div>
                </div>
                <div className="p-3 rounded-xl bg-white/90 border border-emerald-100">
                  <div className="text-[10px] text-stone-500 font-semibold uppercase">Price Range</div>
                  <div className="font-bold text-[#185226] text-sm mt-0.5">₹25L – ₹65L+</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
