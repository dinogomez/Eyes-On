import { media } from './media';

// Base type for required image fields
type BaseImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
};

// Generic type that extends BaseImage to allow additional fields
export async function optimize<T extends BaseImage>(image: T) {
  // Optimize and cache full-size image
  const optimizedSrc = await media(image.src, {
    width: 3440,
    height: 1440,
    format: 'webp'
  });

  // Generate and cache thumbnail
  const thumbnailSrc = await media(image.src, {
    width: 800,
    height: 800,
    format: 'webp'
  });

  return {
    ...image,
    src: optimizedSrc,
    thumbnailSrc: thumbnailSrc,
    optimized: true
  };
}

export async function optimizeImages<T extends BaseImage>(images: T[]) {
  return Promise.all(images.map(image => optimize(image)));
} 