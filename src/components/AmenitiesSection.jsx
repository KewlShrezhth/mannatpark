import React from 'react';
import { AMENITIES, NEARBY_LANDMARKS, MANNAT_PARK_INFO } from '../data/properties';
import { Shield, Waves, Trees, MapPin, Compass, Zap, Building } from 'lucide-react';

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16 bg-stone-100/70 border-t border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Amenities Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Township Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif mt-2">
            Campus Amenities & Infrastructure
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Everything you need for a comfortable, secure, and serene family life at Dharampura, Jagdalpur.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
          {AMENITIES.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Nearby Landmarks Location Section */}
        <div id="locality" className="pt-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 text-left shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  Location Highlights
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-2">
                  Prime Location in Dharampura
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Located right behind Govt. Engineering College in Dharampura, Jagdalpur, close to top educational institutes and city access roads.
                </p>

                <div className="mt-6 space-y-2.5">
                  {NEARBY_LANDMARKS.map((lm, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0" />
                        <span className="text-xs font-bold text-stone-900">{lm.name}</span>
                      </div>
                      <span className="text-xs text-stone-600 font-semibold bg-white px-2.5 py-1 rounded border border-stone-200">
                        {lm.dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Details Card */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
                <h4 className="text-lg font-bold text-stone-900 font-serif">Site Location & Address</h4>
                <div className="space-y-2 text-xs text-stone-700">
                  <p className="font-semibold text-stone-900">{MANNAT_PARK_INFO.name}</p>
                  <p>{MANNAT_PARK_INFO.address}</p>
                  <p className="text-stone-500">{MANNAT_PARK_INFO.landmark}</p>
                  <p className="text-emerald-800 font-semibold pt-2 border-t border-amber-200">
                    CG RERA Registration: {MANNAT_PARK_INFO.reraNo}
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Dharampura+Jagdalpur+Chhattisgarh"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
                  >
                    Open Location in Maps
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
