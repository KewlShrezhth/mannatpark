import React from 'react';
import { CONSTRUCTION_PROGRESS, MANNAT_TOWNSHIP } from '../data/properties';
import { ShieldCheck, Building, CheckCircle2, Award, Landmark } from 'lucide-react';

export default function ConstructionTracker() {
  return (
    <section id="construction" className="py-20 bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> RERA Transparency Guarantee
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif mt-3">
            Construction Milestones & Bank Approvals
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Track live construction updates, structural completion phases, and pre-approved home loan partners.
          </p>
        </div>

        {/* Construction Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          {CONSTRUCTION_PROGRESS.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-amber-400">Phase {idx + 1}</span>
                <span className="font-mono text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{item.reraId}</span>
              </div>

              <h3 className="text-base font-bold text-white font-serif">{item.phase}</h3>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Completion</span>
                  <span className="text-emerald-400">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bank Tie-ups Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-amber-500/30 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-xs uppercase mb-2">
            <Landmark className="w-4 h-4" /> Approved Financial Partners
          </div>
          <h3 className="text-2xl font-bold text-white font-serif mb-2">Pre-Approved Home Loans Available</h3>
          <p className="text-xs text-slate-400 mb-6">
            Instant loan processing with zero processing fee offers from top Indian nationalized & private banks.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MANNAT_TOWNSHIP.bankPartners.map((bank, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-bold text-sm text-slate-200 flex items-center justify-center gap-2 hover:border-amber-400 transition-colors"
              >
                <Award className="w-4 h-4 text-amber-400" />
                {bank}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
