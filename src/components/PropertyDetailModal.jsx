import React from 'react';
import { X, Check, MapPin, Phone, ShieldCheck, Compass } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function PropertyDetailModal({ property, onClose, onOpenVisitModal }) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="text-xs text-amber-700 font-bold uppercase">{property.category} • The Mannat Park</div>
            <h3 className="text-xl font-bold text-stone-900 font-serif mt-0.5">{property.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6 text-left">
          
          {/* Main Visual */}
          <div className="relative rounded-xl overflow-hidden h-64 border border-stone-200">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg border border-stone-200 font-bold text-xl text-stone-900 font-serif shadow">
              {property.priceDisplay}
            </div>
            <div className="absolute top-3 right-3 bg-emerald-800 text-white px-2.5 py-1 rounded text-xs font-semibold">
              {property.facing}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <div className="text-stone-500 font-medium">Plot / Dimension</div>
              <div className="font-bold text-stone-900 mt-0.5">{property.plotArea}</div>
            </div>
            {property.sqft && (
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-stone-500 font-medium">Built-Up Area</div>
                <div className="font-bold text-stone-900 mt-0.5">{property.sqft} sq.ft</div>
              </div>
            )}
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <div className="text-stone-500 font-medium">Vastu Alignment</div>
              <div className="font-bold text-emerald-700 mt-0.5">100% Compliant</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-1">Property Description</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-2">Key Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {property.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-stone-50 border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Developer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-amber-900">Developer: {MANNAT_PARK_INFO.developer}</div>
            <div className="text-amber-800">Location: {MANNAT_PARK_INFO.address}</div>
            <div className="text-emerald-800 font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> CG RERA No: {MANNAT_PARK_INFO.reraNo}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <a
            href={`tel:${MANNAT_PARK_INFO.phone}`}
            className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-amber-700" /> Call {MANNAT_PARK_INFO.phone}
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenVisitModal(property);
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20"
          >
            Inquire About This Property
          </button>
        </div>

      </div>
    </div>
  );
}
