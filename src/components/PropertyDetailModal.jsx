import React from 'react';
import { X, Check, MapPin, Phone, ShieldCheck, Layers } from 'lucide-react';
import PropertyImagePlaceholder from './PropertyImagePlaceholder';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function PropertyDetailModal({ property, onClose, onOpenVisitModal }) {
  if (!property) return null;

  const scrollToLayouts = () => {
    onClose();
    const elem = document.getElementById('layouts');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-emerald-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-emerald-100 flex items-center justify-between bg-emerald-50/70">
          <div>
            <div className="text-xs text-[#185226] font-bold uppercase flex items-center gap-1.5">
              <span>{property.category}</span>
              {property.phase && (
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#185226] text-[10px] font-extrabold border border-emerald-200">
                  {property.phase}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-stone-950 font-serif mt-0.5">{property.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6 text-left">
          
          {/* Main Visual / Placeholder */}
          {property.image ? (
            <div className="relative rounded-xl overflow-hidden h-64 border border-emerald-100">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg border border-emerald-100 font-bold text-xl text-stone-950 font-serif shadow-xs">
                {property.priceDisplay}
              </div>
              <div className="absolute top-3 right-3 bg-[#185226] text-white px-2.5 py-1 rounded text-xs font-semibold">
                {property.facing}
              </div>
            </div>
          ) : (
            <div className="relative">
              <PropertyImagePlaceholder title={property.title} category={property.category} height="h-64" />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg border border-emerald-200 font-bold text-xl text-stone-950 font-serif shadow-xs">
                {property.priceDisplay}
              </div>
            </div>
          )}

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <div className="text-[#185226] font-medium">Plot / Dimension</div>
              <div className="font-bold text-stone-950 mt-0.5">{property.plotArea}</div>
            </div>
            {property.sqft && (
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <div className="text-[#185226] font-medium">Built-Up Area</div>
                <div className="font-bold text-stone-950 mt-0.5">{property.sqft} sq.ft</div>
              </div>
            )}
            <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <div className="text-[#185226] font-medium">Vastu Alignment</div>
              <div className="font-bold text-emerald-700 mt-0.5">100% Compliant</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-stone-950 mb-1">Property Description</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-sm font-bold text-stone-950 mb-2">Key Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {property.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Layout Plan Shortcut Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-850 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white">View Approved Layout Map</div>
                <div className="text-stone-300 text-[11px]">Inspect complete plot layout for {property.phase || "The Mannat Park"}</div>
              </div>
            </div>
            <button
              onClick={scrollToLayouts}
              className="px-3.5 py-2 rounded-lg bg-[#185226] hover:bg-emerald-800 text-white font-bold transition-colors flex-shrink-0 cursor-pointer"
            >
              Open Layout Map
            </button>
          </div>

          {/* Address & Developer */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <div className="font-bold text-stone-950">Developer: {MANNAT_PARK_INFO.developer}</div>
            <div className="text-stone-800">Site Location: {MANNAT_PARK_INFO.address}</div>
            <div className="text-[#185226] font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> CG RERA No: {MANNAT_PARK_INFO.reraNo}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
          <a
            href={`tel:${MANNAT_PARK_INFO.phone}`}
            className="px-4 py-2.5 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-stone-900 text-xs font-bold flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-[#185226]" /> Call {MANNAT_PARK_INFO.phone}
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenVisitModal(property);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/20 cursor-pointer"
          >
            Inquire About This Property
          </button>
        </div>

      </div>
    </div>
  );
}
