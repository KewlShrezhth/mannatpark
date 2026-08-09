import React from 'react';
import { AMENITIES, NEARBY_LANDMARKS, MANNAT_PARK_INFO } from '../data/properties';
import { MapPin, Trees } from 'lucide-react';

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16 bg-emerald-50/50 border-t border-b border-emerald-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Amenities Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Trees className="w-3.5 h-3.5 text-emerald-700" /> Township Amenities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-950 font-serif mt-2">
            Campus Infrastructure & Facilities
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Features at The Mannat Park, Dharampura Negiguda Road, Jagdalpur.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
          {AMENITIES.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-serif">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Location Highlights */}
        <div id="locality" className="pt-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-100 text-left shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Location Matrix
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif mt-2">
                  Prime Location in Dharampura
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Located on Dharampura Negiguda Road, Jagdalpur, right behind Govt. Engineering College & near Bastar University.
                </p>

                <div className="mt-6 space-y-2.5">
                  {NEARBY_LANDMARKS.map((lm, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span className="text-xs font-bold text-emerald-950">{lm.name}</span>
                      </div>
                      <span className="text-xs text-emerald-900 font-semibold bg-white px-2.5 py-1 rounded border border-emerald-100">
                        {lm.dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Card */}
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
                <h4 className="text-lg font-bold text-emerald-950 font-serif">Site Location & Developer</h4>
                <div className="space-y-2 text-xs text-stone-700">
                  <p className="font-bold text-emerald-950">{MANNAT_PARK_INFO.name}</p>
                  <p className="font-semibold text-stone-900">{MANNAT_PARK_INFO.address}</p>
                  <p className="text-emerald-800 font-medium">{MANNAT_PARK_INFO.landmark}</p>
                  <p className="text-emerald-900 font-semibold pt-2 border-t border-emerald-200">
                    Developer: {MANNAT_PARK_INFO.developer}
                  </p>
                  <p className="text-emerald-700 font-semibold">
                    CG RERA Registration: {MANNAT_PARK_INFO.reraNo}
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Dharampura+Negiguda+Road+Jagdalpur+Chhattisgarh"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
                  >
                    Open Location in Google Maps
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
