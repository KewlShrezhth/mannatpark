import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Layers, 
  Camera, 
  Image as ImageIcon, 
  Trees, 
  Users, 
  Sparkles, 
  Lock,
  Compass,
  MapPin,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Logo from './Logo';
import { MANNAT_PARK_INFO } from '../data/properties';

export default function Navbar({ onOpenVisitModal, onOpenOwnerAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Active section tracker (Scrollspy)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['properties', 'layouts', 'tour', 'gallery', 'amenities', 'community', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'properties', label: 'Plots & Homes', icon: Compass },
    { id: 'layouts', label: 'Layout Plans', icon: Layers, badge: 'Phase 1 & 2' },
    { id: 'tour', label: 'Project Tour', icon: Camera },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'amenities', label: 'Amenities', icon: Trees },
    { id: 'community', label: 'Neighbors Map', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-stone-300">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <MapPin className="w-3 h-3" /> Dharampura, Jagdalpur
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> RERA: {MANNAT_PARK_INFO.reraNo}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold uppercase tracking-wider text-[10px] border border-emerald-800">
              Phase 2 Open
            </span>
            <button
              type="button"
              onClick={onOpenOwnerAdmin}
              className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
              title="Owner Portal Login"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="hidden xs:inline">Owner Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-md py-2.5' 
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/70 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="hover:opacity-90 transition-opacity py-0.5 flex-shrink-0">
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-stone-700">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 relative group ${
                    isActive
                      ? 'bg-[#185226] text-white shadow-xs'
                      : 'hover:text-[#185226] hover:bg-emerald-50/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-800 group-hover:text-[#185226]'}`} />
                  <span>{link.label}</span>
                  {link.badge && !isActive && (
                    <span className="ml-0.5 text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-[#185226] font-extrabold border border-emerald-200">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <a
              href={`tel:${MANNAT_PARK_INFO.phone}`}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-200/90 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#185226]" />
              <span className="hidden md:inline">{MANNAT_PARK_INFO.phone}</span>
              <span className="md:hidden">Call</span>
            </a>

            <button
              type="button"
              onClick={onOpenVisitModal}
              className="px-4 py-2 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white text-xs font-bold shadow-md shadow-emerald-950/15 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1"
            >
              <span>Schedule Site Visit</span>
            </button>
          </div>

          {/* Mobile & Tablet Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer border border-stone-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-stone-900" /> : <Menu className="w-5 h-5 text-stone-900" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-4 py-5 shadow-2xl animate-in slide-in-from-top duration-200 text-left">
          
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 px-2">
            Navigation Menu
          </div>

          <div className="grid grid-cols-1 gap-1 text-xs font-bold uppercase text-stone-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`p-3 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#185226] text-white shadow-sm'
                      : 'hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#185226]'}`} />
                    <span>{link.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {link.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-[#185226]'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div className="pt-4 mt-3 border-t border-stone-200 flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onOpenVisitModal(); }}
              className="w-full py-3 rounded-xl bg-[#185226] text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Schedule Free Site Visit</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${MANNAT_PARK_INFO.phone}`}
                className="py-2.5 rounded-xl bg-stone-100 text-stone-900 font-bold text-xs border border-stone-300 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#185226]" /> Call Sales
              </a>
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenOwnerAdmin(); }}
                className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#185226]" /> Owner Admin
              </button>
            </div>
          </div>

        </div>
      )}

    </header>
  );
}
