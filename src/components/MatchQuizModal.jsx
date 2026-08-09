import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, ArrowRight, ArrowLeft, Heart, Compass, ShieldCheck } from 'lucide-react';
import { PROPERTIES } from '../data/properties';

export default function MatchQuizModal({ isOpen, onClose, onSelectProperty }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    bhk: 3,
    budget: 200, // max lakhs
    vastu: 'East Facing',
    priority: 'Private Plunge Pool/Garden',
    possession: 'Ready to Move',
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [matches, setMatches] = useState([]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Calculate scores
      calculateMatches();
      setQuizFinished(true);
    }
  };

  const calculateMatches = () => {
    const scored = PROPERTIES.map((p) => {
      let score = 70; // baseline
      
      // BHK match
      if (p.bhk === answers.bhk) score += 15;
      else if (Math.abs(p.bhk - answers.bhk) === 1) score += 5;

      // Budget match
      if (p.priceLakhs <= answers.budget) score += 10;

      // Vastu match
      if (answers.vastu === 'No Preference' || p.vastu.includes(answers.vastu.split(' ')[0])) score += 5;

      // Possession
      if (p.possession === answers.possession) score += 5;

      return { ...p, matchScore: Math.min(score, 99) };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(scored);
  };

  const resetQuiz = () => {
    setStep(1);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-amber-100 font-serif">
              ApartmentList Match AI™ — Find Your Dream Home
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          
          {!quizFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Question {step} of 5</span>
                <span>{step * 20}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${step * 20}%` }}
                />
              </div>

              {/* Step 1: BHK */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">What size home fits your family best?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: 2, label: '2 BHK Premium Suite', desc: '1,250 sq.ft • ₹92 Lakhs' },
                      { val: 3, label: '3 BHK Executive', desc: '1,850 sq.ft • ₹1.45 Cr' },
                      { val: 4, label: '4 BHK Royal Villa', desc: '3,850 sq.ft • ₹2.85 Cr' },
                      { val: 4, label: '4 BHK Sky Penthouse', desc: '3,100 sq.ft • ₹2.25 Cr' },
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAnswers({ ...answers, bhk: opt.val })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          answers.bhk === opt.val
                            ? 'border-amber-400 bg-amber-500/10 text-white shadow-md shadow-amber-500/10'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-amber-200">{opt.label}</div>
                        <div className="text-xs text-slate-400 mt-1">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">What is your comfortable target budget?</h4>
                  <div className="space-y-3">
                    {[
                      { max: 100, label: 'Under ₹1.0 Crore', sub: 'Ideal for 2 BHK Luxury Suites' },
                      { max: 175, label: '₹1.0 Crore – ₹1.75 Crores', sub: 'Ideal for 3 BHK Executive Residences' },
                      { max: 250, label: '₹1.75 Crores – ₹2.5 Crores', sub: 'Ideal for Sky Penthouses' },
                      { max: 400, label: '₹2.5 Crores – ₹3.5+ Crores', sub: 'Ideal for Independent Royal Villas' },
                    ].map((b, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAnswers({ ...answers, budget: b.max })}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          answers.budget === b.max
                            ? 'border-amber-400 bg-amber-500/10 text-white'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-amber-300">{b.label}</div>
                          <div className="text-xs text-slate-400">{b.sub}</div>
                        </div>
                        {answers.budget === b.max && <CheckCircle className="w-5 h-5 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Vastu Direction */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Do you have a specific Vastu Facing preference?</h4>
                  <div className="space-y-3">
                    {[
                      { val: 'East Facing', desc: 'Promotes health, prosperity & morning sunlight' },
                      { val: 'North Facing', desc: 'Attracts financial growth & career advancement' },
                      { val: 'North-East Facing', desc: 'Ishanya corner for spiritual peace & harmony' },
                      { val: 'No Preference', desc: 'Show all available luxury facing options' },
                    ].map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAnswers({ ...answers, vastu: v.val })}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          answers.vastu === v.val
                            ? 'border-emerald-400 bg-emerald-500/10 text-white'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                          <Compass className="w-4 h-4 text-emerald-400" />
                          {v.val}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{v.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Lifestyle Priority */}
              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">What is your top must-have amenity feature?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Private Plunge Pool/Garden',
                      'Panoramic Top Floor View',
                      'Close to Clubhouse & Pool',
                      'Near Sarjapur Metro & IT Parks',
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAnswers({ ...answers, priority: p })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          answers.priority === p
                            ? 'border-amber-400 bg-amber-500/10 text-white'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-xs text-amber-200">{p}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Possession */}
              {step === 5 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">When are you planning to move in?</h4>
                  <div className="space-y-3">
                    {[
                      { val: 'Ready to Move', sub: 'Immediate possession with Occupancy Certificate (OC)' },
                      { val: 'June 2026', sub: 'Finishing phase within 3-6 months' },
                      { val: 'Dec 2026', sub: 'Under construction (Phase 2 launch rates)' },
                    ].map((pos, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAnswers({ ...answers, possession: pos.val })}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          answers.possession === pos.val
                            ? 'border-amber-400 bg-amber-500/10 text-white'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-amber-300">{pos.val}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{pos.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  {step === 5 ? 'Show My Matched Homes' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* Quiz Finished: Match Results Feed */
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              <div className="text-center mb-6">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  AI Matching Complete
                </span>
                <h4 className="text-2xl font-bold text-white font-serif mt-2">
                  Top Recommended Residences For You
                </h4>
                <p className="text-xs text-slate-400">
                  Based on your preferences: {answers.bhk} BHK • {answers.vastu} • Budget ≤ ₹{answers.budget}L
                </p>
              </div>

              <div className="space-y-4">
                {matches.slice(0, 3).map((prop) => (
                  <div 
                    key={prop.id}
                    className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center gap-4 hover:border-amber-400 transition-all"
                  >
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full sm:w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                          {prop.matchScore}% MATCH
                        </span>
                        <span className="text-xs text-emerald-400 font-semibold">{prop.vastu}</span>
                      </div>
                      <h5 className="text-base font-bold text-white font-serif mt-1">{prop.title}</h5>
                      <p className="text-xs text-slate-400">{prop.bhk} BHK {prop.type} • {prop.sqft} sq.ft • {prop.tower}</p>
                      <div className="text-sm font-bold text-amber-300 mt-1">{prop.priceDisplay}</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap"
                    >
                      View Unit Plan
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-slate-400 hover:text-amber-400 underline"
                >
                  Retake Match Quiz
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
