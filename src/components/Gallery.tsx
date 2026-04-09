import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
  photos: string[];
  title: string;
}

export default function Gallery({ photos, title }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[16/9] md:aspect-[21/9] bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No hay imágenes disponibles</span>
      </div>
    );
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <>
      {/* Main Gallery View */}
      <div className="relative group">
        <div 
          className="aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={photos[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {photos.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1A1A1A] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1A1A1A] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 text-sm tracking-widest backdrop-blur-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-all duration-300 ${
                idx === currentIndex ? 'ring-2 ring-[#C9A84C] opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={photo} 
                alt={`Thumbnail ${idx + 1}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-6xl px-4 flex items-center justify-center">
            <img
              src={photos[currentIndex]}
              alt={`${title} - Fullscreen ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain"
              referrerPolicy="no-referrer"
            />
            
            {photos.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors p-4"
                >
                  <ChevronLeft size={48} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors p-4"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 tracking-widest text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
