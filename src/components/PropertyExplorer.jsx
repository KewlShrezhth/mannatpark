import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import { Check, Eye, Phone, MapPin, Compass } from 'lucide-react';

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
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            Available Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif mt-2">
            3 BHK Luxury Homes & Plots
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Choose from ready-to-construct residential plots or 3 BHK independent villas at The Mannat Park.
          </p>

          {/* Simple Filter Pills */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs font-bold">
            {[
              { id: 'ALL', label: 'All Listings' },
              { id: '3 BHK Homes', label: '3 BHK Independent Homes' },
              { id: 'Residential Plots', label: 'Residential Plots' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <div
              key={property.id}
              className="rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              {/* Image Thumbnail */}
              <div className="relative h-56">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-900/80 text-white text-[10px] font-bold uppercase tracking-wider">
                  {property.category}
                </div>
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg border border-stone-200 font-serif font-bold text-lg text-stone-900 shadow">
                  {property.priceDisplay}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" />
                    {property.facing}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 font-serif mt-1">
                    {property.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Specs List */}
                  <div className="mt-4 pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-700">
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
                <div className="pt-4 border-t border-stone-200 flex items-center space-x-2">
                  <button
                    onClick={() => onSelectProperty(property)}
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View Details & Layout
                  </button>
                  <button
                    onClick={() => onOpenVisitModal(property)}
                    className="py-2.5 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
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
