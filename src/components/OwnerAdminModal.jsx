import React, { useState } from 'react';
import { INITIAL_GALLERY_PHOTOS, PROPERTIES } from '../data/properties';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  RefreshCw, 
  Check, 
  Image as ImageIcon,
  Tag,
  DollarSign,
  Layers
} from 'lucide-react';

export default function OwnerAdminModal({ isOpen, onClose }) {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'inventory' | 'backup'

  // Photo form states
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Site Infrastructure');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [uploadedImageData, setUploadedImageData] = useState(null);

  // Gallery state loaded from localStorage or default
  const [galleryPhotos, setGalleryPhotos] = useState(() => {
    const saved = localStorage.getItem('mannat_custom_gallery_photos');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY_PHOTOS;
  });

  if (!isOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === '9425250000') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Handle local image file upload and convert to Data URL
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new photo to gallery
  const handleAddPhoto = (e) => {
    e.preventDefault();
    const imgSrc = uploadedImageData || photoUrlInput.trim();
    if (!imgSrc || !photoTitle.trim()) {
      alert('Please provide a photo image and title.');
      return;
    }

    const newPhoto = {
      id: `custom-photo-${Date.now()}`,
      src: imgSrc,
      title: photoTitle.trim(),
      category: photoCategory,
      description: photoDescription.trim() || 'Site photo added by project owner.',
      dateAdded: new Date().toISOString().split('T')[0],
    };

    const updated = [newPhoto, ...galleryPhotos];
    setGalleryPhotos(updated);
    localStorage.setItem('mannat_custom_gallery_photos', JSON.stringify(updated));
    window.dispatchEvent(new Event('mannat_gallery_updated'));

    // Reset form
    setPhotoTitle('');
    setPhotoDescription('');
    setPhotoUrlInput('');
    setUploadedImageData(null);
    alert('✅ Photo successfully added to the site gallery!');
  };

  // Delete photo
  const handleDeletePhoto = (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo from the gallery?')) {
      const updated = galleryPhotos.filter(p => p.id !== photoId);
      setGalleryPhotos(updated);
      localStorage.setItem('mannat_custom_gallery_photos', JSON.stringify(updated));
      window.dispatchEvent(new Event('mannat_gallery_updated'));
    }
  };

  // Reset to original default gallery
  const handleResetDefaults = () => {
    if (window.confirm('Reset gallery and site configuration back to default photos?')) {
      localStorage.removeItem('mannat_custom_gallery_photos');
      setGalleryPhotos(INITIAL_GALLERY_PHOTOS);
      window.dispatchEvent(new Event('mannat_gallery_updated'));
      alert('Reset to default gallery photos.');
    }
  };

  // Export JSON configuration
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(galleryPhotos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mannat_park_gallery_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in text-stone-900">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Owner Portal</div>
              <h3 className="text-lg font-bold font-serif">Site Content Management Panel</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#185226] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 text-[#185226]" />
            </div>

            <div>
              <h4 className="text-xl font-bold font-serif text-stone-950">Enter Owner Access PIN</h4>
              <p className="text-xs text-stone-500 mt-1">
                Enter your secret 4-digit owner PIN to add photos and manage site details.
              </p>
              <div className="mt-2 text-[11px] text-stone-400 bg-stone-100 px-3 py-1 rounded-full inline-block font-mono">
                Default Owner PIN: <strong>1234</strong>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={10}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (1234)"
                className="w-full text-center text-xl font-bold tracking-widest px-4 py-3 rounded-2xl border border-stone-300 focus:border-[#185226] focus:ring-2 focus:ring-emerald-200 outline-none"
              />

              {pinError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  Incorrect PIN! Use default PIN: 1234
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Unlock Owner Management
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-hidden flex flex-col">
            
            {/* Owner Navigation Tabs */}
            <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex items-center space-x-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'photos'
                    ? 'bg-[#185226] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Add & Manage Photos ({galleryPhotos.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('backup')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'backup'
                    ? 'bg-[#185226] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Download className="w-4 h-4" /> Export & Backup Data
              </button>
            </div>

            {/* Tab 1: Manage Photos */}
            {activeTab === 'photos' && (
              <div className="p-6 overflow-y-auto max-h-[75vh] space-y-8 text-left">
                
                {/* Form to Add Photo */}
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4">
                  <h4 className="text-sm font-bold text-stone-950 font-serif flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#185226]" /> Add New Photo to Website Gallery
                  </h4>

                  <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-stone-800 mb-1">Photo Title *</label>
                        <input
                          type="text"
                          required
                          value={photoTitle}
                          onChange={(e) => setPhotoTitle(e.target.value)}
                          placeholder="e.g. Phase 2 Boundary Wall Development"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-emerald-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-800 mb-1">Category *</label>
                        <select
                          value={photoCategory}
                          onChange={(e) => setPhotoCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-emerald-200 outline-none"
                        >
                          <option value="Site Infrastructure">Site Infrastructure</option>
                          <option value="Amenities & Parks">Amenities & Parks</option>
                          <option value="Villas & Homes">Villas & Architecture</option>
                          <option value="Plots & Layouts">Plots & Layout Maps</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Description / Caption</label>
                      <textarea
                        rows={2}
                        value={photoDescription}
                        onChange={(e) => setPhotoDescription(e.target.value)}
                        placeholder="Brief notes or description for this site photo..."
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-emerald-200 outline-none"
                      />
                    </div>

                    {/* Image Input Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-emerald-200">
                      <div>
                        <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5 text-[#185226]" /> Option A: Upload Photo File from Device
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#185226] file:text-white hover:file:bg-emerald-900 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-800 mb-1">Option B: Or Enter Image Web URL</label>
                        <input
                          type="url"
                          value={photoUrlInput}
                          onChange={(e) => setPhotoUrlInput(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-emerald-200 outline-none"
                        />
                      </div>
                    </div>

                    {/* Upload Preview */}
                    {(uploadedImageData || photoUrlInput) && (
                      <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center gap-3">
                        <img 
                          src={uploadedImageData || photoUrlInput} 
                          alt="Preview" 
                          className="w-16 h-12 object-cover rounded-lg border border-stone-300"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-emerald-800">Ready to Publish</span>
                          <p className="text-[11px] text-stone-500">Image loaded cleanly.</p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      Publish Photo to Website Gallery
                    </button>

                  </form>
                </div>

                {/* Existing Photos List */}
                <div>
                  <h4 className="text-sm font-bold text-stone-950 font-serif mb-4 flex items-center justify-between">
                    <span>Current Gallery Photos ({galleryPhotos.length})</span>
                    <button
                      onClick={handleResetDefaults}
                      className="text-xs font-semibold text-stone-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reset Default Photos
                    </button>
                  </h4>

                  <div className="space-y-3">
                    {galleryPhotos.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.src}
                            alt={p.title}
                            className="w-16 h-12 object-cover rounded-xl border border-stone-300 flex-shrink-0 bg-stone-200"
                          />
                          <div>
                            <div className="font-bold text-stone-900">{p.title}</div>
                            <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#185226] font-bold">
                                {p.category}
                              </span>
                              <span>Added {p.dateAdded || 'Recently'}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(p.id)}
                          className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold transition-colors cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Export & Backup */}
            {activeTab === 'backup' && (
              <div className="p-8 text-left space-y-6">
                <div>
                  <h4 className="text-lg font-bold font-serif text-stone-950">Export Site Configuration & Media Backup</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Download a JSON backup file containing all your added photos and gallery specifications.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-100 border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-stone-900 text-sm">Download Backup JSON</div>
                    <div className="text-xs text-stone-500 mt-0.5">Includes {galleryPhotos.length} photo entries.</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="px-5 py-2.5 rounded-xl bg-[#185226] hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Export Backup File (.json)
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700" /> Persistent Storage Enabled
                  </div>
                  <p className="text-emerald-800">
                    All photo edits and uploads automatically save in your browser's local storage.
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
