import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const ImageViewer = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close viewer"
      >
        <X size={32} />
      </button>

      <button
        onClick={handlePrevious}
        className="absolute left-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={48} />
      </button>

      <div className="max-w-11/12 mx-auto px-4 text-center">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[80vh] max-w-full object-contain mx-auto"
          onError={(e) => e.currentTarget.src = '/placeholder.png'}
        />
        <div className="mt-4 text-white">
          <h3 className="font-cheltenham text-2xl font-semibold">{currentImage.title}</h3>
          <p className="font-imperial text-gray-400 text-lg mt-2">{currentImage.description}</p>
          <p className="font-cheltenham text-sm mt-2 text-gray-600">{currentImage.type} - {currentImage.location} - {currentImage.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer; 