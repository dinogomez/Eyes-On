import { getImage } from 'astro:assets';
import type { Image } from '../data/image';

export async function optimizeImage(image: Image) {
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

export async function optimizeImages(images: Image[]) {
  return Promise.all(images.map(optimizeImage));
} 