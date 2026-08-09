import React, { useState, useEffect } from 'react';
import { MapPin, Plus, UserPlus, Heart, MessageSquare, Filter, Sparkles, Check, X, ShieldCheck } from 'lucide-react';

const SEED_RESIDENTS = [
  {
    id: "pin-1",
    name: "Amit & Priya Sharma",
    plotNo: "Plot #14 (Sector A)",
    interests: ["Badminton 🏸", "Pet Parent 🐕", "Gardening 🌱"],
    profession: "Software Engineer",
    bio: "Moved in last month! Looking for weekend badminton partners and dog walk buddies.",
    whatsapp: "+919425250001",
    xPercent: 28,
    yPercent: 35,
    avatarColor: "bg-emerald-600",
  },
  {
    id: "pin-2",
    name: "Dr. Rahul Verma",
    plotNo: "Villa #28 (Sector B)",
    interests: ["Health & Fitness 🏃", "Chess ♟️", "Morning Walk 🌅"],
    profession: "Consultant at MPM Hospital",
    bio: "Always up for early morning walks around the central park and weekend chess matches.",
    whatsapp: "+919425250002",
    xPercent: 62,
    yPercent: 42,
    avatarColor: "bg-[#185226]",
  },
  {
    id: "pin-3",
    name: "Sneha & Vikram Patel",
    plotNo: "Plot #45 (Sector C)",
    interests: ["Kids Playdates 👨‍👩‍👧‍👦", "Cricket 🏏", "Cooking 🍳"],
    profession: "Business Owner",
    bio: "Parents to 2 kids (ages 6 & 9). Excited to organize weekend kids games in the park!",
    whatsapp: "+919425250003",
    xPercent: 45,
    yPercent: 68,
    avatarColor: "bg-teal-700",
  },
  {
    id: "pin-4",
    name: "Ananya Sen",
    plotNo: "Plot #07 (Sector A)",
    interests: ["Gardening 🌱", "Yoga 🧘", "Book Club 📚"],
    profession: "High School Teacher",
    bio: "Organic terrace gardening enthusiast! Happy to share seeds, saplings & garden tips.",
    whatsapp: "+919425250004",
    xPercent: 78,
    yPercent: 28,
    avatarColor: "bg-emerald-800",
  },
];

const INTEREST_OPTIONS = [
  "Badminton 🏸",
  "Pet Parent 🐕",
  "Gardening 🌱",
  "Kids Playdates 👨‍👩‍👧‍👦",
  "Morning Walk 🌅",
  "Cricket 🏏",
  "Yoga 🧘",
  "Chess ♟️",
];

export default function ResidentCommunityMap() {
  const [residents, setResidents] = useState(() => {
    const saved = localStorage.getItem('mannat_resident_pins');
    return saved ? JSON.parse(saved) : SEED_RESIDENTS;
  });

  const [selectedInterest, setSelectedInterest] = useState('ALL');
  const [selectedPin, setSelectedPin] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);

  // Form states
  const [newResident, setNewResident] = useState({
    name: '',
    plotNo: '',
    profession: '',
    bio: '',
    whatsapp: '',
    interests: [],
  });

  useEffect(() => {
    localStorage.setItem('mannat_resident_pins', JSON.stringify(residents));
  }, [residents]);

  const filteredResidents = residents.filter((r) => {
    if (selectedInterest === 'ALL') return true;
    return r.interests.some((i) => i.includes(selectedInterest));
  });

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setClickCoords({ x, y });
    setIsAddModalOpen(true);
  };

  const handleAddPinSubmit = (e) => {
    e.preventDefault();
    if (!newResident.name || !newResident.plotNo) return;

    const created = {
      id: `pin-${Date.now()}`,
      name: newResident.name,
      plotNo: newResident.plotNo,
      profession: newResident.profession || "Mannat Park Resident",
      bio: newResident.bio || "Happy to connect with neighbors!",
      whatsapp: newResident.whatsapp ? `+91${newResident.whatsapp.replace(/\D/g, '')}` : "+919425250000",
      interests: newResident.interests.length > 0 ? newResident.interests : ["Gardening 🌱", "Community 🏡"],
      xPercent: clickCoords ? clickCoords.x : Math.floor(Math.random() * 60) + 20,
      yPercent: clickCoords ? clickCoords.y : Math.floor(Math.random() * 60) + 20,
      avatarColor: "bg-[#185226]",
    };

    setResidents([...residents, created]);
    setSelectedPin(created);
    setIsAddModalOpen(false);
    setNewResident({ name: '', plotNo: '', profession: '', bio: '', whatsapp: '', interests: [] });
    setClickCoords(null);
  };

  const toggleInterestOption = (opt) => {
    if (newResident.interests.includes(opt)) {
      setNewResident({
        ...newResident,
        interests: newResident.interests.filter((i) => i !== opt),
      });
    } else {
      setNewResident({
        ...newResident,
        interests: [...newResident.interests, opt],
      });
    }
  };

  return (
    <section id="community" className="py-16 bg-gradient-to-b from-white via-emerald-50/30 to-stone-50 border-t border-b border-emerald-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#185226] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <UserPlus className="w-3.5 h-3.5 text-[#185226]" /> Resident Community Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 font-serif mt-2">
              Mannat Neighbors & Connect Map
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl">
              Are you a plot or house owner at The Mannat Park? Add your pin on the neighborhood map below to share hobbies, find sports partners, and build a friendly community!
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => {
                setClickCoords({ x: 50, y: 50 });
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Add My Resident Pin
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-6 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-left">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-stone-500" /> Filter:
          </span>
          {["ALL", "Badminton", "Pet Parent", "Gardening", "Kids Playdates", "Morning Walk", "Cricket"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedInterest(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedInterest === cat
                  ? 'bg-[#185226] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-emerald-50 border border-stone-200'
              }`}
            >
              {cat === 'ALL' ? 'All Neighbors' : cat}
            </button>
          ))}
        </div>

        {/* Neighborhood Interactive Layout Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Map Area */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-stone-100 p-6 min-h-[460px] shadow-sm flex flex-col justify-between">
              
              {/* Layout Sector Grid Background */}
              <div 
                onClick={handleMapClick}
                className="absolute inset-0 bg-[linear-gradient(to_right,#18522612_1px,transparent_1px),linear-gradient(to_bottom,#18522612_1px,transparent_1px)] bg-[size:32px_32px] cursor-crosshair group"
                title="Click anywhere on the layout map to place your resident pin!"
              >
                {/* Sector Labels */}
                <div className="absolute top-4 left-4 text-[10px] font-mono font-bold text-emerald-800/60 uppercase">Sector A (Entry Gate)</div>
                <div className="absolute top-4 right-4 text-[10px] font-mono font-bold text-emerald-800/60 uppercase">Sector B (Central Park)</div>
                <div className="absolute bottom-4 left-4 text-[10px] font-mono font-bold text-emerald-800/60 uppercase">Sector C (Sports Zone)</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono font-bold text-emerald-800/60 uppercase">Sector D (Amphitheatre)</div>

                {/* Click Instruction Callout */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-emerald-200/50 border border-emerald-400 flex items-center justify-center text-[#185226] mx-auto animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-700 block mt-1">Click Map to Add Your Pin</span>
                </div>
              </div>

              {/* Render Resident Pin Markers */}
              {filteredResidents.map((res) => {
                const isSelected = selectedPin?.id === res.id;
                return (
                  <button
                    key={res.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPin(res);
                    }}
                    style={{ left: `${res.xPercent}%`, top: `${res.yPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group text-left focus:outline-none"
                  >
                    <div className="relative flex items-center">
                      <div className={`w-8 h-8 rounded-full ${res.avatarColor || 'bg-[#185226]'} text-white border-2 border-white shadow-md flex items-center justify-center font-bold text-xs transform group-hover:scale-125 transition-transform ${isSelected ? 'ring-4 ring-emerald-400 scale-125' : ''}`}>
                        {res.name.charAt(0)}
                      </div>
                      
                      {/* Name Label Tag */}
                      <div className="ml-1.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur border border-stone-200 text-[10px] font-bold text-stone-900 shadow-xs whitespace-nowrap hidden sm:block">
                        {res.name.split(' ')[0]} ({res.plotNo.split(' ')[0]})
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Bottom Instructions Footer */}
              <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-stone-600 bg-white/80 backdrop-blur border border-stone-200 p-3 rounded-xl">
                <span className="font-semibold text-[#185226] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Total {residents.length} Neighbor Pins Placed
                </span>
                <span className="text-[11px] text-stone-500 hidden sm:inline">
                  Click any pin to connect • Click on map to add your home
                </span>
              </div>

            </div>
          </div>

          {/* Right Neighbor Detail Profile Panel */}
          <div className="lg:col-span-4 text-left">
            {selectedPin ? (
              <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#185226] text-[10px] font-bold uppercase tracking-wider">
                    {selectedPin.plotNo}
                  </span>
                  <button 
                    onClick={() => setSelectedPin(null)} 
                    className="text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-950 font-serif">{selectedPin.name}</h3>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">{selectedPin.profession}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed italic">
                  "{selectedPin.bio}"
                </div>

                <div>
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">Interests & Hobbies</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPin.interests.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-stone-800 text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200">
                  <a
                    href={`https://wa.me/${selectedPin.whatsapp.replace(/\+/g, '')}?text=Hi%20${encodeURIComponent(selectedPin.name)},%20I%20am%20your%20neighbor%20at%20The%20Mannat%20Park!`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Say Hi on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs text-center space-y-4 flex flex-col items-center justify-center min-h-[460px]">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#185226]">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-950 font-serif">Connect With Neighbors</h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs">
                  Click on any resident pin on the map to view hobbies, interests, and say hello!
                </p>
                <button
                  onClick={() => {
                    setClickCoords({ x: 50, y: 50 });
                    setIsAddModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#185226] text-white font-bold text-xs"
                >
                  Add My Pin Now
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Add Resident Pin Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-emerald-200 rounded-2xl shadow-2xl overflow-hidden text-stone-900 text-left">
            
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-emerald-50/70">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#185226]" />
                <h3 className="text-lg font-bold text-stone-950 font-serif">
                  Add Your Resident Pin
                </h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-200 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPinSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Resident / Family Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Verma Family / Rajesh Kumar"
                  value={newResident.name}
                  onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-[#185226]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Plot / House No *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot #32"
                    value={newResident.plotNo}
                    onChange={(e) => setNewResident({ ...newResident, plotNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-[#185226]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Profession (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineer / Doctor"
                    value={newResident.profession}
                    onChange={(e) => setNewResident({ ...newResident, profession: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-[#185226]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Select Hobbies & Interests</label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {INTEREST_OPTIONS.map((opt) => {
                    const isChecked = newResident.interests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterestOption(opt)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                          isChecked
                            ? 'bg-[#185226] text-white border-[#185226]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Short Message to Neighbors</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Excited to move in! Looking for morning walk & badminton partners."
                  value={newResident.bio}
                  onChange={(e) => setNewResident({ ...newResident, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-[#185226]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">WhatsApp Number (For neighbors to say Hi)</label>
                <input
                  type="tel"
                  placeholder="+91 94252 00000"
                  value={newResident.whatsapp}
                  onChange={(e) => setNewResident({ ...newResident, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:border-[#185226]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs shadow-md"
              >
                Publish Pin to Neighborhood Map
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
