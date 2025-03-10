import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Image as ImageType } from '../data/image';
import ImageViewer from './ImageViewer.tsx';

interface GalleryProps {
  images: (ImageType & { thumbnailSrc: string })[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const imagesPerPage = 8;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1920px] mx-auto mb-8">
        {currentImages.map((image, index) => (
          <div 
            key={image.id}
            className="aspect-w-3 aspect-h-2 relative group overflow-hidden cursor-pointer shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            onClick={() => setSelectedImage(startIndex + index)}
          >
            <img 
              src={image.thumbnailSrc}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => e.currentTarget.src = '/placeholder.png'}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-3 px-4 text-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
              <p className="font-cheltenham text-lg font-semibold leading-tight">{image.title}</p>
              <p className="font-franklin text-xs mt-1 text-gray-200">{image.type} - {image.location} - {image.date}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="w-full bg-white py-6">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200 shadow-sm"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (totalPages > 7) {
                  if (
                    pageNum !== 1 &&
                    pageNum !== totalPages &&
                    (pageNum < currentPage - 1 || pageNum > currentPage + 1) &&
                    pageNum !== currentPage
                  ) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={`ellipsis-${pageNum}`} className="w-8 text-center">...</span>;
                    }
                    return null;
                  }
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[2.5rem] h-10 mx-0.5 rounded-lg flex items-center justify-center transition-all duration-200 font-medium ${
                      pageNum === currentPage
                        ? 'bg-black text-white shadow-md scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                    }`}
                    aria-current={pageNum === currentPage ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              }).filter(Boolean)}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200 shadow-sm"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {selectedImage !== null && (
        <ImageViewer
          images={images}
          initialIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}; 