import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyExplorer from './components/PropertyExplorer';
import PhaseLayoutsSection from './components/PhaseLayoutsSection';
import ProjectTourSection from './components/ProjectTourSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import AmenitiesSection from './components/AmenitiesSection';
import ResidentCommunityMap from './components/ResidentCommunityMap';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PropertyDetailModal from './components/PropertyDetailModal';
import SiteVisitModal from './components/SiteVisitModal';
import OwnerAdminModal from './components/OwnerAdminModal';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isOwnerAdminOpen, setIsOwnerAdminOpen] = useState(false);
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
      
      {/* 1. Header Navigation Bar */}
      <Navbar 
        onOpenVisitModal={() => handleOpenVisitModal(null)}
        onOpenOwnerAdmin={() => setIsOwnerAdminOpen(true)}
      />

      {/* 2. Hero Section */}
      <HeroSection 
        onOpenVisitModal={() => handleOpenVisitModal(null)}
        onExploreClick={scrollToProperties}
      />

      {/* 3. Inventory & Property Showcase (#properties) */}
      <PropertyExplorer 
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onOpenVisitModal={(prop) => handleOpenVisitModal(prop)}
      />

      {/* 4. Official Phase 1 & Phase 2 Master Layout Plans (#layouts) */}
      <PhaseLayoutsSection 
        onOpenVisitModal={(prop) => handleOpenVisitModal(prop)}
      />

      {/* 5. Official 99acres Project Tour & Video Showcase (#tour) */}
      <ProjectTourSection />

      {/* 6. Photo Gallery with Owner Uploader (#gallery) */}
      <PhotoGallerySection 
        onOpenOwnerAdmin={() => setIsOwnerAdminOpen(true)}
      />

      {/* 7. Township Amenities & Nearby Landmarks (#amenities) */}
      <AmenitiesSection />

      {/* 8. Resident Community & Neighbors Connect Map (#community) */}
      <ResidentCommunityMap />

      {/* 9. Direct Sales Contact Form & Location Address (#contact) */}
      <ContactSection />

      {/* 10. Footer Section */}
      <Footer 
        onOpenOwnerAdmin={() => setIsOwnerAdminOpen(true)}
      />

      {/* Modals & Floating Components */}
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

      <OwnerAdminModal
        isOpen={isOwnerAdminOpen}
        onClose={() => setIsOwnerAdminOpen(false)}
      />

      <WhatsAppWidget />

    </div>
  );
}
