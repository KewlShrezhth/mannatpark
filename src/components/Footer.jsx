import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-stone-800">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-base">
                M
              </div>
              <span className="text-lg font-bold text-white font-serif tracking-tight">
                THE MANNAT PARK
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Developed by <strong className="text-stone-200">MAK Infra</strong>. A premier residential plotted and 3 BHK township in Dharampura, Jagdalpur, Chhattisgarh.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              CG RERA Reg No: {MANNAT_PARK_INFO.reraNo}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Project Site Address</h4>
            <div className="flex items-start space-x-2 text-stone-300">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">{MANNAT_PARK_INFO.address}</p>
                <p className="text-stone-400 mt-0.5">{MANNAT_PARK_INFO.landmark}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Sales & Inquiries</h4>
            <div className="space-y-1.5 text-stone-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">{MANNAT_PARK_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>{MANNAT_PARK_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="text-[11px] text-stone-500 text-center space-y-1">
          <p>© 2026 The Mannat Park by MAK Infra. Registered under Chhattisgarh RERA ({MANNAT_PARK_INFO.reraNo}).</p>
        </div>

      </div>
    </footer>
  );
}
