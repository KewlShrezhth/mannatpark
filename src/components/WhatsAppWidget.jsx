import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20Mannat%20Developers,%20I%20am%20interested%20in%20Mannat%20Sanctuary%20Residences.%20Please%20share%20pricing%20details."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/50 transition-all transform hover:scale-110 flex items-center gap-2 group"
      title="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-extrabold text-xs whitespace-nowrap">
        Chat with Sales Manager
      </span>
    </a>
  );
}
