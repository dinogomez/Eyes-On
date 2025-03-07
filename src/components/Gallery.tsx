import { useState } from 'react';
import type { Image as ImageType } from '../data/image';
import ImageViewer from './ImageViewer';

interface GalleryProps {
  images: (ImageType & { thumbnailSrc: string })[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1920px] mx-auto">
        {images.map((image, index) => (
          <div 
            key={image.id}
            className="aspect-w-16 aspect-h-9 relative group overflow-hidden cursor-pointer shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            onClick={() => setSelectedImage(index)}
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