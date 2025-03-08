import { getImage } from 'astro:assets';
import type { Image } from '../data/image';

// Base type for required image fields
type BaseImage = Pick<Image, 'id' | 'src' | 'alt' | 'title' | 'description' | 'location' | 'operation' | 'type' | 'date'>;

// Generic type that extends BaseImage to allow additional fields
export async function optimizeImage<T extends BaseImage>(image: T) {
  const optimized = await getImage({
    src: image.src,
    width: 1920,
    height: 1080,
    format: 'webp',
    quality: 'max'
  });

  // Also generate thumbnail for gallery view
  const thumbnail = await getImage({
    src: image.src,
    width: 1920,
    height: 1080,
    format: 'webp',
  });

  return {
    ...image,
    src: optimized.src,
    thumbnailSrc: thumbnail.src,
    optimized: true
  };
}

export async function optimizeImages<T extends BaseImage>(images: T[]) {
  return Promise.all(images.map(optimizeImage));
} 