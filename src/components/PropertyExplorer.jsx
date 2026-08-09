import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import PropertyImagePlaceholder from './PropertyImagePlaceholder';
import { Check, Eye, Compass, Trees } from 'lucide-react';

export default function PropertyExplorer({ onSelectProperty, onOpenVisitModal }) {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filtered = PROPERTIES.filter((p) => {
    if (filterCategory === 'ALL') return true;
    return p.category === filterCategory;
  });

  return (
    <section id="properties" className="py-16 bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Trees className="w-3.5 h-3.5 text-[#185226]" /> Official 99acres Listing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 font-serif mt-2">
            Signature Plots & 3 BHK Homes
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Explore ready-to-build residential plots or 3 BHK independent villas at The Mannat Park, Dharampura.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold">
            {[
              { id: 'ALL', label: 'All Inventory' },
              { id: 'Signature Plots', label: 'Signature Plots (1200 - 1800 sq.ft)' },
              { id: '3 BHK Homes', label: '3 BHK Independent Homes' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterCategory === cat.id
                    ? 'bg-[#185226] text-white shadow-sm'
                    : 'text-emerald-950 hover:text-[#185226]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <div
              key={property.id}
              className="rounded-2xl bg-emerald-50/30 border border-emerald-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              {/* Image Placeholder */}
              {property.image ? (
                <div className="relative h-56">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#185226] text-white text-[10px] font-bold uppercase tracking-wider">
                    {property.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg border border-emerald-100 font-serif font-bold text-lg text-stone-950 shadow-xs">
                    {property.priceDisplay}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <PropertyImagePlaceholder title={property.title} category={property.category} height="h-56" />
                  <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg border border-emerald-200 font-serif font-bold text-lg text-stone-950 shadow-xs">
                    {property.priceDisplay}
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[#185226] font-semibold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" />
                    {property.facing}
                  </div>
                  <h3 className="text-xl font-bold text-stone-950 font-serif mt-1">
                    {property.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Specs List */}
                  <div className="mt-4 pt-4 border-t border-emerald-100 space-y-1.5 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{property.plotArea}</span>
                    </div>
                    {property.sqft && (
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Built-up Area: {property.sqft} sq.ft</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Status: {property.status}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-emerald-100 flex items-center space-x-2">
                  <button
                    onClick={() => onSelectProperty(property)}
                    className="flex-1 py-2.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View Details & Layout
                  </button>
                  <button
                    onClick={() => onOpenVisitModal(property)}
                    className="py-2.5 px-4 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs transition-colors"
                  >
                    Inquire
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
