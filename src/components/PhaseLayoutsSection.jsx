import React, { useState, useEffect } from 'react';
import { PHASE_LAYOUTS_DATA } from '../data/properties';
import { 
  FileText, 
  Layers, 
  CheckCircle2, 
  Maximize2, 
  Download, 
  ShieldCheck, 
  Building2, 
  X,
  Droplets,
  Zap,
  Trash2,
  Table
} from 'lucide-react';

export default function PhaseLayoutsSection({ onOpenVisitModal }) {
  const [activePhase, setActivePhase] = useState('phase1');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentData = PHASE_LAYOUTS_DATA[activePhase];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const handleOpenLightbox = (e) => {
    if (e) e.stopPropagation();
    setZoomLevel(1);
    setIsLightboxOpen(true);
  };

  return (
    <section id="layouts" className="py-16 bg-stone-900 text-white relative overflow-hidden">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#185226]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-700/50 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-emerald-400" /> Town Planning Approved Layout Maps
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-3">
            Phase 1 & Phase 2 Layout Plans
          </h2>
          <p className="text-sm text-stone-300 mt-2 leading-relaxed">
            Detailed layout plans for <strong className="text-emerald-300 font-semibold">The Mannat Park (Phase 1)</strong> and <strong className="text-emerald-300 font-semibold">The Mannat Park 2.0 (Phase 2)</strong>, Ghatpadmur, Jagdalpur.
          </p>

          {/* Phase Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-stone-800/90 border border-stone-700/80 backdrop-blur-md shadow-lg relative z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhase('phase1');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activePhase === 'phase1'
                  ? 'bg-gradient-to-r from-[#185226] to-emerald-800 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${activePhase === 'phase1' ? 'text-emerald-300' : 'text-stone-400'}`} />
              <span>Phase 1 (The Mannat Park)</span>
              <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                69 Plots
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhase('phase2');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activePhase === 'phase2'
                  ? 'bg-gradient-to-r from-[#185226] to-emerald-800 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${activePhase === 'phase2' ? 'text-emerald-300' : 'text-stone-400'}`} />
              <span>Phase 2 (Mannat Park 2.0)</span>
              <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                40 Plots
              </span>
            </button>
          </div>
        </div>

        {/* Layout Plan Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Preview Card */}
          <div className="lg:col-span-7 bg-stone-800/80 border border-stone-700/70 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
            
            {/* Image Box */}
            <div 
              onClick={handleOpenLightbox}
              className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-700 group cursor-pointer aspect-[4/3] flex items-center justify-center"
            >
              <img 
                src={currentData.imageWeb} 
                alt={`${currentData.name} Layout Plan`}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Dark Overlay & Click to Zoom Badge */}
              <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="px-4 py-2.5 rounded-xl bg-stone-900/90 text-white text-xs font-bold border border-stone-700 shadow-xl flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-emerald-400" /> Click for High-Res Zoom & Lightbox
                </div>
              </div>

              {/* Phase Badge overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#185226]/90 backdrop-blur-md text-white text-xs font-bold border border-emerald-500/40 shadow-md">
                {currentData.name}
              </div>

              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-stone-900/90 backdrop-blur-md text-stone-300 text-[11px] font-semibold border border-stone-700 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" /> HD Map Preview
              </div>
            </div>

            {/* Actions below image */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{currentData.approvalNo} • {currentData.khasraNo}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleOpenLightbox}
                  className="px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
                </button>
                <a
                  href={currentData.imageFull}
                  download={`${activePhase}_layout_plan.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-bold flex items-center gap-1.5 transition-colors border border-stone-600"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> HD Image
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-stone-400 leading-relaxed text-left border-t border-stone-700/60 pt-3">
              {currentData.description}
            </p>
          </div>

          {/* Right Column: Key Area Statement Statistics & Specifications */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Header info */}
            <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/70 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-800/60">
                  Area Statement Breakdown
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {currentData.netPlanningAreaSqM.toLocaleString()} sq.m. Net
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                {currentData.name}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                {currentData.village}
              </p>

              {/* Area Statement Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase">Residential Plots</div>
                  <div className="text-lg font-bold text-white font-serif mt-0.5">
                    {currentData.residentialPlotCount} Plots
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    {currentData.residentialPlotAreaSqM.toLocaleString()} sq.m. ({currentData.residentialPlotPct})
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase">L.I.G. Plots</div>
                  <div className="text-lg font-bold text-white font-serif mt-0.5">
                    {currentData.ligPlotCount} Plots
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    {currentData.ligPlotAreaSqM.toLocaleString()} sq.m. ({currentData.ligPlotPct})
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase">Open Green Parks</div>
                  <div className="text-lg font-bold text-white font-serif mt-0.5">
                    {currentData.openParkAreaSqM.toLocaleString()} sq.m.
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    {currentData.openParkPct} of Net Layout
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <div className="text-[11px] text-stone-400 font-semibold uppercase">Road Network</div>
                  <div className="text-lg font-bold text-white font-serif mt-0.5">
                    {currentData.roadAreaSqM.toLocaleString()} sq.m.
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    {currentData.roadPct} Internal & Master Roads
                  </div>
                </div>
              </div>
            </div>

            {/* Plot Categories List Card */}
            <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/70 backdrop-blur-md">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                <Table className="w-4 h-4 text-emerald-400" />
                Plot Dimensions & Series Breakdown
              </h4>

              <div className="space-y-3">
                {currentData.plotCategories.map((cat, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-stone-900/60 border border-stone-700/50 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-100">{cat.size}</div>
                      <div className="text-stone-400 text-[11px] mt-0.5">{cat.description}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-[11px] font-extrabold flex-shrink-0 border border-emerald-800/60">
                      {cat.count} Plots
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-stone-700/80 flex items-center justify-between">
                <span className="text-xs text-stone-300">Interested in plot availability in {currentData.name}?</span>
                <button
                  type="button"
                  onClick={() => onOpenVisitModal()}
                  className="px-4 py-2 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Inquire Plot
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Layout Infrastructure Highlights Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-700/80 text-left shadow-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            Infrastructure & Layout Amenities Included in Master Plan
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
              <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-stone-200">Transformer Yard & Underground Cable</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
              <Droplets className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-stone-200">Rain Water Harvesting (RWH) Pits</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
              <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-stone-200">Sewage Treatment Plant (STP)</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/50">
              <Trash2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-stone-200">Borewell & Pump House (BPH)</span>
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200"
        >
          
          {/* Lightbox Top Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between pb-4 border-b border-stone-800 max-w-7xl mx-auto w-full relative z-10"
          >
            <div>
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                {currentData.name} — Full High Resolution Layout Map
              </div>
              <div className="text-stone-300 text-xs mt-0.5">
                {currentData.approvalNo} • Khasra No. {currentData.khasraNo} • Ghatpadmur, Jagdalpur
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={currentData.imageFull}
                download={`${activePhase}_layout_plan.png`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 border border-emerald-600 transition-colors shadow-md"
              >
                <Download className="w-4 h-4" /> Download Full HD Layout
              </a>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700"
                title="Close (ESC)"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Viewport */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex-1 overflow-auto flex items-center justify-center my-3 p-2 relative max-h-[78vh]"
          >
            <img 
              src={currentData.imageFull} 
              alt={`${currentData.name} Full High Resolution Layout`}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-stone-800 transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>

          {/* Lightbox Bottom Controls */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="pt-3 border-t border-stone-800 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400"
          >
            <span>Use zoom buttons or ESC to close. Sourced from official approved town planning documents.</span>
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold cursor-pointer border border-stone-700"
              >
                Zoom Out (-)
              </button>
              <button 
                type="button"
                onClick={() => setZoomLevel(1)}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold cursor-pointer border border-stone-700"
              >
                Reset Zoom
              </button>
              <button 
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold cursor-pointer border border-stone-700"
              >
                Zoom In (+)
              </button>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
