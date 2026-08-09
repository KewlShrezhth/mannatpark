import React from 'react';
import { MapPin, Compass, Building2, Trees } from 'lucide-react';

export default function PropertyImagePlaceholder({ title = "Plot / Layout Schematic", category = "Signature Plot", height = "h-56" }) {
  return (
    <div className={`relative w-full ${height} bg-gradient-to-br from-emerald-50 via-stone-100 to-emerald-100/50 border border-emerald-200/80 rounded-t-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden`}>
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1852260d_1px,transparent_1px),linear-gradient(to_bottom,#1852260d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Decorative Corner Badges */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#185226] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
        {category}
      </div>

      <div className="relative z-10 space-y-2 max-w-xs">
        <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-[#185226] mx-auto shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <div className="text-xs font-bold text-stone-900 font-serif">{title}</div>
        <div className="text-[10px] text-emerald-800 font-medium bg-white/80 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
          Dharampura, Jagdalpur • Demarcated Site
        </div>
      </div>
    </div>
  );
}
