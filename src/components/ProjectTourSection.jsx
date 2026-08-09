import React, { useState } from 'react';
import { Camera, Play, ShieldCheck, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function ProjectTourSection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const officialPhotos = [
    {
      id: 1,
      src: "/images/99acres_tour1.jpg",
      title: "Official Site & Township Layout Overview",
      caption: "Verified project tour view featured on 99acres listing for The Mannat Park, Dharampura, Jagdalpur.",
    },
    {
      id: 2,
      src: "/images/99acres_tour2.jpg",
      title: "Demarcated Site & Infrastructure View",
      caption: "Site boundary & internal road development view from official MAK Infra 99acres gallery.",
    },
    {
      id: 3,
      src: "/images/99acres_tour3.jpg",
      title: "Official RERA Master Plan & Location Map",
      caption: "Registered layout map under CG RERA PCGRERA110624001781.",
    },
  ];

  return (
    <section id="tour" className="py-16 bg-white border-t border-b border-emerald-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#185226] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-[#185226]" /> Official 99acres Project Tour
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 font-serif mt-2">
              Tour This Project
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl">
              Authentic site photos, master layout maps, and project tour visuals sourced directly from the official 99acres listing for The Mannat Park.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="https://www.99acres.com/the-mannat-park-dharampura-jagdalpur-npxid-r430321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#185226] text-xs font-bold border border-emerald-200 transition-colors"
            >
              <span>View Full Tour on 99acres</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Official Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {officialPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-2xl bg-emerald-50/40 border border-emerald-100 overflow-hidden shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#185226] text-white text-[10px] font-bold uppercase tracking-wider">
                  99acres Tour Media
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-bold font-serif">{photo.title}</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Tour Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#185226] to-emerald-900 text-white text-left shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              Site Video & Walkthrough
            </span>
            <h3 className="text-2xl font-bold font-serif text-white">
              Official Site Walkthrough & Tour Video
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Explore the 40ft wide paved roads, boundary walls, and surrounding greenery behind Govt. Engineering College, Dharampura.
            </p>
          </div>

          <a
            href="https://www.99acres.com/the-mannat-park-dharampura-jagdalpur-npxid-r430321"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white text-[#185226] hover:bg-emerald-50 text-xs font-extrabold flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-current" /> Watch Tour Video on 99acres
          </a>
        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 text-white">
            <div className="p-4 bg-stone-950 flex items-center justify-between border-b border-stone-800">
              <span className="text-xs font-bold text-emerald-400 font-serif">{selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-stone-400 hover:text-white px-2 py-1"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-4 bg-black flex items-center justify-center min-h-[400px]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            <div className="p-4 bg-stone-950 text-xs text-stone-300 text-left">
              {selectedPhoto.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
