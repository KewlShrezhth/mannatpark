import React, { useState, useEffect } from 'react';
import { INITIAL_GALLERY_PHOTOS } from '../data/properties';
import { 
  Camera, 
  PlusCircle, 
  Maximize2, 
  Download, 
  X, 
  Filter, 
  Calendar, 
  Tag, 
  Settings,
  Sparkles
} from 'lucide-react';

export default function PhotoGallerySection({ onOpenOwnerAdmin }) {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('mannat_custom_gallery_photos');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY_PHOTOS;
  });

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Sync state if localStorage changes or window receives custom storage event
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('mannat_custom_gallery_photos');
      if (saved) setPhotos(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('mannat_gallery_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mannat_gallery_updated', handleStorageChange);
    };
  }, []);

  const categories = [
    { id: 'ALL', label: 'All Photos & Media' },
    { id: 'Site Infrastructure', label: 'Site Infrastructure' },
    { id: 'Amenities & Parks', label: 'Amenities & Parks' },
    { id: 'Villas & Homes', label: 'Villas & Architecture' },
    { id: 'Plots & Layouts', label: 'Plots & Layout Maps' },
  ];

  const filteredPhotos = photos.filter(p => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-16 bg-white border-t border-emerald-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#185226] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-200">
              <Camera className="w-3.5 h-3.5 text-[#185226]" /> Site Media & Photo Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 font-serif mt-2">
              Project Photo Gallery
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Explore authentic site development photos, amenity renders, and infrastructure views for The Mannat Park, Jagdalpur.
            </p>
          </div>

          {/* Owner Action Button */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              type="button"
              onClick={onOpenOwnerAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white text-xs font-bold shadow-md shadow-emerald-950/10 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Owner Portal: Add / Edit Photos</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-8 text-xs font-bold">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#185226] text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-2xl bg-emerald-50/40 border border-emerald-100 overflow-hidden shadow-xs hover:shadow-xl transition-all text-left flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#185226]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {photo.category}
                </div>

                {/* Zoom Icon Badge */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-stone-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Bottom Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-sm font-bold font-serif leading-snug line-clamp-1">{photo.title}</div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{photo.description}</p>
                
                <div className="mt-3 pt-3 border-t border-emerald-100/80 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#185226]" /> {photo.dateAdded || 'Updated Recently'}
                  </span>
                  <span className="text-[#185226] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Photo & Details →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <Camera className="w-10 h-10 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">No photos in this category yet.</p>
            <button
              type="button"
              onClick={onOpenOwnerAdmin}
              className="mt-3 px-4 py-2 rounded-xl bg-[#185226] text-white text-xs font-bold cursor-pointer"
            >
              Add Photo to Gallery
            </button>
          </div>
        )}

      </div>

      {/* FULLSCREEN PHOTO LIGHTBOX */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200"
        >
          {/* Header */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between pb-4 border-b border-stone-800 max-w-6xl mx-auto w-full"
          >
            <div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-800">
                {selectedPhoto.category}
              </span>
              <h3 className="text-base sm:text-xl font-bold font-serif text-white mt-1">{selectedPhoto.title}</h3>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={selectedPhoto.src}
                download={`${selectedPhoto.title.replace(/\s+/g, '_')}.jpg`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 border border-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" /> Download Photo
              </a>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex-1 overflow-auto flex items-center justify-center my-4 p-2"
          >
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.title} 
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-stone-800"
            />
          </div>

          {/* Caption Footer */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="pt-3 border-t border-stone-800 max-w-6xl mx-auto w-full text-center text-xs text-stone-300"
          >
            <p className="max-w-2xl mx-auto leading-relaxed">{selectedPhoto.description}</p>
          </div>
        </div>
      )}

    </section>
  );
}
