'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import ImageModal from './ImageModal';

// Composant d'image sécurisé
const SafeImage = ({ src, alt, className, onClick }) => {
  const [hasError, setHasError] = useState(false);
  
  return (
    <img
      src={hasError ? '/images/procedures/hero_image_new.jpg' : src}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={() => setHasError(true)}
      loading="lazy"
      draggable={false}
    />
  );
};

export default function StageGallery({ imagesOrganisees }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtreActif, setFiltreActif] = useState('tous');

  const openImageModal = (imageSrc, title) => {
    setSelectedImage({ src: imageSrc, title });
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Galerie de mes Missions
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Aperçu visuel de mon travail quotidien organisé par domaines de compétences
        </p>
        
        {/* Filtres de catégories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { id: 'tous', label: 'Toutes les missions' },
            { id: 'infrastructure', label: 'Infrastructure' },
            { id: 'mobile', label: 'Mobile & Téléphonie' },
            { id: 'maintenance', label: 'Maintenance' },
            { id: 'atelier', label: 'Environnement de Travail' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFiltreActif(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filtreActif === filter.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Galerie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(filtreActif === 'tous' 
          ? Object.values(imagesOrganisees).flat() 
          : imagesOrganisees[filtreActif] || []
        ).map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            onClick={() => openImageModal(image.src, image.title)}
          >
            <div className="relative overflow-hidden h-48 md:h-56">
              <SafeImage
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 text-xs font-medium bg-blue-600/90 text-white rounded-full backdrop-blur-sm">
                  {image.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {image.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ImageModal 
        isOpen={isModalOpen}
        onClose={closeImageModal}
        imageSrc={selectedImage?.src}
        title={selectedImage?.title}
      />
    </div>
  );
}
