import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyExplorer from './components/PropertyExplorer';
import ResidentCommunityMap from './components/ResidentCommunityMap';
import AmenitiesSection from './components/AmenitiesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PropertyDetailModal from './components/PropertyDetailModal';
import SiteVisitModal from './components/SiteVisitModal';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [targetVisitProperty, setTargetVisitProperty] = useState(null);

  const handleOpenVisitModal = (prop = null) => {
    setTargetVisitProperty(prop);
    setIsVisitModalOpen(true);
  };

  const scrollToProperties = () => {
    const elem = document.getElementById('properties');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-[#185226] selection:text-white">
      
      {/* Header */}
      <Navbar 
        onOpenVisitModal={() => handleOpenVisitModal(null)}
      />

      {/* Hero */}
      <HeroSection 
        onOpenVisitModal={() => handleOpenVisitModal(null)}
        onExploreClick={scrollToProperties}
      />

      {/* Inventory & Property Showcase */}
      <PropertyExplorer 
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onOpenVisitModal={(prop) => handleOpenVisitModal(prop)}
      />

      {/* Resident Community & Neighbors Connect Map */}
      <ResidentCommunityMap />

      {/* Amenities & Nearby Landmarks */}
      <AmenitiesSection />

      {/* Direct Contact Form */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Floating WhatsApp */}
      <PropertyDetailModal 
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenVisitModal={(prop) => handleOpenVisitModal(prop)}
      />

      <SiteVisitModal 
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        selectedProperty={targetVisitProperty}
      />

      <WhatsAppWidget />

    </div>
  );
}
